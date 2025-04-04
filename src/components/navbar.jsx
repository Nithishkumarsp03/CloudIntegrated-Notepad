import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEditorStore from "../globalStore";
import { ButtonComponent } from "./button";
import { GoTrash } from "react-icons/go";

const Navbar = ({ setId, id }) => {
    const [newId, setNewId] = useState(4);
    const [editingTabId, setEditingTabId] = useState(null);
    const { tabs, setTab, deleteTab, updateTabTitle } = useEditorStore();
    const navigate = useNavigate();

    function handleTabs() {
        setTab(newId, `Tab ${newId}`);
        setNewId(newId + 1);
    }

    function handleClick(tabId) {
        setId(tabId);
        navigate(`/textEditor/${tabId}`);
    }

    function handleDelete(event, tabId) {
        event.stopPropagation();
        deleteTab(tabId);
    }

    function handleDoubleClick(tabId) {
        setEditingTabId(tabId);
    }

    function handleTitleChange(event, tabId) {
        updateTabTitle(tabId, event.target.value);
    }

    function handleBlur() {
        setEditingTabId(null);
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            setEditingTabId(null);
        }
    }

    return (
        <div className="w-[120px] bg-[#f5f7fa] relative box-border border-t-[5px] border-white scrollbar-hide">
            <div className="flex flex-col text-center h-[587px] overflow-scroll scrollbar-hide w-full pb-2.5 gap-0.5">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`relative cursor-pointer py-[14px] flex gap-2 items-center justify-center font-medium transition-all duration-300 ease-in-out group 
        ${tab.id === id ? "bg-white border-l-[5px] border-[#0b6bcb] shadow-md animate-popup" : ""}`}
                        onClick={() => handleClick(tab.id)}
                        onDoubleClick={() => handleDoubleClick(tab.id)}
                    >
                        <span className="max-w-[50px] whitespace-nowrap overflow-hidden text-ellipsis font-medium text-[#BDBDBD]">
                            {editingTabId === tab.id ? (
                                <input
                                    className={`border-none outline-none bg-transparent w-full text-center font-medium  ${tab.id === id ? "text-[#0b6bcb] font-medium" : "text-[#BDBDBD] font-medium"
                                        }`}
                                    value={tab.title}
                                    onChange={(event) => handleTitleChange(event, tab.id)}
                                    onBlur={() => handleBlur(tab.id)}
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                />
                            ) : (
                                <span className={`max-w-[50px] whitespace-nowrap overflow-hidden text-ellipsis font-medium ${tab.id === id ? "text-[#0b6bcb]" : "text-[#BDBDBD]"}`}>{tab.title}</span>
                            )}
                        </span>
                        <GoTrash
                            color="red"
                            onClick={(event) => handleDelete(event, tab.id)}
                            className="hidden group-hover:block"
                        />
                    </div>
                ))}

                <div className="sticky bottom-[-3px] bg-[#f5f7fa] px-1.5 mt-1">
                    <ButtonComponent btnText="New Tab" handleClick={handleTabs} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
