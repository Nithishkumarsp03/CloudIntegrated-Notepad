import React from "react";
import { Add } from "@mui/icons-material";
import { ButtonComponent } from "../../../components";

const NoteActions = ({ setNewNote, newNote, loading }) => {
    return (
        <div className="px-4 pb-6 flex gap-4">
            <ButtonComponent
                btnText="New Note"
                loading={loading}
                startIcon={<Add />}
                handleClick={() => setNewNote(!newNote)}
            />
        </div>
    );
};

export default NoteActions;