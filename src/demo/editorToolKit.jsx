import React, { useState } from 'react';
import { useTextEditorStore } from '../store/textEditorStore';
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
  TextColor,
  Italic,
  OrderedList,
  Code
} from '../assets';
import EditorButton from '../components/editor/editorButton'
import { UploadFile } from '@mui/icons-material';
import { fontFamilyOptions, fontSizes } from '../utils';
import FontSelector from '../components/select/fontSelect';
import CustomSelect from '../components/select/select';
import LinkModal from '../components/modal/modal';

const EditorToolKit = ({editor}) => {
  const { darkMode } = useTextEditorStore();
  const [fontFamily, setFontFamily] = useState(fontFamilyOptions[0].family);
  const [fontSize, setFontSize] = useState("18px");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFont =(e) => {
    setFontFamily(e.target.value);
    if (editor && editor.commands.setFontFamily) {
      editor.chain().focus().setFontFamily(e.target.value).run();
    } else {
      console.warn('FontFamily extension not available in editor');
    }
  };

  const handleFontSize = (e) => { 
    setFontSize(e.target.value);
    editor.chain().focus().setFontSize(e.target.value).run()
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

  const addImage = () => {
    const url = window.prompt("URl");
    if (url) {
      editor.chain().focus().setImage({src:url}).run()
    }
  };

  const Options = [
    {
      name:"Bold",
      icon: <Bold />,
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      name: "UnderLine",
      icon: <Underline />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      name: "StrikeThrough",
      icon: <StrikeThrough />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      name: "Italic",
      icon: <Italic />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      name: "Link",
      icon: <Link />,
      // onClick: () =>
    },
    {
      name: "Code",
      icon: <Code />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      name: "Upload",
      icon: <UploadFile />,
      onClick: () => addImage(),
    },
    {
      name: "OrderedList",
      icon: <OrderedList />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      name: "BulletList",
      icon: <BulletList />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      name: "Left Align",
      icon: <LeftAlign />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
    },
    {
      name: "Center Align",
      icon: <CenterAlign />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
    },
    {
      name: "Right Align",
      icon: <RightAlign />,
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
    },
    {
      name: "Text Color",
      icon: <TextColor />
    }
  ];

  return (
    <div className={`p-2 rounded-2xl overflow-hidden flex flex-wrap justify-between shadow-md ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <CustomSelect
        darkMode={darkMode}
        options={fontSizes}
        onChange={handleFontSize}
        value={fontSize}
      />
      <FontSelector
        darkMode={darkMode}
        fontOptions={fontFamilyOptions}
        onChange={handleFont}
        value={fontFamily}
      />
      {
        Options.map(option => (
          <EditorButton
            key={option.name}
            btnText={option.icon}
            handleClick={option.onClick}
            handlePressed={option.pressed}
            size="small"
          />
        ))
      }
      <LinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInsertLink={handleInsertLink}
      />
    </div>
  )
}

export default EditorToolKit;
