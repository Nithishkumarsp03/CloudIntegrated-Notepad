import React from 'react';
import { ButtonComponent } from '../../../components';
import useEditorStore from '../../../store/globalStore';

const EditorButton = ({ handleClick, btnText, classes, handlePressed }) => {
  const darkMode = useEditorStore(e => e.darkMode); 
  const lightStyles = {
    minWidth: "44px",
    padding: "11px 6px 11px 8px",
    backgroundColor: "#F3F4F6",
    borderColor: "#9CA3AF",
    color: "#9CA3AF",
    borderRadius: "12px",
    boxShadow: 0,
    "&:hover": {
      backgroundColor: "#F9FAFB",
      color: "#1F2937",
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
    borderColor:"#1F2937",
    borderRadius: "12px",
    backgroundColor: "#1F2937",
    color: "#A1A1AA",
    boxShadow: 0,
    "&:hover": {
      backgroundColor: "#4A5568",
      color: "#8B5CF6",
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
        btnText={btnText}
        styles={darkMode ? darkStyles : lightStyles}
        handleClick={handleClick}
        pressed={handlePressed}
      />
    </div>
  );
};

export default EditorButton;