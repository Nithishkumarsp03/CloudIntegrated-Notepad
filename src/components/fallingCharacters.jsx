import { useEffect, useRef } from "react";
import alignLeft from '../assets/alignLeft.png';
import alignRight from '../assets/alignRight.png';
import alignCenter from '../assets/alignCenter.png';
import italic from '../assets/italic.png';
import eraser from '../assets/eraser.png';
import underline from '../assets/underline.png';
import fill from '../assets/fill.png';

const FallingCharacters = () => {
    const canvasRef = useRef(null);
    const icons = [  italic, underline, fill, eraser];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("Canvas context not found!");
            return;
        }

        // Fullscreen Canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const papers = [];

        function createPapers(count) {
            for (let i = 0; i < count; i++) {
                const randomIcon = new Image();
                randomIcon.src = icons[Math.floor(Math.random() * icons.length)]; // Select random icon

                papers.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * -canvas.height,
                    speed: Math.random() * 1 + 0.5, // Reduced speed (0.5 to 1.5)
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 0.5, // Slower rotation
                    size: Math.random() * 40 + 40,
                    image: randomIcon // Assign the randomly selected icon
                });
            }
        }

        createPapers(10);

        function update() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            papers.forEach((paper) => {
                paper.y += paper.speed;
                paper.rotation += paper.rotationSpeed;

                if (paper.y > canvas.height) {
                    paper.y = -50;
                    paper.x = Math.random() * canvas.width;
                }

                ctx.save();
                ctx.translate(paper.x, paper.y);
                ctx.rotate((paper.rotation * Math.PI) / 180);
                ctx.drawImage(paper.image, -paper.size / 2, -paper.size / 2, paper.size, paper.size);
                ctx.restore();
            });

            setTimeout(() => requestAnimationFrame(update), 20); // Adds a delay to slow animation
        }

        papers.forEach(paper => {
            paper.image.onload = () => update(); // Ensure images are loaded before animating
        });

        return () => {
            cancelAnimationFrame(update);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }} />;
};

export default FallingCharacters;
