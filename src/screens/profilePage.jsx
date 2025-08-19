import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import { useLoginStore } from '../store/loginStore';
import { BackgroundPattern, ButtonComponent, cn, LoginSwitch, PersonalSection, ProfileCard, ProfileHeader, SecuritySection, Snackbar } from '../components';
import { AccountManagementSection, NotificationSection } from '../components/profilePage';
import { Check } from '@mui/icons-material';
import useEditorStore from '../store/globalStore';
import secureLocalStorage from 'react-secure-storage';

const ProfilePage = () => {
    
    const twoFa = useLoginStore(state => state.twoFa);
    const onChange = useLoginStore(state => state.onChange);
    const notification = useLoginStore(state => state.notification);
    const userName = useLoginStore(state => state.userName);
    const email = useLoginStore(state => state.email);
    const loginId = useLoginStore(state => state.loginId);
    const updateProfile = useLoginStore(state => state.updateProfile);
    const darkMode = useEditorStore(state => state.darkMode);

    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [edit, setEdit] = useState(true);
    const [tempTwoFa, setTempTwoFa] = useState(twoFa);
    const [previewImage, setPreviewImage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarVariant, setSnackbarVariant] = useState('info');
    const [loading, setLoading] = useState(false);

    function handleProfileChange(e) {
        const { name, value } = e.target;
        onChange(name, value);
    }

    function handleEdit() {
        setEdit(!edit);
    }

    const handleBack = () => {
        navigate(-1);
    };

    const handleSave = async () => {
        setLoading(true);
                const response = await updateProfile(
                    userName,
                    email,
                    tempTwoFa,
                    loginId
        );
        setLoading(false)
        if (response.state) {
            setSnackbarMessage('Profile updated successfully!');
            setSnackbarVariant('success');
        }
        else {
            setSnackbarMessage('Failed to update profile. Please try again.');
            setSnackbarVariant('error');
        }
        setSnackbarOpen(true);
    };

    function handleTwoFa() {
        setTempTwoFa(!tempTwoFa);
    }

    const handleLogout = () => {
        secureLocalStorage.clear();
        navigate('/login');
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box className={cn(
            "max-h-screen overflow-x-hidden relative scrollbar-none pt-16 lg:pt-0",
            darkMode ? "bg-gradient-to-b from-gray-900 to-gray-800" : "bg-gradient-to-b from-blue-50 to-purple-50"
        )}>
            <Snackbar
                message={snackbarMessage}
                variant={snackbarVariant}
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                autoHideDuration={6000}
                vertical="top"
                horizontal="center"
            />
            <LoginSwitch />
            <BackgroundPattern />

            <Box className="relative z-10 max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <Box className="relative z-30 mb-6">
                    <ProfileHeader
                        loading={loading}
                        handleBack={handleBack}
                        handleSave={handleSave}
                    />
                </Box>

                <Box className="relative z-20 space-y-8">
                    <Box className="relative z-10">
                        <ProfileCard
                            twoFa={twoFa}
                            notification={notification}
                            previewImage={previewImage}
                            fileInputRef={fileInputRef}
                        />
                    </Box>

                    <Box className="relative z-10">
                        <PersonalSection
                            edit={edit}
                            handleEdit={handleEdit}
                            handleProfileChange={handleProfileChange}
                        />
                    </Box>

                    <Box className="relative z-10">
                        <SecuritySection
                            edit={showPassword}
                            setEdit={() => setShowPassword(!showPassword)}
                            handleTwoFa={handleTwoFa}
                            tempTwoFa={JSON.parse(tempTwoFa)}
                            setTempTwoFa={(e) => setTempTwoFa(e)}
                        />
                    </Box>

                    <Box className="relative z-10">
                        <NotificationSection
                            notification={notification}
                            onChange={onChange}
                        />
                    </Box>

                    <Box className="relative z-10">
                        <AccountManagementSection
                            handleLogout={handleLogout}
                        />
                    </Box>
                </Box>

                <Box className='md:hidden block pt-5 text-end relative z-20'>
                    <ButtonComponent
                        type='button'
                        btnText={'Save Changes'}
                        startIcon={<Check />}
                        styles={{ width: "fit-content" }}
                        onClick={handleSave}
                    />
                </Box>

                <Box className="mt-2 md:mt-8 text-center relative z-10">
                    <Typography variant="caption" className={darkMode ? "text-gray-400" : "text-gray-500"}>
                        © 2025 NotePad App • <span className="cursor-pointer hover:underline">Terms</span> • <span className="cursor-pointer hover:underline">Privacy</span>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;