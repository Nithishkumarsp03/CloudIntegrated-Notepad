import React, { useState } from 'react';
import '../styles/navbar.css';
import { useNavigate } from 'react-router-dom';
import useEditorStore from '../globalStore';
import { ButtonComponent } from './button';
import { GoTrash } from "react-icons/go";

const Navbar = ({ setId, id }) => {
    const [newId, setNewId] = useState(4);
    const { tabs, setTab, deleteTabContent } = useEditorStore();
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
        event.stopPropagation(); // Prevent tab selection on delete click
        deleteTabContent(tabId);
    }

    return (
        <div className='navBar'>
            <div className='tabs-list'>
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={tab.id === id ? 'tab-item-selected' : 'tab-item'}
                        onClick={() => handleClick(tab.id)}
                    >
                        <span className='tabNames'><input className='input' value={tab.title} /></span>
                        <GoTrash
                            color='red'
                            onClick={(event) => handleDelete(event, tab.id)}
                            className="delete-icon"
                        />
                    </div>
                ))}

                <div className="addButton">
                    <ButtonComponent
                        btnText="New Tab"
                        styles={{ width: "100px", borderRadius: "12px", marginTop: "10px" }}
                        handleClick={handleTabs}
                    />
                </div>
            </div>

        </div>
    );
};

export default Navbar;
