// Texteditor.jsx (modified)
import { EditorContent, useEditor } from '@tiptap/react';
import React from 'react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import Image from '@tiptap/extension-image';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import EditorToolKit from './editorToolKit';
import Underline from '@tiptap/extension-underline';
import History from '@tiptap/extension-history';
import TextStyle from '@tiptap/extension-text-style'; 
import FontFamily from '@tiptap/extension-font-family';
import FontSize from '@tiptap/extension-font-size';
import Link from '@tiptap/extension-link';

const Texteditor = ({ content, onChange }) => {
    const handleUpdate = ({ editor }) => {
        const html = editor.getHTML();
        console.log(html);
        if (typeof onChange === 'function') {
            onChange(html);
        }
    };

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                history: false,
            }),
            TextStyle, 
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    rel: 'noopener noreferrer',
                    target: '_blank',
                    class: 'text-blue-600 underline dark:text-blue-400',
                },
            }),
            FontFamily.configure({
                types: ['textStyle'], 
            }),
            FontSize.configure({
                types: ['textStyle'],
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"]
            }),
            Heading.configure({
                levels: [1, 2, 3]
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: "list-decimal ml-3"
                }
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: "list-disc ml-3"
                }
            }),
            History.configure({
                depth: 10,
                newGroupDelay: 50,
            }),
            Highlight,
            Underline,
            Image,
            Placeholder.configure({})
        ],
        content: content || `<p><span style="font-family:Times New Roman,serif;font-size:18px">Hello</span></p>`,
        onUpdate: handleUpdate,
        editorProps: {
            attributes: {
                class: "w-full h-full min-h-full outline-none p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-gray-800 dark:bg-gray-800 bg-gray-50 border border-gray-300 dark:border-gray-800 rounded-lg cursor-text dark:text-white"
            },
        }
    });

    return (
        <div className='w-full h-full flex flex-col'>
            <div className="toolbar">
                <EditorToolKit editor={editor} />
            </div>
            <div className="flex-grow overflow-auto">
                <EditorContent editor={editor} className="h-full" />
            </div>
        </div>
    );
};

export default Texteditor;