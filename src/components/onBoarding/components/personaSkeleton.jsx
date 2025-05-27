import React from 'react';
import { Skeleton } from '@mui/material';
import { cn } from '../../cn';

const PersonaSkeletonCard = ({ darkMode, isMobile }) => {
    return (
        <div
            className={cn(
                "p-3 md:p-5 rounded-lg transition-all duration-300",
                "backdrop-blur-md flex items-center gap-3 md:gap-4",
                darkMode
                    ? "bg-gray-800/60 border border-gray-700"
                    : "bg-white border border-gray-200"
            )}
        >
            <Skeleton
                variant="circular"
                width={isMobile ? 40 : 56}
                height={isMobile ? 40 : 56}
                animation="wave"
                className={darkMode ? "bg-gray-700" : "bg-gray-200"}
            />
            <div className="flex-1">
                <Skeleton
                    variant="text"
                    width="60%"
                    height={28}
                    animation="wave"
                    className={darkMode ? "bg-gray-700" : "bg-gray-200"}
                />
                <Skeleton
                    variant="text"
                    width="90%"
                    height={20}
                    animation="wave"
                    className={darkMode ? "bg-gray-700" : "bg-gray-200"}
                />
            </div>
        </div>
    );
};

export default PersonaSkeletonCard;