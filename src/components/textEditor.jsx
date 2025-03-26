import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import useEditorStore from '../globalStore';
import { useEffect, useState } from 'react';

const extensions = [StarterKit]

const content = '<p>Hello World!</p>'

const Tiptap = ({active}) => {
    const { isSidebarOpen } = useEditorStore();
    const [width, setWidth] = useState('');
    useEffect(() => {
        if (isSidebarOpen) {
            setWidth('w-[1505px]');
        }
        else {
            setWidth('w-[1225px]');
        }
    })
    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: `h-[90%] dark:text-white outline-none ${width} p-4 overflow-auto`
            }
        }
    });

    function handleFocus() {
        if (editor) {
            editor.commands.focus();
        }
    }

    return (
        <div className='h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-gray-800 dark:bg-gray-800 bg-gray-50 border border-gray-300 dark:border-gray-800 rounded-lg cursor-text' onClick={handleFocus}>    
            <EditorContent editor={editor} />
         </div>   
            
    )
}

export default Tiptap;
