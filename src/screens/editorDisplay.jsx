import React, { useState, useEffect } from 'react';
import {
    NoData,
    ProfileSwitch
} from '../components';
import useEditorStore from '../store/globalStore';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { useTextEditorStore } from '../store/textEditorStore';
import { logo } from '../assets';

export const ShareNote = () => {
    const params = useParams();
    const [noteData, setNoteData] = useState(null);
    const [loading, setLoading] = useState(true);
    const darkMode = useEditorStore(state => state.darkMode);
    const setDarkMode = useEditorStore(state => state.setDarkMode);
    const shareNote = useTextEditorStore(state => state.getShareNote);


    useEffect(() => {
        async function getNote() {
            const response = await shareNote(params.id);
            setNoteData(response.response.data);
            setLoading(false);
        }
        getNote();
    }, []);

    return (
        <div className='min-h-screen relative'>
            <div className='absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
                <div className='absolute inset-0 opacity-90 dark:opacity-40'>
                    <div className='absolute inset-0' style={{
                        backgroundImage: `
                            linear-gradient(rgba(156, 163, 175, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(156, 163, 175, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>
            </div>

            <div className="relative z-10 py-8 px-4 h-full">
                <div className="flex gap-4 justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <img src={logo} className="h-[50px]  md:h-[72px]" />
                        <span className="text-[25px] font-semibold font-mono dark:text-white text-gray-800 hidden sm:block">SPNotz</span>
                    </div>
                    <div className='flex items-center gap-4'>
                    <h1 className='text-2xl font-bold md:ml-[-150px] font-mono dark:text-white text-gray-800 drop-shadow-sm'>
                        Shared Note
                    </h1>
                        <ProfileSwitch checked={darkMode} onChange={setDarkMode} />
                    </div>
                </div>

                {loading ? (
                    <div className='border rounded-lg p-8 shadow-md dark:border-gray-700 dark:bg-gray-800/95 border-gray-200 bg-white/95 backdrop-blur-sm'>
                        <div className='mb-6 border-b pb-4 dark:border-gray-700 border-gray-200'>
                            <Skeleton
                                variant="text"
                                width={200}
                                height={32}
                                animation="wave"
                                sx={{
                                    bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                    mb: 1
                                }}
                            />
                            <Skeleton
                                variant="text"
                                width={120}
                                height={20}
                                animation="wave"
                                sx={{
                                    bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                                }}
                            />
                        </div>

                        <div className='space-y-3'>
                            <Skeleton
                                variant="text"
                                width="100%"
                                height={20}
                                animation="wave"
                                sx={{ bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}
                            />
                            <Skeleton
                                variant="text"
                                width="90%"
                                height={20}
                                animation="wave"
                                sx={{ bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}
                            />
                            <Skeleton
                                variant="text"
                                width="85%"
                                height={20}
                                animation="wave"
                                sx={{ bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}
                            />
                            <Skeleton
                                variant="text"
                                width="95%"
                                height={20}
                                animation="wave"
                                sx={{ bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}
                            />
                            <Skeleton
                                variant="text"
                                width="70%"
                                height={20}
                                animation="wave"
                                sx={{ bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}
                            />
                        </div>
                    </div>
                ) : noteData ? (
                    <div className='border rounded-lg p-8 shadow-md dark:border-gray-700 dark:bg-gray-900/50 dark:text-white border-gray-200 bg-white/95 text-gray-800 backdrop-blur-sm'>
                        <div className='mb-6 border-b pb-4 dark:border-gray-700 border-gray-200'>
                            <h2 className='text-xl font-semibold mb-2 dark:text-white text-gray-800'>
                                {noteData.note_name}
                            </h2>
                            <p className='text-sm font-mono dark:text-gray-400 text-gray-600'>
                                By: {noteData.user_name}
                            </p>
                        </div>

                        <div
                            className='prose max-w-none break-words dark:prose-invert'
                            dangerouslySetInnerHTML={{ __html: noteData.notes }}
                        />

                        {!noteData && (
                                <div className='border rounded-lg p-8 text-center flex flex-col gap-4 shadow-md dark:border-gray-700 dark:bg-gray-800/95 dark:text-white border-gray-200 bg-white/95 text-gray-800 backdrop-blur-sm'>
                                    <div className='flex justify-center'>
                                        <NoData />
                                    </div>
                                    <p className='italic dark:text-gray-400 text-gray-500'>
                                        No notes found.
                                    </p>
                                </div>
                        )}
                    </div>
                ) : (
                    <div className='border rounded-lg p-8 text-center flex flex-col gap-4 shadow-md dark:border-gray-700 dark:bg-gray-800/95 dark:text-white border-gray-200 bg-white/95 text-gray-800 backdrop-blur-sm'>
                                <div className='flex justify-center'>    
                                    <NoData />
                                    </div>
                                <p className='italic dark:text-gray-400 text-gray-500'>
                            No notes found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};