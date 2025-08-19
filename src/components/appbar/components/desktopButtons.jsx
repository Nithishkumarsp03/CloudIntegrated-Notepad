import { StyledTooltip } from "../../toolTip";
import { IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Customer, SaveIcon, ShareIcon, MoonIcon, SunIcon } from "../../../assets";
import { useParams } from "react-router-dom";

export const DesktopButtons = ({
    darkMode,
    toggleDarkMode,
    handleShareClick,
    handleSaveClick,
    handleProfile,
    handleCustomerMenuOpen,
}) => {
    const params = useParams();    
    return (
        <>

            <StyledTooltip title={"Change Theme"}>
                <IconButton
                    onClick={toggleDarkMode}
                    sx={{ color: darkMode ? "#fff" : "#000", padding: "6px", flexShrink: 0 }}
                >
                    {darkMode ?
                        <SunIcon fontSize="medium" size={20} /> :
                        <MoonIcon fontSize="medium" size={20} />
                    }
                </IconButton>
            </StyledTooltip>
            {params?.id &&
                <StyledTooltip title={"Share"}>
                    <span
                        className="text-black dark:text-white cursor-pointer"
                        onClick={handleShareClick}
                    >
                        <ShareIcon size={20} />
                    </span>
                </StyledTooltip>
            }
            <StyledTooltip title={"Download"}>
                <IconButton
                    onClick={handleSaveClick}
                    sx={{
                        color: darkMode ? "#fff" : "#000",
                        padding: "6px",
                        flexShrink: 0,
                        '&:hover': {
                            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0)'
                        }
                    }}
                >
                    <SaveIcon size={20} />
                </IconButton>
            </StyledTooltip>

            <StyledTooltip title={"Customer Care"}>
                <IconButton
                    onClick={handleCustomerMenuOpen}
                    sx={{ color: darkMode ? "#fff" : "#000", padding: "6px", flexShrink: 0, marginLeft: "7px" }}
                >
                    <Customer fontSize="medium" />
                </IconButton>
            </StyledTooltip>

            <StyledTooltip title={"Profile"}>
                <IconButton
                    sx={{ color: darkMode ? "#fff" : "#000", padding: "6px", flexShrink: 0 }}
                    onClick={handleProfile}
                >
                    <AccountCircle fontSize="medium" />
                </IconButton>
            </StyledTooltip>

        </>
    )
}
    ;
