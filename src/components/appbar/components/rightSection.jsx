import React from "react";
import { useNavigate } from "react-router-dom";
import { DesktopButtons } from "./desktopButtons";
import { MobileButtons } from "./mobileButtons";

export const RightSection = ({
    isMobile,
    darkMode,
    toggleDarkMode,
    handleShareClick,
    handleSaveClick,
    handleMobileMenuOpen,
    handleCustomerMenuOpen
}) => {
    const navigate = useNavigate();

    const handleProfile = () => {
        navigate('/profile');
    };

    return (
        <div className="flex items-center gap-0 md:gap-2 flex-shrink-0">
            {isMobile ? (
                <MobileButtons
                    darkMode={darkMode}
                    handleMobileMenuOpen={handleMobileMenuOpen}
                    handleProfile={handleProfile}
                    handleCustomerMenuOpen={handleCustomerMenuOpen}
                />
            ) : (
                <DesktopButtons
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    handleShareClick={handleShareClick}
                    handleSaveClick={handleSaveClick}
                    handleProfile={handleProfile}
                    handleCustomerMenuOpen={handleCustomerMenuOpen}
                />
            )}
        </div>
    );
};


