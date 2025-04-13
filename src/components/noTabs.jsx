import React from "react";
import useEditorStore from "../globalStore";

const NoTabsFound = () => {

    const { search } = useEditorStore();

    return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="w-20 h-20 mb-5 flex items-center justify-center rounded-full bg-blue-50 dark:bg-gray-800">
                <svg
                    className="w-10 h-10 text-blue-500 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                </svg>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                No Notes Found
            </h2>
        </div>
    );
};

export default NoTabsFound;