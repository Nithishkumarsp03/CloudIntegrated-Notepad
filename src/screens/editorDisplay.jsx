import React, { useState } from 'react';
import {
    ProfileSwitch
} from '../components';
import useEditorStore from '../store/globalStore';

export const ShareNote = () => {
    const [editorContent, setEditorContent] = useState('<p>Demo content</p>');
    const darkMode = useEditorStore(state => state.darkMode);
    const setDarkMode = useEditorStore(state => state.setDarkMode);

    return (
        <div className='dark:bg-gray-900 bg-gray-50 min-h-screen'>
            <div className="py-8 px-4 h-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className='text-2xl font-bold  dark:text-white text-gray-800'>
                        Shared Note
                    </h1>
                    <ProfileSwitch checked={darkMode} onChange={setDarkMode} />
                </div>

                <div className='border rounded-lg p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white border-gray-200 bg-white text-gray-800'>
                    <div
                        className='prose max-w-none break-words dark:dark:prose-invert'
                        dangerouslySetInnerHTML={{ __html: editorContent }}
                    />
                    {!editorContent && (
                        <p className='italic dark:text-gray-400 text-gray-500'>
                            No content to display.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};