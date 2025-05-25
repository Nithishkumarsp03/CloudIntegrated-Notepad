import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import useEditorStore from '../store/globalStore';
import { useLoginStore } from '../store/loginStore';
import { BackgroundPattern, cn, LoginSwitch, PersonalSection, ProfileCard, ProfileHeader, SecuritySection } from '../components';
import { AccountManagementSection, NotificationSection } from '../components/profilePage';

const ProfilePage = () => {
    const { darkMode, setDarkMode } = useEditorStore();
    const { twoFa, onChange, notification, userName, email, gender, phone, profilePicture } = useLoginStore();    
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [profileData, setProfileData] = useState({
        userName: userName,
        email: email,
        gender: gender === "M" ? "male" : "" || gender === "F" ? "female" : "" || "Rather not say",
        phone: phone,
        profilePicture: profilePicture,
        notificationsEnabled: notification,
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
            onChange("profilePicture", selectedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(event.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    function handleProfileChange(e) {
        const { name, value } = e.target;
        onChange(name, value);
        setTempData(p => ({ ...p, [name]: value }));
    }

    function handleEdit() {
        if (!edit) {
            setProfileData(tempData);
        }
        setEdit(!edit);
    }

    const handleBack = () => {
        navigate(-1);
    };

    const handleSave = () => {
        console.log("save clicked")
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
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

    return (
        <Box className={cn(
            "max-h-screen overflow-x-hidden relative scrollbar-none pt-16 lg:pt-0",
            darkMode ? "bg-gradient-to-b from-gray-900 to-gray-800" : "bg-gradient-to-b from-blue-50 to-purple-50"
        )}>
             <LoginSwitch setDarkMode={setDarkMode} darkMode={darkMode} />
            <BackgroundPattern darkMode={darkMode} />

            <Box className="relative z-10 max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <ProfileHeader
                    darkMode={darkMode}
                    handleBack={handleBack}
                    handleSave={handleSave}
                />

                <Box className="space-y-8">
                    <ProfileCard
                        darkMode={darkMode}
                        profileData={profileData}
                        twoFa={twoFa}
                        notification={notification}
                        previewImage={previewImage}
                        fileInputRef={fileInputRef}
                        handleFileChange={handleFileChange}
                    />

                    <PersonalSection
                        darkMode={darkMode}
                        edit={edit}
                        handleEdit={handleEdit}
                        tempData={tempData}
                        handleProfileChange={handleProfileChange}
                    />

                    <SecuritySection
                        darkMode={darkMode}
                        twoFa={JSON.parse(twoFa)}
                        onChange={onChange}
                        showPasswordFields={showPasswordFields}
                        togglePasswordFields={togglePasswordFields}
                        passwordMessage={passwordMessage}
                        passwordData={passwordData}
                        setPasswordData={setPasswordData}
                        handlePasswordChange={handlePasswordChange}
                    />

                    <NotificationSection
                        darkMode={darkMode}
                        notification={notification}
                        onChange={onChange}
                    />

                    <AccountManagementSection
                        darkMode={darkMode}
                        handleLogout={handleLogout}
                    />
                </Box>

                <Box className="mt-6 md:mt-8 text-center">
                    <Typography variant="caption" className={darkMode ? "text-gray-400" : "text-gray-500"}>
                        © 2025 NotePad App • <span className="cursor-pointer hover:underline">Terms</span> • <span className="cursor-pointer hover:underline">Privacy</span>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;
