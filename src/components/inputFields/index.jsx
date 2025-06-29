import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import useEditorStore from '../../store/globalStore';

export const InputField = React.forwardRef(({
  variant = 'outlined',
  label,
  styles,
  onChange,
  onKeyDown,
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
  autofocus = false,
  inputProps,
  endIcon = null,
  startIcon = null,
  isSearchStyle = false,
  autocomplete = "on",
  ...otherProps
}, ref) => {
  const { darkMode } = useEditorStore();

  return (
    <TextField
      id={id}
      // Use inputRef instead of ref for Material-UI TextField
      inputRef={ref}
      autoComplete={autocomplete}
      label={isSearchStyle ? undefined : label}
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
      {...otherProps}
      InputProps={{
        startAdornment: startIcon ? (
          <InputAdornment position="start" sx={{ ml: isSearchStyle ? 1 : 0 }}>
            {startIcon}
          </InputAdornment>
        ) : null,
        endAdornment: endIcon ? (
          <InputAdornment position="end" sx={{ mr: isSearchStyle ? 1 : 0 }}>
            {endIcon}
          </InputAdornment>
        ) : null,
        sx: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: darkMode ? '0 0 0 100px #1F2937 inset !important' : '0 0 0 100px #ffffff inset !important',
            WebkitTextFillColor: darkMode ? 'rgb(233, 213, 255) !important' : 'black !important',
          },
        }
      }}
      sx={{
        width: '100%',
        '& .MuiInputBase-root': {
          height: '40px',
          padding: 0,
          paddingTop: isSearchStyle ? 0 : "3px",
          borderRadius: isSearchStyle ? "24px" : "6px",
          backgroundColor: darkMode
            ? (disabled ? '#374151' : '#1F2937')
            : (disabled ? '#E5E7EB' : 'white'),
          transition: 'all 0.2s ease-in-out',
        },
        '& .MuiInputBase-input': {
          height: '40px',
          paddingLeft: isSearchStyle ? '16px' : '10px',
          margin: 0,
          fontSize: isSearchStyle ? '14px' : '15px',
          fontWeight: isSearchStyle ? 400 : 500,
          color: hasError
            ? (darkMode ? '#FCA5A5' : '#DC2626')
            : (darkMode ? (isSearchStyle ? 'rgb(209, 213, 219)' : 'rgb(233, 213, 255)') : 'black'),
          '&:-webkit-autofill': {
            WebkitBoxShadow: darkMode ? '0 0 0 100px #1F2937 inset !important' : '0 0 0 100px #ffffff inset !important',
            WebkitTextFillColor: darkMode ? 'rgb(233, 213, 255) !important' : 'black !important',
            caretColor: darkMode ? 'rgb(233, 213, 255)' : 'black',
            borderRadius: 'inherit',
            "-webkit-transition": "background-color 5000s ease-in-out 0s",
            transition: "background-color 5000s ease-in-out 0s",
          },
          '&:-webkit-autofill:hover': {
            WebkitBoxShadow: darkMode ? '0 0 0 100px #1F2937 inset !important' : '0 0 0 100px #ffffff inset !important',
          },
          '&:-webkit-autofill:focus': {
            WebkitBoxShadow: darkMode ? '0 0 0 100px #1F2937 inset !important' : '0 0 0 100px #ffffff inset !important',
          },
          '&:-webkit-autofill:active': {
            WebkitBoxShadow: darkMode ? '0 0 0 100px #1F2937 inset !important' : '0 0 0 100px #ffffff inset !important',
          },
        },
        '& .MuiFormLabel-root': {
          fontSize: '14px',
          paddingLeft: 0,
          paddingTop: '5px',
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
          '&:-webkit-autofill': {
            WebkitBoxShadow: darkMode ? '0 0 0 100px #1F2937 inset !important' : '0 0 0 100px #ffffff inset !important',
            backgroundColor: 'transparent !important',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: isSearchStyle ? '0' : '2px',
            borderColor: isSearchStyle
              ? 'transparent !important'
              : disabled
                ? 'transparent !important'
                : hasError
                  ? (darkMode ? '#EF4444 !important' : '#EF4444 !important')
                  : (darkMode ? '#6D28D9' : '#0b6bcb')
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: isSearchStyle
              ? 'transparent !important'
              : disabled
                ? 'transparent !important'
                : hasError
                  ? (darkMode ? '#EF4444 !important' : '#EF4444 !important')
                  : (darkMode ? '#8B5CF6 !important' : '#1a73e8 !important')
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: isSearchStyle
              ? 'transparent !important'
              : disabled
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
        '& .MuiInputBase-root.Mui-disabled': {
          backgroundColor: darkMode ? '#374151' : '#E5E7EB',
          fieldset: {
            borderColor: 'transparent !important'
          }
        },
        '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active':
        {
          transition: 'background-color 5000s ease-in-out 0s !important',
          WebkitBoxShadow: darkMode ? '0 0 0 100px #1F2937 inset !important' : '0 0 0 100px #ffffff inset !important',
          WebkitTextFillColor: darkMode ? 'rgb(233, 213, 255) !important' : 'black !important',
        },

        ...(isSearchStyle && {
          '& .MuiInputBase-root': {
            height: '40px',
            padding: 0,
            borderRadius: '24px',
            border: `1.5px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
            backgroundColor: darkMode ? '#1F2937' : 'white',
            '&:hover': {
              borderColor: darkMode ? '#4B5563' : '#D1D5DB',
            },
            '&.Mui-focused': {
              borderColor: darkMode ? '#8B5CF6' : '#3B82F6',
              boxShadow: darkMode ? '0 0 0 1px rgba(139, 92, 246, 0.2)' : '0 0 0 2px rgba(59, 130, 246, 0.2)',
            }
          },
          '& .MuiInputBase-input': {
            height: '40px',
            padding: '0 6px',
            fontSize: '14px',
            fontWeight: 400,
            fontFamily: 'sans-serif',
            color: darkMode ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)',
          },
          boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.05)',
        }),

        ...styles
      }}
    />
  );
});

InputField.displayName = 'InputField';