import React, { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import useEditorStore from "../globalStore";

const TextEditor = ({ id }) => {
    const { tabs, updateTabContent } = useEditorStore();
    const tab = tabs.find((tab) => tab.id === id);
    const initialContent = tab ? tab.content : "";

    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        setContent(initialContent);
    }, [id, tabs, tab, initialContent]);

    // Update store whenever content changes
    const handleContentChange = (value) => {
        setContent(value);
        updateTabContent(id, value);
    };

    const modules = {
        toolbar: { container: "#custom-toolbar" },
    };

    return (
        <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                position: "relative",
            }}
        >
            {/* Quill Editor */}
            <div style={{ flex: 1 }}>
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={handleContentChange} // Use the function that updates Zustand store
                    modules={modules}
                    formats={[
                        "header",
                        "bold",
                        "italic",
                        "underline",
                        "strike",
                        "color",
                        "background",
                        "list",
                        "bullet",
                        "blockquote",
                        "code-block",
                        "link",
                        "image",
                        "align",
                    ]}
                    style={{
                        height: "100%",
                        width: "100%",
                    }}
                />
            </div>

            {/* Custom toolbar at the bottom */}
            <div
                id="custom-toolbar"
                style={{
                    width: "100%",
                    background: "#f3f3f3",
                    padding: "5px",
                    borderTop: "1px solid #ccc",
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "8px",
                }}
            >
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
                <button className="ql-strike"></button>

                <select className="ql-header">
                    <option value="1">H1</option>
                    <option value="2">H2</option>
                    <option value="3">H3</option>
                    <option selected></option>
                </select>

                <select className="ql-color"></select>
                <select className="ql-background"></select>

                <button className="ql-list" value="ordered"></button>
                <button className="ql-list" value="bullet"></button>

                <select className="ql-align">
                    <option selected></option>
                    <option value="center"></option>
                    <option value="right"></option>
                </select>

                <button className="ql-blockquote"></button>
                <button className="ql-code-block"></button>

                <button className="ql-link"></button>
                <button className="ql-image"></button>

                <button className="ql-clean"></button>
            </div>

            <style>{`
                .ql-container {
                    width: 100%;
                    height: 100%;
                }
                .ql-editor {
                    overflow-x: hidden;
                    overflow-y: auto;
                    white-space: normal;
                    word-break: break-word;
                    max-width: 100%;
                    max-height: 100%;
                    scrollbar-width: thin;
                    -ms-overflow-style: none;
                }
                .ql-editor::-webkit-scrollbar {
                    display: none;
                }
                #custom-toolbar button,
                #custom-toolbar select {
                    background: #fff;
                    border: 1px solid #ccc;
                    padding: 4px 8px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                }
                #custom-toolbar button:hover,
                #custom-toolbar select:hover {
                    background: #e3e3e3;
                }
            `}</style>
        </div>
    );
};

export default TextEditor;
