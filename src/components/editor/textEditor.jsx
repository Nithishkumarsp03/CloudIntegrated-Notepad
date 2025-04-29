import { EditorContent, useEditor } from '@tiptap/react';
import React, { useEffect, useState, useCallback } from 'react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import EditorToolKit from './components/editorToolKit';
import Underline from '@tiptap/extension-underline';
import History from '@tiptap/extension-history';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import FontSize from '@tiptap/extension-font-size';
import Link from '@tiptap/extension-link';
import ResizableImage from './extensions/imageResize';
import Color from '@tiptap/extension-color';
import { useLoginStore } from '../../store/loginStore';
import { useTextEditorStore } from '../../store/textEditorStore';
import TextEditorSkeleton from './components/editorSkeleton';
import { useNavbarStore } from '../../store/navbarStore';
import { debounce } from 'lodash';

const Texteditor = ({ onChange, noteId }) => {
    const { getNoteContent, loaders, onEditorChange } = useTextEditorStore();
    const [noteContent, setNoteContent] = useState("");
    const { loginId } = useLoginStore();
    const navbarLoader = useNavbarStore(e => e.loaders);
    const [isInitialized, setIsInitialized] = useState(false);

    const debouncedSaveToLocalStorage = useCallback(
        debounce((html) => {
            localStorage.setItem("editorContent", html);
        }, 500), 
        []
    );

    const debouncedOnEditorChange = useCallback(
        debounce(() => {
            onEditorChange("tabSaved", false);
        }, 500),
        [onEditorChange]
    );

    useEffect(() => {
        async function getNote() {
            if (noteId) {
                try {
                    const response = await getNoteContent(loginId, noteId);
                    if (response?.data?.notes) {
                        localStorage.setItem("editorContent", response.data.notes);
                        setNoteContent(response.data.notes);
                    } else {
                        localStorage.setItem("editorContent", "Start Writing...");
                        setNoteContent("Start Writing...");
                    }
                    setIsInitialized(true);
                } catch (error) {
                    console.error("Error fetching note:", error);
                    setNoteContent("Start Writing...");
                    localStorage.setItem("editorContent", "Start Writing...");
                    setIsInitialized(true);
                }
            } else {
                setIsInitialized(true);
            }
        }
        getNote();
    }, [noteId, loginId, getNoteContent]);

    const handleUpdate = useCallback(({ editor }) => {
        const html = editor.getHTML();
        setNoteContent(html);
        debouncedSaveToLocalStorage(html);
        debouncedOnEditorChange();
    }, [debouncedSaveToLocalStorage, debouncedOnEditorChange]);

    const extensions = React.useMemo(() => [
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
    ], []);

    const editor = useEditor({
        extensions,
        content: noteContent,
        onUpdate: handleUpdate,
        editorProps: {
            attributes: {
                class: "w-full outline-none p-4 dark:text-white"
            },
        },
        autofocus: 'end',
    });

    useEffect(() => {
        if (editor && noteContent && isInitialized) {
            if (editor.getHTML() !== noteContent) {
                editor.commands.setContent(noteContent);
            }
        }
    }, [editor, noteContent, noteId, isInitialized]);

    return (
        <div className='w-full h-full flex flex-col gap-4'>
            <div className="flex-grow overflow-auto h-full w-full text-wrap whitespace-break-spaces scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-gray-800 dark:bg-gray-800 bg-gray-50 border border-gray-300 dark:border-gray-800 rounded-lg cursor-text" onClick={() => editor?.chain().focus()}>
                {navbarLoader.isNotesLoading || loaders.textEditorLoading ?
                    <TextEditorSkeleton />
                    :
                    <EditorContent editor={editor} className="h-full text-wrap whitespace-break-spaces" />
                }
            </div>
            <EditorToolKit editor={editor} />
        </div>
    );
};

export default React.memo(Texteditor);