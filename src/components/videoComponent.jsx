import React from 'react';
import { Box, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { cn } from '../components/cn';
import video from '../assets/noteVideo.mp4';
import logo from '../assets/logo.png';

const VideoComponent = ({
    darkMode,
    isLogin,
    isMobile,
    showLeftPanel,
    toggleLeftPanel
}) => {
    const [videoLoaded, setVideoLoaded] = React.useState(false);

    const handleVideoLoad = () => {
        setVideoLoaded(true);
    };

    return (
        <Box className={cn(
            isMobile ? "fixed top-0 left-0 w-full h-full z-30" : "w-1/2 relative",
            darkMode ? "bg-gray-900" : "bg-blue-50"
        )}>
            {isMobile && (
                <button
                    onClick={toggleLeftPanel}
                    className={cn(
                        "absolute top-4 right-4 z-40 px-4 py-2 rounded-full",
                        "backdrop-blur-md text-white font-medium",
                        darkMode ? "bg-purple-900/50" : "bg-blue-700/50"
                    )}
                >
                    {isLogin ? "Login" : "Sign Up"}
                </button>
            )}

            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    videoLoaded ? "opacity-0" : "opacity-100",
                    darkMode ? "bg-gray-900" : "bg-blue-800"
                )}></div>

                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={handleVideoLoad}
                    style={{ minHeight: "100%", minWidth: "100%" }}
                >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className={cn(
                    "absolute inset-0",
                    darkMode
                        ? "bg-gradient-to-br from-gray-900/70 via-gray-900/50 to-purple-900/30"
                        : "bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-blue-600/20"
                )}></div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 z-10">
                <div className={cn(
                    "mb-6 md:mb-8 relative flex items-center justify-center"
                )}>
                    <div className={cn(
                        "absolute w-32 md:w-56 pl-8 md:pl-14 h-20 md:h-32 rounded-full mb-6",
                    )}><img src={logo} alt='logo' className='w-full h-full cover' /></div>
                </div>

                <Typography
                    variant="h3"
                    className={cn(
                        "text-white font-bold mb-2 md:mb-4 text-center tracking-wide pt-2",
                        isMobile ? "text-3xl" : "text-4xl md:text-5xl"
                    )}
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
                >
                    NotePad
                </Typography>

                <Typography
                    variant="h6"
                    className="text-white/90 mb-6 md:mb-10 text-center max-w-md font-light"
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                >
                    Simple. Elegant. Productive.
                </Typography>

                <div className="space-y-4 md:space-y-6 text-white/90 text-center max-w-md mt-2 md:mt-4">
                    <div className={cn(
                        "p-4 md:p-5 rounded-lg transition-all duration-300 transform hover:scale-105",
                        "backdrop-blur-md",
                        darkMode
                            ? "bg-purple-900/30 shadow-lg shadow-purple-900/20"
                            : "bg-blue-800/30 shadow-lg shadow-blue-800/20"
                    )}>
                        <Typography variant="h6" className="text-white font-medium mb-1 md:mb-2 text-sm md:text-base">
                            Seamless Experience
                        </Typography>
                        <Typography variant="body2" className="opacity-90 text-xs md:text-sm">
                            Access your notes from anywhere, anytime with our cloud-synced platform.
                        </Typography>
                    </div>

                    {!isMobile && (
                        <>
                            <div className={cn(
                                "p-5 rounded-lg transition-all duration-300 transform hover:scale-105",
                                "backdrop-blur-md",
                                darkMode
                                    ? "bg-purple-900/30 shadow-lg shadow-purple-900/20"
                                    : "bg-blue-800/30 shadow-lg shadow-blue-800/20"
                            )}>
                                <Typography variant="h6" className="text-white font-medium mb-2">
                                    Beautiful Interface
                                </Typography>
                                <Typography variant="body1" className="opacity-90">
                                    Enjoy a distraction-free writing environment with customizable themes.
                                </Typography>
                            </div>

                            <div className={cn(
                                "p-5 rounded-lg transition-all duration-300 transform hover:scale-105",
                                "backdrop-blur-md",
                                darkMode
                                    ? "bg-purple-900/30 shadow-lg shadow-purple-900/20"
                                    : "bg-blue-800/30 shadow-lg shadow-blue-800/20"
                            )}>
                                <Typography variant="h6" className="text-white font-medium mb-2">
                                    Powerful Tools
                                </Typography>
                                <Typography variant="body1" className="opacity-90">
                                    From simple notes to complex documents, our editor adapts to your needs.
                                </Typography>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Box>
    );
};

export default VideoComponent;