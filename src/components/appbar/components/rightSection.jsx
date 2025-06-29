import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DesktopButtons } from "./desktopButtons";
import { MobileButtons } from "./mobileButtons";
import { useTextEditorStore } from "../../../store/textEditorStore";
import { Dot, TickMark } from "../../../assets";

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
      const [saved, setSaved] = useState(false);
        useEffect(() => {
            let timer;
            if (saveEditorLoading) {
                setSaved(true);
            } else {
                timer = setTimeout(() => {
                    setSaved(false);
                }, 3000);
            }
    
            return () => clearTimeout(timer); 
        }, [saveEditorLoading]);
        
    return (
        <div className="flex items-center gap-2 flex-shrink-0">
            <div className="text-md text-gray-400 mr-2">
                        {saved ? (
                            <div className="text-md z-20 w-fit h-fit text-gray-400 flex transition-all duration-300">
                                {saveEditorLoading ? (
                                    <>
                                        <div className="loader mr-2 mt-0.5"></div>  
                                        <div>Saving</div>
                                        <div className="animate-first"><Dot /></div>
                                        <div className="animate-second"><Dot /></div>
                                        <div className="animate-third"><Dot /></div>
                                    </>
                                ) : (
                                    <div className="flex gap-1.5 items-center">
                                        <TickMark /> Saved
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>Autosave</div>
                )}
            </div>
            {isMobile ? (
                <MobileButtons
                    darkMode={darkMode}
                    handleMobileMenuOpen={handleMobileMenuOpen}
                    handleCustomerMenuOpen={handleCustomerMenuOpen}
                    onSave={onSave}
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

                />
            )}
        </div>
    );
};


