import React, { useEffect } from "react";
import { cn } from "../../cn";
import NoTabsFound from "./noTabs";
import NoteItem from "./noteItems";
import { Skeleton } from "@mui/material";
import { useTextEditorStore } from "../../../store/textEditorStore";
import { useNavbarStore } from "../../../store/navbarStore";

const NotesList = ({ filter, isMobile, id, setId, handleMenuClick, loading, handleuuid }) => {
    const tabSaved = useTextEditorStore(e => e.tabSaved);
    const addNoteContent = useTextEditorStore(e => e.addNoteContent);
    const noteId = useNavbarStore(e => e.noteId);
    const handleClick = (uuid, note_id) => {
        localStorage.setItem("uuid", uuid);
        localStorage.setItem("note_id", note_id);
        if (!tabSaved) {
            const notes = localStorage.getItem("editorContent");
            addNoteContent(noteId, notes);
            handleuuid(uuid, note_id);
            setId(uuid);
        } else {
            handleuuid(uuid, note_id);
            setId(uuid);
        }
    };


    const renderSkeletons = () => {
        return Array(4).fill(0).map((_, index) => (
            <div key={`skeleton-${index}`} className="px-4">
                <Skeleton variant="text" height={60} />
            </div>
        ));
    };

    return (
        <div className="md:h-[calc(100%-113px)] h-[calc(100%-200px)] flex flex-col">
            {loading ? (
                <div className={cn(
                    "flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-transparent",
                    { "pb-4": !isMobile }
                )}>
                    {renderSkeletons()}
                </div>
            ) : filter.length === 0 ? (
                <div className="flex-1 flex items-center justify-center p-4">
                    <NoTabsFound />
                </div>
            ) : (
                <div className={cn(
                    "flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-transparent",
                    { "pb-4": !isMobile }
                )}>
                    <div className="space-y-6 px-4 pb-4">
                        {filter?.map((tab) => (
                            <div key={tab?.uuid}>
                                <NoteItem
                                    key={tab?.uuid}
                                    data={tab?.note_name}
                                    isActive={id === tab?.uuid}
                                    isMobile={isMobile}
                                    onClick={() => handleClick(tab?.uuid, tab?.id)}
                                    onMenuClick={e => handleMenuClick(e, tab?.uuid, tab?.note_name)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotesList;