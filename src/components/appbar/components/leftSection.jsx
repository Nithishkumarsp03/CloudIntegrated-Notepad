import React from "react";
import { SearchIcon } from '../../../assets/svgs/searchIcon';
import { PanelLeftOpenIcon } from "../../../assets/svgs/leftSidebar";
import { PanelRightOpenIcon } from "../../../assets/svgs/rightSidebar";
import { InputField } from "../../inputFields/inputField";
import useEditorStore from "../../../store/globalStore";

const LeftSection = ({ isSidebarOpen }) => {
    const setIsSideBarOpen = useEditorStore(state => state.setIsSideBarOpen);

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
            <InputField
                isSearchStyle
                startIcon={<SearchIcon className="dark:text-white w-10 text-gray-400" />}
                placeholder={"Search..."}
                onChange={(e) => {
                    const value = e.target.value;
                    setTimeout(() => {
                        useEditorStore.getState().setSearch(value);
                    }, 0);
                }}
            />
        </div>
    );
};

export default LeftSection;