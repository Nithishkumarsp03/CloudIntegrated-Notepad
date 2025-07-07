import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControlLabel} from '@mui/material';
import { Security} from '@mui/icons-material';
import { ButtonComponent, ProfileSwitch, cn } from '../../../components';
import FormSection from './formSection';
import { useLoginStore } from '../../../store/loginStore';
import useEditorStore from '../../../store/globalStore';
import { ResetModal } from '../../modal';
import { ResetPassword } from '../../../api';
import { useSecureStorageStore } from '../../../hooks';

export const SecuritySection = () => {

    const darkMode = useEditorStore(state => state.darkMode);
    const onChange = useLoginStore(e => e.onChange);
    const twoFa = JSON.parse(useLoginStore(e => e.twoFa));
    const loginId = useLoginStore(e => e.loginId);
    const startTimer = useLoginStore(e => e.startTimer);
    const timer = useLoginStore(e => e.timer);
    const { setItem, getItem } = useSecureStorageStore(); 
    
    const [passwordSent, setPasswordSent] = useState({
        loading: false,
        msg: "change Password",
        sent: false
    })
    
    const [passwordModel, setPasswordModel] = useState(false);

    useEffect(() => {
        if (!timer) {
            onChange("timer", 0);
            setItem("timer", 0);
        }
     },[]);

    const handleTwoFa = () => {
        onChange("twoFa", !twoFa);
        setItem("twoFa", !twoFa);
    };

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        if (seconds <= 9) {
            seconds = `0${seconds}`;
        }
        else {
            seconds = `${seconds}`
        }
        return `${minutes}:${seconds}`;
      };

    useEffect(() => {
        if (timer <= 0) {
            setPasswordSent(p => ({ ...p, msg: "Change password", sent: false }));
            return;
        };
            setPasswordSent(p => ({ ...p, msg: `Please wait ${formatTime(timer)} to try again`,sent:true }))
        
    }, [timer]);

    async function handleResetPassword() {
        setPasswordSent(p => ({ ...p,msg:"Sending link to email", loading: true }));
        await ResetPassword(loginId);
        setPasswordSent(p => ({ ...p, sent: true, loading: false, msg: `Please wait ${formatTime(timer)} to try again` }));
        startTimer(300);
    }   

    return (
        <FormSection title="Security Settings" darkMode={darkMode}>
            <Box className="p-5">
                <Box className={cn(
                    "p-4 rounded-lg mb-4 border transition-all duration-300",
                    twoFa
                        ? darkMode ? "bg-purple-900/20 border-purple-700" : "bg-blue-50 border-blue-200"
                        : darkMode ? "bg-gray-700/50 border-gray-600" : "bg-gray-50 border-gray-200"
                )}>
                    <FormControlLabel
                        control={
                            <ProfileSwitch
                                className="mr-2 ml-1"
                                checked={twoFa}
                                onChange={handleTwoFa}
                            />
                        }
                        label={
                            <Box>
                                <Typography className={`font-medium ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
                                    Two-Factor Authentication
                                </Typography>
                                <Typography variant="body2" className={darkMode ? 'text-purple-300' : 'text-blue-600'}>
                                    Add an extra layer of security to protect your account
                                </Typography>
                            </Box>
                        }
                    />

                    <Box className={cn(
                        "mt-4 pt-4 border-t overflow-hidden transition-all duration-300",
                        darkMode ? "border-purple-700/50" : "border-blue-200",
                        twoFa ? 'max-h-[500px]' : "opacity-0 max-h-0 mt-0 pt-0"
                    )}>
                        <div className={cn(
                            "p-4 rounded-lg",
                            darkMode ? "bg-purple-900/20 text-purple-200" : "bg-blue-50 text-blue-700"
                        )}>
                            <div className="flex items-center">
                                <Security className="mr-2" fontSize="small" />
                                <Typography variant="body2" className="font-medium">
                                    Two-factor authentication is active
                                </Typography>
                            </div>
                            <Typography variant="body2" className={`mt-2 ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}>
                                Your account is now protected with an additional layer of security.
                                Use your authenticator app to generate verification codes when signing in.
                            </Typography>
                        </div>
                    </Box>
                </Box>

                <Box className={cn(
                    "p-4 rounded-lg border",
                    darkMode ? "bg-gray-700/50 border-gray-600" : "bg-gray-50 border-gray-200"
                )}>
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <Box>
                            <Typography className={`font-medium ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
                                Password
                            </Typography>
                        </Box>
                        <ButtonComponent
                            btnText={passwordSent.msg}
                            darkMode={darkMode}
                            styles={{ width: "fit-content" }}
                            handleClick={() => setPasswordModel(true)}
                            loading={passwordSent.loading}
                            disabled={passwordSent.sent}
                        />
                    </div>

                </Box>
            </Box>
            <ResetModal
                open={passwordModel}
                onClose={() => setPasswordModel(false)}
                onConfirm={handleResetPassword}
                loading={passwordSent.loading}
                sent={passwordSent.sent}
            />
        </FormSection>
    );
};