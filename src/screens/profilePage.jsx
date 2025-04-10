import React, { useState, useMemo, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    FormControlLabel,
} from '@mui/material';
import { Check, Notifications, Security, Download, BorderBottom, Edit, AddAPhoto } from '@mui/icons-material';
import useEditorStore from '../globalStore';
import NotePad from "../assets/svgs/notePad";
import { cn } from '../components/cn';
import { ButtonComponent } from '../components/button';
import ProfileSwitch from '../components/switch';
import { InputField } from '../components/inputField';
import BackArrow from '../assets/svgs/backArrow';

const ProfilePage = () => {
    const { darkMode } = useEditorStore();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        gender: 'male',
        phone: '+1 (555) 123-4567',
        twoFactorEnabled: false,
        profilePicture: null,
        notificationsEnabled: true
    });
    const [tempData, setTempData] = useState(profileData);
    const [previewImage, setPreviewImage] = useState('');
    const [edit, setEdit] = useState(true);

    // Handle file selection
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];

            // Update profileData with the selected file
            setProfileData({
                ...profileData,
                profilePicture: selectedFile
            });

            // Create a preview URL
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(event.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    // Handle avatar click to trigger file upload
    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    // Memoize the FormSection component to prevent unnecessary re-renders
    const FormSection = useMemo(() => {
        return ({ title, children }) => (
            <Box className="mb-8 flex flex-col gap-1">
                <Typography className={`mb-4 font-semibold text-lg relative inline-block ${darkMode ? 'text-purple-200' : 'text-blue-700'}`}>
                    {title}
                </Typography>
                <div className={`rounded-xl  overflow-hidden ${darkMode ? 'bg-gray-800/50' : 'bg-white'} shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    {children}
                </div>
            </Box>
        );
    }, [darkMode]);

    function handleEdit() {
        if (!edit) {
            setProfileData(tempData);
        }
        setEdit(!edit);
    }

    // Background pattern elements
    const BackgroundPattern = useMemo(() => {
        return () => (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className={`absolute top-40 left-20 transform rotate-12 opacity-5 ${darkMode ? 'text-purple-400' : 'text-gray-900'}`}>
                    <NotePad className="w-20 h-20" />
                </div>
                <div className={`absolute bottom-40 right-40 transform -rotate-12 opacity-5 ${darkMode ? 'text-purple-400' : 'text-gray-900'}`}>
                    <NotePad className="w-16 h-16" />
                </div>
            </div>
        );
    }, [darkMode]);

    return (
        <Box className={cn(
            "max-h-screen overflow-x-hidden relative scrollbar-none",
            darkMode ? "bg-gradient-to-b from-gray-900 to-gray-800" : "bg-gradient-to-b from-blue-50 to-purple-50"
        )}>
            <BackgroundPattern />

            {/* Main content */}
            <Box className="relative z-10 max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Header with profile name */}
                <Box className={cn(
                    "mb-6 p-4 sm:p-6 rounded-xl shadow-lg flex items-center justify-between",
                    darkMode ? "border border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800" : "border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50"
                )}>
                    <Box className="flex items-center gap-4">
                        <span className={cn('text-white',{
                            'text-black' : !darkMode
                        })}>
                            <BackArrow/>
                        </span>
                        <Typography variant="h5" className={`font-bold ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
                            Profile Settings
                        </Typography>
                    </Box>
                    <Link to={'/texteditor/1'}>
                        <ButtonComponent
                            btnText={'Save Changes'}
                            startIcon={<Check />}
                            darkMode={darkMode}
                        />
                    </Link>
                </Box>

                {/* Main profile content */}
                <Box className="space-y-8">
                    {/* Profile card with avatar */}
                    <Box className={cn(
                        "p-6 rounded-xl shadow-lg relative overflow-hidden",
                        darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
                    )}>
                        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-gradient-to-br from-transparent to-blue-100 dark:to-purple-900/20 -translate-y-1/2 translate-x-1/4"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-gradient-to-tr from-transparent to-purple-100 dark:to-indigo-900/20 translate-y-1/2 -translate-x-1/4"></div>

                        <Box className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                            <Box className="relative h-full">
                                {/* Hidden file input */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />

                                {/* Avatar with click handler */}
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

                                    {/* Overlay on hover */}
                                    <div className={cn(
                                        "absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-80 transition-opacity",
                                        darkMode ? "bg-gray-900" : "bg-blue-900"
                                    )}>
                                        <AddAPhoto className={darkMode ? "text-purple-300" : "text-blue-100"} />
                                    </div>

                                    {/* Text hint */}
                                    <Typography className={cn(
                                        "absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity",
                                        darkMode ? "text-purple-300" : "text-blue-600"
                                    )}>
                                        Change photo
                                    </Typography>
                                </div>
                            </Box>

                            <Box className="flex-1 w-full text-center md:text-left">
                                <Typography variant="h4" className={`font-bold mb-1 ${darkMode ? 'text-purple-100' : 'text-blue-900'}`}>
                                    {profileData.name}
                                </Typography>
                                <Typography className={`pl-1.5 ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}>
                                    {profileData.email}
                                </Typography>

                                <div className="flex flex-wrap gap-3 mt-1 justify-center md:justify-start">
                                    <Box className={cn(
                                        "px-3 py-1 rounded-full text-sm flex items-center",
                                        darkMode ? "bg-purple-900/30 text-purple-300" : "bg-blue-100 text-blue-700"
                                    )}>
                                        <Security fontSize="small" className="mr-1" />
                                        <span className='font-normal'>
                                            {profileData.twoFactorEnabled ? '2FA Enabled' : '2FA Disabled'}
                                        </span>
                                    </Box>
                                    <Box className={cn(
                                        "px-3 py-1 rounded-full text-sm flex items-center",
                                        darkMode ? "bg-indigo-900/30 text-indigo-300" : "bg-indigo-100 text-indigo-700"
                                    )}>
                                        <Notifications fontSize="small" className="mr-1" />
                                        <span className='font-normal'>
                                            {profileData.notificationsEnabled ? 'Notifications On' : 'Notifications Off'}
                                        </span>
                                    </Box>
                                </div>
                            </Box>
                        </Box>
                    </Box>

                    {/* Personal Information */}
                    <FormSection title="Personal Information">
                        <Box className="p-5">
                            <div className='flex justify-end mb-4'>
                                <ButtonComponent
                                    btnText={!edit ? 'Save Changes' : 'Edit'}
                                    startIcon={edit ? <Edit /> : <Check />}
                                    handleClick={handleEdit}
                                    darkMode={darkMode}
                                    styles={{ width: "fit-content" }}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField
                                    disabled={edit}
                                    darkMode={darkMode}
                                    styles={{ '& .MuiInputBase-root': { height: "55px" } }}
                                    label="Full Name"
                                    value={tempData.name}
                                    onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                                />
                                <InputField
                                    disabled={edit}
                                    darkMode={darkMode}
                                    styles={{ '& .MuiInputBase-root': { height: "55px" } }}
                                    label="Email"
                                    value={tempData.email}
                                    onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
                                />
                                <InputField
                                    disabled={edit}
                                    darkMode={darkMode}
                                    styles={{ '& .MuiInputBase-root': { height: "55px" } }}
                                    label="Phone"
                                    value={tempData.phone}
                                    onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
                                />

                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="gender-label" sx={{
                                        color: darkMode ? !edit ? "rgb(233, 213, 255)" : "black" : "#0b6bcb", '&.Mui-focused': {
                                            color: darkMode ? "rgb(233, 213, 255)" : "#0b6bcb"
                                    } }}>Gender</InputLabel>
                                    <Select
                                        disabled={edit}
                                        labelId="gender-label"
                                        value={tempData.gender}
                                        onChange={(e) => setTempData({ ...tempData, gender: e.target.value })}
                                        label="Gender"
                                        sx={{
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: edit ? "none" : "2px solid",
                                                borderColor: darkMode ? edit ? "transparent" : "#6D28D9" : "#0b6bcb",
                                            },
                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                border: edit ? "none" : "2px solid",
                                                borderColor: darkMode ? edit ? "transparent" : "#8B5CF6" : "#1a73e8",
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: edit
                                                    ? 'transparent !important'
                                                    : darkMode
                                                        ? '#4C1D95 !important'
                                                        : '#1557b0 !important'
                                            },
                                            color: edit ? "#000000" : darkMode ? "rgb(233, 213, 255)" : "black",
                                            "& .MuiSelect-icon": {
                                                color: edit ? "#000000" : darkMode ? "rgb(233, 213, 255)" : "#0b6bcb",
                                            },
                                            "& .Mui-disabled": {
                                                WebkitTextFillColor: "#000000 !important",
                                            }
                                            
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    backgroundColor: darkMode ? "#374151" : "white",
                                                    borderRadius: "7px",
                                                    border: darkMode ? "1px solid #4B5563" : "1px solid #D1D5DB",
                                                    mt: "4px",
                                                    color: darkMode ? "rgb(233, 213, 255)" : "black"
                                                },
                                            },
                                            MenuListProps: {
                                                sx: {
                                                    padding: 0,
                                                },
                                            },
                                        }}
                                        className={`rounded-lg ${edit ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : darkMode ? '#374151' : 'bg-white'}`}
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </Box>
                    </FormSection>

                    {/* Security Settings */}
                    <FormSection title="Security Settings">
                        <Box className="p-5">
                            <Box className={cn(
                                "p-4 rounded-lg mb-4 border transition-all duration-300",
                                profileData.twoFactorEnabled
                                    ? darkMode ? "bg-purple-900/20 border-purple-700" : "bg-blue-50 border-blue-200"
                                    : darkMode ? "bg-gray-700/50 border-gray-600" : "bg-gray-50 border-gray-200"
                            )}>
                                <FormControlLabel
                                    control={
                                        <ProfileSwitch
                                            className="mr-2 ml-1"
                                            checked={profileData.twoFactorEnabled}
                                            onChange={() => setProfileData({ ...profileData, twoFactorEnabled: !profileData.twoFactorEnabled })}
                                        />
                                    }
                                    label={
                                        <Box>
                                            <Typography className={`font-medium ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
                                                Two-Factor Authentication
                                            </Typography>
                                            <Typography variant="body2" className={darkMode ? 'text-purple-300' : 'text-blue-600'}>
                                                Add an extra layer of security to protect your account
                                            </Typography>
                                        </Box>
                                    }
                                />

                                {profileData.twoFactorEnabled && (
                                    <Box className={cn(
                                        "mt-4 pt-4 border-t",
                                        darkMode ? "border-purple-700/50" : "border-blue-200"
                                    )}>
                                        <div className={cn(
                                            "p-4 rounded-lg",
                                            darkMode ? "bg-purple-900/20 text-purple-200" : "bg-blue-50 text-blue-700"
                                        )}>
                                            <div className="flex items-center">
                                                <Security className="mr-2" fontSize="small" />
                                                <Typography variant="body2" className="font-medium">
                                                    Two-factor authentication is active
                                                </Typography>
                                            </div>
                                            <Typography variant="body2" className={`mt-2 ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}>
                                                Your account is now protected with an additional layer of security.
                                                Use your authenticator app to generate verification codes when signing in.
                                            </Typography>
                                        </div>
                                    </Box>
                                )}
                            </Box>

                            <Box className={cn(
                                "p-4 rounded-lg border",
                                darkMode ? "bg-gray-700/50 border-gray-600" : "bg-gray-50 border-gray-200"
                            )}>
                                <div className="flex flex-wrap gap-4 items-center justify-between">
                                    <Box>
                                        <Typography className={`font-medium ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
                                            Password
                                        </Typography>
                                        <Typography variant="body2" className={darkMode ? 'text-purple-300' : 'text-blue-600'}>
                                            Last updated 3 months ago
                                        </Typography>
                                    </Box>
                                    <ButtonComponent
                                        btnText={'Change password'}
                                        darkMode={darkMode}
                                        styles={{ width: "fit-content" }}
                                    />
                                </div>
                            </Box>
                        </Box>
                    </FormSection>

                    {/* Notification Settings */}
                    <FormSection title="Notification Preferences">
                        <Box className="p-5">
                            <FormControlLabel
                                control={
                                    <ProfileSwitch
                                        className="mr-2"
                                        checked={profileData.notificationsEnabled}
                                        onChange={() => setProfileData({ ...profileData, notificationsEnabled: !profileData.notificationsEnabled })}
                                    />
                                }
                                label={
                                    <Box>
                                        <Typography className={`font-medium ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
                                            Email Notifications
                                        </Typography>
                                        <Typography variant="body2" className={darkMode ? 'text-purple-300' : 'text-blue-600'}>
                                            Receive updates and security alerts via email
                                        </Typography>
                                    </Box>
                                }
                            />
                        </Box>
                    </FormSection>

                    {/* Data Management */}
                    <FormSection title="Data Management">
                        <Box className="p-5">
                            <div className="flex flex-wrap gap-4 items-center justify-between">
                                <Box>
                                    <Typography className={`font-medium ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
                                        Export Your Data
                                    </Typography>
                                    <Typography variant="body2" className={darkMode ? 'text-purple-300' : 'text-blue-600'}>
                                        Download a copy of your notes and profile information
                                    </Typography>
                                </Box>
                                <ButtonComponent
                                    btnText={'Export Data'}
                                    startIcon={<Download />}
                                    darkMode={darkMode}
                                    styles={{ width: "fit-content" }}
                                />
                            </div>
                        </Box>
                    </FormSection>
                </Box>

                {/* Footer */}
                <Box className="mt-8 pt-6 border-t text-center">
                    <Typography variant="body2" className={darkMode ? "text-gray-400" : "text-gray-500"}>
                        © 2025 NotePad App • <span className="cursor-pointer hover:underline">Terms</span> • <span className="cursor-pointer hover:underline">Privacy</span>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;