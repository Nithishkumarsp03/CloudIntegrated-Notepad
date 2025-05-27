import React from 'react';
import { cn } from '../../cn';
import { ProfileSwitch } from '../../switch';
import { SunIcon } from '../../../assets';
import { MoonIcon } from '../../../assets';

const ThemeToggle = ({ darkMode, onToggle, isMobile }) => {
    return (
        <div className="absolute top-3 md:top-5 right-3 md:right-5 z-20">
            <div
                className={cn(
                    "flex items-center h-10 gap-2 rounded-full pl-2 cursor-pointer",
                    darkMode
                        ? "bg-gray-800 border border-gray-600"
                        : "bg-white border border-gray-300",
                    isMobile ? "bg-transparent" : "p-2 gap-2"
                )}
                onClick={onToggle}
            >
                <ProfileSwitch
                    checked={darkMode}
                    size={isMobile ? "small" : "medium"}
                    className="mr-[-8px]"
                />
                <SunIcon size={24} className={cn(
                    "text-gray-400",
                    darkMode ? "hidden" : "block",
                )} />
                <MoonIcon size={24} className={cn(
                    "text-gray-400",
                    darkMode ? "block" : "hidden",
                )} />
            </div>
        </div>
    );
};

export default ThemeToggle;