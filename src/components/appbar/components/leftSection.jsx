import React from "react";
import { SearchIcon } from '../../../assets/svgs/searchIcon';
import { PanelLeftOpenIcon } from "../../../assets/svgs/leftSidebar";
import { PanelRightOpenIcon } from "../../../assets/svgs/rightSidebar";
import { InputField } from "../../../components";
import { useNavbarStore } from "../../../store/navbarStore";

export const LeftSection = () => {
    const isSidebarOpen = useNavbarStore(state => state.isSidebarOpen);
    const onNavbarChange = useNavbarStore(state => state.onNavbarChange);

    return (
        <div className="flex items-center gap-10">
            <span
                className="cursor-pointer text-gray-500 dark:text-gray-400"
                onClick={() => onNavbarChange("isSidebarOpen",!isSidebarOpen)}
            >
                {isSidebarOpen ?
                    <PanelLeftOpenIcon />
                    :
                    <PanelRightOpenIcon />
                }
            </span>
            <div className="hidden md:block">
                <InputField
                autocomplete={"off"}
                isSearchStyle
                startIcon={<SearchIcon className="dark:text-white w-10 text-gray-400" />}
                placeholder={"Search..."}
            /></div>  
        </div>
    );
};
