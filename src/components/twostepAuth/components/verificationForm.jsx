import React, { useState, useRef, useEffect } from "react";
import { ArrowBack } from "@mui/icons-material";
import { cn } from "../../cn";
import { ButtonComponent } from "../../button";
import NotePad from "../../../assets/svgs/notePad";
import { useLoginStore } from '../../../store/loginStore';

export const VerificationForm = ({
    email,
    secondsRemaining,
    isTimerRunning,
    darkMode,
    handleVerify,
    handleResendCode,
    handleBackToLogin
}) => {
    const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
    const [errorMessage, setErrorMessage] = useState("");
    const inputRefs = useRef(Array(6).fill(null));
    const { loaders } = useLoginStore();

    const handleCodeChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newVerificationCode = [...verificationCode];
        newVerificationCode[index] = value;
        setVerificationCode(newVerificationCode);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleCodePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text");
        if (!/^\d+$/.test(pastedData)) return;

        const digits = pastedData.slice(0, 6).split("");
        const newVerificationCode = [...verificationCode];

        digits.forEach((digit, index) => {
            if (index < 6) {
                newVerificationCode[index] = digit;
            }
        });

        setVerificationCode(newVerificationCode);
        const lastIndex = Math.min(digits.length, 5);
        inputRefs.current[lastIndex].focus();
    };

    const handleVerificationSubmit = async (e) => {
        e.preventDefault();
        if (verificationCode.join("").length !== 6) {
            setErrorMessage("Please enter all 6 digits of the verification code");
            return;
        }
        if (secondsRemaining === 0) {
            setErrorMessage("Verification code has expired. Please request a new one.");
            return;
        }

        setErrorMessage("");
        const otp = verificationCode.join('');
        const result = await handleVerify(otp);
        if (!result.success) {
            setErrorMessage(result.message);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <div className="flex items-center mb-6">
                <button onClick={handleBackToLogin} className={cn(
                    "p-1 rounded-full mr-2",
                    "text-gray-600 dark:text-gray-300",
                    "hover:bg-gray-100 dark:hover:bg-gray-700",
                    "transition-colors duration-200"
                )}>
                    <ArrowBack fontSize="small" />
                </button>
                <h2 className={cn(
                    "text-2xl font-semibold",
                    "text-blue-700 dark:text-purple-300",
                )}>
                    Two-Step Verification
                </h2>
            </div>

            <div className="flex justify-center mb-4">
                <div className={cn(
                    "p-3 rounded-full",
                    darkMode ? "bg-gray-700" : "bg-blue-100"
                )}>
                    <NotePad className={cn(
                        "w-8 h-8",
                        darkMode ? "text-purple-400" : "text-blue-600"
                    )} />
                </div>
            </div>

            <p className={cn(
                "mb-4 text-sm text-center",
                "text-gray-600 dark:text-gray-300"
            )}>
                For your security, we sent a verification code to <span className="font-medium text-blue-600 dark:text-purple-400">{email}</span>
            </p>

            <div className={cn(
                "flex items-center justify-center mb-2",
                "text-sm font-medium",
                secondsRemaining <= 10 ? "text-red-500 dark:text-red-400" : "text-gray-600 dark:text-gray-300"
            )}>
                {secondsRemaining > 0 ? (
                    <>Code expires in: {formatTime(secondsRemaining)}</>
                ) : (
                    <>Code expired. Please request a new one.</>
                )}
            </div>

            <form onSubmit={handleVerificationSubmit} className="space-y-6">
                <div className="flex justify-between gap-1.5 mb-4">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength={1}
                            value={verificationCode[index]}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            onPaste={index === 0 ? handleCodePaste : undefined}
                            onKeyDown={(e) => {
                                if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
                                    inputRefs.current[index - 1].focus();
                                }
                            }}
                            className={cn(
                                "w-12 h-14 text-center text-xl font-medium",
                                "bg-gray-50 dark:bg-gray-700",
                                "text-gray-900 dark:text-gray-100",
                                "border border-gray-300 dark:border-gray-600",
                                "rounded-lg",
                                "focus:outline-none focus:ring-2",
                                "focus:ring-blue-500 dark:focus:ring-purple-500",
                                "focus:border-blue-500 dark:focus:border-purple-500",
                                "transition-all duration-200",
                            )}
                        />
                    ))}
                </div>

                {errorMessage && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {errorMessage}
                    </p>
                )}

                <ButtonComponent
                    btnText="Verify"
                    type="submit"
                    loading={loaders?.isTwoStepLoading}
                    disabled={secondsRemaining === 0}
                    styles={{
                        width: "100%",
                        height: "48px",
                        backgroundColor: secondsRemaining === 0 ?
                            (darkMode ? "#4B5563" : "#9CA3AF") :
                            (darkMode ? "#7C3AED" : "#2563EB"),
                        color: "white",
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        "&:hover": {
                            backgroundColor: secondsRemaining === 0 ?
                                (darkMode ? "#4B5563" : "#9CA3AF") :
                                (darkMode ? "#6D28D9" : "#3B82F6"),
                            boxShadow: secondsRemaining === 0 ?
                                "none" :
                                (darkMode ? "0 2px 4px rgba(0,0,0,0.3)" : "0 2px 4px rgba(0,0,0,0.1)")
                        },
                        "&:active": {
                            backgroundColor: secondsRemaining === 0 ?
                                (darkMode ? "#4B5563" : "#9CA3AF") :
                                (darkMode ? "#5B21B6" : "#1D4ED8")
                        }
                    }}
                />

                <div className="text-center">
                    <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={isTimerRunning && secondsRemaining > 240}
                        className={cn(
                            "text-sm font-medium",
                            isTimerRunning && secondsRemaining > 240
                                ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                : "text-blue-600 dark:text-purple-400 hover:underline cursor-pointer"
                        )}
                    >
                        {isTimerRunning && secondsRemaining > 240
                            ? "Resend code in " + formatTime(secondsRemaining - 240)
                            : "Resend code"}
                    </button>
                </div>
            </form>
        </>
    );
};
