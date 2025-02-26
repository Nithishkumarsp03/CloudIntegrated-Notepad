import React, { useState } from 'react';
import '../styles/mainPage.css';
import TextEditor from './textEditor';
import Navbar from './navbar';

const RightContentMainPage = () => {

  const [id, setId] = useState(1);

  return (
      <div className='right-content'>
        <Navbar setId={setId} id={id} />
          <TextEditor id={id} />
      </div>
  )
}

export default RightContentMainPage;
