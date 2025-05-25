import { ProfileSwitch } from '../../switch';
import { SunIcon } from '../../../assets';
import { MoonIcon } from '../../../assets';
import { cn } from '../../cn';

export const ThemeToggle = ({ darkMode, setDarkMode }) => {
    return (
        <div className="absolute top-4 right-4 z-20 cursor-pointer" onClick={setDarkMode}>
            <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm p-2 rounded-full">
                <ProfileSwitch checked={darkMode} />
                <SunIcon className={cn("text-gray-400", darkMode ? "hidden" : "block")} />
                <MoonIcon className={cn("text-gray-400", darkMode ? "block" : "hidden")} />
            </div>
        </div>
    );
};