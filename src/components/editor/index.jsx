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
import { LinkModal } from '../modal';

function createDebouncedFunction(fn, delay) {
    let timer;
    const debouncedFn = (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };

    debouncedFn.cancel = () => {
        clearTimeout(timer);
    };

    return debouncedFn;
}

const Texteditor = ({ onChange }) => {
    const getNoteContent = useTextEditorStore(e => e.getNoteContent);
    const loaders = useTextEditorStore(e => e.notesLoading);
    const onEditorChange = useTextEditorStore(e => e.onEditorChange);
    const linkModal = useTextEditorStore(e => e.linkModal);
    const noteId = useNavbarStore(e => e.noteId);
    const loginId = useLoginStore(e => e.loginId);
    const addNoteContent = useTextEditorStore(e => e.addNoteContent);
    const navbarLoader = useNavbarStore(e => e.loaders);
    const notesummary = useTextEditorStore(e => e.notesummary);

    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const isUpdatingRef = useRef(false);
    const isToolbarActionRef = useRef(false);

    const debouncedSaveRef = useRef(null);

    useEffect(() => {
        if (debouncedSaveRef.current?.cancel) {
            debouncedSaveRef.current.cancel();
        }

        const currentNoteId = noteId;
        debouncedSaveRef.current = createDebouncedFunction(
            async (html) => {
                if (currentNoteId) {
                    await addNoteContent(html, currentNoteId);
                }
            },
            500
        );
    }, [noteId, addNoteContent]);

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
        if (!transaction.docChanged || isUpdatingRef.current) return;

        onEditorChange("tabSaved", false);
        const html = editor.getHTML();
        console.log(html)
        localStorage.setItem("editorContent", html);

        if (html && debouncedSaveRef.current) {
            debouncedSaveRef.current(html);
        }
    }, [onEditorChange]);

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

    const handleInsertLink = useCallback(({ url, text }) => {
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
    }, [editor]);

    useEffect(() => {
        async function loadNote() {
            if (!loginId || !noteId || !editor) return;
            if (debouncedSaveRef.current?.cancel) {
                debouncedSaveRef.current.cancel();
            }

            setIsContentLoaded(false);
            isUpdatingRef.current = true;

            try {
                if (notesummary[noteId]) {
                    editor.commands.setContent(notesummary[noteId], false);
                } else {
                    const response = await getNoteContent(loginId, noteId);
                    const content = response?.data?.notes || "<p>Start Writing...</p>";
                    editor.commands.setContent(content, false);
                }

                setIsContentLoaded(true);
            } catch (error) {
                console.error("Error loading note:", error);
                editor.commands.setContent("<p>Start Writing...</p>", false);
                setIsContentLoaded(true);
            } finally {
                isUpdatingRef.current = false;
            }
        }

        loadNote();
    }, [noteId, loginId, editor, getNoteContent]);

    useEffect(() => {
        if (!editor || !isContentLoaded || isUpdatingRef.current) return;

        const storeContent = notesummary[noteId];
        if (storeContent && storeContent !== editor.getHTML()) {
            isUpdatingRef.current = true;
            editor.commands.setContent(storeContent, false);
            setTimeout(() => {
                isUpdatingRef.current = false;
            }, 100);
        }
    }, [notesummary, noteId, editor, isContentLoaded]);

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

    useEffect(() => {
        return () => {
            if (debouncedSaveRef.current?.cancel) {
                debouncedSaveRef.current.cancel();
            }
        };
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
        <div className='relative w-full h-full flex flex-col gap-4'>
            <LinkModal
                isOpen={linkModal}
                onClose={() => onEditorChange("linkModal", false)}
                onInsertLink={e => handleInsertLink(e)}
            />
            <div
                className="flex-grow overflow-auto h-full w-full text-wrap  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-gray-800 dark:bg-gray-800 bg-gray-50 border border-gray-300 dark:border-gray-800 rounded-lg cursor-text"
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