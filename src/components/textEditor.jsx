import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import TextAlign from '@tiptap/extension-text-align';
import useEditorStore from '../globalStore';
import { useEffect, useState } from 'react';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { fontFamilyOptions } from '../utils';
import Link from '@tiptap/extension-link';

const Tiptap = ({ action, fontStyle = fontFamilyOptions[0].family }) => {
    const { isSidebarOpen, setCharacterCount } = useEditorStore();
    const [width, setWidth] = useState('');
    const [content, setContent] = useState('<p>Hello World</p>');
    const [editorAction, setEditorAction] = useState(null);

    useEffect(() => {
        // Responsive width handling
        if (window.innerWidth < 768) { // Mobile
            setWidth('w-full');
        } else if (window.innerWidth < 1024) { // Tablet
            setWidth(isSidebarOpen ? 'w-[calc(100vw-80px)]' : 'w-[calc(100vw-300px)]');
        } else { // Desktop
            setWidth(isSidebarOpen ? 'w-[1505px]' : 'w-[1225px]');
        }

        const handleResize = () => {
            if (window.innerWidth < 768) {
                setWidth('w-full');
            } else if (window.innerWidth < 1024) {
                setWidth(isSidebarOpen ? 'w-[calc(100vw-80px)]' : 'w-[calc(100vw-300px)]');
            } else {
                setWidth(isSidebarOpen ? 'w-[1505px]' : 'w-[1225px]');
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isSidebarOpen]);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc pl-5',
                    },
                },
            }),
            Underline,
            CharacterCount,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right'],
                defaultAlignment: 'left',
            }),
            TextStyle,
            FontFamily.configure({
                types: ['textStyle', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 dark:text-blue-400 underline',
                    rel: 'noopener noreferrer',
                    target: '_blank',
                },
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class: `h-[90%] dark:text-white outline-none ${width} p-4 overflow-auto min-h-[300px]`,
                style: `font-family: ${fontStyle}`,
            }
        },
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
            const count = editor.storage.characterCount.words();
            setCharacterCount(count);
        }
    });

    useEffect(() => {
        if (!editor || !fontStyle) return;
        editor.chain().focus().setFontFamily(fontStyle).run();
    }, [fontStyle, editor]);

    useEffect(() => {
        if (!editor) return;
        setEditorAction(action);
    }, [action]);

    useEffect(() => {
        if (!editor || !editorAction) return;

        if (editorAction.startsWith('link:')) {
            const url = editorAction.replace('link:', '');
            if (url) {
                editor.chain().focus().toggleLink({ href: url }).run();
            } else {
                editor.chain().focus().unsetLink().run();
            }
            return;
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
            case 'italic':
                editor.chain().focus().toggleItalic().run();
                break;
            case 'underline':
                editor.chain().focus().toggleUnderline().run();
                break;
            case 'strikethrough':
                editor.chain().focus().toggleStrike().run();
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
    }, [editorAction]);

    function handleFocus() {
        if (editor) {
            editor.commands.focus();
        }
    }

    return (
        <div
            className="h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-gray-800 dark:bg-gray-800 bg-gray-50 border border-gray-300 dark:border-gray-800 rounded-lg cursor-text flex-1"
            onClick={handleFocus}
        >
            <EditorContent editor={editor} />
        </div>
    );
};

export default Tiptap;