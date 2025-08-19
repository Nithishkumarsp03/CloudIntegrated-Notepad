import { StyledTooltip } from "../../toolTip";
import { IconButton } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { Customer } from "../../../assets";
import { useParams } from "react-router-dom";

export const MobileButtons = ({ darkMode, handleMobileMenuOpen, handleProfile, handleCustomerMenuOpen, onSave, saveEditorLoading }) => {
    return (
        <>
            <IconButton
                onClick={handleMobileMenuOpen}
                sx={{ color: darkMode ? "#fff" : "#000", padding: "6px", flexShrink: 0 }}
            >
                <MoreVert fontSize="medium" />
            </IconButton>

            <StyledTooltip title={"Customer Care"}>
                <IconButton
                    onClick={handleCustomerMenuOpen}
                    sx={{ color: darkMode ? "#fff" : "#000", padding: "6px", flexShrink: 0, marginLeft: "4px" }}
                >
                    <Customer fontSize="medium" />
                </IconButton>
            </StyledTooltip>

 
        </>
    )
};
