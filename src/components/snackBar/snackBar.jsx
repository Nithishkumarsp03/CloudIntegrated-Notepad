import React, { useState, useEffect } from 'react';
import { Snackbar as MuiSnackbar, Alert, AlertTitle, Button } from '@mui/material';
import useEditorStore from '../../store/globalStore';

const Snackbar = ({
    message,
    variant = 'info',
    open,
    onClose,
    autoHideDuration = 6000,
    vertical = 'top',
    horizontal = 'center',
    action = null,
    title = null,
}) => {
    const { darkMode } = useEditorStore();
    const [isVisible, setIsVisible] = useState(open);

    useEffect(() => {
        setIsVisible(open);

        if (!open) return;

        const timeout = setTimeout(() => {
            setIsVisible(false);
            if (onClose) onClose();
        }, autoHideDuration);

        return () => {
            clearTimeout(timeout);
        };
    }, [open, autoHideDuration, onClose]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;

        setIsVisible(false);
        if (onClose) onClose();
    };

    // Convert the horizontal/vertical props to MUI format
    const anchorOrigin = {
        vertical: vertical,
        horizontal: horizontal
    };

    return (
        <MuiSnackbar
            open={isVisible}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            anchorOrigin={anchorOrigin}
        >
            <Alert
                onClose={handleClose}
                severity={variant}
                variant={darkMode ? "filled" : "standard"}
                sx={{ width: '100%', minWidth: '300px' }}
            >
                {title && <AlertTitle>{title}</AlertTitle>}
                {message}
                {action && (
                    <div style={{ marginTop: '8px' }}>
                        {action}
                    </div>
                )}
            </Alert>
        </MuiSnackbar>
    );
};

export const SnackbarExample = () => {
    const [open, setOpen] = useState(false);
    const [snackbarProps, setSnackbarProps] = useState({
        message: '',
        variant: 'info',
        vertical: 'top',
        horizontal: 'center',
        title: null,
        action: null
    });
    const { darkMode } = useEditorStore();

    const showSnackbar = (type) => {
        const config = {
            success: {
                title: 'Success',
                message: 'Operation completed successfully!',
                variant: 'success',
                action: (
                    <Button
                        size="small"
                        color="inherit"
                        variant={darkMode ? "outlined" : "text"}
                    >
                        View Details
                    </Button>
                )
            },
            error: {
                title: 'Error',
                message: 'An error occurred during the operation.',
                variant: 'error',
                action: (
                    <Button
                        size="small"
                        color="inherit"
                        variant={darkMode ? "outlined" : "text"}
                    >
                        Try Again
                    </Button>
                )
            },
            warning: {
                title: 'Warning',
                message: 'This action might have consequences.',
                variant: 'warning',
                action: null
            },
            info: {
                title: 'Information',
                message: 'Here is some information for you.',
                variant: 'info',
                action: (
                    <Button
                        size="small"
                        color="inherit"
                        variant={darkMode ? "outlined" : "text"}
                    >
                        Learn More
                    </Button>
                )
            }
        };

        setSnackbarProps(config[type]);
        setOpen(true);
    };

    return (
        <div style={{ margin: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => showSnackbar('success')}
                >
                    Success
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => showSnackbar('error')}
                >
                    Error
                </Button>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={() => showSnackbar('warning')}
                >
                    Warning
                </Button>
                <Button
                    variant="contained"
                    color="info"
                    onClick={() => showSnackbar('info')}
                >
                    Info
                </Button>
            </div>

            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                message={snackbarProps.message}
                variant={snackbarProps.variant}
                vertical={snackbarProps.vertical}
                horizontal={snackbarProps.horizontal}
                title={snackbarProps.title}
                action={snackbarProps.action}
                autoHideDuration={6000}
            />
        </div>
    );
};

export default Snackbar;