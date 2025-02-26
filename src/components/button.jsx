import { Button } from '@mui/material';
import React, { useState } from 'react';

export const ButtonComponent = ({
  btnText = "button",
  styles,
  startIcon,
  handleClick,
  endIcon,
  imgAnim = false,
}) => {
  const [icon, setIcon] = useState({
    hover: false,
    anime: false,
    mouseEnter:false
  });

  function handleOnClick() {
    if (icon.mouseEnter) {
      setIcon((prev) => ({ ...prev, anime: true,mouseEnter:false }));
    }
    setIcon((prev) => ({ ...prev, hover: false }))
    if (handleClick) {
      handleClick();
    }
    setTimeout(() => setIcon((v) => ({ ...v, anime: false })), 1000);
  }

  return (
    <div>
      <Button
        sx={{
          backgroundColor: '#0b6bcb',
          color: "white",
          border: 'transparent',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '7px',
          paddingBottom: '7px',
          typography: { xl: '14px', md: '12px',sm:"10px" }, 
          "&:hover": {
            transform: "scaleY(1.02)",
            transition: "0.4s",
            backgroundColor: '#094f99',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          },
          "&:active": {
            transform: "scale(0.98)",
            backgroundColor: "#063a73",
            transition: "0.1s",
            boxShadow: 'rgba(0, 0, 0, 0.45) 0px 2px 10px'
          },
          ...styles
        }}
        startIcon={startIcon}
        variant="outlined"
        fullWidth
        onClick={handleOnClick}
        onMouseEnter={() => setIcon((prev) => ({ ...prev, hover: true, mouseEnter: true }))}
      >
        {btnText}
        {imgAnim && (
          <span className={icon.anime ? 'endIconAnim' : icon.hover ? 'endIconHover' : 'endIcon'}>
            {endIcon}
          </span>
        )}
      </Button>
    </div>
  );
};
