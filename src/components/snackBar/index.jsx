import React, { useState, useEffect } from 'react';
import { Snackbar as MuiSnackbar, Alert} from '@mui/material';
import useEditorStore from '../../store/globalStore';

export const Snackbar = ({
    message,
    variant = 'info',
    open,
    onClose,
    autoHideDuration = 6000,
    vertical = 'top',
    horizontal = 'center',
    action = null,
}) => {
    const darkMode = useEditorStore(state => state.darkMode);
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
