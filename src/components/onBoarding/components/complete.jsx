import React from 'react';
import { Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
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

const CompletionStep = ({ selectedPersona, darkMode, isMobile }) => {
    const IconComponent = selectedPersona ? iconMap[selectedPersona.id] || School : null;

    return (
        <div className="text-center">
            <div className={cn(
                "rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center",
                isMobile ? "w-16 h-16" : "w-20 h-20",
                darkMode ? "bg-purple-800 text-purple-200" : "bg-blue-100 text-blue-700"
            )}>
                <CheckCircle style={{ fontSize: isMobile ? 36 : 48 }} />
            </div>
            <div className='flex flex-col gap-2 md:gap-4 mb-4 md:mb-6'>
                <Typography
                    variant={isMobile ? "h5" : "h4"}
                    className={`font-bold ${darkMode ? 'text-purple-100' : 'text-blue-800'} w-full`}
                >
                    You're all set!
                </Typography>

                <Typography className={`${darkMode ? 'text-purple-300' : 'text-blue-600'} text-center w-full text-sm md:text-base`}>
                    Your personalized NotePad is ready to use. We've set up your workspace based on your preferences.
                </Typography>
            </div>

            <div className={cn(
                "p-3 md:p-5 rounded-lg max-w-md mx-auto",
                "backdrop-blur-md",
                darkMode
                    ? "bg-purple-900/30"
                    : "bg-blue-100/80"
            )}>
                <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    className={`font-medium mb-2 md:mb-3 ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}
                >
                    Your selected preferences:
                </Typography>

                {selectedPersona && IconComponent && (
                    <div className="flex items-center justify-center gap-2 md:gap-3 mb-3">
                        <div className={cn(
                            "rounded-full flex items-center justify-center",
                            isMobile ? "w-8 h-8" : "w-10 h-10",
                            darkMode ? "bg-purple-900 text-purple-200" : "bg-blue-100 text-blue-700"
                        )}>
                            <IconComponent fontSize={isMobile ? "small" : "medium"} />
                        </div>
                        <Typography className={`${darkMode ? "text-purple-200" : "text-blue-800"} text-sm md:text-base`}>
                            {selectedPersona?.topic}
                        </Typography>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompletionStep;