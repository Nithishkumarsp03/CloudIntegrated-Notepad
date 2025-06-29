import React, { useState } from 'react'
import useEditorStore from '../../../store/globalStore';
import { cn, InputField } from '../../../components';
import { SearchIcon } from '../../../assets/svgs/searchIcon';
import { logo } from '../../../assets';
import { useNavbarStore } from '../../../store/navbarStore';
import { useTextEditorStore } from '../../../store/textEditorStore';

const MobileHeader = () => {
    const [localSearch, setLocalSearch] = useState("");
    const onNavbarChange = useNavbarStore(state => state.onNavbarChange);
    const isSidebarOpen = useTextEditorStore(state => state.isSidebarOpen);

    function handleChange(e) {
        setLocalSearch(e.target.value);
        onNavbarChange("searchquery", e.target.value);
    }
    return (
        <div>
            <div className="flex items-center justify-between p-2 pl-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-4 items-center text-blue-500 dark:text-purple-400 text-md text-nowrap">
                    <img src={logo} className="h-9" />
                    SP Notepad
                </div>
                <button
                    onClick={() => onNavbarChange("isSidebarOpen",!isSidebarOpen)}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600 dark:text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="px-4 pt-4 pb-6 md:hidden">
                <InputField
                    value={localSearch}
                    onChange={handleChange}
                    autocomplete={"off"}
                    isSearchStyle
                    startIcon={<SearchIcon className="dark:text-white w-10 text-gray-400" />}
                    placeholder={"Search..."}

                />
            </div>
          
        </div>
    )
}
export default MobileHeader;
