import React from 'react';
import { ButtonComponent } from './button';
import useEditorStore from '../globalStore';

const EditorButton = ({ handleClick, btnText, isActive, classes }) => {
  const { darkMode } = useEditorStore();

  const lightStyles = {
    minWidth: "44px",
    padding: "11px 6px 11px 8px",
    backgroundColor: "#F3F4F6",
    color:"#9CA3AF",
    borderRadius:"12px",
    boxShadow: 0 ,
    "&:hover": {
      backgroundColor: "#F9FAFB",
      color:"#1F2937",
      "&:active": {
        boxShadow: 0,
        backgroundColor: "white",
      },
    },
    ...classes,
  };

  const darkStyles = {
    minWidth: "44px",
    padding: "11px 6px 11px 8px",
    borderRadius: "12px",
    backgroundColor: "#1F2937", 
    color: "#A1A1AA", 
    boxShadow:  0 ,
    "&:hover": {
      backgroundColor: "#4A5568",
      color:"#8B5CF6",
      "&:active": {
        boxShadow: 0,
        backgroundColor: "#424242",
      },
    },
    ...classes,
  };

  return (
    <div>
      <ButtonComponent
        // isRipple={false}
        btnText={btnText}
        styles={darkMode ? darkStyles : lightStyles}
        handleClick={handleClick}
      />
    </div>
  );
};

export default EditorButton;