import { EditorContent, useEditor } from '@tiptap/react';
import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
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
import { EmptyStateContent } from '../emptyPage';

function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};
  
const Texteditor = ({ onChange, noteId }) => {
    const getNoteContent = useTextEditorStore(e => e.getNoteContent);
    const loaders = useTextEditorStore(e => e.notesLoading);
    const onEditorChange = useTextEditorStore(e => e.onEditorChange);
    const loginId = useLoginStore(e => e.loginId);
    const saveEditorLoading = useTextEditorStore(e => e.saveEditorLoading);
    const addNoteContent = useTextEditorStore(e => e.addNoteContent);
    const navbarLoader = useNavbarStore(e => e.loaders);
    const [initialContent, setInitialContent] = useState("");
    const [isInitialized, setIsInitialized] = useState(false);
    const [saved, setSaved] = useState(false);
    const currentContentRef = useRef("");
    const isToolbarActionRef = useRef(false);

    useEffect(() => { 
        if (saveEditorLoading) {
            setSaved(true);
        }
        if (!saveEditorLoading) {
            setTimeout(() => {
                setSaved(false);
            },[3000])
        }
    }, [saveEditorLoading]);

    const addNote = async (notes) => {
        await addNoteContent(notes);
     };

    const debouncedSave = debounce(addNote,1000); 

    const extensions = useMemo(() => [
        StarterKit.configure({
            history: false,
            blockquote: false,
            codeBlock: false,
            horizontalRule: false,
            hardBreak: false,
        }),
        History.configure({
            depth: 50,
            newGroupDelay: 200,
        }),
        TextStyle,
        Heading.configure({ levels: [1, 2, 3] }),
        OrderedList.configure({
            HTMLAttributes: { class: "list-decimal ml-3" }
        }),
        BulletList.configure({
            HTMLAttributes: { class: "list-disc ml-3" }
        }),
        Placeholder.configure({
            placeholder: "Start writing...",
            emptyEditorClass: 'is-editor-empty',
        }),
        TextAlign.configure({
            types: ["heading", "paragraph"],
            alignments: ['left', 'center', 'right'],
        }),
        Link.configure({
            openOnClick: true,
            HTMLAttributes: {
                rel: 'noopener noreferrer',
                target: '_blank',
                class: 'text-blue-600 underline dark:text-blue-400 cursor-pointer',
            },
        }),
        FontFamily.configure({ types: ['textStyle'] }),
        FontSize.configure({ types: ['textStyle'] }),
        Color.configure({ types: ['textStyle'] }),
        Highlight,
        Underline,
        ResizableImage,
    ], []);

    const handleUpdate = useCallback(({ editor, transaction }) => {
        if (!transaction.docChanged) return;
        onEditorChange("tabSaved", false);
        const html = editor.getHTML();
        localStorage.setItem("editorContent", html);
        if (html) {
            debouncedSave(html)
        }
     }, [onEditorChange, onChange]);

    useEffect(() => {
        async function loadNote() {
            try {
                let content = "Start Writing...";
                const response = await getNoteContent(loginId, noteId);
                const apiContent = response?.data?.notes ;
                if (!apiContent) {
                    content = "<p>Start writing...</p>"
                }
                else {
                    content = apiContent;
                }
                setInitialContent(content);
                currentContentRef.current = content;
                setIsInitialized(true);
            } catch (error) {
                console.error("Error loading note:", error);
                setInitialContent("Start Writing...");
                setIsInitialized(true);
            }
        }

        loadNote();
    }, [noteId, loginId, getNoteContent]);

    const editor = useEditor({
        extensions,
        content:"",
        onUpdate: handleUpdate,
        editorProps: {
            attributes: {
                class: "w-full outline-none p-4 dark:text-white",
                spellcheck: "false",
            },
        },
        autofocus: false,
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,
    });

    useEffect(() => {
        if (editor && isInitialized && initialContent) {
            if (editor.getHTML() !== initialContent) {
                editor.commands.setContent(initialContent, false);
                currentContentRef.current = initialContent;
            }
        }
    }, [editor, initialContent, isInitialized]);

    const handleEditorClick = useCallback((event) => {
        if (event.target.closest('[data-toolbar]') ||
            event.target.closest('.editor-toolbar')) {
            return;
        }

        if (editor && !editor.isFocused) {
            editor.chain().focus('end').run();
        }
    }, [editor]);

    const markToolbarAction = useCallback(() => {
        isToolbarActionRef.current = true;
    }, []);

    if (navbarLoader.isNotesLoading || loaders[noteId]) {
        return (
            <div className='w-full h-full flex flex-col gap-4'>
                <div className="flex-grow overflow-auto h-full w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-gray-800 dark:bg-gray-800 bg-gray-50 border border-gray-300 dark:border-gray-800 rounded-lg">
                    <TextEditorSkeleton />
                </div>
                <EditorToolKit editor={editor} />
            </div>
        );
    }

    return (
        <div className='w-full h-full flex flex-col gap-4'>
            <div
                className="relative flex-grow overflow-auto h-full w-full text-wrap whitespace-break-spaces scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-gray-800 dark:bg-gray-800 bg-gray-50 border border-gray-300 dark:border-gray-800 rounded-lg cursor-text"
                onClick={handleEditorClick}
            >
                {saved &&
                    <div className='absolute bottom-1 right-2 dark:bg-gray-800 bg-gray-50 text-gray-400 text-md flex'>
                        {saveEditorLoading ?
                            <>
                        <div>Saving</div>
                        <div>.</div>
                        <div>.</div>
                        <div>.</div>
                            </>
                        :<div>Saved</div>}
                    </div>
                }
                <EditorContent
                    editor={editor}
                    className="h-full text-wrap whitespace-break-spaces"
                />
            </div>
            <EditorToolKit
                editor={editor}
                onToolbarAction={markToolbarAction}
                    />
        </div>
    );
};

export default React.memo(Texteditor, (prevProps, nextProps) => {
    return prevProps.noteId === nextProps.noteId &&
        prevProps.onChange === nextProps.onChange;
});


