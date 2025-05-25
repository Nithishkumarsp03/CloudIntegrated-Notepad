import React from 'react';

export const EmptyStateIcon = () => {
    return (
        <svg
            className="w-24 h-24 mx-auto mb-4 text-blue-500 dark:text-purple-400 drop-shadow-md"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="20" y="10" width="60" height="80" rx="4" fill="currentColor" fillOpacity="0.1" />
            <rect x="30" y="25" width="40" height="3" rx="1.5" fill="currentColor" />
            <rect x="30" y="35" width="30" height="3" rx="1.5" fill="currentColor" />
            <rect x="30" y="45" width="35" height="3" rx="1.5" fill="currentColor" />
            <rect x="30" y="55" width="25" height="3" rx="1.5" fill="currentColor" />
            <path d="M75 72.5C75 79.4036 69.4036 85 62.5 85C55.5964 85 50 79.4036 50 72.5C50 65.5964 55.5964 60 62.5 60C69.4036 60 75 65.5964 75 72.5Z" fill="currentColor" fillOpacity="0.2" />
            <path d="M63 67V78M57.5 72.5H68.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
};

