        import { useEditor, EditorContent } from '@tiptap/react';
        import StarterKit from '@tiptap/starter-kit';
        import CharacterCount from '@tiptap/extension-character-count';
        import TextAlign from '@tiptap/extension-text-align';
        import useEditorStore from '../globalStore';
        import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
        import Underline from '@tiptap/extension-underline';
        import TextStyle from '@tiptap/extension-text-style';
        import FontFamily from '@tiptap/extension-font-family';
        import FontSize from '@tiptap/extension-font-size';
        import { fontFamilyOptions } from '../utils';
        import Link from '@tiptap/extension-link';
        import Color from '@tiptap/extension-color';
        import React from 'react';

        const debounce = (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };

        const Tiptap = React.memo(({ action, fontStyle = fontFamilyOptions[0].family, color }) => {
            const { isSidebarOpen, setCharacterCount } = useEditorStore();
            const [width, setWidth] = useState('');
            const [content, setContent] = useState('<p></p>');
            const [editorAction, setEditorAction] = useState(null);
            const [isTyping, setIsTyping] = useState(false);
            const editorRef = useRef(null);

            const calculateWidth = useCallback(() => {
                if (window.innerWidth < 768) return 'w-full';
                if (window.innerWidth < 1024) return isSidebarOpen ? 'w-[calc(100vw-80px)]' : 'w-[calc(100vw-300px)]';
                return isSidebarOpen ? 'w-[1505px]' : 'w-[1225px]';
            }, [isSidebarOpen]);

            useEffect(() => {
                setWidth(calculateWidth());
                const handleResize = debounce(() => setWidth(calculateWidth()), 100);
                window.addEventListener('resize', handleResize);
                return () => window.removeEventListener('resize', handleResize);
            }, [calculateWidth]);

            const debouncedUpdate = useMemo(() => debounce((editor) => {
                setContent(editor.getHTML());
                const count = editor.storage.characterCount.words();
                setCharacterCount(count);
            }, 300), [setCharacterCount]);

            const handleKeyDown = useCallback((event) => {
                if (event.ctrlKey && event.key === 'a') {
                    event.preventDefault();
                    if (editorRef.current) {
                        editorRef.current.commands.selectAll();
                    }
                    return;
                }
            }, []);

            const editorConfig = useMemo(() => ({
                extensions: [
                    StarterKit.configure({
                        bulletList: {
                            HTMLAttributes: {
                                class: 'list-disc pl-5',
                            },
                        },
                    }),
                    FontSize,
                    Underline,
                    CharacterCount,
                    TextAlign.configure({
                        types: ['heading', 'paragraph'],
                        alignments: ['left', 'center', 'right'],
                        defaultAlignment: 'left',
                    }),
                    Color.configure({
                        types: ['textStyle'],
                    }),
                    TextStyle,
                    FontFamily.configure({
                        types: ['textStyle', 'paragraph'],
                    }),
                    Link.configure({
                        openOnClick: true,
                        HTMLAttributes: {
                            class: 'text-blue-600 dark:text-blue-400 underline cursor-pointer',
                            rel: 'noopener noreferrer',
                            target: '_blank',
                        },
                        validate: href => /^https?:\/\//.test(href),
                    }),
                ],
                content,
                editorProps: {
                    attributes: {
                        class: `h-[90%] dark:text-white outline-none ${width} p-4 overflow-auto min-h-[300px]`,
                        style: `font-family: ${fontStyle.family}; font-weight: ${fontStyle.fontWeight} !important;`,
                    },
                    handleKeyDown: handleKeyDown,
                    handleClick: (view, pos, event) => {
                        if (event.target.tagName === 'A') {
                            return false; 
                        }
                        return true;
                    },
                },
                onUpdate: ({ editor }) => {
                    setIsTyping(true);
                    debouncedUpdate(editor);
                    debounce(() => setIsTyping(false), 500)();
                },
                onSelectionUpdate: () => {
                    if (!isTyping) {
                        const count = editorRef.current?.storage.characterCount.words();
                        if (count !== undefined) setCharacterCount(count);
                    }
                }
            }), [width, fontStyle, content, debouncedUpdate, isTyping, setCharacterCount, handleKeyDown]);

            const editor = useEditor(editorConfig);
            editorRef.current = editor;

            useEffect(() => {
                if (!editor || !fontStyle) return;
                editor.chain().focus().setFontFamily(fontStyle.family).run();
            }, [fontStyle, editor]);

            useEffect(() => {
                if (!editor) return;
                setEditorAction(action);
            }, [action]);

            useEffect(() => {
                if (!editor || !editorAction) return;

                if (editorAction.fontSize) {
                    editor.chain().focus().setMark('textStyle', { fontSize: editorAction.fontSize }).run();
                    return;
                }

                if (editorAction.color) {
                    const color = editorAction.color.startsWith('#') ? editorAction.color : `#${editorAction.color}`;
                    editor.chain().focus().setColor(color).run();
                    return;
                }

                if (editorAction.link) {
                    const { link, text } = editorAction;

                    if (typeof link === 'string') {
                        if (text) {
                            editor
                                .chain()
                                .focus()
                                .insertContent(`<a href="${link}" >${text}</a>`)
                                .run();
                        } else {
                            editor
                                .chain()
                                .focus()
                                .toggleLink({
                                    href: link,
                                })
                                .run();
                        }
                    } else {
                        console.warn('Invalid link passed to editorAction.link:', link);
                    }
                }

                switch (editorAction) {
                    case 'bulletList':
                        editor.chain().focus().toggleBulletList().run();
                        break;
                    case 'bulletListClose':
                        editor.chain().focus().toggleBulletList().run();
                        break;
                    case 'undo':
                        editor.commands.undo();
                        break;
                    case 'redo':
                        editor.commands.redo();
                        break;
                    case 'bold':
                        editor.chain().focus().toggleBold().run();
                        break;
                    case 'boldClose':
                        editor.chain().focus().unsetBold().run();
                        break;
                    case 'underline':
                        editor.chain().focus().toggleUnderline().run();
                        break;
                    case 'underlineClose':
                        editor.chain().focus().unsetUnderline().run();
                        break;
                    case 'strikethrough':
                        editor.chain().focus().toggleStrike().run();
                        break;
                    case 'strikethroughClose':
                        editor.chain().focus().unsetStrike().run();
                        break;
                    case 'leftAlign':
                        editor.chain().focus().setTextAlign('left').run();
                        break;
                    case 'rightAlign':
                        editor.chain().focus().setTextAlign('right').run();
                        break;
                    case 'centerAlign':
                        editor.chain().focus().setTextAlign('center').run();
                        break;
                    default:
                        break;
                }

                handleFocus();
            }, [editorAction, editor]);

            const handleFocus = useCallback(() => {
                if (editor) {
                    editor.commands.focus();
                }
            }, [editor]);

            return (
                <div
                    className="h-full overflow-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-gray-800 dark:bg-gray-800 bg-gray-50 border border-gray-300 dark:border-gray-800 rounded-lg cursor-text flex-1"
                    onClick={handleFocus}
                >
                    <EditorContent editor={editor} />
                </div>
            );
        });

        export default Tiptap;  