import React from 'react'
import { ButtonComponent } from './button';

const EditorButton = ({handleClick,btnText,isActive}) => {
  return (
    <div>
          <ButtonComponent btnText={btnText} styles={{ minWidth:"40px",padding:"8px 8px", backgroundColor: !isActive ? "white" : "#F3F4F6", boxShadow: isActive && 0, "&:hover": {backgroundColor:"#F9FAFB","&:active":{boxShadow:0,backgroundColor:"white"}}}} handleClick={handleClick} />
    </div>
  )
}

export default EditorButton;
