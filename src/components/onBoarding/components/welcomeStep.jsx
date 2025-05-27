import React from 'react';
import { Typography } from '@mui/material';
import { cn } from '../../cn';

const WelcomeStep = ({ darkMode, isMobile, logo }) => {
    return (
        <div className="text-center">
            <div className="flex justify-center mb-4">
                <img
                    src={logo}
                    alt="NotePad Logo"
                    className={cn(
                        "object-contain",
                        isMobile ? "h-16 pl-8" : "h-28 pl-16"
                    )}
                />
            </div>
            <div className='flex flex-col items-center gap-3 mb-4'>
                <Typography
                    variant={isMobile ? "h5" : "h4"}
                    className={`font-bold ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}
                >
                    Welcome to NotePad
                </Typography>

                <Typography className={`${darkMode ? 'text-purple-300' : 'text-blue-600'} text-center max-w-lg text-sm md:text-base`}>
                    Your personal space for notes, ideas, and everything in between. Let's set up your workspace to match your needs.
                </Typography>
            </div>
            <div className={cn(
                "p-4 md:p-6 rounded-lg max-w-md mx-auto",
                "backdrop-blur-md",
                darkMode
                    ? "bg-purple-900/30 shadow-lg shadow-purple-900/20"
                    : "bg-blue-100/80 shadow-lg shadow-blue-500/10"
            )}>
                <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    className={`font-medium mb-2 ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}
                >
                    Personalized Experience
                </Typography>
                <Typography
                    variant="body2"
                    className={`${darkMode ? 'text-purple-300' : 'text-blue-600'}`}
                >
                    Answer a few quick questions to customize NotePad just for you. We'll recommend templates based on your needs.
                </Typography>
            </div>
        </div>
    );
};

export default WelcomeStep;
