import React, { useState, useEffect } from "react";
import {Navbar} from "../components/navbar";
import { useMediaQuery } from "@mui/material";
import useEditorStore from "../store/globalStore";
import { cn } from "../components/cn";
import Texteditor from "../components/editor";
import {Appbar} from "../components/appbar";
import { useNavbarStore } from "../store/navbarStore";

const Main = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isSidebarOpen } = useEditorStore();
  const { noteId } = useNavbarStore();

  useEffect(() => {
    if (isMobile) {
      useEditorStore.setState({ isSidebarOpen: true });
    }
  }, [isMobile]);


  return (
    <div className="flex flex-col h-screen dark:bg-gray-900 w-full overflow-hidden relative">
      <Appbar noteId={noteId} />
      <div className="flex flex-1 overflow-hidden relative">
        <Navbar />
        <div className={cn(
          "h-full p-4 pb-2 transition-all w-full duration-300 ease-in-out",
          {
            'w-[1258px]' : !isSidebarOpen
          }
        )}>
          <Texteditor noteId={noteId} />
        </div>
      </div>
    </div>
  );
};

export default Main;