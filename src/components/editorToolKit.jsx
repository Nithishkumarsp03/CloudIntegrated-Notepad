import { Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { fontFamilyOptions } from "../utils";
import EditorButton from "./editorButton";
import BoldIcon from "../assets/svgs/bold";


    const EditorToolKit = ({handleClick}) => {
        const [fontFamily, setFontFamily] = useState({
            family: fontFamilyOptions[0].name,
            style:fontFamilyOptions[0].family
        });

        const [activeStyles, setActiveStyles] = useState({
            bold: false,
            italic: false,
            underline: false,
            strikethrough: false,
        })

        function handleActive(key) {
            setActiveStyles((prev) => ({...prev, [key]: !prev[key] }));
        }

        return (
            <div className="bg-gray-100 p-2 rounded-2xl shadow-md flex gap-10 items-center">
                <div>
                    <Select
                        classes={{ root: "h-full max-h-11 w-full min-w-40 max-w-40 bg-white shadow-sm" }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    backgroundColor: "white",
                                    borderRadius:"7px",
                                    boxShadow: 0,
                                    mt: "-60px",
                                    border: "1px solid #D1D5DB",
                                }
                            },
                            MenuListProps: {
                                sx: {
                                    padding:0
                                }
                            }
                        }}
                        sx={{
                            borderRadius: "12px",
                            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
                            fontFamily: fontFamily.family,
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                            },
                        }}
                        value={fontFamily.family}
                        onChange={(event) => setFontFamily(p => ({...p, family:event.target.value }))}
                    >
                        {fontFamilyOptions.map(family => 
                        (
                            <MenuItem key={family.id} value={family.name} sx={{fontSize:"16px",padding:"8px",fontFamily:family.family}}>
                                {family.name}
                            </MenuItem>
                            )
                        )}
                    </Select>
                </div>
                <EditorButton btnText={<BoldIcon fill={!activeStyles.bold ? "#1F2937" : " #9CA3AF"} />} handleClick={() => handleActive("bold")} isActive={activeStyles.bold} />
            </div>
        );
    };

    export default EditorToolKit;
