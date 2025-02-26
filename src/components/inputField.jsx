import React from 'react';
import TextField from '@mui/material/TextField';

export const InputField = ({
  variant,
  label,
  styles,
  onChange,
  placeholder,
  type,
  id,
  value
}) => {
  return (
    <div className='inputField'>
      <TextField
        id={id}
        label={label}
        variant={variant || 'outlined'}
        type={type}
        value={value}
        sx={{
          '& .MuiInputBase-root': { height: '40px', padding: 0 },
          '& .MuiInputBase-input': { height: '40px', paddingLeft: '10px', margin: 0, fontSize: '14px' },
          '& .MuiFormLabel-root': {
            fontSize: '14px',
            paddingLeft: 0,
            paddingTop: '3px',
            margin: 0,
            transform: 'translate(14px, 5px) scale(1)' // Adjust label positioning
          },
          '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -9px) scale(0.85)',
            color: "#4b4751"
          },
          '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px', // Ensure only one border is applied
              borderColor: '#0b6bcb' // Default border color
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#094f99 !important' // Hover effect
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#063a73 !important' // Focus border color
            }
          },
          ...styles
        }}
        placeholder={placeholder}
        fullWidth
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
