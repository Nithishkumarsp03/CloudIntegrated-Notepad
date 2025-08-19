import React, { useState, useMemo, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Avatar,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    FormControlLabel,
    Alert,
} from '@mui/material';
import { Check, Notifications, Security, Edit, AddAPhoto } from '@mui/icons-material';
import useEditorStore from '../store/globalStore';
import NotePad from "../assets/svgs/notePad";
import { cn } from '../components/cn';
import { ButtonComponent } from '../components/button';
import ProfileSwitch from '../components/switch';
import { InputField } from '../components/inputField';
import BackArrow from '../assets/svgs/backArrow';
import { SunIcon } from '../assets/svgs/sun';
import { MoonIcon } from '../assets/svgs/moon';

const ProfilePage = () => {
    const { darkMode, setDarkMode, data } = useEditorStore();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        gender: 'male',
        phone: '+1 (555) 123-4567',
        twoFactorEnabled: false,
        profilePicture: null,
        notificationsEnabled: true,
        password: 'demo123'
    });
    const [tempData, setTempData] = useState(profileData);
    const [previewImage, setPreviewImage] = useState('');
    const [edit, setEdit] = useState(true);

    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: ''
    });
    const [passwordMessage, setPasswordMessage] = useState({
        type: '', 
        text: ''
    });

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];

            setProfileData({
                ...profileData,
                profilePicture: selectedFile
            });

            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(event.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

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

    const handleBack = () => {
        navigate(-1);
    }

    const handleSave = () => {
        navigate('/onBoarding-flow')
    };

    const togglePasswordFields = () => {
        setShowPasswordFields(!showPasswordFields);
        setPasswordMessage({ type: '', text: '' });
        setPasswordData({ oldPassword: '', newPassword: '' });
    };

    const handlePasswordChange = () => {
        if (passwordData.oldPassword === profileData.password) {
            setProfileData({
                ...profileData,
                password: passwordData.newPassword
            });

            setPasswordMessage({
                type: 'success',
                text: 'Password updated successfully!'
            });

            setPasswordData({ oldPassword: '', newPassword: '' });

            setTimeout(() => {
                setShowPasswordFields(false);
                setPasswordMessage({ type: '', text: '' });
            }, 3000);
        } else {
            setPasswordMessage({
                type: 'error',
                text: 'Current password is incorrect. Please try again.'
            });
        }
    };

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
            "max-h-screen overflow-x-hidden relative scrollbar-none pt-16 lg:pt-0",
            darkMode ? "bg-gradient-to-b from-gray-900 to-gray-800" : "bg-gradient-to-b from-blue-50 to-purple-50"
        )}>
            <div className="absolute top-4 right-4 z-20 cursor-pointer" onClick={setDarkMode} >
                <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm p-2 rounded-full">
                    <ProfileSwitch
                        checked={darkMode}
                    />
                    <SunIcon className={cn("text-gray-400", darkMode ? "hidden" : "block")} />
                    <MoonIcon className={cn("text-gray-400", darkMode ? "block" : "hidden")} />
                </div>
            </div>
            <BackgroundPattern />


            <Box className="relative z-10 max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <Box className={cn(
                    "mb-6 p-4 sm:p-6 rounded-xl shadow-lg flex items-center justify-between",
                    darkMode ? "border border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800" : "border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50"
                )}>
                    <Box className="flex items-center gap-4">
                        <span className={cn('text-white cursor-pointer', {
                            'text-black': !darkMode
                        })} onClick={handleBack}>
                            <BackArrow />
                        </span>
                        <Typography variant="h5" className={`font-bold ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
                            Profile Settings
                        </Typography>
                    </Box>
                        <ButtonComponent
                        btnText={'Save Changes'}
                        startIcon={<Check />}
                        styles={{width:"fit-content"}}
                        darkMode={darkMode} 
                        handleClick={handleSave}
                        />
                </Box>


                <Box className="space-y-8">

                    <Box className={cn(
                        "p-6 rounded-xl shadow-lg relative overflow-hidden",
                        darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
                    )}>
                        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-gradient-to-br from-transparent to-blue-100 dark:to-purple-900/20 -translate-y-1/2 translate-x-1/4"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-gradient-to-tr from-transparent to-purple-100 dark:to-indigo-900/20 translate-y-1/2 -translate-x-1/4"></div>

                        <Box className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                            <Box className="relative h-full">

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
                                    <InputLabel
                                        id="gender-label"
                                        sx={{
                                            color: edit
                                                ? (darkMode ? "#ffffff" : "#000000")
                                                : (darkMode ? "rgb(233, 213, 255)" : "#0b6bcb"),
                                            '&.Mui-focused': {
                                                color: darkMode ? "rgb(233, 213, 255)" : "#0b6bcb"
                                            },
                                            '&.Mui-disabled': {
                                                color: darkMode ? "#ffffff !important" : "#000000 !important"
                                            }
                                        }}
                                    >
                                        Gender
                                    </InputLabel>

                                    <Select
                                        disabled={edit}
                                        labelId="gender-label"
                                        value={tempData.gender}
                                        onChange={(e) => setTempData({ ...tempData, gender: e.target.value })}
                                        label="Gender"
                                        sx={{
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: edit ? 'none' : '2px solid',
                                                borderColor: edit
                                                    ? 'transparent'
                                                    : darkMode
                                                        ? '#6D28D9'
                                                        : '#0b6bcb',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                border: edit ? 'none' : '2px solid',
                                                borderColor: edit
                                                    ? 'transparent'
                                                    : darkMode
                                                        ? '#8B5CF6'
                                                        : '#1a73e8',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: edit
                                                    ? 'transparent !important'
                                                    : darkMode
                                                        ? '#4C1D95 !important'
                                                        : '#1557b0 !important'
                                            },
                                            color: edit
                                                ? (darkMode ? "rgb(233, 213, 255)" : "#000000")
                                                : (darkMode ? "rgb(233, 213, 255)" : "black"),
                                            '& .MuiSelect-icon': {
                                                color: edit
                                                    ? (darkMode ? "rgb(233, 213, 255)" : "#000000")
                                                    : (darkMode ? "rgb(233, 213, 255)" : "#0b6bcb"),
                                            },
                                            '&.Mui-disabled': {
                                                WebkitTextFillColor: darkMode ? "rgb(233, 213, 255) !important" : "#000000 !important",
                                                color: darkMode ? "rgb(233, 213, 255) !important" : "#000000 !important",
                                            },
                                            '& .MuiSelect-select.Mui-disabled': {
                                                color: darkMode ? 'rgb(233, 213, 255) !important' : '#000000 !important',
                                                WebkitTextFillColor: darkMode ? 'rgb(233, 213, 255) !important' : '#000000 !important',
                                                opacity: 1,
                                            },
                                            '& .MuiInputBase-input.Mui-disabled': {
                                                color: darkMode ? 'rgb(233, 213, 255) !important' : '#000000 !important',
                                                WebkitTextFillColor: darkMode ? 'rgb(233, 213, 255) !important' : '#000000 !important',
                                                opacity: 1,
                                            },
                                            '&.Mui-disabled': {
                                                color: darkMode ? 'rgb(233, 213, 255) !important' : '#000000 !important',
                                                WebkitTextFillColor: darkMode ? 'rgb(233, 213, 255) !important' : '#000000 !important',
                                            },
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
                                        className={`rounded-lg ${edit ? (darkMode ? 'bg-gray-700' : 'bg-gray-200') : (darkMode ? 'bg-gray-800' : 'bg-white')}`}
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="other">Rather not say</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </Box>
                    </FormSection>


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
                                        btnText={showPasswordFields ? 'Cancel' : 'Change password'}
                                        darkMode={darkMode}
                                        styles={{ width: "fit-content" }}
                                        handleClick={togglePasswordFields}
                                    />
                                </div>


                                {showPasswordFields && (
                                    <Box className={cn(
                                        "mt-4 pt-4 border-t",
                                        darkMode ? "border-gray-600" : "border-gray-200"
                                    )}>

                                        {passwordMessage.type && (
                                            <Alert
                                                severity={passwordMessage.type}
                                                className="mb-4"
                                                sx={{
                                                    backgroundColor: darkMode
                                                        ? passwordMessage.type === 'success' && 'rgba(46, 125, 50, 0.2)'
                                                        : passwordMessage.type === 'success' && 'rgba(237, 247, 237, 1)',
                                                    color: darkMode
                                                        ? passwordMessage.type === 'success' && '#81c784' 
                                                        : passwordMessage.type === 'success' && '#2e7d32' 
                                                }}
                                            >
                                                {passwordMessage.text}
                                            </Alert>
                                        )}

                                        <div className="grid grid-cols-1 gap-4">
                                            <InputField
                                                darkMode={darkMode}
                                                styles={{ '& .MuiInputBase-root': { height: "40px" } }}
                                                label="Current Password"
                                                type="password"
                                                value={passwordData.oldPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                                            />
                                            <InputField
                                                darkMode={darkMode}
                                                styles={{ '& .MuiInputBase-root': { height: "40px" } }}
                                                label="New Password"
                                                type="password"
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                            />

                                            <div className="flex flex-wrap justify-between items-center gap-4 mt-2">
                                                <Link to='/forgotPassword'>
                                                <Typography
                                                    variant="body2"
                                                    className={`cursor-pointer hover:underline ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}
                                                >
                                                    Forgot Password?
                                                </Typography>
                                                </Link>
                                                <ButtonComponent
                                                    btnText="Update Password"
                                                    darkMode={darkMode}
                                                    styles={{ width: "fit-content" }}
                                                    handleClick={handlePasswordChange}
                                                    disabled={!passwordData.oldPassword || !passwordData.newPassword}
                                                />
                                            </div>
                                        </div>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </FormSection>


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
                    {/* <FormSection title="Data Management">
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
                    */}
                </Box>

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