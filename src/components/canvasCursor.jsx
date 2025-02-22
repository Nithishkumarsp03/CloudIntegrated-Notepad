'use client';
import React, { useEffect, useRef } from 'react';

const CharacterCursor = ({
    characters = ['a', 'b', 'c', 'd', 'e'],
    colors = ['#6622CC', '#A755C2', '#B07C9E', '#B59194', '#D2A1B8'],
    cursorOffset = { x: 0, y: 0 },
    font = '15px serif',
    characterLifeSpanFunction = () => Math.floor(Math.random() * 20 + 30),
    initialCharacterVelocityFunction = () => ({
        x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 3,
        y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 3,
    }),
    characterVelocityChangeFunctions = {
        x_func: () => (Math.random() < 0.5 ? -1 : 1) / 30,
        y_func: () => (Math.random() < 0.5 ? -1 : 1) / 15,
    },
    characterScalingFunction = (age, lifeSpan) =>
        Math.max(((lifeSpan - age) / lifeSpan) * 2, 0),
    characterNewRotationDegreesFunction = (age, lifeSpan) => (lifeSpan - age) / 5,
    wrapperElement,
}) => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const cursorRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef(null);
    const canvImagesRef = useRef([]);
    const lastMouseMoveTimeRef = useRef(0);
    const minInterval = 30; // Controls particle generation rate

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let canvas = null;
        let context = null;
        let width = window.innerWidth;
        let height = window.innerHeight;

        const randomPositiveOrNegativeOne = () => (Math.random() < 0.5 ? -1 : 1);

        class Particle {
            constructor(x, y, canvasItem) {
                const lifeSpan = characterLifeSpanFunction();
                this.rotationSign = randomPositiveOrNegativeOne();
                this.age = 0;
                this.initialLifeSpan = lifeSpan;
                this.lifeSpan = lifeSpan;
                this.velocity = initialCharacterVelocityFunction();
                this.position = {
                    x: x + cursorOffset.x,
                    y: y + cursorOffset.y,
                };
                this.canv = canvasItem;
            }

            update(context) {
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
                this.lifeSpan--;
                this.age++;
                this.velocity.x += characterVelocityChangeFunctions.x_func(this.age, this.initialLifeSpan);
                this.velocity.y += characterVelocityChangeFunctions.y_func(this.age, this.initialLifeSpan);

                const scale = characterScalingFunction(this.age, this.initialLifeSpan);
                const degrees = this.rotationSign * characterNewRotationDegreesFunction(this.age, this.initialLifeSpan);
                const radians = degrees * 0.0174533;

                context.translate(this.position.x, this.position.y);
                context.rotate(radians);
                context.drawImage(
                    this.canv,
                    (-this.canv.width / 2) * scale,
                    -this.canv.height / 2,
                    this.canv.width * scale,
                    this.canv.height * scale
                );
                context.rotate(-radians);
                context.translate(-this.position.x, -this.position.y);
            }
        }

        const init = () => {
            if (prefersReducedMotion.matches) {
                console.log('Reduced motion enabled. Cursor effect disabled.');
                return false;
            }
            canvas = canvasRef.current;
            if (!canvas) return;
            context = canvas.getContext('2d');
            if (!context) return;

            canvas.style.top = '0px';
            canvas.style.left = '0px';
            canvas.style.pointerEvents = 'none';

            if (wrapperElement) {
                canvas.style.position = 'absolute';
                wrapperElement.appendChild(canvas);
                canvas.width = wrapperElement.clientWidth;
                canvas.height = wrapperElement.clientHeight;
            } else {
                canvas.style.position = 'fixed';
                document.body.appendChild(canvas);
                canvas.width = width;
                canvas.height = height;
            }

            context.font = font;
            context.textBaseline = 'middle';
            context.textAlign = 'center';

            characters.forEach((char) => {
                let measurements = context.measureText(char);
                let bgCanvas = document.createElement('canvas');
                let bgContext = bgCanvas.getContext('2d');
                if (bgContext) {
                    bgCanvas.width = measurements.width;
                    bgCanvas.height = measurements.actualBoundingBoxAscent * 2.5;
                    bgContext.textAlign = 'center';
                    bgContext.font = font;
                    bgContext.textBaseline = 'middle';
                    var randomColor = colors[Math.floor(Math.random() * colors.length)];
                    bgContext.fillStyle = randomColor;
                    bgContext.fillText(char, bgCanvas.width / 2, measurements.actualBoundingBoxAscent);
                    canvImagesRef.current.push(bgCanvas);
                }
            });

            bindEvents();
            loop();
        };

        const bindEvents = () => {
            const element = wrapperElement || document.body;
            element.addEventListener('mousemove', onMouseMove);
            element.addEventListener('touchmove', onTouchMove, { passive: true });
            element.addEventListener('touchstart', onTouchMove, { passive: true });
            window.addEventListener('resize', onWindowResize);
        };

        const onWindowResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            if (!canvasRef.current) return;
            if (wrapperElement) {
                canvasRef.current.width = wrapperElement.clientWidth;
                canvasRef.current.height = wrapperElement.clientHeight;
            } else {
                canvasRef.current.width = width;
                canvasRef.current.height = height;
            }
        };

        const onMouseMove = (e) => {
            const now = Date.now();
            if (now - lastMouseMoveTimeRef.current < minInterval) return;
            lastMouseMoveTimeRef.current = now;

            if (wrapperElement) {
                const boundingRect = wrapperElement.getBoundingClientRect();
                cursorRef.current.x = e.clientX - boundingRect.left;
                cursorRef.current.y = e.clientY - boundingRect.top;
            } else {
                cursorRef.current.x = e.clientX;
                cursorRef.current.y = e.clientY;
            }

            addParticle(cursorRef.current.x, cursorRef.current.y, canvImagesRef.current[Math.floor(Math.random() * characters.length)]);
        };

        const onTouchMove = (e) => {
            if (e.touches.length > 0) {
                for (let i = 0; i < Math.min(e.touches.length, 1); i++) {
                    addParticle(e.touches[i].clientX, e.touches[i].clientY, canvImagesRef.current[Math.floor(Math.random() * canvImagesRef.current.length)]);
                }
            }
        };

        const addParticle = (x, y, img) => {
            particlesRef.current.push(new Particle(x, y, img));
        };

        const updateParticles = () => {
            if (!canvas || !context) return;
            if (particlesRef.current.length === 0) return;

            context.clearRect(0, 0, canvas.width, canvas.height);
            particlesRef.current.forEach((particle) => particle.update(context));

            particlesRef.current = particlesRef.current.filter((particle) => particle.lifeSpan > 0);
        };

        const loop = () => {
            updateParticles();
            animationFrameRef.current = requestAnimationFrame(loop);
        };

        init();
        return () => {
            if (canvas) canvas.remove();
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
            window.removeEventListener('resize', onWindowResize);
        };
    }, [characters, colors, cursorOffset, font]);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 2 }} />;
};

export default CharacterCursor;
