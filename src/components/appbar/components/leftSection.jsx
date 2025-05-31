import React from "react";
import { SearchIcon } from '../../../assets/svgs/searchIcon';
import { PanelLeftOpenIcon } from "../../../assets/svgs/leftSidebar";
import { PanelRightOpenIcon } from "../../../assets/svgs/rightSidebar";
import { InputField } from "../../../components";
import useEditorStore from "../../../store/globalStore";
import { useNavbarStore } from "../../../store/navbarStore";

export const LeftSection = ({ isSidebarOpen }) => {
    const setIsSideBarOpen = useEditorStore(state => state.setIsSideBarOpen);
    const onNavbarChange = useNavbarStore(state => state.onNavbarChange);

    return (
        <div className="flex items-center gap-10 min-w-0">
            <span
                className="cursor-pointer text-gray-500 dark:text-gray-400"
                onClick={setIsSideBarOpen}
            >
                {isSidebarOpen ?
                    <PanelLeftOpenIcon />
                    :
                    <PanelRightOpenIcon />
                }
            </span>
            <div className="hidden md:block">
                <InputField
                isSearchStyle
                startIcon={<SearchIcon className="dark:text-white w-10 text-gray-400" />}
                placeholder={"Search..."}
                onChange={(e) => {
                    const value = e.target.value;
                    setTimeout(() => {
                        onNavbarChange("searchquery",value);
                    }, 0);
                }}
            /></div>  
        </div>
    );
};
