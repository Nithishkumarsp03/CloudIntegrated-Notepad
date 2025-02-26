import React, { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import useEditorStore from "../globalStore";

const TextEditor = ({ id = 1 }) => {
    const { tabs, updateTabContent } = useEditorStore();
    const tab = tabs.find((tab) => tab.id === id);
    const initialContent = tab ? tab.content : "";

    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        setContent(initialContent ? initialContent : 1);
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
                        "font",
                        "size",
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
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "8px",
                }}
            >
                <select className="ql-font">
                    <option value="sans-serif">Sans-Serif</option>
                    <option value="serif">Serif</option>
                    <option value="monospace">Monospace</option>
                </select>

                <select className="ql-size">
                    <option value="10px">10px</option>
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px" selected>16px</option>
                    <option value="18px">18px</option>
                    <option value="24px">24px</option>
                    <option value="32px">32px</option>
                </select>

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
    background: white !important;
    border: none !important;
    border-radius: 0 12px 0 0; /* No left border-radius */
    overflow: hidden;
}

.ql-toolbar {
    background: white !important; /* White background */
    border: none !important; /* Removed border */
    border-radius: 0 0 0 0; /* No border-radius */
    padding: 6px;
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
    background: white !important;
    color: black;
    border: none !important; /* Removed border */
    border-radius: 0 0 0 0; /* No border-radius */
}

.ql-editor::-webkit-scrollbar {
    display: none;
}

#custom-toolbar {
    background: white !important; /* Toolbar background */
    border: none !important; /* Removed border */
    border-radius: 0 0 12px 0; /* No left border-radius */
    padding: 12px; /* Increased padding */
    height: 70px; /* Increased height */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px; /* More space between elements */
}

/* Styles for Buttons & Select Dropdowns */
#custom-toolbar button,
#custom-toolbar select {
    background: white !important;
    border: none !important; /* Removed border */
    padding: 12px 16px; /* Increased button padding */
    height: 45px; /* Increased height */
    min-width: 50px; /* Ensures buttons have enough width */
    border-radius: 8px; /* Rounded corners */
    cursor: pointer;
    font-size: 18px; /* Larger font size */
    font-weight: 600; /* Semi-bold for better readability */
    transition: background 0.3s ease, transform 0.1s ease;
}

/* Hover effect for buttons */
#custom-toolbar button:hover,
#custom-toolbar select:hover {
    background: #f0f0f0;
    transform: scale(1.05);
}

/* Bold & Bigger Font Styles for Select Menus */
#custom-toolbar select.ql-font,
#custom-toolbar select.ql-size,
#custom-toolbar select.ql-header {
    font-weight: 700 !important; /* Makes text bold */
    font-size: 20px !important; /* Increases text size */
    padding: 10px 14px !important; /* Adds more space */
    height: 50px; /* Taller select box */
    border-radius: 8px;
    cursor: pointer;
}

/* Ensure Dropdown Options are Also Bold */
#custom-toolbar select.ql-font option,
#custom-toolbar select.ql-size option,
#custom-toolbar select.ql-header option {
    font-weight: 700; /* Ensures options are bold */
    font-size: 18px;
}
                
`}</style>

        </div>
    );
};

export default TextEditor;
