import React from "react";
import { useNavigate } from "react-router-dom";
import { DesktopButtons } from "./desktopButtons";
import { MobileButtons } from "./mobileButtons";
import { useTextEditorStore } from "../../../store/textEditorStore";

export const RightSection = ({
    isMobile,
    darkMode,
    toggleDarkMode,
    handleShareClick,
    handleSaveClick,
    handleMobileMenuOpen,
    handleCustomerMenuOpen,
    onSave
}) => {
    const navigate = useNavigate();
    const saveEditorLoading = useTextEditorStore(e => e.saveEditorLoading);
    const handleProfile = () => {
        navigate('/profile');
    };
    return (
        <div className="flex items-center gap-0 md:gap-2 flex-shrink-0">
            {isMobile ? (
                <MobileButtons
                    darkMode={darkMode}
                    handleMobileMenuOpen={handleMobileMenuOpen}
                    handleCustomerMenuOpen={handleCustomerMenuOpen}
                    onSave={onSave}
                    saveEditorLoading = {saveEditorLoading}
                />
            ) : (
                <DesktopButtons
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    handleShareClick={handleShareClick}
                    handleSaveClick={handleSaveClick}
                    handleProfile={handleProfile}
                    handleCustomerMenuOpen={handleCustomerMenuOpen}
                        onSave={onSave}
                        saveEditorLoading={saveEditorLoading}

                />
            )}
        </div>
    );
};


