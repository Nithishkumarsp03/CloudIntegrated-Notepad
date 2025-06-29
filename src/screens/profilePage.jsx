import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import useEditorStore from '../store/globalStore';
import { useLoginStore } from '../store/loginStore';
import { BackgroundPattern, ButtonComponent, cn, LoginSwitch, PersonalSection, ProfileCard, ProfileHeader, SecuritySection, Snackbar } from '../components';
import { AccountManagementSection, NotificationSection } from '../components/profilePage';
import { Check } from '@mui/icons-material';

const ProfilePage = () => {
    const { darkMode, setDarkMode } = useEditorStore();
    const { twoFa, onChange, notification, userName, email, gender, password, loginId } = useLoginStore();
    const navigate = useNavigate();
    const [tempTwoFa, setTempTwoFa] = useState(twoFa);
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState('');
    const [edit, setEdit] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const updateProfile = useLoginStore(e => e.updateProfile);
    const isProfileLoading = useLoginStore(e => e.loaders.isProfileLoading);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarVariant, setSnackbarVariant] = useState('info');

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
        const requiredFields = {
            userName: userName?.trim(),
            email: email?.trim(),
            password: password?.trim(),
            loginId: loginId
        };

        const missingFields = [];
        if (!requiredFields.userName) missingFields.push('Name');
        if (!requiredFields.email) missingFields.push('Email');
        if (!requiredFields.password) missingFields.push('Password');
        if (!requiredFields.loginId) missingFields.push('Login ID');

        if (missingFields.length > 0) {
            setSnackbarMessage(`Please fill in the following required fields: ${missingFields.join(', ')}`);
            setSnackbarVariant('error');
            setSnackbarOpen(true);
            return;
        }
                const response = await updateProfile(
                    requiredFields.userName,
                    requiredFields.email,
                    tempTwoFa,
                    requiredFields.password,
                    requiredFields.loginId
        );
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
        localStorage.clear();
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
            <LoginSwitch setDarkMode={setDarkMode} darkMode={darkMode} />
            <BackgroundPattern darkMode={darkMode} />

            <Box className="relative z-10 max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <Box className="relative z-30 mb-6">
                    <ProfileHeader
                        isProfileLoading={isProfileLoading}
                        darkMode={darkMode}
                        handleBack={handleBack}
                        handleSave={handleSave}
                    />
                </Box>

                <Box className="relative z-20 space-y-8">
                    <Box className="relative z-10">
                        <ProfileCard
                            darkMode={darkMode}
                            twoFa={twoFa}
                            notification={notification}
                            previewImage={previewImage}
                            fileInputRef={fileInputRef}
                        />
                    </Box>

                    <Box className="relative z-10">
                        <PersonalSection
                            darkMode={darkMode}
                            edit={edit}
                            handleEdit={handleEdit}
                            handleProfileChange={handleProfileChange}
                        />
                    </Box>

                    <Box className="relative z-10">
                        <SecuritySection
                            edit={showPassword}
                            setEdit={() => setShowPassword(!showPassword)}
                            darkMode={darkMode}
                            twoFa={JSON.parse(tempTwoFa)}
                            handleTwoFa={handleTwoFa}
                        />
                    </Box>

                    <Box className="relative z-10">
                        <NotificationSection
                            darkMode={darkMode}
                            notification={notification}
                            onChange={onChange}
                        />
                    </Box>

                    <Box className="relative z-10">
                        <AccountManagementSection
                            darkMode={darkMode}
                            handleLogout={handleLogout}
                        />
                    </Box>
                </Box>

                {/* Mobile Save Button */}
                <Box className='md:hidden block pt-5 text-end relative z-20'>
                    <ButtonComponent
                        type='button'
                        btnText={'Save Changes'}
                        startIcon={<Check />}
                        styles={{ width: "fit-content" }}
                        darkMode={darkMode}
                        onClick={handleSave}
                    />
                </Box>

                {/* Footer */}
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