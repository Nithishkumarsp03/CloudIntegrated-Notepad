import React from "react";
import { cn } from "../../cn";
import { ButtonComponent } from "../../button";
import NotePad from "../../../assets/svgs/notePad";

export const SuccessScreen = ({ darkMode, handleContinue }) => {
    return (
        <div className="flex flex-col items-center justify-center py-4">
            <div className={cn(
                "p-4 mb-4 rounded-full",
                darkMode ? "bg-gray-700" : "bg-blue-100"
            )}>
                <NotePad className={cn(
                    "w-12 h-12",
                    darkMode ? "text-purple-400" : "text-blue-600"
                )} />
            </div>

            <h2 className={cn(
                "text-2xl font-semibold mb-2",
                "text-blue-700 dark:text-purple-300",
            )}>
                Verification Successful
            </h2>

            <p className={cn(
                "mb-8 text-sm text-center",
                "text-gray-600 dark:text-gray-300"
            )}>
                Your identity has been verified. You now have access to your account.
            </p>

            <ButtonComponent
                btnText="Continue to Your Account"
                handleClick={handleContinue}
                styles={{
                    width: "100%",
                    height: "48px",
                    backgroundColor: darkMode ? "#7C3AED" : "#2563EB",
                    color: "white",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    "&:hover": {
                        backgroundColor: darkMode ? "#6D28D9" : "#3B82F6",
                        boxShadow: darkMode ? "0 2px 4px rgba(0,0,0,0.3)" : "0 2px 4px rgba(0,0,0,0.1)"
                    },
                    "&:active": {
                        backgroundColor: darkMode ? "#5B21B6" : "#1D4ED8"
                    }
                }}
            />
        </div>
    );
};
