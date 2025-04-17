import React from "react";

const NoTabsFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <svg
                className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>

            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No Tabs Found!
            </h2>

            <p className="text-gray-500 dark:text-gray-400 font-normal">
                Try adjusting your search or creating a new tab.
            </p>
        </div>
    );
};

export default NoTabsFound;