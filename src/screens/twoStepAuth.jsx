import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { cn } from "../components/cn";
import ProfileSwitch from "../components/switch";
import { SunIcon } from "../assets/svgs/sun";
import { MoonIcon } from "../assets/svgs/moon";
import { ButtonComponent } from "../components/button";
import useEditorStore from "../store/globalStore";
import { useLoginStore } from '../store/loginStore';
import NotePad from "../assets/svgs/notePad";

const TwoStepAuthentication = () => {
    const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
    const [currentStage, setCurrentStage] = useState("verification");
    const [errorMessage, setErrorMessage] = useState("");
    const [secondsRemaining, setSecondsRemaining] = useState(() => {
        const expiryTime = localStorage.getItem('otpExpiryTime');
        if (expiryTime) {
            const remainingTime = Math.floor((parseInt(expiryTime) - Date.now()) / 1000);
            return remainingTime > 0 ? remainingTime : 0;
        } else {
            const newExpiryTime = Date.now() + (300 * 1000);
            localStorage.setItem('otpExpiryTime', newExpiryTime.toString());
            return 300;
        }
    });
    const [isTimerRunning, setIsTimerRunning] = useState(secondsRemaining > 0);
    const { darkMode, setDarkMode } = useEditorStore();
    const { twoStepAuth, loaders, email, login } = useLoginStore();
    const navigate = useNavigate();
    const inputRefs = useRef(Array(6).fill(null));

    const WaveBackground = useMemo(() => {
        return () => (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute w-full h-full">
                    <div className={`absolute inset-0 ${darkMode ? 'opacity-20' : 'opacity-15'}`}>
                        <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute h-full w-full">
                            <path
                                d="M0,500 C150,400 250,300 500,500 C750,700 850,600 1000,500 V1000 H0 V500 Z"
                                className={`${darkMode ? 'fill-purple-800' : 'fill-blue-200'} animate-wave-slow`}
                            />
                            <path
                                d="M0,600 C200,500 300,400 500,600 C700,800 800,700 1000,600 V1000 H0 V600 Z"
                                className={`${darkMode ? 'fill-blue-800' : 'fill-purple-200'} animate-wave-slower opacity-70`}
                            />
                        </svg>
                    </div>
                </div>

                <div className="absolute inset-0">
                    <div className={`absolute top-1/4 left-1/4 w-24 h-24 rounded-full ${darkMode ? 'border-2 border-purple-500 opacity-10' : 'border-2 border-blue-400 opacity-15'} animate-float-slow`}></div>
                    <div className={`absolute top-2/3 right-1/3 w-16 h-16 rounded-full ${darkMode ? 'border border-blue-400 opacity-10' : 'border border-purple-400 opacity-15'} animate-float-slower`}></div>
                    <div className={`absolute top-1/3 right-1/4 w-20 h-20 ${darkMode ? 'border border-purple-400 opacity-10' : 'border border-blue-400 opacity-15'} transform rotate-45 animate-float-medium`}></div>
                    <div className={`absolute bottom-1/4 left-1/3 w-12 h-12 ${darkMode ? 'border border-blue-300 opacity-10' : 'border border-purple-300 opacity-15'} transform rotate-12 animate-float-fast`}></div>
                    <div className={`absolute top-12 left-12 transform rotate-12 ${darkMode ? 'text-purple-400 opacity-10' : 'text-blue-500 opacity-15'} animate-float-slow`}>
                        <NotePad className="w-16 h-16" />
                    </div>
                    <div className={`absolute bottom-12 right-12 transform -rotate-12 ${darkMode ? 'text-blue-400 opacity-10' : 'text-purple-500 opacity-15'} animate-float-medium`}>
                        <NotePad className="w-12 h-12" />
                    </div>
                </div>
                <div className="absolute inset-0">
                    <div className={`absolute top-0 right-0 w-1/2 h-1/2 rounded-bl-full ${darkMode ? 'bg-blue-800' : 'bg-blue-100'} opacity-10 blur-3xl`}></div>
                    <div className={`absolute bottom-0 left-0 w-1/2 h-1/2 rounded-tr-full ${darkMode ? 'bg-purple-800' : 'bg-purple-100'} opacity-10 blur-3xl`}></div>
                </div>
            </div>
        );
    }, [darkMode]);

    useEffect(() => {
        if (isTimerRunning && secondsRemaining > 0) {
            const timer = setTimeout(() => {
                setSecondsRemaining(secondsRemaining - 1);
                // Also update the expiry time in localStorage
                const expiryTime = Date.now() + (secondsRemaining - 1) * 1000;
                localStorage.setItem('otpExpiryTime', expiryTime.toString());
            }, 1000);
            return () => clearTimeout(timer);
        } else if (secondsRemaining === 0) {
            setIsTimerRunning(false);
            // Clear the expiry time from localStorage
            localStorage.removeItem('otpExpiryTime');
        }
    }, [isTimerRunning, secondsRemaining]);

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

    const handleVerificationSubmit = (e) => {
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
        handleVerify();
    };

    const handleVerify = async () => {
        const otp = verificationCode.join('');
        const response = await twoStepAuth(otp);
        if (response.state) {
            setCurrentStage("success");
            localStorage.removeItem('otpExpiryTime');
        }
        else {
            setErrorMessage(response.message);
        }
    };

    const handleResendCode = async () => {
        await login();
        const newExpiryTime = Date.now() + (300 * 1000);
        localStorage.setItem('otpExpiryTime', newExpiryTime.toString());
        setSecondsRemaining(300);
        setIsTimerRunning(true);
        setErrorMessage("");
        setVerificationCode(["", "", "", "", "", ""]);
    };

    const handleBackToLogin = () => {
        localStorage.removeItem('otpExpiryTime');
        navigate("/");
    };

    const handleContinue = () => {
        navigate("/note-pad/1");
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={cn(
            "flex items-center justify-center min-h-screen w-full relative",
            darkMode
                ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
                : "bg-gradient-to-br from-blue-50 via-white to-purple-50",
        )}>
            <div className="absolute top-4 right-4 z-20 cursor-pointer" onClick={setDarkMode}>
                <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm p-2 rounded-full">
                    <ProfileSwitch
                        checked={darkMode}
                    />
                    <SunIcon className={cn("text-gray-400", darkMode ? "hidden" : "block")} />
                    <MoonIcon className={cn("text-gray-400", darkMode ? "block" : "hidden")} />
                </div>
            </div>

            <WaveBackground />

            <div className={cn(
                "absolute z-0 w-full max-w-md h-full max-h-96 rounded-xl",
                darkMode ? "bg-purple-900 opacity-20" : "bg-blue-300 opacity-10",
                "blur-3xl"
            )}></div>
            <div className={cn(
                "w-full max-w-md p-8 mx-4 rounded-xl shadow-xl relative z-10",
                darkMode
                    ? "bg-gray-800/80 border border-gray-700/50"
                    : "bg-white/90 border border-gray-200/50",
                "backdrop-filter backdrop-blur-lg",
            )}>
                <div className={cn(
                    "absolute top-0 left-0 right-0 h-1 rounded-t-xl",
                    darkMode ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-gradient-to-r from-blue-400 to-purple-400"
                )}></div>
                {currentStage === "verification" && (
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
                            Code expires in: {formatTime(secondsRemaining)}
                        </div>

                        <form onSubmit={handleVerificationSubmit} className="space-y-6">
                            <div className="flex justify-between mb-4">
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
                                loading={loaders.isTwoStepLoading}
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
                )}

                {currentStage === "success" && (
                    <>
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
                    </>
                )}
            </div>
        </div>
    );
};

export default TwoStepAuthentication;