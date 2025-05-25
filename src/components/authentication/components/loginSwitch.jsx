
import React from 'react';
import { cn } from '../../cn';
import { ProfileSwitch } from '../../switch';
import { SunIcon } from '../../../assets/svgs/sun';
import { MoonIcon } from '../../../assets/svgs/moon';

export const LoginSwitch = ({ isMobile, toggleLeftPanel, setDarkMode, darkMode }) => {
    return (
        <div>
            {isMobile && (
                <button
                    onClick={toggleLeftPanel}
                    className={cn(
                        "absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-sm mt-4 md:mt-0 font-medium",
                        "backdrop-blur-md",
                        darkMode ? "bg-purple-900/50 text-purple-200" : "bg-blue-500 text-white"
                    )}
                >
                    Promo Video
                </button>
            )}
            <div className="absolute top-4 right-4 z-20 cursor-pointer" onClick={setDarkMode}>
                <div className="flex items-center gap-2  backdrop-blur-sm p-2 rounded-full">
                    <ProfileSwitch checked={darkMode} />
                    <SunIcon className={cn("text-gray-400", darkMode ? "hidden" : "block")} />
                    <MoonIcon className={cn("text-gray-400", darkMode ? "block" : "hidden")} />
                </div>
            </div>
        </div>
    )
}

