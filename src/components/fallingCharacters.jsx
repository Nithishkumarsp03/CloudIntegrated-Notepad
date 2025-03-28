import { useEffect, useRef } from "react";
import alignLeft from '../assets/alignLeft.png';
import alignRight from '../assets/alignRight.png';
import alignCenter from '../assets/alignCenter.png';
import italic from '../assets/italic.png';
import eraser from '../assets/eraser.png';
import underline from '../assets/underline.png';
import fill from '../assets/fill.png';
import text from '../assets/text.png';

const FallingCharacters = () => {
    const canvasRef = useRef(null);
    const icons = [alignLeft, italic, underline, eraser, text];
    let animationFrameId;
    const papers = [];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("Canvas context not found!");
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        function createPaper() {
            const randomIcon = new Image();
            randomIcon.src = icons[Math.floor(Math.random() * icons.length)];

            randomIcon.onload = () => {
                papers.push({
                    x: Math.random() * -400,
                    y: Math.random() * canvas.height, 
                    speed: Math.random() * 1 + 0.4,
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 0.2, 
                    size: Math.random() * 35 + 25, 
                    image: randomIcon
                });
            };
        }

        for (let i = 0; i < 4; i++) { 
            createPaper();
        }

        const paperInterval = setInterval(() => {
            if (papers.length < 15) { 
                createPaper();
            }
        }, 1200);

        function startAnimation() {
            function update() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                papers.forEach((paper, index) => {
                    paper.x += paper.speed; 
                    paper.rotation += paper.rotationSpeed;

                    if (paper.x > canvas.width + 50) {
                        papers[index] = {
                            ...paper,
                            x: Math.random() * -400, 
                            y: Math.random() * canvas.height
                        };
                    }

                    ctx.save();
                    ctx.translate(paper.x, paper.y);
                    ctx.rotate((paper.rotation * Math.PI) / 180);
                    ctx.drawImage(paper.image, -paper.size / 2, -paper.size / 2, paper.size, paper.size);
                    ctx.restore();
                });

                animationFrameId = requestAnimationFrame(update);
            }

            update(); 
        }

        startAnimation();

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearInterval(paperInterval);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: "absolute", width:"full", top: 0, left: 0, zIndex: 1 }} />;
};

export default FallingCharacters;
