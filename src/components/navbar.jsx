import React from 'react';
import '../styles/navbar.css';
import {  useNavigate } from 'react-router-dom';
import useEditorStore from '../globalStore';

const Navbar = (
    {
        setId,
    }
) => {

    const { tabs } = useEditorStore();

    const navigate = useNavigate();

    function handleClick(id) {
        setId(id);
        navigate(`/textEditor/${id}`);
    }

  return (
    <div className='navBar'>
          <div className='tabs-list'>
              {tabs.map((tab) => {
                  return (
                      <div key={tab.id} className='tab-item' onClick={() => handleClick(tab.id)}>
                          {tab.title}
                      </div>
                  )
              })}
          </div>
    </div>
  )
}

export default Navbar;
