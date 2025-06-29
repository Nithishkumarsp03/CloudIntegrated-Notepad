import React, { useState } from "react";
import { AppBar, Toolbar, useMediaQuery } from "@mui/material";
import useEditorStore from "../../store/globalStore";
import { logo } from '../../assets';
import { cn, ShareModal, SaveModal } from "../../components";
import { useTextEditorStore } from "../../store/textEditorStore"; 
import { CustomerMenu, LeftSection, MobileMenu, RightSection } from "./components";
import { useLocation } from "react-router-dom";

export const Appbar = () => {
    const [customerAnchorEl, setCustomerAnchorEl] = useState(null);
    const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
    const [saveModal, setSaveModal] = useState(false);
    const [share, setShare] = useState(false);
    const darkMode = useEditorStore(e => e.darkMode);   
    const addNoteContent = useTextEditorStore(e => e.addNoteContent);
    const isMobile = useMediaQuery("(max-width:768px)");

    const handleCustomerMenuOpen = (event) => {
        setCustomerAnchorEl(event.currentTarget);
        if (isMobile) {
            setMobileMenuAnchorEl(null);
        }
    };

    const handleCustomerMenuClose = () => {
        setCustomerAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMenuAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuAnchorEl(null);
    };

    const handleShareClick = () => {
        setShare(!share);
        handleMobileMenuClose();
    };

    const handleSaveClick = () => {
        setSaveModal(!saveModal);
        handleMobileMenuClose();
    };

    const toggleDarkMode = () => {
        useEditorStore.getState().setDarkMode();
        if (isMobile) {
            handleMobileMenuClose();
        }
    };

    const handleNoteSave = () => {
            addNoteContent();
    };

    return (
        <AppBar
            position="static"
            sx={{
                width: "100vw",
                overflow: "hidden",
                maxWidth: "100%",
                background: darkMode
                    ? "linear-gradient(to top, #1f2937, #111827)"
                    : "linear-gradient(to top, #f3f4f6, #e5e7eb)",
                color: darkMode ? "#ffffff" : "#000000",
                boxShadow: "none",
            }}
        >
            <Toolbar
                className={cn(
                    "flex w-full max-w-full box-border overflow-x-hidden",
                    "flex-row justify-between items-center px-4"
                )}
            >
                <div className="flex justify-between items-center w-full box-border">
                    <LeftSection  />


                    <RightSection
                        isMobile={isMobile}
                        darkMode={darkMode}
                        toggleDarkMode={toggleDarkMode}
                        handleShareClick={handleShareClick}
                        handleSaveClick={handleSaveClick}
                        handleMobileMenuOpen={handleMobileMenuOpen}
                        handleCustomerMenuOpen={handleCustomerMenuOpen}
                        onSave={() => handleNoteSave("Save Online")}
                    />
                </div>
            </Toolbar>

            <MobileMenu
                anchorEl={mobileMenuAnchorEl}
                isOpen={Boolean(mobileMenuAnchorEl)}
                onClose={handleMobileMenuClose}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                handleShareClick={handleShareClick}
                handleSaveClick={handleSaveClick}
            />

            <CustomerMenu
                anchorEl={customerAnchorEl}
                isOpen={Boolean(customerAnchorEl)}
                onClose={handleCustomerMenuClose}
                darkMode={darkMode}
            />

            <ShareModal
                isOpen={share}
                onClose={() => setShare(!share)}
            />

            <SaveModal
                isOpen={saveModal}
                onClose={() => setSaveModal(false)}
            />
        </AppBar>
    );
};

