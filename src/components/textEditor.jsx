import React, { useEffect, useState, useRef } from "react";
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
import Link from "@tiptap/extension-link";
import useEditorStore from "../globalStore";
import '../textEditor.css';

const TextEditor = ({ id }) => {
    const { tabs, updateTabContent } = useEditorStore();
    const [tabContent, setTabContent] = useState("");
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");
    const linkButtonRef = useRef(null);

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
            Image,
            Link.configure({
                openOnClick: true,
                autolink: true,
                HTMLAttributes: {
                    class: "text-blue-500 underline",
                },
            }),
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

    const handleApplyLink = () => {
        if (editor && linkUrl) {
            editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
            setShowLinkInput(false);
            setLinkUrl("");
        }
    };

    if (!editor) {
        return null;
    }

    return (
        <div className="w-full flex flex-col items-center transition-all duration-300 h-[610px] overflow-scroll scrollbar-hide">
            {/* Editor Content */}
            <div className="w-full h-full overflow-y-auto bg-white shadow-lg p-4 rounded-lg" onClick={() => editor?.chain().focus().run()}>
                <EditorContent editor={editor} key={id} className="min-h-[200px] tiptap" />
            </div>

            {/* Formatting Toolbar */}
            <div className="w-full bg-white shadow-lg p-2 flex flex-wrap justify-start gap-2 mb-4 rounded-lg relative">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 hover:bg-gray-100 rounded transition-all duration-200 ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
                >
                    <FiBold size={20} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 hover:bg-gray-100 rounded transition-all duration-200 ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
                >
                    <FiItalic size={20} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-2 hover:bg-gray-100 rounded transition-all duration-200 ${editor.isActive("underline") ? "bg-gray-200" : ""}`}
                >
                    <FiUnderline size={20} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 hover:bg-gray-100 rounded transition-all duration-200 ${editor.isActive("bulletList") ? "bg-gray-200" : ""}`}
                >
                    <FiList size={20} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 hover:bg-gray-100 rounded transition-all duration-200 ${editor.isActive("orderedList") ? "bg-gray-200" : ""}`}
                >
                    <FiList size={20} />
                </button>
                <button
                    ref={linkButtonRef}
                    onClick={() => setShowLinkInput(true)}
                    className="p-2 hover:bg-gray-100 rounded transition-all duration-200"
                >
                    🔗
                </button>
                {showLinkInput && (
                    <div className="absolute bottom-12 bg-white p-2 shadow-lg rounded-lg flex items-center gap-2 transition-all duration-200" style={{ left: linkButtonRef.current?.offsetLeft }}>
                        <input
                            type="text"
                            placeholder="Enter URL"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            className="border p-1 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        />
                        <button
                            onClick={handleApplyLink}
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-all duration-200"
                        >
                            Apply
                        </button>
                    </div>
                )}
                <label className="p-2 cursor-pointer hover:bg-gray-100 rounded transition-all duration-200">
                    <FiImage size={20} />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
            </div>

            <style>
                {`.ProseMirror:focus { outline: none !important; }`}
            </style>
        </div>
    );
};

export default TextEditor;