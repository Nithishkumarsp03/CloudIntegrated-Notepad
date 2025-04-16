import { EditorContent, useEditor } from '@tiptap/react';
import React from 'react'
import EditorToolKit from '../components/editorToolKit';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import Image from '@tiptap/extension-image';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';

const Texteditor = ({content,onChange}) => {

    const editor = useEditor({
        extensions: [
            StarterKit.configure(),
            TextAlign.configure({
                types:["heading","paragraph"]
            }),
            Heading.configure({
                levels:[1,2,3]
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class:"list-decimal ml-3"
                }
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: "list-disc ml-3"
                }
            }),
            Highlight,
            Image,
            Placeholder.configure({})
            // ImageRezise
        ],
        content:`<p>Hello</p>` ,
        onUpdate: ({ editor }) => {
            console.log(editor.getHTML())
            onChange(editor.getHTML())
        },
            editorProps: {
                attributes: {
                    class: "w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-gray-800 dark:bg-gray-800 bg-gray-50 border border-gray-300 dark:border-gray-800 rounded-lg cursor-text"
                },
        }
    })

  return (
    <div>
          <EditorContent editor={editor} />
    </div>
  )
}

export default Texteditor;
