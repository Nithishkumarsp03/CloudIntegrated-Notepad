import React, { useState } from 'react';
import TextEditor from './textEditor';
import Navbar from './navbar';

const RightContentMainPage = () => {
  const [id, setId] = useState(1);

  return (
    <div className="flex box-border h-full w-full pr-4">
      <Navbar setId={setId} id={id} />
      <TextEditor id={id} />
    </div>
  );
};

export default RightContentMainPage;
