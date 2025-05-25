import React from 'react';
import { Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Edit, Check } from '@mui/icons-material';
import { InputField, ButtonComponent } from '../../../components';
import FormSection from './formSection';

export const PersonalSection = ({ darkMode, edit, handleEdit, tempData, handleProfileChange }) => {
    return (
        <FormSection title="Personal Information" darkMode={darkMode}>
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
                        name="userName"
                        disabled={edit}
                        darkMode={darkMode}
                        styles={{ '& .MuiInputBase-root': { height: "55px" } }}
                        label="Full Name"
                        value={tempData.userName}
                        onChange={handleProfileChange}
                    />
                    <InputField
                        name="email"
                        disabled={edit}
                        darkMode={darkMode}
                        styles={{ '& .MuiInputBase-root': { height: "55px" } }}
                        label="Email"
                        value={tempData.email}
                        onChange={handleProfileChange}
                    />

                    <FormControl fullWidth variant="outlined" >
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
                            fullWidth
                            name="gender"
                            disabled={edit}
                            labelId="gender-label"
                            value={tempData.gender}
                            onChange={handleProfileChange}
                            label="Gender"
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
                    </FormControl>
                </div>
            </Box>
        </FormSection>
    );
};

