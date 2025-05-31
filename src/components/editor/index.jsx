import { EditorContent, useEditor } from '@tiptap/react';
import React, { useEffect, useState, useCallback, useRef, useMemo, startTransition } from 'react';
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


const createOptimizedDebounce = (fn, delay) => {
    let timeoutId;
    let rafId;

    return (...args) => {
        const execute = () => {
            clearTimeout(timeoutId);
            cancelAnimationFrame(rafId);
            fn.apply(this, args);
        };

        clearTimeout(timeoutId);
        cancelAnimationFrame(rafId);

        rafId = requestAnimationFrame(() => {
            timeoutId = setTimeout(execute, delay);
        });
    };
};

const createBatchProcessor = () => {
    const queue = new Set();
    let isProcessing = false;

    return (operation) => {
        queue.add(operation);

        if (!isProcessing) {
            isProcessing = true;
            requestIdleCallback(() => {
                queue.forEach(op => op());
                queue.clear();
                isProcessing = false;
            }, { timeout: 50 });
        }
    };
};

const localStorageManager = {
    cache: new Map(),

    safeSet: (key, value) => {
        try {
            if (localStorageManager.cache.get(key) === value) {
                return true;
            }

            localStorage.setItem(key, value);
            localStorageManager.cache.set(key, value);
            return true;
        } catch (error) {
            return false;
        }
    },

    safeGet: (key, defaultValue = null) => {
        try {
            if (localStorageManager.cache.has(key)) {
                return localStorageManager.cache.get(key);
            }

            const value = localStorage.getItem(key) || defaultValue;
            localStorageManager.cache.set(key, value);
            return value;
        } catch (error) {
            return defaultValue;
        }
    },

    clear: (key) => {
        localStorageManager.cache.delete(key);
    }
};

