import React from 'react';
import TextField from '@mui/material/TextField';
import useEditorStore from '../globalStore';

export const InputField = ({
  variant = 'outlined',
  label,
  styles,
  onChange,
  placeholder,
  type = 'text',
  id,
  value,
  disabled = false,
  name,
  errorMessage = '',
  hasError = false,
  required = false,
  fullWidth = true,
}) => {
  const { darkMode } = useEditorStore();

  return (
    <div className="!bg-transparent w-full">
      <TextField
        id={id}
        label={label}
        name={name}
        variant={variant}
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        error={hasError}
        helperText={hasError ? errorMessage : ''}
        required={required}
        fullWidth={fullWidth}
        onChange={onChange}
        sx={{
          width: '100%',
          backgroundColor: darkMode
            ? (disabled ? '#374151' : '#1F2937')
            : (disabled ? '#E5E7EB' : 'white'),
          borderRadius: "6px",

          '& .MuiInputBase-root': {
            height: '40px',
            padding: 0,
            paddingTop:"5px"
          },

          '& .MuiInputBase-input': {
            height: '40px',
            paddingLeft: '10px',
            margin: 0,
            fontSize: '15px',
            fontWeight: 500,
            color: hasError
              ? (darkMode ? '#FCA5A5' : '#DC2626')
              : (darkMode ? 'rgb(233, 213, 255)' : 'black'),
          },

          '& .MuiFormLabel-root': {
            fontSize: '14px',
            paddingLeft: 0,
            paddingTop: '3px',
            margin: 0,
            transform: 'translate(14px, 5px) scale(1)',
            color: hasError
              ? (darkMode ? '#FCA5A5' : '#DC2626')
              : (darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb')
          },

          '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -9px) scale(0.85)',
            color: hasError
              ? (darkMode ? '#FCA5A5' : '#DC2626')
              : (darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb')
          },

          '&. MuiFormLabel-root.Mui-disabled': {
            color:"white"
          },

          '& .MuiFormLabel-root.Mui-focused': {
            color: hasError
              ? (darkMode ? '#FCA5A5' : '#DC2626')
              : (darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb')
          },

          '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px',
              borderColor: disabled
                ? 'transparent !important'
                : hasError
                  ? (darkMode ? '#EF4444 !important' : '#EF4444 !important')
                  : (darkMode ? '#6D28D9' : '#0b6bcb')
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: disabled
                ? 'transparent !important'
                : hasError
                  ? (darkMode ? '#EF4444 !important' : '#EF4444 !important')
                  : (darkMode ? '#8B5CF6 !important' : '#1a73e8 !important')
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: disabled
                ? 'transparent !important'
                : hasError
                  ? (darkMode ? '#EF4444 !important' : '#EF4444 !important')
                  : (darkMode ? '#4C1D95 !important' : '#1557b0 !important')
            }
          },

          '& .MuiFormHelperText-root': {
            marginLeft: '3px',
            fontSize: '12px',
            marginTop: '4px',
            color: darkMode ? '#FCA5A5' : '#DC2626',
            fontWeight: 500
          },

          '& .Mui-disabled': {
            color: darkMode ? 'rgb(233, 213, 255) !important' : '#000000 !important',
            WebkitTextFillColor: darkMode ? 'rgb(233, 213, 255) !important' : '#000000 !important',
          },

          '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent !important',
          },

          '& .MuiInputLabel-root.Mui-disabled': {
            color: darkMode ? 'rgb(233, 213, 255) !important' : '#000000 !important',
          },

          '& .MuiInputBase-input.Mui-disabled': {
            color: darkMode ? 'rgb(233, 213, 255) !important' : '#000000 !important',
            WebkitTextFillColor: darkMode ? 'rgb(233, 213, 255) !important' : '#000000 !important',
            opacity: 1,
          },

          ...styles
        }}
      />
    </div>
  );
};