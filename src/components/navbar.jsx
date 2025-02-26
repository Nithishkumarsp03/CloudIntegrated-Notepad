import React, { useState } from 'react';
import '../styles/navbar.css';
import {  useNavigate } from 'react-router-dom';
import useEditorStore from '../globalStore';
import { ButtonComponent } from './button';

const Navbar = (
    {
        setId,
        id
    }
) => {

    const [newId, setNewId] = useState(4);
    const { tabs, setTab } = useEditorStore();

    const navigate = useNavigate();


    function handleTabs() {
        setTab(newId, `Tab ${newId}`);
        setNewId(newId + 1);
    }


    function handleClick(id) {
        setId(id);
        navigate(`/textEditor/${id}`);
    }

  return (
    <div className='navBar'>
          <div className='tabs-list'>
              {tabs.map((tab) => {
                  return (
                      <div key={tab.id} className={tab.id === id ? 'tab-item-selected' : 'tab-item'} onClick={() => handleClick(tab.id)}>
                          {tab.title}
                      </div>
                  )
              })}
              <div className="addButton">
              <ButtonComponent btnText="New Tab" styles={{ width: "100px", borderRadius: "12px" ,marginTop:'10px'}} handleClick={handleTabs} />
              </div>
              </div>
    </div>
  )
}

export default Navbar;
