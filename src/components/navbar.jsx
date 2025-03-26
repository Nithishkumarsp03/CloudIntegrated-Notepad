import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotePad from "../assets/svgs/notePad";
import { cn } from "./cn";
import useEditorStore from "../globalStore";
import StyledTooltip from "./tooltop";
import { BsThreeDots } from "react-icons/bs";
import { Menu, MenuItem } from "@mui/material";
import RenameModal from "./renameModel";
import NoTabsFound from "./noTabs";

const Navbar = () => {
    const [id, setId] = useState({
        dayId: -1,
        tabId: -1,
    });

    const { isSidebarOpen, search, deleteData, data, renameData } = useEditorStore();
    const [filter, setFilter] = useState(data);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedItem, setSelectedItem] = useState({ timeIndex: -1, itemIndex: -1 });
    const [openRenameModal, setOpenRenameModal] = useState(false);
    const open = Boolean(anchorEl);

    // Sync filter with data from the store
    useEffect(() => {
        setFilter(data); // Update filter whenever data changes
    }, [data]);

    // Handle search filter
    useEffect(() => {
        if (!search) {
            setFilter(data); // Reset filter to all data if search is empty
            return;
        }
        const filteredData = data
            .map((tab) => ({
                ...tab,
                data: tab.data.filter((item) =>
                    item.title.toLowerCase().includes(search.toLowerCase())
                ),
            }))
            .filter((tab) => tab.data.length > 0);

        setFilter(filteredData);
    }, [search, data]);

    const handleRenameSave = (newName) => {
        renameData(selectedItem.timeIndex, selectedItem.itemIndex, newName);
        setOpenRenameModal(false);
        setSelectedItem({ timeIndex: -1, itemIndex: -1 });
    };

    const handleMenuClick = (event, timeIndex, itemIndex) => {
        setAnchorEl(event.currentTarget);
        setSelectedItem({ timeIndex, itemIndex });
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRename = (timeIndex, itemIndex) => {
        setOpenRenameModal(true);
        setSelectedItem({ timeIndex, itemIndex });
        handleMenuClose();
    };

    const handleClick = (dayId, tabId) => {
        setId((p) => ({ ...p, dayId, tabId }));
        navigate(`/textEditor/${tabId}`);
    };

    const handleDelete = (timeIndex, itemIndex) => {
        deleteData(timeIndex, itemIndex); // Delete the item from the store
        handleMenuClose(); // Close the menu
        setSelectedItem({ timeIndex: -1, itemIndex: -1 });
    };

    return (
        <div
            className={cn(
                "h-full p-0 w-full max-w-0 box-border border-t-black bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-800 shadow-lg transition duration-300",
                {
                    "translate-x-0 max-w-[280px] p-6": !isSidebarOpen,
                    "-translate-x-full": isSidebarOpen,
                }
            )}
        >
            {filter.length === 0 ? <div><NoTabsFound /></div> : <>
                {/* Tabs */}
                <div
                    className={cn("h-full pt-10", {
                        "opacity-0 transition duration-400": isSidebarOpen,
                        "opacity-100 transition duration-500": !isSidebarOpen,
                    })}
                >
                    <div className="pr-2 h-[90%] overflow-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-gray-800">
                        <div className="space-y-6 w-full">
                            {filter.map((tab) => (
                                <div key={tab.id}>
                                    <p className="text-xs z-10 font-semibold rounded-md p-0.5 pl-1.5 bg-blue-50 dark:bg-transparent min-h-[17px] text-blue-700 mb-3 uppercase tracking-wider sticky top-0">
                                        {tab.date}
                                    </p>
                                    <div className="space-y-1">
                                        {tab.data.map((data) => (
                                            <div
                                                key={data.id}
                                                onClick={() => handleClick(tab.id, data.id)}
                                                className={cn(
                                                    "group hover:shadow-md cursor-pointer px-4 py-1.5 h-[40px] flex items-center rounded-lg w-full overflow-hidden text-nowrap hover:bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 shadow-left-inset",
                                                    {
                                                        "bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-100 dark:border-purple-500 text-blue-700 dark:text-purple-200 shadow-sm":
                                                            id.dayId === tab.id && id.tabId === data.id,
                                                    }
                                                )}
                                            >
                                                <span className="flex items-center w-full overflow-hidden relative">
                                                    <NotePad
                                                        className={cn(
                                                            "w-4 h-4 mr-2 text-blue-500 dark:text-purple-400",
                                                            {
                                                                "text-blue-700 dark:text-purple-300":
                                                                    id.dayId === tab.id && id.tabId === data.id,
                                                            }
                                                        )}
                                                    />

                                                    <span className="w-full overflow-hidden relative">
                                                        <StyledTooltip
                                                            placement="top"
                                                            arrow
                                                            title={data.title}
                                                        >
                                                            <span className="block relative font-normal overflow-hidden">
                                                                {data.title}
                                                            </span>
                                                        </StyledTooltip>

                                                        {/* shadow effect for fading of overflown text */}
                                                        <div
                                                            className={cn(
                                                                "absolute z-10 inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-blue-50 dark:to-transparent pointer-events-none",
                                                                {
                                                                    "bg-gradient-to-r from-transparent group-hover:to-purple-100 to-purple-100 dark:to-transparent dark:group-hover:to-transparent":
                                                                        id.dayId === tab.id && id.tabId === data.id,
                                                                }
                                                            )}
                                                        />
                                                    </span>
                                                </span>
                                                <div
                                                    className="opacity-0 rounded-sm bg-transparent group-hover:opacity-100 transition-opacity duration-300 text-blue-500 dark:text-purple-400 ml-auto"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <BsThreeDots
                                                        onClick={(e) => handleMenuClick(e, tab.id, data.id)}
                                                        className="cursor-pointer"
                                                    />
                                                    {/* Menu component */}
                                                    <Menu   
                                                        id="basic-menu"
                                                        elevation={0}
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleMenuClose}
                                                        PaperProps={{
                                                            className: "bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 text-blue-700 dark:text-purple-300 text-sm border border-blue-100 dark:border-purple-900",
                                                        }}
                                                    >
                                                        <MenuItem
                                                            onClick={() => handleRename(selectedItem.timeIndex, selectedItem.itemIndex)}
                                                            className="text-blue-700 dark:text-purple-300 text-sm hover:bg-blue-100 dark:hover:bg-purple-800"
                                                        >
                                                            Rename
                                                        </MenuItem>
                                                        <MenuItem
                                                            onClick={() => handleDelete(selectedItem.timeIndex, selectedItem.itemIndex)}
                                                            className="text-blue-700 dark:text-purple-300 hover:bg-blue-100 dark:hover:bg-purple-800"
                                                        >
                                                            Delete
                                                        </MenuItem>
                                                    </Menu>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Rename Modal */}
                <RenameModal
                    open={openRenameModal}
                    onClose={() => setOpenRenameModal(false)}
                    onRename={handleRenameSave}
                />
            </>
            }
        </div>
    );
};

export default Navbar;