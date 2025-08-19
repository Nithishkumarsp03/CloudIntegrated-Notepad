import React from "react";
import NotePad from '../../../assets/svgs/notePad';
import { BsThreeDots } from "react-icons/bs";
import { StyledTooltip, cn } from "../../../components";

const NoteItem = ({ data, isActive, isMobile, onClick, onMenuClick }) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "group hover:shadow-md cursor-pointer px-4 py-1.5 flex items-center rounded-lg w-full overflow-hidden hover:bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300",
                {
                    "bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-100 dark:border-purple-500 text-blue-700 dark:text-purple-200 shadow-sm": isActive,
                }
            )}
        >
            <span className="flex items-center w-full overflow-hidden relative">
                <NotePad
                    className={cn(
                        "mr-2 text-blue-500 dark:text-purple-400 flex-shrink-0",
                        {
                            "text-blue-700 dark:text-purple-300": isActive,
                            "w-4 h-4": !isMobile,
                            "w-3.5 h-3.5": isMobile,
                        }
                    )}
                />

                <span className="w-full overflow-hidden relative">
                    <StyledTooltip
                        placement="top"
                        arrow
                        title={data}
                    >
                        <span className="block relative font-normal overflow-hidden whitespace-nowrap dark:text-ellipsis">
                            {data}
                        </span>
                    </StyledTooltip>

                    <div
                        className={cn(
                            "absolute z-10 inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-blue-50 dark:from-transparent pointer-events-none",
                            {
                                "group-hover:to-purple-100 to-purple-100 dark:group-hover:to-transparent dark:to-transparent": isActive,
                            }
                        )}
                    />
                </span>
            </span>
            <div
                className="opacity-1 sm:opacity-0 rounded-sm bg-transparent group-hover:opacity-100 transition-opacity duration-300 text-blue-500 dark:text-purple-400 ml-auto flex-shrink-0"
                onClick={(e) => {
                    e.stopPropagation();
                    onMenuClick(e);
                }}
            >
                <BsThreeDots
                    className={cn("cursor-pointer", {
                        "text-base": !isMobile,
                        "text-sm": isMobile,
                    })}
                />
            </div>
        </div>
    );
};

export default NoteItem;