const Texteditor = ({ onChange, noteId }) => {
    const notesummary = useTextEditorStore(e => e.notesummary);
    console.log(notesummary);
    const getNoteContent = useTextEditorStore(e => e.getNoteContent);
    const loaders = useTextEditorStore(e => e.loaders);
    const onEditorChange = useTextEditorStore(e => e.onEditorChange);
    const loginId = useLoginStore(e => e.loginId);
    const navbarLoader = useNavbarStore(e => e.loaders);
    const [initialContent, setInitialContent] = useState("");
    const [isInitialized, setIsInitialized] = useState(false);
    const currentContentRef = useRef("");
    const editorRef = useRef(null);
    const lastSaveTimeRef = useRef(0);
    const contentHashRef = useRef("");
    const isTypingRef = useRef(false);
    const typingTimeoutRef = useRef(null);

    const batchProcessor = useMemo(() => createBatchProcessor(), []);

    const performanceMetrics = useMemo(() => ({
        updateCount: 0,
        lastUpdate: 0,
        avgUpdateTime: 0
    }), []);

    const EDITOR_CONTENT_KEY = 'editorContent';

    const saveToLocalStorage = useCallback((html) => {
        try {
            if (html && html.length > 0 &&
                html !== "Start Writing..." &&
                html !== "<p>Start Writing...</p>" &&
                html !== "<p></p>" &&
                html.trim() !== "") {
                localStorageManager.safeSet(EDITOR_CONTENT_KEY, html);
            }
        } catch (error) {
            console.warn('Failed to save to localStorage:', error);
        }
    }, []);

    const debouncedSaveToLocalStorage = useMemo(() =>
        createOptimizedDebounce((html) => {
            try {
                const hash = btoa(html).slice(0, 10);
                if (contentHashRef.current !== hash) {
                    saveToLocalStorage(html);
                    contentHashRef.current = hash;
                    lastSaveTimeRef.current = performance.now();
                }
            } catch (error) {
                console.warn('Failed to process content for localStorage:', error);
            }
        }, 1500), [saveToLocalStorage]
    );

    const throttledStateUpdate = useMemo(() =>
        createOptimizedDebounce((currentNoteId) => {
            if (currentNoteId === noteId) {
                batchProcessor(() => {
                    onEditorChange("tabSaved", false);
                });
            }
        }, 500), [noteId, onEditorChange, batchProcessor]
    );

    const throttledOnChange = useMemo(() =>
        createOptimizedDebounce((html, currentNoteId) => {
            if (onChange && currentNoteId === noteId) {
                startTransition(() => {
                    onChange(html);
                });
            }
        }, 300), [onChange, noteId]
    );

    const cleanup = useCallback(() => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        localStorageManager.clear(EDITOR_CONTENT_KEY);
    }, []);

    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    const extensions = useMemo(() => {
        const baseExtensions = [
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
        ];

        const essentialExtensions = [
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
            })
        ];

        const advancedExtensions = [
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
        ];

        return [...baseExtensions, ...essentialExtensions, ...advancedExtensions];
    }, []);

    const handleUpdate = useCallback(({ editor, transaction }) => {
        const startTime = performance.now();
        const currentNoteId = noteId;

        if (!transaction.docChanged) return;

        isTypingRef.current = true;
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            isTypingRef.current = false;
        }, 1000);

        batchProcessor(() => {
            const html = editor.getHTML();
            const contentLength = html.length;

            if (currentContentRef.current === html) return;

            currentContentRef.current = html;

            performanceMetrics.updateCount++;
            const updateTime = performance.now() - startTime;
            performanceMetrics.avgUpdateTime =
                (performanceMetrics.avgUpdateTime + updateTime) / 2;
            saveToLocalStorage(html);
            debouncedSaveToLocalStorage(html);
            if (contentLength < 10000) {
                throttledStateUpdate(currentNoteId);
                throttledOnChange(html, currentNoteId);
            } else {
                setTimeout(() => {
                    throttledStateUpdate(currentNoteId);
                    throttledOnChange(html, currentNoteId);
                }, 100);
            }
        });
    }, [noteId, saveToLocalStorage, debouncedSaveToLocalStorage, throttledStateUpdate, throttledOnChange, batchProcessor, performanceMetrics]);

    useEffect(() => {
        const abortController = new AbortController();

        async function loadNote() {
            try {
                if (abortController.signal.aborted) return;
                let content = "";
                let shouldSaveToLocalStorage = false;

                if (noteId) {
                    const response = await getNoteContent(loginId, noteId);
                    const apiContent = response?.data?.notes || "";

                    if (apiContent &&
                        apiContent !== "Start Writing..." &&
                        apiContent !== "<p>Start Writing...</p>" &&
                        apiContent.trim() !== "") {
                        content = apiContent;
                        shouldSaveToLocalStorage = true;
                    } else {
                        const localContent = localStorageManager.safeGet(EDITOR_CONTENT_KEY);
                        if (localContent &&
                            localContent !== "Start Writing..." &&
                            localContent !== "<p>Start Writing...</p>" &&
                            localContent.trim() !== "") {
                            content = localContent;
                        } else {
                            content = "Start Writing...";
                        }
                    }
                } else {
                    content = localStorageManager.safeGet(EDITOR_CONTENT_KEY, "Start Writing...");
                }

                if (!abortController.signal.aborted) {
                    setInitialContent(content);
                    currentContentRef.current = content;
                    contentHashRef.current = btoa(content).slice(0, 10);
                    if (content && content !== "Start Writing..." && content !== "<p>Start Writing...</p>" && content.trim() !== "") {
                        saveToLocalStorage(content);
                    }

                    setIsInitialized(true);
                }
            } catch (error) {
                if (!abortController.signal.aborted) {
                    console.error("Error loading note:", error);
                    setInitialContent("Start Writing...");
                    setIsInitialized(true);
                }
            }
        }

        loadNote();

        return () => {
            abortController.abort();
        };
    }, [noteId, loginId, getNoteContent, saveToLocalStorage]);

    const editor = useEditor({
        extensions,
        content: "",
        onCreate: ({ editor }) => {
            editorRef.current = editor;
        },
        onUpdate: handleUpdate,
        editorProps: {
            attributes: {
                class: "w-full outline-none p-4 dark:text-white",
                spellcheck: "false",
                autocomplete: "off",
                autocorrect: "off",
                autocapitalize: "off",
            },
            handleDOMEvents: {
                scroll: () => {
                    if (isTypingRef.current) return true;
                    return false;
                },
                selectionchange: (view, event) => {
                    if (isTypingRef.current) return true;
                    return false;
                }
            },
        },
        autofocus: false,
        injectCSS: false,
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,
    });

    useEffect(() => {
        if (editor && isInitialized && initialContent) {
            const currentContent = editor.getHTML();
            if (currentContent !== initialContent) {
                editor.commands.setContent(initialContent, false);
                currentContentRef.current = initialContent;
            }
        }
    }, [editor, initialContent, isInitialized, noteId]);

    const handleEditorClick = useCallback(() => {
        if (editor && !editor.isFocused) {
            requestAnimationFrame(() => {
                editor.chain().focus('end').run();
            });
        }
    }, [editor]);

    const LoadingComponent = useMemo(() => (
        <div className='w-full h-full flex flex-col gap-4'>
            <div className="flex-grow overflow-auto h-full w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-gray-800 dark:bg-gray-800 bg-gray-50 border border-gray-300 dark:border-gray-800 rounded-lg">
                <TextEditorSkeleton />
            </div>
            <EditorToolKit editor={null} />
        </div>
    ), []);

    const containerClasses = "flex-grow overflow-auto h-full w-full text-wrap whitespace-break-spaces scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-gray-800 dark:bg-gray-800 bg-gray-50 border border-gray-300 dark:border-gray-800 rounded-lg cursor-text";

    if (navbarLoader.isNotesLoading || loaders.textEditorLoading) {
        return LoadingComponent;
    }

    return (
        <div className='w-full h-full flex flex-col gap-4'>
            <div
                className={containerClasses}
                onClick={handleEditorClick}
            >
                <EditorContent
                    editor={editor}
                    className="h-full text-wrap whitespace-break-spaces"
                />
            </div>
            <EditorToolKit editor={editor} />
        </div>
    );
};

export default React.memo(Texteditor, (prevProps, nextProps) => {
    return prevProps.noteId === nextProps.noteId &&
        prevProps.onChange === nextProps.onChange;
});