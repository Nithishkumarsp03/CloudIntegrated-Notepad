import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Box,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery,
    Button,
    InputAdornment,
    Divider
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {
    Email,
    WhatsApp,
    Twitter,
    Facebook,
    LinkedIn,
    Telegram,
    Reddit
} from '@mui/icons-material';
import useEditorStore from "../store/globalStore";
import { ButtonComponent } from './button';
import { CopyIcon } from '../assets/svgs/copy';

const ShareModal = ({ isOpen, onClose, shareLink }) => {
    const { darkMode } = useEditorStore();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOnPlatform = (platform) => {
        let url = '';
        const encodedUrl = encodeURIComponent(shareLink);
        const text = encodeURIComponent('Check out this document: ');

        switch (platform) {
            case 'whatsapp':
                url = `https://wa.me/?text=${text}${encodedUrl}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                break;
            case 'telegram':
                url = `https://t.me/share/url?url=${encodedUrl}&text=${text}`;
                break;
            case 'reddit':
                url = `https://www.reddit.com/submit?url=${encodedUrl}&title=${text}`;
                break;
            case 'email':
                url = `mailto:?body=${text}${encodedUrl}&subject=Shared Document`;
                break;
            default:
                return;
        }

        window.open(url, '_blank');
    };

    const socialPlatforms = [
        { name: 'WhatsApp', icon: <WhatsApp />, color: '#25D366', action: () => shareOnPlatform('whatsapp') },
        { name: 'Twitter', icon: <Twitter />, color: '#1DA1F2', action: () => shareOnPlatform('twitter') },
        { name: 'Facebook', icon: <Facebook />, color: '#1877F2', action: () => shareOnPlatform('facebook') },
        { name: 'LinkedIn', icon: <LinkedIn />, color: '#0077B5', action: () => shareOnPlatform('linkedin') },
        { name: 'Telegram', icon: <Telegram />, color: '#0088CC', action: () => shareOnPlatform('telegram') },
        { name: 'Reddit', icon: <Reddit />, color: '#FF5700', action: () => shareOnPlatform('reddit') },
        { name: 'Email', icon: <Email />, color: '#EA4335', action: () => shareOnPlatform('email') },
    ];

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            sx={{
                '& .MuiDialog-container': {
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                '& .MuiPaper-root': {
                    margin: '20px',
                    width: isSmallScreen ? 'calc(100% - 40px)' : '100%',
                    maxHeight: 'calc(100vh - 40px)',
                    overflowY: 'auto',
                    bgcolor: darkMode ? '#111827' : 'background.paper',
                    border: darkMode ? '1px solid #4B5563' : '1px solid #D1D5DB',
                    borderRadius: '12px',
                    boxShadow: '0px 8px 24px rgba(149, 157, 165, 0.2)',
                    p: 3
                }
            }}
        >
            <DialogTitle sx={{
                p: 0,
                mb: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                    color: darkMode ? 'grey.100' : 'grey.800'
                }}>
                    Share Document
                </Typography>
                <IconButton
                    onClick={onClose}
                    aria-label="close"
                    sx={{
                        color: darkMode ? 'grey.400' : 'grey.500',
                        '&:hover': {
                            color: darkMode ? 'grey.200' : 'grey.700',
                            bgcolor: 'transparent'
                        }
                    }}
                >
                    <CloseIcon fontSize="medium" />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 0 }}>
                <Box mb={3}>
                    <Typography variant="body2" sx={{
                        mb: 1,
                        color: darkMode ? 'grey.300' : 'grey.600',
                        fontWeight: 'medium'
                    }}>
                        Shareable Link
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={shareLink}
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        onClick={handleCopyLink}
                                        startIcon={<CopyIcon size={18} />}
                                        sx={{
                                            textTransform: 'none',
                                            color: darkMode ? '#8B5CF6' : '#2563EB',
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                            }
                                        }}
                                    >
                                        {copied ? 'Copied!' : 'Copy'}
                                    </Button>
                                </InputAdornment>
                            ),
                            sx: {
                                color: darkMode ? 'grey.100' : 'grey.900',
                                bgcolor: darkMode ? 'grey.800' : 'grey.50',
                                borderRadius: '8px',
                                '& fieldset': {
                                    borderColor: darkMode ? 'grey.700' : 'grey.300',
                                },
                            }
                        }}
                    />
                </Box>

                <Divider sx={{ my: 2, borderColor: darkMode ? 'grey.700' : 'grey.200' }} />

                <Box mb={3}>
                    <Typography variant="body2" sx={{
                        mb: 2,
                        color: darkMode ? 'grey.300' : 'grey.600',
                        fontWeight: 'medium'
                    }}>
                        Share via
                    </Typography>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                        gap: 2
                    }}>
                        {socialPlatforms.map((platform) => (
                            <Button
                                key={platform.name}
                                onClick={platform.action}
                                variant="outlined"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '80px',
                                    color: darkMode ? 'grey.100' : 'grey.800',
                                    borderColor: darkMode ? 'grey.600' : 'grey.300',
                                    '&:hover': {
                                        borderColor: platform.color,
                                        backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
                                    }
                                }}
                            >
                                <Box sx={{ color: platform.color, fontSize: '28px', mb: 1 }}>
                                    {platform.icon}
                                </Box>
                                <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                                    {platform.name}
                                </Typography>
                            </Button>
                        ))}
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    mt: 3,
                    gap: 2
                }}>
                    {!isSmallScreen && (
                        <ButtonComponent
                            btnText="Close"
                            handleClick={onClose}
                            styles={{
                                minWidth: '100px',
                                height: '40px',
                                backgroundColor: darkMode ? '#374151' : '#E5E7EB',
                                color: darkMode ? '#F3F4F6' : '#111827',
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '0.875rem',
                                '&:hover': {
                                    backgroundColor: darkMode ? '#4B5563' : '#D1D5DB',
                                    boxShadow: 'none'
                                }
                            }}
                        />
                    )}
                </Box>

                {isSmallScreen && (
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            onClick={onClose}
                            sx={{
                                textTransform: 'none',
                                color: darkMode ? 'grey.400' : 'grey.600',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: darkMode ? 'grey.300' : 'grey.700'
                                }
                            }}
                        >
                            Close
                        </Button>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ShareModal;