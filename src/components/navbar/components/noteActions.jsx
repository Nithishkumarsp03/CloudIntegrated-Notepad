import React from "react";
import { Add } from "@mui/icons-material";
import { ButtonComponent } from "../../../components";
import { logo } from "../../../assets";

const NoteActions = ({ setNewNote, newNote, loading, notePad }) => {
    return (
        <div className="px-4 pb-4 flex gap-4 mb-3">
            {!notePad ? (
                <ButtonComponent
                    btnText="New Note"
                    loading={loading}
                    startIcon={<Add />}
                    handleClick={() => setNewNote(!newNote)}
                />
            ) : (
                    <div className="w-full text-center mb-[-4px] ">
                    <div className="flex gap-4 items-center text-blue-500 dark:text-purple-400 text-lg text-nowrap">
                        <img src={logo} className="h-10" />
                        SP Notepad
                        </div>    
                   <hr className="border border-gray-300 dark:border-gray-700 rounded-md mt-2" />
                        </div>
            )}
        </div>
    );
};

export default NoteActions;