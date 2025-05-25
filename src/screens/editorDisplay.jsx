import React, { useState, useEffect } from 'react';
import Texteditor from '../components/editor';
import { ButtonComponent } from '../components/button';
import {
    ProfileSwitch
 } from '../components';
import useEditorStore from '../store/globalStore';

const TextEditorDisplay = () => {
    const [editorContent, setEditorContent] = useState('<p>Demo content</p>');
    const [isEditing, setIsEditing] = useState(false);
    const { darkMode, setDarkMode } = useEditorStore();

    const handleContentChange = (newContent) => {
        setEditorContent(newContent);
    };

    useEffect(() => {

        if (typeof window !== 'undefined') {
            const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            setDarkMode(isDarkMode);

            const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleDarkModeChange = (e) => setDarkMode(e.matches);
            darkModeMediaQuery.addEventListener('change', handleDarkModeChange);

            return () => {
                darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
            };
        }
    }, []);

    const noScrollbarStyles = {
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
    };

    return (
        <div
            className={`${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} min-h-screen`}
            style={noScrollbarStyles}
        >
            <style jsx global>{`
                /* Hide scrollbar for Chrome, Safari and Opera */
                ::-webkit-scrollbar {
                    display: none;
                }
                
                /* Hide scrollbar for IE, Edge and Firefox */
                * {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
            <div className="py-8 px-4 h-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        Text Editor Content
                    </h1>
                    <div className="flex items-center gap-4">
                        <ProfileSwitch checked={darkMode} onChange={() => setDarkMode()} />
                        <ButtonComponent
                            handleClick={() => setIsEditing(!isEditing)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            {isEditing ? 'View Content' : 'Edit Content'}
                        </ButtonComponent>
                    </div>
                </div>

                {isEditing ? (
                    <div className='h-full'>
                        <Texteditor
                            content={editorContent}
                            onChange={handleContentChange}
                        />
                    </div>
                ) : (
                    <div
                        className={`border rounded-lg p-6 shadow-sm overflow-y-auto ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-200 bg-white text-gray-800'}`}
                        style={noScrollbarStyles}
                    >
                        <div
                            className="prose max-w-none dark:prose-invert break-words"
                            dangerouslySetInnerHTML={{ __html: editorContent }}
                        />
                        {!editorContent && (
                            <p className={`italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                No content to display. Click "Edit Content" to start writing.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextEditorDisplay;