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

const createDebounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

const Texteditor = ({ onChange, noteId }) => {
    const getNoteContent = useTextEditorStore(e => e.getNoteContent);
    const loaders = useTextEditorStore(e => e.loaders);
    const onEditorChange = useTextEditorStore(e => e.onEditorChange);
    const loginId = useLoginStore(e => e.loginId);
    const navbarLoader = useNavbarStore(e => e.loaders);

    const [initialContent, setInitialContent] = useState("");
    const [isInitialized, setIsInitialized] = useState(false);
    const currentContentRef = useRef("");
    const isToolbarActionRef = useRef(false);

    const saveToLocalStorage = useCallback((html) => {
        if (html && html.trim() &&
            html !== "Start Writing..." &&
            html !== "<p>Start Writing...</p>" &&
            html !== "<p></p>") {
            try {
                localStorage.setItem('editorContent', html);
            } catch (error) {
                console.warn('Failed to save to localStorage:', error);
            }
        }
    }, []);

    const debouncedSave = useMemo(() => createDebounce(saveToLocalStorage, 0), [saveToLocalStorage]);
    const debouncedStateUpdate = useMemo(() => createDebounce(() => onEditorChange("tabSaved", false), 0), [onEditorChange]);
    const debouncedOnChange = useMemo(() => createDebounce((html) => onChange?.(html), 0), [onChange]);

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

        const html = editor.getHTML();
        if (currentContentRef.current === html) return;

        currentContentRef.current = html;
        const isToolbarAction = isToolbarActionRef.current;

        if (isToolbarAction) {
            saveToLocalStorage(html);
            onEditorChange("tabSaved", false);
            onChange?.(html);
            isToolbarActionRef.current = false;
        } else {
            debouncedSave(html);
            debouncedStateUpdate();
            debouncedOnChange(html);
        }
    }, [saveToLocalStorage, onEditorChange, onChange, debouncedSave, debouncedStateUpdate, debouncedOnChange]);

    useEffect(() => {
        async function loadNote() {
            try {
                let content = "Start Writing...";

                if (noteId) {
                    const response = await getNoteContent(loginId, noteId);
                    const apiContent = response?.data?.notes || "";

                    if (apiContent && apiContent.trim() &&
                        apiContent !== "Start Writing..." &&
                        apiContent !== "<p>Start Writing...</p>") {
                        content = apiContent;
                    } else {
                        const localContent = localStorage.getItem('editorContent');
                        if (localContent && localContent.trim() &&
                            localContent !== "Start Writing..." &&
                            localContent !== "<p>Start Writing...</p>") {
                            content = localContent;
                        }
                    }
                } else {
                    const localContent = localStorage.getItem('editorContent');
                    if (localContent && localContent.trim()) {
                        content = localContent;
                    }
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
        content: "",
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

    if (navbarLoader.isNotesLoading || loaders.textEditorLoading) {
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
                className="flex-grow overflow-auto h-full w-full text-wrap whitespace-break-spaces scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-gray-800 dark:bg-gray-800 bg-gray-50 border border-gray-300 dark:border-gray-800 rounded-lg cursor-text"
                onClick={handleEditorClick}
            >
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