import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import useEditorStore from "../globalStore";
import { InputField } from "../components/inputField";
import { ButtonComponent } from "../components/button";
import { cn } from "../components/cn";
import NotePad from "../assets/svgs/notePad";
import ProfileSwitch from "../components/switch";
import { SunIcon } from "../assets/svgs/sun";
import { MoonIcon } from "../assets/svgs/moon";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentStage, setCurrentStage] = useState("email");
    const [errorMessage, setErrorMessage] = useState("");
    const [secondsRemaining, setSecondsRemaining] = useState(60);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const { darkMode, setDarkMode } = useEditorStore();
    const navigate = useNavigate();
    const inputRefs = useRef(Array(6).fill(null));

    // Interactive wave background
    const WaveBackground = useMemo(() => {
        return () => (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {/* Animated wavy patterns */}
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

                {/* Floating geometric elements */}
                <div className="absolute inset-0">
                    {/* Floating circles */}
                    <div className={`absolute top-1/4 left-1/4 w-24 h-24 rounded-full ${darkMode ? 'border-2 border-purple-500 opacity-10' : 'border-2 border-blue-400 opacity-15'} animate-float-slow`}></div>
                    <div className={`absolute top-2/3 right-1/3 w-16 h-16 rounded-full ${darkMode ? 'border border-blue-400 opacity-10' : 'border border-purple-400 opacity-15'} animate-float-slower`}></div>

                    {/* Floating squares */}
                    <div className={`absolute top-1/3 right-1/4 w-20 h-20 ${darkMode ? 'border border-purple-400 opacity-10' : 'border border-blue-400 opacity-15'} transform rotate-45 animate-float-medium`}></div>
                    <div className={`absolute bottom-1/4 left-1/3 w-12 h-12 ${darkMode ? 'border border-blue-300 opacity-10' : 'border border-purple-300 opacity-15'} transform rotate-12 animate-float-fast`}></div>

                    {/* NotePad icons */}
                    <div className={`absolute top-12 left-12 transform rotate-12 ${darkMode ? 'text-purple-400 opacity-10' : 'text-blue-500 opacity-15'} animate-float-slow`}>
                        <NotePad className="w-16 h-16" />
                    </div>
                    <div className={`absolute bottom-12 right-12 transform -rotate-12 ${darkMode ? 'text-blue-400 opacity-10' : 'text-purple-500 opacity-15'} animate-float-medium`}>
                        <NotePad className="w-12 h-12" />
                    </div>
                </div>

                {/* Gradient mesh */}
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
            }, 1000);
            return () => clearTimeout(timer);
        } else if (secondsRemaining === 0) {
            setIsTimerRunning(false);
        }
    }, [isTimerRunning, secondsRemaining]);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage("Please enter a valid email address");
            return;
        }
        setCurrentStage("verification");
        setErrorMessage("");
        setSecondsRemaining(60);
        setIsTimerRunning(true);
    };

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
        setCurrentStage("newPassword");
        setErrorMessage("");
    };

    const handleResendCode = () => {
        setSecondsRemaining(60);
        setIsTimerRunning(true);
        setErrorMessage("");
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (newPassword.length < 8) {
            setErrorMessage("Password must be at least 8 characters long");
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        navigate("/");
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleBackToLogin = () => {
        navigate("/");
    };

    const handleGoBack = () => {
        if (currentStage === "verification") {
            setCurrentStage("email");
        } else if (currentStage === "newPassword") {
            setCurrentStage("verification");
        }
    };

    return (
        <div className={cn(
            "flex items-center justify-center min-h-screen w-full relative",
            darkMode
                ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
                : "bg-gradient-to-br from-blue-50 via-white to-purple-50",
        )}>
            <div className="absolute top-4 right-4 z-20 cursor-pointer" onClick={setDarkMode} >
                            <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm p-2 rounded-full">
                                <ProfileSwitch
                                    checked={darkMode}
                                />
                                <SunIcon className={cn("text-gray-400", darkMode ? "hidden" : "block")} />
                                <MoonIcon className={cn("text-gray-400", darkMode ? "block" : "hidden")} />
                            </div>
                        </div>
            {/* Apply our creative background pattern */}
            <WaveBackground />

            {/* Glowing effect behind the form */}
            <div className={cn(
                "absolute z-0 w-full max-w-md h-full max-h-96 rounded-xl",
                darkMode ? "bg-purple-900 opacity-20" : "bg-blue-300 opacity-10",
                "blur-3xl"
            )}></div>

            {/* Main card with glass effect */}
            <div className={cn(
                "w-full max-w-md p-8 mx-4 rounded-xl shadow-xl relative z-10",
                darkMode
                    ? "bg-gray-800/80 border border-gray-700/50"
                    : "bg-white/90 border border-gray-200/50",
                "backdrop-filter backdrop-blur-lg",
            )}>
                {/* Decorative card accent */}
                <div className={cn(
                    "absolute top-0 left-0 right-0 h-1 rounded-t-xl",
                    darkMode ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-gradient-to-r from-blue-400 to-purple-400"
                )}></div>

                {/* Email Stage */}
                {currentStage === "email" && (
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
                                Reset Password
                            </h2>
                        </div>

                        <p className={cn(
                            "mb-6 text-sm",
                            "text-gray-600 dark:text-gray-300"
                        )}>
                            Enter your email address and we'll send you a verification code to reset your password.
                        </p>

                        <form onSubmit={handleEmailSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className={cn(
                                    "block mb-2 text-sm font-medium",
                                    "text-gray-700 dark:text-gray-300"
                                )}>
                                    Email
                                </label>
                                <InputField
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                {errorMessage && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                        {errorMessage}
                                    </p>
                                )}
                            </div>

                            <ButtonComponent
                                btnText="Send Verification Code"
                                type="submit"
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
                        </form>
                    </>
                )}

                {/* Verification Stage */}
                {currentStage === "verification" && (
                    <>
                        <div className="flex items-center mb-6">
                            <button onClick={handleGoBack} className={cn(
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
                                Verify Email
                            </h2>
                        </div>

                        <p className={cn(
                            "mb-4 text-sm",
                            "text-gray-600 dark:text-gray-300"
                        )}>
                            Enter the 6-digit verification code sent to <span className="font-medium text-blue-600 dark:text-purple-400">{email}</span>
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
                                btnText="Verify Code"
                                type="submit"
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
                                    disabled={isTimerRunning}
                                    className={cn(
                                        "text-sm font-medium",
                                        isTimerRunning
                                            ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                            : "text-blue-600 dark:text-purple-400 hover:underline cursor-pointer"
                                    )}
                                >
                                    {isTimerRunning ? "Resend code in " + formatTime(secondsRemaining) : "Resend code"}
                                </button>
                            </div>
                        </form>
                    </>
                )}

                {/* New Password Stage */}
                {currentStage === "newPassword" && (
                    <>
                        <div className="flex items-center mb-6">
                            <button onClick={handleGoBack} className={cn(
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
                                Create New Password
                            </h2>
                        </div>

                        <p className={cn(
                            "mb-6 text-sm",
                            "text-gray-600 dark:text-gray-300"
                        )}>
                            Your email has been verified. Please create a new password.
                        </p>

                        <form onSubmit={handlePasswordSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="newPassword" className={cn(
                                    "block mb-2 text-sm font-medium",
                                    "text-gray-700 dark:text-gray-300"
                                )}>
                                    New Password
                                </label>
                                <InputField
                                    id="newPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className={cn(
                                    "block mb-2 text-sm font-medium",
                                    "text-gray-700 dark:text-gray-300"
                                )}>
                                    Confirm Password
                                </label>
                                <InputField
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />

                                {errorMessage && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                        {errorMessage}
                                    </p>
                                )}
                            </div>

                            <ButtonComponent
                                btnText="Reset Password"
                                type="submit"
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
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};



export default ForgotPassword;