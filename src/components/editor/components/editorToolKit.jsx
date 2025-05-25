import React, { useRef, useState } from 'react';
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
import  useEditorStore  from '../../../store/globalStore';
import { LinkModal, CustomSelect, FontSelector } from '../../../components';

const EditorToolKit = ({ editor }) => {
  const { darkMode } = useEditorStore();
  const [fontFamily, setFontFamily] = useState(fontFamilyOptions[0].family);
  const [fontSize, setFontSize] = useState("18px");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (editor && editor.commands.setImage) {
        try {
          editor.chain().focus().setImage({
            src: reader.result,
            alt: file.name,
            width: 300,
            height: 'auto'
          }).run();
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
  };

  const addImage = () => {
    console.log("Triggering file input click");
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("File input ref is null");
    }
  };

  const handleFont = (e) => {
    setFontFamily(e.target.value);
    if (editor && editor.commands.setFontFamily) {
      editor.chain().focus().setFontFamily(e.target.value).run();
    } else {
      console.warn('FontFamily extension not available in editor');
    }
  };

  const handleFontSize = (e) => {
    setFontSize(e.target.value);
    editor.chain().focus().setFontSize(e.target.value).run();
  };

  const handleInsertLink = ({ url, text }) => {
    if (!editor) return;
    if (text) {
      editor.chain()
        .focus()
        .insertContent(`<a href="${url}" target="_blank">${text}</a>`)
        .run();
    } else {
      editor.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }
  };

  if (!editor) {
    return null;
  }

  const Options = [
    {
      name: "Bold",
      icon: <Bold />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: () => editor.isActive("bold")
    },
    {
      name: "UnderLine",
      icon: <Underline />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      pressed: () => editor.isActive("underline")
    },
    {
      name: "StrikeThrough",
      icon: <StrikeThrough />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: () => editor.isActive("strike"),
      classes: { padding: "6px 6px" }
    },
    {
      name: "Italic",
      icon: <Italic />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: () => editor.isActive("italic")
    },
    {
      name: "Link",
      icon: <Link />,
      onClick: () => setIsModalOpen(true)
    },
    {
      name: "Code",
      icon: <Code />,
      pressed: () => editor.isActive("code"),
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      name: "Upload",
      icon: <UploadFile />,
      onClick: addImage,
    },
    {
      name: "OrderedList",
      icon: <OrderedList />,
      pressed: () => editor.isActive("orderedList"),
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      name: "BulletList",
      icon: <BulletList />,
      pressed: () => editor.isActive("bulletList"),
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      name: "Left Align",
      icon: <LeftAlign />,
      pressed: () => editor.isActive("leftAlign"),
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
    },
    {
      name: "Center Align",
      icon: <CenterAlign />,
      pressed: () => editor.isActive("centerAlign"),
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
    },
    {
      name: "Right Align",
      icon: <RightAlign />,
      pressed: () => editor.isActive("rightAlign"),
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
    },
    {
      name: "Undo",
      icon: <Undo />,
      onClick: () => editor.chain().focus().undo().run(),
    },
    {
      name: "Redo",
      icon: <Redo />,
      onClick: () => editor.chain().focus().redo().run(),
    }
  ];

  return (
    <div className={`p-2 rounded-2xl flex overflow-x-auto gap-2 items-center justify-between scrollbar-none shadow-md bg-gray-100 dark:bg-gray-800`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      <FontSelector
        darkMode={darkMode}
        fontOptions={fontFamilyOptions}
        onChange={handleFont}
        value={fontFamily}
      />
      <CustomSelect
        darkMode={darkMode}
        options={fontSizes}
        onChange={handleFontSize}
        value={fontSize}
      />
      {
        Options.map(option => (
          <div key={option.name} className="relative">
            <EditorButton
              classes={option.classes}
              btnText={option.icon}
              handleClick={option.onClick}
              handlePressed={option.pressed}
              size="small"
            />
          </div>
        ))
      }
      <ColorPopover editor={editor} />
      <LinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInsertLink={handleInsertLink}
      />
    </div>
  );
};

export default EditorToolKit;