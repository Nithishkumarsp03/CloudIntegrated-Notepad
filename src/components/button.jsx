import { Button } from '@mui/material';
import React, { useState } from 'react';

export const ButtonComponent = ({
  btnText = "button",
  styles,
  startIcon,
  handleClick,
  endIcon,
  imgAnim = false,
  className,
  isRipple = true
}) => {
  const [icon, setIcon] = useState({
    hover: false,
    anime: false,
    mouseEnter: false
  });

  function handleOnClick() {
    if (icon.mouseEnter) {
      setIcon((prev) => ({ ...prev, anime: true, mouseEnter: false }));
    }
    setIcon((prev) => ({ ...prev, hover: false }));
    if (handleClick) {
      handleClick();
    }
    setTimeout(() => setIcon((v) => ({ ...v, anime: false })), 1000);
  }

  return (
    <div>
      <Button
        disableRipple={!isRipple}
        focusRipple
        className={`relative group overflow-hidden ${className}`}
        sx={{
          backgroundColor: '#0b6bcb', // Base blue color
          color: "white",
          border: 'none',
          minWidth:"full",
          borderRadius: '8px',
          padding: '8px 20px',
          fontSize: '14px',
          fontWeight: '600',
          textTransform: 'none',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          cursor:"pointer",
          "&:hover": {
            backgroundColor: '#1a73e8', 
            transform: "translateY(-2px)",
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
          },
          "&:active": {
            backgroundColor: '#1557b0', // Slightly darker but still vibrant blue for active
            transform: "translateY(0)",
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
          ...styles
        }}
        startIcon={startIcon}
        variant="contained"
        fullWidth
        onClick={handleOnClick}
        onMouseEnter={() => setIcon((prev) => ({ ...prev, hover: true, mouseEnter: true }))}
      >
        {btnText}
        {imgAnim && (
          <span
            className={`
              absolute top-[10.5px] transition-all 
              ${icon.anime ? 'animate-iconAnim' : icon.hover ? 'animate-iconHover' : 'right-[-20px] opacity-0'}
            `}
          >
            {endIcon}
          </span>
        )}
      </Button>
    </div>
  );
};