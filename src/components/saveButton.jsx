import React from "react";
import { ButtonComponent } from "./button";

const SaveButton = ({ handleSave, handleSaveAsDraft }) => {
    return (
        <div className="flex justify-end gap-3 pr-[1%] scrollbar-hide">
            <ButtonComponent onClick={handleSave} btnText="Save as Draft" />
            <ButtonComponent className="save-button draft" onClick={handleSaveAsDraft} btnText="Save" />
        </div>
    );
};

export default SaveButton;
