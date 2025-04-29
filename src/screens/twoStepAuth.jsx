import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { cn } from "../components/cn";
import ProfileSwitch from "../components/switch/switch";
import { SunIcon } from "../assets/svgs/sun";
import { MoonIcon } from "../assets/svgs/moon";
import { ButtonComponent } from "../components/button/button";
import useEditorStore from "../store/globalStore";
import { useLoginStore } from '../store/loginStore';
import NotePad from "../assets/svgs/notePad";
import Snackbar from "../components/snackBar/snackBar";
import { useNavbarStore } from "../store/navbarStore";

const TwoStepAuthentication = () => {
    const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
    const [currentStage, setCurrentStage] = useState("verification");
    const [errorMessage, setErrorMessage] = useState("");
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        variant: "info",
        title: ""
    });

    // Fix: Initialize with default value of 300 seconds when no stored time exists
    const [secondsRemaining, setSecondsRemaining] = useState(() => {
        const expiryTimeString = localStorage.getItem("otpExpiryTime");
        if (expiryTimeString) {
            const expiryTime = parseInt(expiryTimeString);
            const now = Date.now();
            if (expiryTime > now) {
                return Math.floor((expiryTime - now) / 1000);
            }
        }
        // Always default to 300 seconds (5 minutes) when there's no valid time
        return 300;
    });

    // Fix: Start with timer running by default
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const { darkMode, setDarkMode } = useEditorStore();
    const { getNotes } = useNavbarStore();
    const { twoStepAuth, loaders, authentication } = useLoginStore();
    const email = localStorage.getItem("email");
    const navigate = useNavigate();
    const inputRefs = useRef(Array(6).fill(null));

    // Fix: Set initial OTP expiry time if not already set
    useEffect(() => {
        if (!localStorage.getItem("otpExpiryTime")) {
            const expiryTime = Date.now() + (300 * 1000); // 5 minutes
            localStorage.setItem("otpExpiryTime", expiryTime.toString());
            localStorage.setItem("otpInitiated", "true");
        }
    }, []);

    useEffect(() => {
        if (secondsRemaining > 0) {
            const expiryTime = Date.now() + (secondsRemaining * 1000);
            localStorage.setItem("otpExpiryTime", expiryTime.toString());
            localStorage.setItem("otpInitiated", "true");
        }
    }, [secondsRemaining]);

    useEffect(() => {
        if (!email) {
            navigate('/');
        }

        const handleBeforeUnload = () => {
            // Empty function but keeping it for compatibility
        };

        const handlePopState = () => {
            localStorage.removeItem('otpExpiryTime');
            localStorage.removeItem('otpInitiated');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [email, navigate]);

    // Fix: If OTP hasn't been requested yet, request it automatically
    useEffect(() => {
        const checkAndRequestOtp = async () => {
            const otpInitiated = localStorage.getItem("otpInitiated");
            if (!otpInitiated) {
                await handleResendCode();
            }
        };

        checkAndRequestOtp();
    }, []);

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

    // Timer countdown effect
    useEffect(() => {
        if (isTimerRunning && secondsRemaining > 0) {
            const timer = setTimeout(() => {
                setSecondsRemaining(prev => {
                    const newTime = prev - 1;
                    if (newTime <= 0) {
                        setIsTimerRunning(false);
                        return 0;
                    }
                    return newTime;
                });
            }, 1000);

            return () => clearTimeout(timer);
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
            // Clear OTP data on successful verification
            clearOtpData();
        }
        else {
            setErrorMessage(response.message);
        }
    };

    const handleResendCode = async () => {
        try {
            const result = await authentication("login");
            // Only update UI state if authentication was successful
            if (result && !result.error) {
                setSnackbar({
                    open: true,
                    message: `Verification code sent to ${email}`,
                    variant: "success",
                    title: "Code Sent"
                });

                // Set a new 5-minute timer
                setSecondsRemaining(300);
                setIsTimerRunning(true);

                // Reset error message and input fields
                setErrorMessage("");
                setVerificationCode(["", "", "", "", "", ""]);

                // Update localStorage with new expiry time
                const expiryTime = Date.now() + (300 * 1000);
                localStorage.setItem("otpExpiryTime", expiryTime.toString());
                localStorage.setItem("otpInitiated", "true");
            } else {
                setSnackbar({
                    open: true,
                    message: "Failed to send verification code. Please try again.",
                    variant: "error",
                    title: "Error"
                });
            }
        } catch (error) {
            console.error("Error sending code:", error);
            setSnackbar({
                open: true,
                message: "Failed to send verification code. Please try again.",
                variant: "error",
                title: "Error"
            });
        }
    };

    const handleBackToLogin = () => {
        clearOtpData();
        navigate("/");
    };

    const handleContinue = async () => {
        try {
            const response = await getNotes();
            const uuid = await response.data?.notes[0]?.uuid;
            console.log(response)
            navigate(`/note-pad/${uuid}`);
        } catch (error) {
            console.error("Error navigating to notes:", error);
            navigate('/note-pad');
        }
    };

    const clearOtpData = () => {
        localStorage.removeItem('otpExpiryTime');
        localStorage.removeItem('otpInitiated');
    };

    const handleCloseSnackbar = () => {
        setSnackbar({
            ...snackbar,
            open: false
        });
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

            <Snackbar
                open={snackbar.open}
                onClose={handleCloseSnackbar}
                message={snackbar.message}
                variant={snackbar.variant}
                title={snackbar.title}
                vertical="top"
                horizontal="center"
            />
        </div>
    );
};

export default TwoStepAuthentication;