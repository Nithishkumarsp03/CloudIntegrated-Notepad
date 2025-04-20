import React, { useState, useEffect } from 'react';
import { cn } from '../components/cn';
import { CheckCircle, Error, Info, Warning, Close } from '@mui/icons-material';
import useEditorStore from '../store/globalStore';

const Snackbar = ({
    message,
    variant = 'info',
    open,
    onClose,
    autoHideDuration = 10000,
    vertical = 'bottom',
    horizontal = 'center',
}) => {
    const { darkMode } = useEditorStore();
    const [isVisible, setIsVisible] = useState(open);
    const [progress, setProgress] = useState(100);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        setIsVisible(open);
        setProgress(100);

        if (open) {
            if (intervalId) {
                clearInterval(intervalId);
            }

            const duration = autoHideDuration;
            const intervalTime = 100; 
            const decrementValue = (intervalTime / duration) * 100;

            const id = setInterval(() => {
                setProgress((prev) => {
                    if (prev <= decrementValue) {
                        clearInterval(id);
                        setIsVisible(false);
                        if (onClose) onClose();
                        return 0;
                    }
                    return prev - decrementValue;
                });
            }, intervalTime);

            setIntervalId(id);

            const timeout = setTimeout(() => {
                setIsVisible(false);
                if (onClose) onClose();
            }, duration);

            return () => {
                clearInterval(id);
                clearTimeout(timeout);
            };
        }
    }, [open, autoHideDuration, onClose]);

    if (!isVisible) return null;

    const iconMap = {
        success: <CheckCircle fontSize="small" className={darkMode ? "text-green-300" : "text-green-500"} />,
        error: <Error fontSize="small" className={darkMode ? "text-red-300" : "text-red-500"} />,
        warning: <Warning fontSize="small" className={darkMode ? "text-yellow-300" : "text-yellow-500"} />,
        info: <Info fontSize="small" className={darkMode ? "text-blue-300" : "text-blue-500"} />
    };

    const variantStyles = {
        success: darkMode
            ? "bg-green-900/30 border-green-700"
            : "bg-green-50 border-green-200",
        error: darkMode
            ? "bg-red-900/30 border-red-700"
            : "bg-red-50 border-red-200",
        warning: darkMode
            ? "bg-yellow-900/30 border-yellow-700"
            : "bg-yellow-50 border-yellow-200",
        info: darkMode
            ? "bg-blue-900/30 border-blue-700"
            : "bg-blue-50 border-blue-200"
    };

    const positionStyles = {
        vertical: {
            top: "top-4",
            bottom: "bottom-4"
        },
        horizontal: {
            left: "left-4",
            center: "left-1/2 transform -translate-x-1/2",
            right: "right-4"
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose();
        if (intervalId) clearInterval(intervalId);
    };

    return (
        <div
            className={cn(
                "fixed z-50 pointer-events-auto flex items-center min-w-[300px] max-w-md",
                "rounded-lg shadow-lg transition-all duration-300 transform",
                "backdrop-blur-md border",
                positionStyles.vertical[vertical],
                positionStyles.horizontal[horizontal],
                variantStyles[variant]
            )}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                    ? `translate(${horizontal === 'center' ? '-50%' : '0'}, 0)`
                    : `translate(${horizontal === 'center' ? '-50%' : '0'}, ${vertical === 'top' ? '-20px' : '20px'})`,
            }}
        >
            <div className="flex items-center w-full p-3">
                <div className="mr-3">
                    {iconMap[variant]}
                </div>
                <div className="flex-1 mr-2">
                    <p className={cn(
                        "text-sm font-medium",
                        darkMode ? "text-gray-100" : "text-gray-800"
                    )}>
                        {message}
                    </p>
                </div>
                <button
                    onClick={handleClose}
                    className={cn(
                        "flex-shrink-0 rounded-full p-1 transition-colors",
                        darkMode
                            ? "text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    )}
                >
                    <Close fontSize="small" />
                </button>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 h-1 rounded-b-lg"
                style={{
                    width: `${progress}%`,
                    backgroundColor: darkMode
                        ? variant === 'success' ? '#10B981' :
                            variant === 'error' ? '#EF4444' :
                                variant === 'warning' ? '#F59E0B' : '#3B82F6'
                        : variant === 'success' ? '#34D399' :
                            variant === 'error' ? '#F87171' :
                                variant === 'warning' ? '#FBBF24' : '#60A5FA',
                    transition: 'width linear'
                }}
            />
        </div>
    );
};

// Example usage component to demonstrate the Snackbar
export const SnackbarExample = () => {
    const [open, setOpen] = useState(false);
    const [snackbarProps, setSnackbarProps] = useState({
        message: '',
        variant: 'info',
        vertical: 'bottom',
        horizontal: 'center'
    });
    const { darkMode } = useEditorStore();

    const showSnackbar = (type) => {
        const config = {
            success: {
                message: 'Operation completed successfully!',
                variant: 'success'
            },
            error: {
                message: 'An error occurred during the operation.',
                variant: 'error'
            },
            warning: {
                message: 'Warning: This action might have consequences.',
                variant: 'warning'
            },
            info: {
                message: 'Here is some information for you.',
                variant: 'info'
            }
        };

        setSnackbarProps(config[type]);
        setOpen(true);
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => showSnackbar('success')}
                    className={cn(
                        "px-4 py-2 rounded-lg transition-colors",
                        darkMode
                            ? "bg-green-700 hover:bg-green-600 text-white"
                            : "bg-green-500 hover:bg-green-400 text-white"
                    )}
                >
                    Success
                </button>
                <button
                    onClick={() => showSnackbar('error')}
                    className={cn(
                        "px-4 py-2 rounded-lg transition-colors",
                        darkMode
                            ? "bg-red-700 hover:bg-red-600 text-white"
                            : "bg-red-500 hover:bg-red-400 text-white"
                    )}
                >
                    Error
                </button>
                <button
                    onClick={() => showSnackbar('warning')}
                    className={cn(
                        "px-4 py-2 rounded-lg transition-colors",
                        darkMode
                            ? "bg-yellow-700 hover:bg-yellow-600 text-white"
                            : "bg-yellow-500 hover:bg-yellow-400 text-white"
                    )}
                >
                    Warning
                </button>
                <button
                    onClick={() => showSnackbar('info')}
                    className={cn(
                        "px-4 py-2 rounded-lg transition-colors",
                        darkMode
                            ? "bg-blue-700 hover:bg-blue-600 text-white"
                            : "bg-blue-500 hover:bg-blue-400 text-white"
                    )}
                >
                    Info
                </button>
            </div>

            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                message={snackbarProps.message}
                variant={snackbarProps.variant}
                vertical={snackbarProps.vertical}
                horizontal={snackbarProps.horizontal}
                autoHideDuration={10000}
            />
        </div>
    );
};

export default Snackbar;