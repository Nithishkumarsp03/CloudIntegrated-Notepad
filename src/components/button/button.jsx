import { Button, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useEditorStore from '../../store/globalStore';

export const ButtonComponent = ({
  children,
  btnText = "button",
  styles,
  startIcon,
  handleClick,
  endIcon,
  imgAnim = false,
  className = "",
  isRipple = true,
  type = "text",
  variant = "contained",
  fullWidth = true,
  disabled = false,
  loading = false,
  pressed,
  onPressed,
  onKey,
}) => {
  const [iconState, setIconState] = useState({
    hover: false,
    animate: false,
    mouseEnter: false
  });

  const { darkMode } = useEditorStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    let animTimeout;
    if (iconState.animate) {
      animTimeout = setTimeout(() => {
        setIconState(prev => ({ ...prev, animate: false }));
      }, 1000);
    }
    return () => clearTimeout(animTimeout);
  }, [iconState.animate]);

  const colors = {
    light: {
      primary: "#2563EB",
      hover: "#3B82F6",
      active: "#1D4ED8",
      shadow: "0 4px 6px rgba(37, 99, 235, 0.2)",
      hoverShadow: "0 6px 12px rgba(37, 99, 235, 0.25)",
    },
    dark: {
      primary: "#7C3AED",
      hover: "#6D28D9",
      active: "#5B21B6",
      shadow: "0 4px 8px rgba(124, 58, 237, 0.3)",
      hoverShadow: "0 6px 14px rgba(124, 58, 237, 0.35)",
    }
  };

  const currentColors = darkMode ? colors.dark : colors.light;

  function handleOnClick() {
    if (loading) return;

    if (iconState.mouseEnter) {
      setIconState(prev => ({ ...prev, animate: true, mouseEnter: false }));
    }
    setIconState(prev => ({ ...prev, hover: false }));

    if (handleClick) {
      handleClick();
    }
  }

  return (
    <Button
      type={type}
      disableRipple={!isRipple}
      onKeyDown={(e) => {
        if (onKey) onKey(e);
      }}
      focusRipple
      className={`relative ${className}`}
      disabled={disabled || loading}
      sx={{
        backgroundColor: currentColors.primary,
        color: "white",
        borderRadius: "8px",
        padding: '8px 20px',
        fontSize: '14px',
        textTransform: 'none',
        boxShadow: currentColors.shadow,
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: loading ? "default" : "pointer",
        position: "relative",
        overflow: "hidden",
        minWidth: '120px',

        "&:hover": {
          backgroundColor: currentColors.hover,
          transform: loading ? "none" : "translateY(-2px)",
          boxShadow: currentColors.hoverShadow,
        },

        "&:active": {
          backgroundColor: currentColors.active,
          transform: loading ? "none" : "translateY(0px)",
          boxShadow: currentColors.shadow,
        },

        "& .MuiButton-startIcon": {
          marginRight: "8px",
          transition: "transform 0.2s ease",
          "& svg": {
            fontSize: "20px"
          }
        },

        "&:hover .MuiButton-startIcon": {
          transform: loading ? "none" : "scale(1.05)",
        },

        "&.Mui-disabled": {
          backgroundColor: darkMode ? "rgba(124, 58, 237, 0.4)" : "rgba(37, 99, 235, 0.4)",
          color: "rgba(255, 255, 255, 0.7)",
          boxShadow: "none",
        },

        ...styles
      }}
      startIcon={loading ? null : startIcon}
      endIcon={!imgAnim && !loading && endIcon ? endIcon : null}
      variant={variant}
      fullWidth={fullWidth}
      onClick={handleOnClick}
      pressed={pressed}
      onPressed={onPressed}
      onMouseEnter={() => {
        if (!loading) {
          setIconState(prev => ({ ...prev, hover: true, mouseEnter: true }));
        }
      }}
      onMouseLeave={() => {
        if (!loading) {
          setIconState(prev => ({ ...prev, hover: false, mouseEnter: false }));
        }
      }}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <CircularProgress
            size={20}
            thickness={4}
            sx={{
              color: 'white',
              marginRight: children || btnText ? '8px' : '0'
            }}
          />
          {children ? children : btnText}
        </div>
      ) : (
        <span className="relative z-10 font-normal text-nowrap">
          {children ? children : btnText}
        </span>
      )}

      {imgAnim && !loading && !isMobile && endIcon && (
        <span
          className={`
            absolute transition-all duration-300 flex items-center
            ${iconState.animate ? 'animate-bounce-right' : ''}
            ${iconState.hover ? 'right-4 opacity-100' : 'right-[-20px] opacity-0'}
          `}
          style={{
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          {endIcon}
        </span>
      )}

      {isRipple && !loading && (
        <span
          className={`
            absolute top-0 left-0 right-0 bottom-0 
            bg-white opacity-0 pointer-events-none
            ${iconState.animate ? 'animate-ripple' : ''}
          `}
        />
      )}
    </Button>
  );
};