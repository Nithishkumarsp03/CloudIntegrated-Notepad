import { Snackbar } from "@mui/material";
import { SuccessScreen, ThemeToggle, VerificationForm, WaveBackground } from "../components/twostepAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useEditorStore from "../store/globalStore";
import { useLoginStore } from "../store/loginStore";
import { useNavbarStore } from "../store/navbarStore";

const TwoStepAuthentication = () => {
    const { isUserLoggedIn, twoStepAuth, authentication } = useLoginStore();
    useEffect(() => {
        if (isUserLoggedIn) {
            let data = JSON.parse(localStorage.getItem("notes"));
            if (data) {
                const uuid = data[0]?.uuid;
                if (uuid) {
                    navigate(`/note-pad/${uuid}`);
                }
            }
        }
    }, []);

    const [currentStage, setCurrentStage] = useState("verification");
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        variant: "info",
        title: ""
    });
    const [secondsRemaining, setSecondsRemaining] = useState(() => {
        const expiryTimeString = localStorage.getItem("otpExpiryTime");
        if (expiryTimeString) {
            const expiryTime = parseInt(expiryTimeString);
            const now = Date.now();
            if (expiryTime > now) {
                return Math.floor((expiryTime - now) / 1000);
            }
        }
        return 300;
    });
    const [isTimerRunning, setIsTimerRunning] = useState(true);

    const { darkMode, setDarkMode } = useEditorStore();
    const { getNotes } = useNavbarStore();
    const email = localStorage.getItem("email");
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("otpExpiryTime")) {
            const expiryTime = Date.now() + (300 * 1000);
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
            navigate('/login');
        }

        const handleBeforeUnload = () => {
            console.log("Clicked")
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

    useEffect(() => {
        const checkAndRequestOtp = async () => {
            const otpInitiated = localStorage.getItem("otpInitiated");
            if (!otpInitiated) {
                await handleResendCode();
            }
        };

        checkAndRequestOtp();
    }, []);

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

    const handleVerify = async (otp) => {
        const response = await twoStepAuth(otp);
        if (response.state) {
            setCurrentStage("success");
            clearOtpData();
            return { success: true };
        }
        else {
            return { success: false, message: response.message };
        }
    };

    const handleResendCode = async () => {
        try {
            const result = await authentication("login");
            if (result && !result.error) {
                setSnackbar({
                    open: true,
                    message: `Verification code sent to ${email}`,
                    variant: "success",
                    title: "Code Sent"
                });

                setSecondsRemaining(300);
                setIsTimerRunning(true);

                const expiryTime = Date.now() + (300 * 1000);
                localStorage.setItem("otpExpiryTime", expiryTime.toString());
                localStorage.setItem("otpInitiated", "true");
                return true;
            } else {
                setSnackbar({
                    open: true,
                    message: "Failed to send verification code. Please try again.",
                    variant: "error",
                    title: "Error"
                });
                return false;
            }
        } catch (error) {
            console.error("Error sending code:", error);
            setSnackbar({
                open: true,
                message: "Failed to send verification code. Please try again.",
                variant: "error",
                title: "Error"
            });
            return false;
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

    return (
        <div className={`flex items-center justify-center min-h-screen w-full relative ${darkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
            }`}>
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            <WaveBackground darkMode={darkMode} />

            <div className={`w-full max-w-md p-8 mx-4 rounded-xl rounded-t-lg shadow-xl relative z-10 ${darkMode
                ? "bg-gray-800/80 border border-gray-700/50"
                : "bg-white/90 border border-gray-200/50"
                } backdrop-filter backdrop-blur-lg`}>
                <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-xl ${darkMode ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-gradient-to-r from-blue-400 to-purple-400"
                    }`}></div>

                {currentStage === "verification" ? (
                    <VerificationForm
                        email={email}
                        secondsRemaining={secondsRemaining}
                        isTimerRunning={isTimerRunning}
                        darkMode={darkMode}
                        handleVerify={handleVerify}
                        handleResendCode={handleResendCode}
                        handleBackToLogin={handleBackToLogin}
                    />
                ) : (
                    <SuccessScreen
                        darkMode={darkMode}
                        handleContinue={handleContinue}
                    />
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