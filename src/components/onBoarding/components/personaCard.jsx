import React from 'react';
import { Typography } from '@mui/material';
import {
    School,
    Business,
    Create,
    EventNote,
    Psychology,
} from '@mui/icons-material';
import { cn } from '../../cn';

const iconMap = {
    2: School,
    3: Business,
    4: Create,
    5: EventNote,
    6: Psychology,
};

const PersonaCard = ({ persona, isSelected, onSelect, darkMode, isMobile }) => {
    const IconComponent = iconMap[persona.id] || School;

    return (
        <div
            onClick={() => onSelect(persona)}
            className={cn(
                "cursor-pointer p-3 md:p-5 rounded-lg transition-all duration-300 scrollbar-none",
                "backdrop-blur-md flex items-center gap-3 md:gap-4",
                isSelected
                    ? darkMode
                        ? "bg-purple-800/30 border border-purple-500 shadow-lg shadow-purple-900/30"
                        : "bg-blue-100/40 border border-blue-500 shadow-lg shadow-blue-500/20"
                    : darkMode
                        ? "bg-gray-800/60 border border-gray-700 hover:bg-gray-700/60"
                        : "bg-white border border-gray-200 hover:bg-blue-50"
            )}
        >
            <div className={cn(
                "rounded-full flex items-center justify-center flex-shrink-0",
                isMobile ? "w-10 h-10" : "w-14 h-14",
                isSelected
                    ? darkMode ? "bg-purple-900 text-purple-200" : "bg-blue-100 text-blue-700"
                    : darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
            )}>
                <IconComponent fontSize={isMobile ? "medium" : "large"} />
            </div>

            <div>
                <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    className={`font-bold mb-0.5 ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}
                >
                    {persona.topic}
                </Typography>

                <Typography
                    variant="body2"
                    className={`${darkMode ? 'text-purple-300' : 'text-blue-600'} text-xs md:text-sm`}
                >
                    {persona.description}
                </Typography>
            </div>
        </div>
    );
};

export default PersonaCard;