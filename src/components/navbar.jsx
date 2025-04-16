import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotePad from "../assets/svgs/notePad";
import { cn } from "./cn";
import useEditorStore from "../store/globalStore";
import StyledTooltip from "./tooltop";
import { BsThreeDots } from "react-icons/bs";
import { Menu, MenuItem, useMediaQuery } from "@mui/material";
import RenameModal from "./renameModel";
import NoTabsFound from "./noTabs";
import { ButtonComponent } from "./button";
import { Add } from "@mui/icons-material";

const Navbar = () => {
    const [id, setId] = useState({
        dayId: -1,
        tabId: -1,
    });

    const { isSidebarOpen, search, setSearch, deleteData, data, renameData, darkMode, getHeading,addNewTab } = useEditorStore();
    const [filter, setFilter] = useState(data);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedItem, setSelectedItem] = useState({ timeIndex: -1, itemIndex: -1 });
    const [openRenameModal, setOpenRenameModal] = useState({ state: false, value: '' });
    const [localSearch, setLocalSearch] = useState("");
    const open = Boolean(anchorEl);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [newNote, setNewNote] = useState(false);


    useEffect(() => {
        if (data && data.length) {
            setFilter(data);
            if (id.dayId == -1 && id.tabId == -1) {
                setId({ dayId: data[0].id, tabId: data[0].data[0].id })
            }
            navigate(`/textEditor/${data[0].id}`)
        }
    }, [data]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(localSearch);
        }, 300);

        return () => clearTimeout(timer);
    }, [localSearch, setSearch]);

    useEffect(() => {
        if (!search) {
            setFilter(data);
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
        setOpenRenameModal({
            state: false,
            value: ''
        });
        setSelectedItem({ timeIndex: -1, itemIndex: -1});
    };

    const handleMenuClick = (event, timeIndex, itemIndex,value) => {
        setAnchorEl(event.currentTarget);
        setSelectedItem({ timeIndex, itemIndex, value });
        setOpenRenameModal({state:false,value})
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRename = (timeIndex, itemIndex,value) => {
        setOpenRenameModal({
            state: true,
            value
        });
        setSelectedItem({ timeIndex, itemIndex});
        handleMenuClose();
    };

    const handleClick = (dayId, tabId) => {
        setId((p) => ({ ...p, dayId, tabId }));
        navigate(`/textEditor/${dayId}`);
        if (isMobile) {
            useEditorStore.setState({ isSidebarOpen: true });
        }
    };

    const handleDelete = (timeIndex, itemIndex) => {
        deleteData(timeIndex, itemIndex);
        handleMenuClose();
        setSelectedItem({ timeIndex: -1, itemIndex: -1, value:'' });
    };

    return (
        <>
            {isMobile && !isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => useEditorStore.setState({ isSidebarOpen: true })}
                />
            )}

            <div
                className={cn(
                    "flex-shrink-0 h-screen overflow-hidden py-4 box-border border-r border-gray-200 dark:border-gray-800 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg transition-all duration-300 ease-in-out",
                    {
                        "w-[280px]": !isSidebarOpen && !isMobile,
                        "w-0 border-r-0": isSidebarOpen && !isMobile,
                        "fixed inset-y-0 left-0 z-50 w-[280px] lg:relative lg:inset-auto": isMobile,
                        "-translate-x-full lg:translate-x-0": isMobile && isSidebarOpen,
                    }
                )}
            >
                <div className="h-full flex flex-col">
                    {isMobile && !isSidebarOpen && (
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="font-medium text-gray-700 dark:text-gray-300">My Notes</h3>
                            <button
                                onClick={() => useEditorStore.setState({ isSidebarOpen: true })}
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
                    )}


                    <div className="px-4 pt-4 pb-6 md:hidden">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search notes..."
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                className={cn(
                                    "block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg",
                                    "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200",
                                    "focus:outline-none focus:ring-[0.5px] focus:ring-blue-500 focus:border-blue-500",
                                    "dark:focus:ring-purple-500 dark:focus:border-purple-500",
                                    "placeholder-gray-400 dark:placeholder-gray-500 text-sm md:"
                                )}
                            />
                            {localSearch && (
                                <button
                                    onClick={() => setLocalSearch("")}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <svg
                                        className="h-4 w-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>


                    <div className="px-4 pb-6 flex gap-4">
                        <ButtonComponent
                            btnText="New Note"
                            startIcon={<Add />}
                            handleClick={() => setNewNote(!newNote)}
                            styles={{
                                // width: "130px",
                                height: "40px",
                                backgroundColor: darkMode ? "#7C3AED" : "#2563EB", 
                                color: "white",
                                borderRadius: "8px",
                                textTransform: "none",
                                fontWeight: 500,
                                fontSize: "0.875rem",
                                "&:hover": {
                                    backgroundColor: darkMode ? "#6D28D9" : "#3B82F6", 
                                    boxShadow: darkMode ? "0 2px 4px rgba(0,0,0,0.3)" : "0 2px 4px rgba(0,0,0,0.1)"
                                },
                                "&:active": {
                                    backgroundColor: darkMode ? "#5B21B6" : " #1D4ED8" 
                                },
                                "& .MuiButton-startIcon": {
                                    marginRight: "8px",
                                    "& svg": {
                                        fontSize: "20px"
                                    }
                                }
                            }}
                        />
                    </div>

                    <div className="md:h-[calc(100%-113px)] h-[calc(100%-200px)] flex flex-col">
                        {filter.length === 0 ? (
                            <div className="flex-1 flex items-center justify-center p-4">
                                <NoTabsFound />
                            </div>
                        ) : (
                            <div className={cn(
                                "flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50 dark:scrollbar-thumb-purple-600 dark:scrollbar-track-transparent",
                                { "pb-4": !isMobile }
                            )}>
                                <div className="space-y-6 px-4 pb-4">
                                    {filter.map((tab) => (
                                        <div key={tab.id}>
                                            <p className="text-xs z-10 font-semibold rounded-md dark:rounded-sm pl-1.5 bg-blue-50 dark:bg-gray-900 dark:pt-0.5 min-h-[20px] text-blue-700 mb-3 uppercase tracking-wider sticky top-0">
                                                {getHeading(tab.date)}
                                            </p>
                                            <div className="space-y-1">
                                                {tab.data.map((data) => (
                                                    <div
                                                        key={data.id}
                                                        onClick={() => handleClick(tab.id, data.id)}
                                                        className={cn(
                                                            "group hover:shadow-md cursor-pointer px-4 py-1.5 flex items-center rounded-lg w-full overflow-hidden hover:bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300",
                                                            {
                                                                "bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-100 dark:border-purple-500 text-blue-700 dark:text-purple-200 shadow-sm":
                                                                    id.dayId === tab.id && id.tabId === data.id,
                                                            }
                                                        )}
                                                    >
                                                        <span className="flex items-center w-full overflow-hidden relative">
                                                            <NotePad
                                                                className={cn(
                                                                    "mr-2 text-blue-500 dark:text-purple-400 flex-shrink-0",
                                                                    {
                                                                        "text-blue-700 dark:text-purple-300":
                                                                            id.dayId === tab.id && id.tabId === data.id,
                                                                        "w-4 h-4": !isMobile,
                                                                        "w-3.5 h-3.5": isMobile,
                                                                    }
                                                                )}
                                                            />

                                                            <span className="w-full overflow-hidden relative">
                                                                <StyledTooltip
                                                                    placement="top"
                                                                    arrow
                                                                    title={data.title}
                                                                >
                                                                    <span className="block relative font-normal overflow-hidden whitespace-nowrap dark:text-ellipsis">
                                                                        {data.title}
                                                                    </span>
                                                                </StyledTooltip>

                                                                <div
                                                                    className={cn(
                                                                        "absolute z-10 inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-blue-50 dark:from-transparent pointer-events-none",
                                                                        {
                                                                            "group-hover:to-purple-100 to-purple-100 dark:group-hover:to-transparent dark:to-transparent":
                                                                                id.dayId === tab.id && id.tabId === data.id,
                                                                        }
                                                                    )}
                                                                />
                                                            </span>
                                                        </span>
                                                        <div
                                                            className="opacity-1 sm:opacity-0 rounded-sm bg-transparent group-hover:opacity-100 transition-opacity duration-300 text-blue-500 dark:text-purple-400 ml-auto flex-shrink-0 "
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <BsThreeDots
                                                                onClick={(e) => handleMenuClick(e, tab.id, data.id,data.title)}
                                                                className={cn("cursor-pointer", {
                                                                    "text-base": !isMobile,
                                                                    "text-sm": isMobile,
                                                                })}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <Menu
                    id="basic-menu"
                    elevation={0}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    MenuListProps={{
                        sx: {
                            padding: 0,
                        }
                    }}
                    PaperProps={{
                        sx: {
                            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                            },
                        className: `
                            bg-blue-400 dark:bg-gray-800 
                            text-gray-900 dark:text-purple-200 
                            text-sm 
                            border dark:border-gray-700
                            shadow-lg dark:shadow-purple-900/10
                            rounded-md
                            min-w-[120px]
                        `,
                    }}
                >
                    <MenuItem
                        onClick={() => handleRename(selectedItem.timeIndex, selectedItem.itemIndex)}
                        className={`
                            text-gray-700 dark:text-purple-200 
                            hover:bg-blue-50 dark:hover:bg-purple-900/50
                            transition-colors duration-200
                        `}
                    >
                        <div className="py-1 px-1 text-sm font-normal">
                            Rename
                        </div>
                    </MenuItem>
                    <MenuItem
                        onClick={() => handleDelete(selectedItem.timeIndex, selectedItem.itemIndex)}
                        className={`
                            text-gray-700 dark:text-purple-200 
                            hover:bg-blue-50 dark:hover:bg-purple-900/30
                            transition-colors duration-200
                        `}
                    >
                        <div className="py-1 px-1 text-sm font-normal">
                            Delete
                        </div>
                    </MenuItem>
                </Menu>
        

                <RenameModal
                    open={openRenameModal.state}
                    onClose={() => setOpenRenameModal(false)}
                    onRename={handleRenameSave}
                    mobile={isMobile}
                    value={openRenameModal.value}
                />
            </div>
            <RenameModal
                open={newNote}
                onClose={() => setNewNote(false)}
                heading="New Note"
                placeholder="Enter Note Name"
                onRename={(e) => { addNewTab(e)}}
            />
        </>
    );
};

export default Navbar;