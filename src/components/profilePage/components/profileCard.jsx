import React, { useEffect } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { Security, Notifications, AddAPhoto } from '@mui/icons-material';
import { cn } from '../../../components';
import { useLoginStore } from '../../../store/loginStore';

export const ProfileCard = ({
    darkMode,
    fileInputRef,
}) => {

    const { twoFa, notification, userName, email } = useLoginStore();
    
    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };
    return (
        <Box className={cn(
            "p-6 rounded-xl shadow-lg z-10 relative",
            darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
        )}>
            <div className="absolute z-10 top-0 right-0 w-48 h-48 rounded-full bg-gradient-to-br from-transparent to-blue-100 dark:to-purple-900/20 -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-gradient-to-tr from-transparent to-purple-100 dark:to-indigo-900/20 translate-y-1/2 -translate-x-1/4"></div>

            <Box className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-wrap whitespace-pre-wrap">
                {/* <Box className="relative h-full">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />

                    <div className="relative cursor-pointer group" onClick={handleAvatarClick}>
                        <Avatar
                            src={previewImage}
                            sx={{ height: "100px", width: "100px" }}
                            className={cn(
                                'border-2',
                                darkMode
                                    ? "bg-gray-700 border-purple-500 shadow-lg shadow-purple-900/20"
                                    : "bg-blue-50 border-blue-400 shadow-lg shadow-blue-200/30"
                            )}
                        />

                        <div className={cn(
                            "absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-80 transition-opacity",
                            darkMode ? "bg-gray-900" : "bg-blue-900"
                        )}>
                            <AddAPhoto className={darkMode ? "text-purple-300" : "text-blue-100"} />
                        </div>

                        <Typography className={cn(
                            "absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity",
                            darkMode ? "text-purple-300" : "text-blue-600"
                        )}>
                            Change photo
                        </Typography>
                    </div>
                </Box> */}

                <Box className="flex-1 w-full text-center md:text-left">
                    <p className={`font-medium pl-[4.5px] text-lg w-full mb-1 break-words whitespace-normal ${darkMode ? 'text-purple-100' : 'text-blue-900'}`}>
                        {userName}
                    </p>

                    <Typography className={`pl-1.5 ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}>
                        {email}
                    </Typography>

                    <div className="flex flex-wrap gap-3 mt-1 justify-center md:justify-start">
                        <Box className={cn(
                            "px-3 py-1 rounded-full text-sm flex items-center",
                            darkMode ? "bg-purple-900/30 text-purple-300" : "bg-blue-100 text-blue-700"
                        )}>
                            <Security fontSize="small" className="mr-1" />
                            <span className='font-normal'>
                                {twoFa ? '2FA Enabled' : '2FA Disabled'}
                            </span>
                        </Box>
                        <Box className={cn(
                            "px-3 py-1 rounded-full text-sm flex items-center",
                            darkMode ? "bg-indigo-900/30 text-indigo-300" : "bg-indigo-100 text-indigo-700"
                        )}>
                            <Notifications fontSize="small" className="mr-1" />
                            <span className='font-normal'>
                                {notification ? 'Notifications On' : 'Notifications Off'}
                            </span>
                        </Box>
                    </div>
                </Box>
            </Box>
        </Box>
    );
};
