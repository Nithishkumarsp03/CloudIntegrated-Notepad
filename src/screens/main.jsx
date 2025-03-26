import React, { useState } from "react";
import Navbar from "../components/navbar";
import Appbar from "../components/appbar";
import Tiptap from "../components/textEditor";
import EditorToolKit from "../components/editorToolKit";

const Main = () => {

  const [active, setActive] = useState('');

  return (
    <div className="flex flex-col h-screen dark:bg-gray-900 w-full">
      <Appbar />
      <div className="flex overflow-hidden">
        <Navbar />
        <div className="flex flex-col p-3.5 gap-4">
          <Tiptap active={active} />
          <EditorToolKit handleClick={e => setActive(e)} />
        </div> 
      </div>
    </div>
  );
};


export default Main;
