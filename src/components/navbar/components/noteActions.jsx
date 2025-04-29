import React from "react";
import { Add } from "@mui/icons-material";
import { ButtonComponent } from "../../button/button";

const NoteActions = ({ setNewNote, newNote }) => {
    return (
        <div className="px-4 pb-6 flex gap-4">
            <ButtonComponent
                btnText="New Note"
                startIcon={<Add />}
                handleClick={() => setNewNote(!newNote)}
            />
        </div>
    );
};

export default NoteActions;