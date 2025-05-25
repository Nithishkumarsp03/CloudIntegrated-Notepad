import React from 'react';
import { Box, Typography, FormControlLabel } from '@mui/material';
import { ProfileSwitch } from '../../../components';
import FormSection from './formSection';

export const NotificationSection = ({ darkMode, notification, onChange }) => {
    return (
        <FormSection title="Notification Preferences" darkMode={darkMode}>
            <Box className="p-5">
                <FormControlLabel
                    control={
                        <ProfileSwitch
                            className="mr-2"
                            checked={notification}
                            onChange={() => onChange("notification", !notification)}
                        />
                    }
                    label={
                        <Box>
                            <Typography className={`font-medium ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
                                Email Notifications
                            </Typography>
                            <Typography variant="body2" className={darkMode ? 'text-purple-300' : 'text-blue-600'}>
                                Receive updates and security alerts via email
                            </Typography>
                        </Box>
                    }
                />
            </Box>
        </FormSection>
    );
};
