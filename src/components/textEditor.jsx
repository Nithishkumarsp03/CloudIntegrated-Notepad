import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import CodeBlock from "@tiptap/extension-code-block";
import Image from "@tiptap/extension-image";
import { FiBold, FiItalic, FiUnderline, FiList, FiImage, FiCode } from "react-icons/fi";
import useEditorStore from "../globalStore";
import '../textEditor.css';

const TextEditor = ({ id }) => {
    const { tabs, updateTabContent } = useEditorStore();
    const [tabContent, setTabContent] = useState("");

    useEffect(() => {
        const content = tabs.find(val => val.id === id)?.content || "";
        setTabContent(content);
    }, [id, tabs]);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Bold,
            Italic,
            Underline,
            BulletList,
            OrderedList,
            ListItem,
            CodeBlock,
            Image.configure({ allowBase64: true }) // Ensure base64 images are allowed
        ],
        content: tabContent,
        onUpdate: ({ editor }) => {
            updateTabContent(id, editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && tabContent) {
            editor.commands.setContent(tabContent);
        }
    }, [tabContent, editor]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            if (editor) {
                editor.chain().focus().insertContent(
                    `<img src="${e.target.result}" alt="uploaded image" style="max-width: 200px; height: auto;" />`
                ).run();
            }
        };
        reader.readAsDataURL(file);
    };




    if (!editor) {
        return null;
    }

    return (
        <div className="w-full flex flex-col items-center transition-all duration-300 h-[610px] overflow-scroll scrollbar-hide">
            {/* Editor Content */}
            <div className="w-full h-full overflow-y-auto bg-white shadow-lg p-4">
                <EditorContent editor={editor} key={id} className="min-h-[200px] tiptap" />
            </div>

            {/* Formatting Toolbar */}
            <div className="w-full bg-white shadow-lg p-2 flex flex-wrap justify-start gap-2 mb-4">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 hover:bg-gray-200 rounded ${editor.isActive("bold") ? "bg-gray-300" : ""}`}>
                    <FiBold size={20} />
                </button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 hover:bg-gray-200 rounded ${editor.isActive("italic") ? "bg-gray-300" : ""}`}>
                    <FiItalic size={20} />
                </button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 hover:bg-gray-200 rounded ${editor.isActive("underline") ? "bg-gray-300" : ""}`}>
                    <FiUnderline size={20} />
                </button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 hover:bg-gray-200 rounded ${editor.isActive("bulletList") ? "bg-gray-300" : ""}`}>
                    <FiList size={20} />
                </button>
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 hover:bg-gray-200 rounded ${editor.isActive("orderedList") ? "bg-gray-300" : ""}`}>
                    <FiList size={20} />
                </button>
                <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`p-2 hover:bg-gray-200 rounded ${editor.isActive("codeBlock") ? "bg-gray-300" : ""}`}>
                    <FiCode size={20} />
                </button>

                {/* Image Upload Button */}
                <label className="p-2 cursor-pointer hover:bg-gray-200 rounded">
                    <FiImage size={20} />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
            </div>

            {/* Inline CSS to Remove Outline */}
            <style>
                {`
                    .ProseMirror:focus {
                        outline: none !important;
                    }
                `}
            </style>
        </div>
    );
};

export default TextEditor;
