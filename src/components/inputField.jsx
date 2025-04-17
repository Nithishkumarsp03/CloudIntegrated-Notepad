import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import useEditorStore from '../store/globalStore';

export const InputField = ({
  variant = 'outlined',
  label,
  styles,
  onChange,
  onKeyDown,
  placeholder,
  type = 'text',
  ref,
  id,
  value,
  disabled = false,
  name,
  errorMessage = '',
  hasError = false,
  required = false,
  fullWidth = true,
  autofocus = false,
  inputProps,
  endIcon = null 
}) => {
  const { darkMode } = useEditorStore();

  return (
    <TextField
      id={id}
      ref={ref}
      label={label}
      name={name}
      autoFocus={autofocus}
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
      onKeyDown={onKeyDown}
      inputProps={inputProps}
      InputProps={{
        endAdornment: endIcon ? (
          <InputAdornment position="end">
            {endIcon}
          </InputAdornment>
        ) : null
      }}
      sx={{
        width: '100%',
        '& .MuiInputBase-root': {
          height: '40px',
          padding: 0,
          paddingTop: "5px",
          borderRadius: "6px",
          backgroundColor: darkMode
            ? (disabled ? '#374151' : '#1F2937')
            : (disabled ? '#E5E7EB' : 'white'),
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
          '&:-webkit-autofill': {
            WebkitBoxShadow: darkMode ? '0 0 0 100px #1F2937 inset !important' : 'none',
            WebkitTextFillColor: darkMode ? 'rgb(233, 213, 255) !important' : 'black !important',
            caretColor: darkMode ? 'rgb(233, 213, 255)' : 'black',
            borderRadius: 'inherit',
          },
          '&:-webkit-autofill:hover': {
            WebkitBoxShadow: darkMode ? '0 0 0 100px #1F2937 inset !important' : 'none',
          },
          '&:-webkit-autofill:focus': {
            WebkitBoxShadow: darkMode ? '0 0 0 100px #1F2937 inset !important' : 'none',
          },
          '&:-webkit-autofill:active': {
            WebkitBoxShadow: darkMode ? '0 0 0 100px #1F2937 inset !important' : 'none',
          },
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
        '& .MuiFormLabel-root.Mui-disabled': {
          color: darkMode ? 'rgb(233, 213, 255)' : '#000000'
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
  );
};
