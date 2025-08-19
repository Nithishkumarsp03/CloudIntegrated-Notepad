import React from 'react';
import { cn } from '../../cn';

export const InfoBox = () => {
    return (
        <div className="mt-12 px-4">
            <div className={cn(
                "flex items-center p-4 rounded-lg border",
                "bg-blue-50/80 border-blue-100 dark:bg-gray-700/50 dark:border-purple-900/50 backdrop-blur-sm"
            )}>
                <div className="flex-shrink-0 mr-3">
                    <svg className="w-5 h-5 text-blue-500 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                </div>
                <p className="text-sm text-blue-700 dark:text-purple-200">
                    Your notes are saved automatically as you type. Create a note to start writing.
                </p>
            </div>
        </div>
    );
};


