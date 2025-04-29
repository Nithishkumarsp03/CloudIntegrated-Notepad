import React from 'react'
import useEditorStore from '../../../store/globalStore';
import { cn } from '../../cn';

const MobileHeader = ({ setLocalSearch, localSearch }) => {
    return (
        <div>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">My Notes</h3>
                <button
                    onClick={() => useEditorStore.setState({ isSidebarOpen: true })}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600 dark:text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="px-4 pt-4 pb-6 md:hidden">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        className={cn(
                            "block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg",
                            "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200",
                            "focus:outline-none focus:ring-[0.5px] focus:ring-blue-500 focus:border-blue-500",
                            "dark:focus:ring-purple-500 dark:focus:border-purple-500",
                            "placeholder-gray-400 dark:placeholder-gray-500 text-sm md:"
                        )}
                    />
                    {localSearch && (
                        <button
                            onClick={() => setLocalSearch("")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <svg
                                className="h-4 w-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
export default MobileHeader;
