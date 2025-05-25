import React from "react";
import NotePad from "../../../assets/svgs/notePad";

export const WaveBackground = ({ darkMode }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute w-full h-full">
                <div className={`absolute inset-0 ${darkMode ? 'opacity-20' : 'opacity-15'}`}>
                    <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute h-full w-full">
                        <path
                            d="M0,500 C150,400 250,300 500,500 C750,700 850,600 1000,500 V1000 H0 V500 Z"
                            className={`${darkMode ? 'fill-purple-800' : 'fill-blue-200'} animate-wave-slow`}
                        />
                        <path
                            d="M0,600 C200,500 300,400 500,600 C700,800 800,700 1000,600 V1000 H0 V600 Z"
                            className={`${darkMode ? 'fill-blue-800' : 'fill-purple-200'} animate-wave-slower opacity-70`}
                        />
                    </svg>
                </div>
            </div>

            <div className="absolute inset-0">
                <div className={`absolute top-1/4 left-1/4 w-24 h-24 rounded-full ${darkMode ? 'border-2 border-purple-500 opacity-10' : 'border-2 border-blue-400 opacity-15'} animate-float-slow`}></div>
                <div className={`absolute top-2/3 right-1/3 w-16 h-16 rounded-full ${darkMode ? 'border border-blue-400 opacity-10' : 'border border-purple-400 opacity-15'} animate-float-slower`}></div>
                <div className={`absolute top-1/3 right-1/4 w-20 h-20 ${darkMode ? 'border border-purple-400 opacity-10' : 'border border-blue-400 opacity-15'} transform rotate-45 animate-float-medium`}></div>
                <div className={`absolute bottom-1/4 left-1/3 w-12 h-12 ${darkMode ? 'border border-blue-300 opacity-10' : 'border border-purple-300 opacity-15'} transform rotate-12 animate-float-fast`}></div>
                <div className={`absolute top-12 left-12 transform rotate-12 ${darkMode ? 'text-purple-400 opacity-10' : 'text-blue-500 opacity-15'} animate-float-slow`}>
                    <NotePad className="w-16 h-16" />
                </div>
                <div className={`absolute bottom-12 right-12 transform -rotate-12 ${darkMode ? 'text-blue-400 opacity-10' : 'text-purple-500 opacity-15'} animate-float-medium`}>
                    <NotePad className="w-12 h-12" />
                </div>
            </div>
            <div className="absolute inset-0">
                <div className={`absolute top-0 right-0 w-1/2 h-1/2 rounded-bl-full ${darkMode ? 'bg-blue-800' : 'bg-blue-100'} opacity-10 blur-3xl`}></div>
                <div className={`absolute bottom-0 left-0 w-1/2 h-1/2 rounded-tr-full ${darkMode ? 'bg-purple-800' : 'bg-purple-100'} opacity-10 blur-3xl`}></div>
            </div>
        </div>
    );
};
