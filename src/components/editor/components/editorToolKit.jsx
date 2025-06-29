import React, { useRef, useState, useCallback } from 'react';
import {
  Bold,
  Underline,
  LeftAlign,
  CenterAlign,
  RightAlign,
  StrikeThrough,
  Link,
  Undo,
  Redo,
  BulletList,
  Italic,
  OrderedList,
  Code
} from '../../../assets';
import EditorButton from './editorButton';
import { fontFamilyOptions, fontSizes } from '../../../utils';
import { UploadFile } from '@mui/icons-material';
import ColorPopover from '../extensions/textColor';
import useEditorStore from '../../../store/globalStore';
import { CustomSelect, FontSelector } from '../../../components';
import { useTextEditorStore } from '../../../store/textEditorStore';

const EditorToolKit = ({ editor, onToolbarAction }) => {
  const darkMode = useEditorStore(e => e.darkMode);
  const onEditorChange = useTextEditorStore(e => e.onEditorChange);
  const [fontFamily, setFontFamily] = useState(fontFamilyOptions[0].family);
  const [fontSize, setFontSize] = useState("18px");
  const fileInputRef = useRef(null);

  const handleToolbarAction = useCallback((action) => {
    if (!editor) return;

    if (onToolbarAction) {
      onToolbarAction();
    }

    action();
  }, [editor, onToolbarAction]);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (editor && editor.commands.setImage) {
        try {
          handleToolbarAction(() => {
            editor.chain().focus().setImage({
              src: reader.result,
              alt: file.name,
              width: 300,
              height: 'auto'
            }).run();
          });
          console.log("Image inserted successfully");
        } catch (error) {
          console.error("Error inserting image:", error);
        }
      } else {
        console.error("Image extension not available in editor");
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }, [editor, handleToolbarAction]);

  const addImage = useCallback(() => {
    console.log("Triggering file input click");
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("File input ref is null");
    }
  }, []);

  const handleFont = useCallback((e) => {
    const newFontFamily = e.target.value;
    setFontFamily(newFontFamily);

    if (editor && editor.commands.setFontFamily) {
      handleToolbarAction(() => {
        editor.chain().focus().setFontFamily(newFontFamily).run();
      });
    } else {
      console.warn('FontFamily extension not available in editor');
    }
  }, [editor, handleToolbarAction]);

  const handleFontSize = useCallback((e) => {
    const newFontSize = e.target.value;
    setFontSize(newFontSize);

    handleToolbarAction(() => {
      editor.chain().focus().setFontSize(newFontSize).run();
    });
  }, [editor, handleToolbarAction]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
  }, []);

  if (!editor) {
    return null;
  }

  const Options = [
    {
      name: "Bold",
      icon: <Bold />,
      onClick: () => handleToolbarAction(() => editor.chain().focus().toggleBold().run()),
      pressed: () => editor.isActive("bold")
    },
    {
      name: "UnderLine",
      icon: <Underline />,
      onClick: () => handleToolbarAction(() => editor.chain().focus().toggleUnderline().run()),
      pressed: () => editor.isActive("underline")
    },
    {
      name: "StrikeThrough",
      icon: <StrikeThrough />,
      onClick: () => handleToolbarAction(() => editor.chain().focus().toggleStrike().run()),
      pressed: () => editor.isActive("strike"),
      classes: { padding: "6px 6px" }
    },
    {
      name: "Italic",
      icon: <Italic />,
      onClick: () => handleToolbarAction(() => editor.chain().focus().toggleItalic().run()),
      pressed: () => editor.isActive("italic")
    },
    {
      name: "Link",
      icon: <Link />,
      onClick: () => onEditorChange("linkModal",true)
    },
    // {
    //   name: "Code",
    //   icon: <Code />,
    //   onClick: () => handleToolbarAction(() => editor.chain().focus().toggleCodeBlock().run()),
    //   pressed: () => editor.isActive("codeBlock")
    // },
    {
      name: "Upload",
      icon: <UploadFile />,
      onClick: addImage,
    },
    {
      name: "OrderedList",
      icon: <OrderedList />,
      pressed: () => editor.isActive("orderedList"),
      onClick: () => handleToolbarAction(() => editor.chain().focus().toggleOrderedList().run()),
    },
    {
      name: "BulletList",
      icon: <BulletList />,
      pressed: () => editor.isActive("bulletList"),
      onClick: () => handleToolbarAction(() => editor.chain().focus().toggleBulletList().run()),
    },
    {
      name: "Left Align",
      icon: <LeftAlign />,
      pressed: () => editor.isActive({ textAlign: 'left' }),
      onClick: () => handleToolbarAction(() => editor.chain().focus().setTextAlign("left").run()),
    },
    {
      name: "Center Align",
      icon: <CenterAlign />,
      pressed: () => editor.isActive({ textAlign: 'center' }),
      onClick: () => handleToolbarAction(() => editor.chain().focus().setTextAlign("center").run()),
    },
    {
      name: "Right Align",
      icon: <RightAlign />,
      pressed: () => editor.isActive({ textAlign: 'right' }),
      onClick: () => handleToolbarAction(() => editor.chain().focus().setTextAlign("right").run()),
    },
    {
      name: "Undo",
      icon: <Undo />,
      onClick: () => handleToolbarAction(() => editor.chain().focus().undo().run()),
    },
    {
      name: "Redo",
      icon: <Redo />,
      onClick: () => handleToolbarAction(() => editor.chain().focus().redo().run()),
    }
  ];

  return (
    <div
      className={`p-2 rounded-2xl flex overflow-x-auto gap-2 items-center justify-between overflow-y-hidden scrollbar-none shadow-md bg-gray-100 dark:bg-gray-800`}
      data-toolbar="true"
      onMouseDown={handleMouseDown}
      style={{ userSelect: 'none' }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      <div onMouseDown={handleMouseDown}>
        <FontSelector
          darkMode={darkMode}
          fontOptions={fontFamilyOptions}
          onChange={handleFont}
          value={fontFamily}
        />
      </div>

      <div onMouseDown={handleMouseDown}>
        <CustomSelect
          darkMode={darkMode}
          options={fontSizes}
          onChange={handleFontSize}
          value={fontSize}
        />
      </div>

      {Options.map(option => (
        <div key={option.name} className="relative" onMouseDown={handleMouseDown}>
          <EditorButton
            classes={option.classes}
            btnText={option.icon}
            handleClick={option.onClick}
            handlePressed={option.pressed}
            size="small"
          />
        </div>
      ))}

      <div onMouseDown={handleMouseDown}>
        <ColorPopover editor={editor} onToolbarAction={onToolbarAction} />
      </div>


    </div>
  );
};

export default EditorToolKit;