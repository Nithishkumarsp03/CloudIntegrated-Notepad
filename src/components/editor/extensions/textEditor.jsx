import { EditorContent, useEditor } from '@tiptap/react';
import React, { useEffect, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
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
import ResizableImage from './imageResize';
import Color from '@tiptap/extension-color';
import { useLoginStore } from '../../../store/loginStore';
import { useTextEditorStore } from '../../../store/textEditorStore';

const Texteditor = ({ onChange, noteId }) => {
    const [noteContent, setNoteContent] = useState('<p>Notecontent</p>');
    const loginId = useLoginStore(e => e.loginId);
    const getNoteContent = useTextEditorStore(e => e.getNoteContent);

    useEffect(() => {
        async function getNote() {
            if (noteId) {
                const response = await getNoteContent(loginId, noteId);
                if (response?.data?.notes) {
                    setNoteContent(response?.data?.notes);
                }
                else {
                    setNoteContent("<p>Start writing now...</p>");
                }
            }   
        }
        getNote();
     }, [noteId]);

    const handleUpdate = ({ editor }) => {
        const html = editor.getHTML();
        if (typeof onChange === 'function') {
            setNoteContent(html);
        }
    };

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                history: false,
            }),
            TextStyle,
            Link.configure({
                openOnClick: true,
                HTMLAttributes: {
                    rel: 'noopener noreferrer',
                    target: '_blank',
                    class: 'text-blue-600 underline dark:text-blue-400 cursor-pointer',
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
            Color.configure({
                types: ['textStyle'],
            }),
            Highlight,
            Underline,
            ResizableImage,
            Placeholder.configure({})
        ],
        content: noteContent,
        onUpdate: handleUpdate,
        editorProps: {
            attributes: {
                class: "w-full outline-none p-4 dark:text-white"
            },
        }
    });

    useEffect(() => {
        if (editor && noteContent) {
            editor.commands.setContent(noteContent);
        }
    }, [editor, noteContent]);

    return (
        <div className='w-full h-full flex flex-col gap-4'>
            <div className="flex-grow overflow-auto h-full w-full text-wrap whitespace-break-spaces scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-gray-800 dark:bg-gray-800 bg-gray-50 border border-gray-300 dark:border-gray-800 rounded-lg cursor-text" onClick={() => editor?.chain().focus()}>
                <EditorContent editor={editor} className="h-full text-wrap whitespace-break-spaces" />
            </div>
                <EditorToolKit editor={editor} />
        </div>
    );
};

export default Texteditor;