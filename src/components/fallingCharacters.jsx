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

        // Fullscreen Canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        function createPaper() {
            const randomIcon = new Image();
            randomIcon.src = icons[Math.floor(Math.random() * icons.length)];

            randomIcon.onload = () => {
                papers.push({
                    x: Math.random() * -200, // Starts further off the left side
                    y: Math.random() * canvas.height, // Random y position
                    speed: Math.random() * 1.2 + 0.5, // Slightly faster speed (0.5 to 1.7)
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 0.3, // Slower rotation
                    size: Math.random() * 40 + 40,
                    image: randomIcon
                });
            };
        }

        // Add some initial characters so they appear sooner
        for (let i = 0; i < 10; i++) { // Reduced initial count for spacing
            createPaper();
        }

        // Start adding new papers over time
        const paperInterval = setInterval(() => {
            if (papers.length < 20) { // Limits total number of icons
                createPaper();
            }
        }, 1000); // Slower frequency for better spacing

        function startAnimation() {
            function update() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                papers.forEach((paper, index) => {
                    paper.x += paper.speed; // Moves rightward
                    paper.rotation += paper.rotationSpeed;

                    if (paper.x > canvas.width + 50) { // Adds buffer before respawn
                        papers[index] = { // Reset moving character instead of respawning only offscreen
                            ...paper,
                            x: Math.random() * -200, // Start further left
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

            update(); // Start the animation loop
        }

        startAnimation();

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearInterval(paperInterval);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }} />;
};

export default FallingCharacters;
