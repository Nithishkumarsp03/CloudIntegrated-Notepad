import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Appbar from "../components/appbar";
import Tiptap from "../components/textEditor";
import EditorToolKit from "../components/editorToolKit";
import { useMediaQuery } from "@mui/material";
import useEditorStore from "../globalStore";
import { cn } from "../components/cn";

const Main = () => {
  const [active, setActive] = useState('');
  const [fontStyle, setFontStyle] = useState('arial');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isSidebarOpen } = useEditorStore();

  // Close sidebar when switching to mobile view
  useEffect(() => {
    if (isMobile) {
      useEditorStore.setState({ isSidebarOpen: false });
    }
  }, [isMobile]);

  return (
    <div className="flex flex-col h-screen dark:bg-gray-900 w-full overflow-hidden">
      <Appbar />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Navbar - positioned absolutely on mobile, normally in flex on desktop */}
        <div className={cn(
          "h-full transition-all duration-300",
          {
            "fixed inset-y-0 left-0 z-20": isMobile,
            "relative": !isMobile,
            "translate-x-0": !isMobile || !isSidebarOpen,
            "-translate-x-full": isMobile && isSidebarOpen
          }
        )}>
          <Navbar />
        </div>

        {/* Content area with editor */}
        <div className={cn(
          "flex flex-col flex-1 p-3.5 gap-4 transition-all duration-300",
          {
            "ml-0": isMobile || isSidebarOpen,
            "lg:ml-[0px]": !isMobile && !isSidebarOpen,
            "w-full": isMobile,
            "w-[calc(100%-280px)]": !isMobile && !isSidebarOpen
          }
        )}>
          <Tiptap action={active} fontStyle={fontStyle} />
          <EditorToolKit
            handleClick={e => setActive(e)}
            fontStyle={setFontStyle}
          />
        </div>

        {/* Mobile overlay when navbar is open */}
        {isMobile && !isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={() => useEditorStore.setState({ isSidebarOpen: true })}
          />
        )}
      </div>
    </div>
  );
};

export default Main;