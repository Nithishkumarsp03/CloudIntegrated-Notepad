import React, { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import useEditorStore from "../globalStore";

const TextEditor = (
    {
        id
    }
) => {

    const { tabs } = useEditorStore();

    const tab = tabs.find(tab => tab.id === id);
    const initialContent = tab ? tab.content : "";

    
    useEffect(() => {
        setContent(initialContent);
    },[id,tabs,tab,initialContent])

    const [content, setContent] = useState(initialContent);

    return (
        <div style={{
            height: "93.5%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            textAlign: 'left',
        }}>
            <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                style={{
                    flex: 1,
                    height: "100%",
                    width: "100%",
                }}
            />
            <style>{`
                .ql-container {
                    width: 100%; 
                    height: 100%; 
                }
                .ql-editor {
                    overflow-x: hidden; /* Prevents horizontal expansion */
                    overflow-y: auto; /* Allows vertical scrolling */
                    white-space: normal; /* Ensures text wraps */
                    word-break: break-word; /* Breaks long words properly */
                    max-width: 100%; /* Prevents editor from growing */
                    max-height: 100%; /* Keeps editor within bounds */
                    scrollbar-width: thin; 
                    -ms-overflow-style: none; 
                }
                .ql-editor::-webkit-scrollbar {
                    display: none; 
                }
            `}</style>
        </div>
    );
};

export default TextEditor;
