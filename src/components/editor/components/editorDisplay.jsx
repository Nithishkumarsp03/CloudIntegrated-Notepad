import { Editor } from '@tiptap/core';
import React from 'react'

const EditorDisplay = ({editorContent}) => {
  return (
   <Editor content={editorContent} />
  )
}

export default EditorDisplay;
