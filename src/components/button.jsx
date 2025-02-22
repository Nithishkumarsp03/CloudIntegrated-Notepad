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
          backgroundColor: '#6A40B5',
          color: "white",
          border: 'transparent',
          borderRadius: '24px',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          "&:hover": {
            transform: "scaleY(1.02)",
            transition: "0.4s",
            backgroundColor: '#5A369E',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          },
          "&:active": {
            transform: "scale(0.98)",
            backgroundColor: "#4A2E85",
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
