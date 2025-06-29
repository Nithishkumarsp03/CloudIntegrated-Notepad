import React, { useState } from 'react';
import { Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Edit, Check } from '@mui/icons-material';
import { InputField, ButtonComponent } from '../../../components';
import FormSection from './formSection';
import { useLoginStore } from '../../../store/loginStore';

export const PersonalSection = ({ darkMode, edit, handleEdit }) => {
    const textStyles = `pl-0.5 !text-sm ${darkMode ? 'text-purple-200' : 'text-black'}`;
    const { notification, userName, email, gender, phone, profilePicture, onChange } = useLoginStore();
    const [profileData, setProfileData] = useState({
        userName: userName,
        email: email,
        gender: gender === "M" ? "male" : gender === "F" ? "female" : "other",
        phone: phone,
        profilePicture: profilePicture,
        notificationsEnabled: notification,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        onChange("userName", profileData.userName);
        onChange("email", profileData.email);
        onChange("gender", profileData.gender === "male" ? "M" : profileData.gender === "female" ? "F" : "O");
        onChange("phone", profileData.phone);
        onChange("notification", profileData.notificationsEnabled);
        handleEdit();
    };

    const handleEditToggle = () => {
        if (!edit) {
            handleSave();
        } else {
            handleEdit();
        }
    };

    return (
        <div>
            <div className='flex justify-between items-center mb-1'>
                <p className={textStyles}>Personal Information</p>
                <ButtonComponent
                    btnText={!edit ? 'Save Changes' : 'Edit'}
                    startIcon={edit ? <Edit /> : <Check />}
                    handleClick={handleEditToggle}
                    darkMode={darkMode}
                    styles={{ width: "fit-content" }}
                />
            </div>
            <FormSection darkMode={darkMode}>
                <Box className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className='flex flex-col gap-2'>
                            <p className={textStyles}>UserName</p>
                            <InputField
                                name="userName"
                                disabled={edit}
                                darkMode={darkMode}
                                styles={{ '& .MuiInputBase-root': { height: "55px" } }}
                                value={profileData.userName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className={textStyles}>Email</p>
                            <InputField
                                name="email"
                                disabled={edit}
                                darkMode={darkMode}
                                styles={{ '& .MuiInputBase-root': { height: "55px" } }}
                                value={profileData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <FormControl fullWidth variant="outlined">
                            <div className='flex flex-col gap-1'>
                                <p className={textStyles}>Gender</p>
                                <Select
                                    fullWidth
                                    name="gender"
                                    disabled={edit}
                                    labelId="gender-label"
                                    value={profileData.gender}
                                    onChange={handleSelectChange}
                                    sx={{
                                        width: "100%",
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: edit ? 'none' : '2px solid',
                                            backgroundColor: "transparent !important",
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
                                            ? (darkMode ? "rgb(233, 213, 245)" : "#000000")
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
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                backgroundColor: darkMode ? "#374151" : "white",
                                                borderRadius: "7px",
                                                border: darkMode ? "1px solid #4B5563" : "1px solid #D1D5DB",
                                                mt: "5px",
                                                color: darkMode ? "rgb(233, 213, 255)" : "black"
                                            },
                                        },
                                        MenuListProps: {
                                            sx: {
                                                padding: 0,
                                            },
                                        },
                                    }}
                                    className={`rounded-lg ${edit ? (darkMode ? 'bg-gray-700' : 'bg-gray-200') : ('bg-transparent')}`}
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Rather not say</MenuItem>
                                </Select>
                            </div>
                        </FormControl>
                    </div>
                </Box>
            </FormSection>
        </div>
    );
};