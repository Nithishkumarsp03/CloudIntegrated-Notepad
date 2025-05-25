import React from 'react';
import NotePad from "../../../assets/svgs/notePad";

export const BackgroundPattern = ({ darkMode }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className={`absolute top-40 left-20 transform rotate-12 opacity-5 ${darkMode ? 'text-purple-400' : 'text-gray-900'}`}>
                <NotePad className="w-20 h-20" />
            </div>
            <div className={`absolute bottom-40 right-40 transform -rotate-12 opacity-5 ${darkMode ? 'text-purple-400' : 'text-gray-900'}`}>
                <NotePad className="w-16 h-16" />
            </div>
        </div>
    );
};