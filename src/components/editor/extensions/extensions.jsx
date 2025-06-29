 export const extensions = useMemo(() => [
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