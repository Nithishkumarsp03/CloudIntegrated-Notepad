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
  className = "",
  isRipple = true,
  type = "text",
  variant = "contained",
  fullWidth = true,
  disabled = false,
  loading = false,
  onKey,
}) => {

  const darkMode = useEditorStore(e => e.darkMode);

  const colors = {
    light: {
      primary: "#2563EB",
      hover: "#3B82F6",
      active: "#1D4ED8",
      shadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
      hoverShadow: "0 6px 8px -1px rgba(37, 99, 235, 0.25)",
    },
    dark: {
      primary: "#7C3AED",
      hover: "#6D28D9",
      active: "#5B21B6",
      shadow: "0 4px 6px -1px rgba(124, 58, 237, 0.3)",
      hoverShadow: "0 6px 8px -1px rgba(124, 58, 237, 0.35)",
    }
  };

  const currentColors = darkMode ? colors.dark : colors.light;

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
        border: `1px solid ${darkMode ? '#6B46C1' : '#1E40AF'}`,
        padding: '8px 20px',
        fontSize: '14px',
        fontFamily: 'monospace',
        fontWeight: 'medium',
        textTransform: 'none',
        boxShadow: currentColors.shadow,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: loading ? "default" : "pointer",
        position: "relative",
        overflow: "hidden",
        minWidth: '120px',

        "&:hover": {
          backgroundColor: currentColors.hover,
          borderColor: darkMode ? '#8B5CF6' : '#2563CA',
          transform: loading ? "none" : "translateY(-1px)",
          boxShadow: currentColors.hoverShadow,
        },

        "&:active": {
          backgroundColor: currentColors.active,
          borderColor: darkMode ? '#5B21B6' : '#1D4ED8',
          transform: loading ? "none" : "translateY(0px)",
          boxShadow: currentColors.shadow,
        },

        "& .MuiButton-startIcon": {
          marginRight: "8px",
          "& svg": {
            fontSize: "20px"
          }
        },

        "&.Mui-disabled": {
          backgroundColor: darkMode ? "rgba(124, 58, 237, 0.4)" : "rgba(37, 99, 235, 0.6)",
          borderColor: darkMode ? "rgba(107, 70, 193, 0.4)" : "rgba(30, 64, 175, 0.6)",
          color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.9)",
          boxShadow: "none",
        },
        ...styles
      }}
      startIcon={loading ? null : startIcon}
      endIcon={!loading && endIcon ? endIcon : null}
      variant={variant}
      fullWidth={fullWidth}
      onClick={handleClick}
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
    </Button>
  );
};