import { useState, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';

export const useTimer = (initialSeconds = 300) => {
    const [secondsRemaining, setSecondsRemaining] = useState(() => {
        const expiryTimeString = secureLocalStorage.getItem("otpExpiryTime");
        if (expiryTimeString) {
            const expiryTime = parseInt(expiryTimeString);
            const now = Date.now();
            if (expiryTime > now) {
                return Math.floor((expiryTime - now) / 1000);
            }
        }
        return initialSeconds;
    });
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        if (isRunning && secondsRemaining > 0) {
            const timer = setTimeout(() => {
                setSecondsRemaining(prev => {
                    const newTime = prev - 1;
                    if (newTime <= 0) {
                        setIsRunning(false);
                        return 0;
                    }
                    return newTime;
                });
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isRunning, secondsRemaining]);

    const startTimer = (seconds = initialSeconds) => {
        setSecondsRemaining(seconds);
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return {
        secondsRemaining,
        isRunning,
        startTimer,
        stopTimer,
        formatTime
    };
};