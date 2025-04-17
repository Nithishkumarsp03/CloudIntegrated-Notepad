import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  Snackbar,
  Alert,
  Grow,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Login,
  Google,
  AppRegistration,
  Facebook
} from '@mui/icons-material';
import useEditorStore from '../store/globalStore';
import { cn } from '../components/cn';
import { ButtonComponent } from '../components/button';
import { InputField } from '../components/inputField';
import { SunIcon } from '../assets/svgs/sun';
import { MoonIcon } from '../assets/svgs/moon';
import ProfileSwitch from '../components/switch';
import video from '../assets/noteVideo.mp4';
import logo from '../assets/logo.png';
import { useLoginStore } from '../store/loginStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useEditorStore();
  const { userName, email, password, twoFa, categoryId, onChange, confirmPassword, checkUser, isUserLoggedIn } = useLoginStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const isMobile = useMediaQuery('(max-width:768px)');
  const [open, setOpen] = useState({
    state: false,
    message: "",
    type: ""
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const switchAuthMode = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    if (isMobile) setShowLeftPanel(false);
  };

  const toggleLeftPanel = () => {
    if (isMobile) {
      setShowLeftPanel(!showLeftPanel);
    }
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  function handleForgotPassword() {
    navigate('/forgotPassword');
  }

  // Form submission handler
  async function handleFormSubmit(e) {
    e.preventDefault();
    // Now call the appropriate auth function based on isLogin state
    await handleAuth(isLogin ? 'login' : 'signup');
  }

  // Actual authentication logic
  async function handleAuth(authType) {
    const response = await checkUser();

    setOpen({
      state: true,
      message: response.message,
      type: response.state ? "success" : "error"
    });

    if (response.state) {
      if (authType === 'login') {
        navigate('/texteditor/1');
      } else {
        navigate('/onBoarding-flow');
      }
    }
  }

  return (
    <Box className="h-screen w-screen flex flex-col md:flex-row overflow-hidden">
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open.state}
        autoHideDuration={5000}
        onClose={() => setOpen({ state: false })}
        TransitionComponent={Grow}
      >
        <Alert variant="filled" severity={open.type}>
          {open.message}
        </Alert>
      </Snackbar>
      {(!isMobile || showLeftPanel) && (
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
                "absolute w-36 md:w-56 pl-8 md:pl-14 h-24 md:h-32 rounded-full mb-6",
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
      )}

      {(!isMobile || !showLeftPanel) && (
        <Box className={cn(
          isMobile ? "w-full h-full" : "w-1/2",
          "flex flex-col relative",
          darkMode ? "bg-gray-800" : "bg-white"
        )}>
          {isMobile && (
            <button
              onClick={toggleLeftPanel}
              className={cn(
                "absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-sm mt-4 md:mt-0 font-medium",
                "backdrop-blur-md",
                darkMode ? "bg-purple-900/50 text-purple-200" : "bg-blue-500 text-white"
              )}
            >
              Promo Video
            </button>
          )}

          <div className="absolute top-4 right-4 z-20 cursor-pointer" onClick={setDarkMode}>
            <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm p-2 rounded-full">
              <ProfileSwitch checked={darkMode} />
              <SunIcon className={cn("text-gray-400", darkMode ? "hidden" : "block")} />
              <MoonIcon className={cn("text-gray-400", darkMode ? "block" : "hidden")} />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16">
            <div className="mb-6 md:mb-8">
              <Typography variant="h4" className={`font-bold mb-1 md:mb-2 ${darkMode ? 'text-purple-100' : 'text-blue-900'}`}>
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </Typography>
              <Typography variant="body1" className={`${darkMode ? 'text-purple-300' : 'text-blue-600'}`}>
                {isLogin ? 'Log in to continue to your workspace' : 'Join NotePad to start organizing your thoughts'}
              </Typography>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="space-y-4 md:space-y-5">
                {!isLogin && (
                  <InputField
                    name="name"
                    label="Full Name"
                    value={userName}
                    onChange={e => onChange("userName", e.target.value)}
                  />
                )}

                <InputField
                  autofocus
                  name="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={e => onChange("email", e.target.value)}
                />

                <InputField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => onChange("password", e.target.value)}
                  endIcon={<div onClick={handleTogglePasswordVisibility} className='cursor-pointer pr-2 pb-0.5'
                  >{showPassword ? <VisibilityOff sx={{ color: darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb' }} /> : <Visibility sx={{ color: darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb' }} />}</div>}
                />

                {!isLogin && (
                  <InputField
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => onChange("confirmPassword", e.target.value)}
                    endIcon={<div onClick={handleToggleConfirmPasswordVisibility} className='cursor-pointer pr-2 pb-0.5'
                    >{showConfirmPassword ? <VisibilityOff sx={{ color: darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb' }} /> : <Visibility sx={{ color: darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb' }} />}</div>}
                  />
                )}

                {isLogin && (
                  <div className="flex items-center justify-between flex-wrap">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          sx={{
                            color: darkMode ? 'rgb(167, 139, 250)' : '#3b82f6',
                            '&.Mui-checked': {
                              color: darkMode ? 'rgb(167, 139, 250)' : '#3b82f6',
                            },
                          }}
                          size={isMobile ? "small" : "medium"}
                        />
                      }
                      label={
                        <Typography variant="body2" className={`${darkMode ? 'text-purple-300' : 'text-blue-600'} pt-0.5`}>
                          Remember me
                        </Typography>
                      }
                    />
                    <Typography
                      variant="body2"
                      className={`cursor-pointer hover:underline ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}
                      onClick={handleForgotPassword}
                    >
                      Forgot password?
                    </Typography>
                  </div>
                )}

                <ButtonComponent
                  type="submit"
                  btnText={isLogin ? 'Log In' : 'Continue to Sign Up'}
                  startIcon={isLogin ? <Login /> : <AppRegistration />}
                  darkMode={darkMode}
                  styles={{ width: "100%", marginTop: "16px" }}
                />

                <div className="flex items-center my-4 md:my-6">
                  <div className={`flex-grow h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                  <Typography className={`px-2 md:px-4 text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    or continue with
                  </Typography>
                  <div className={`flex-grow h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <ButtonComponent
                    btnText={'Google'}
                    startIcon={<Google />}
                    handleClick={() => handleAuth(isLogin ? 'login' : 'signup')}
                    darkMode={darkMode}
                    styles={{
                      width: "100%",
                      backgroundColor: darkMode ? 'rgba(107, 114, 128, 0.2)' : 'rgba(219, 234, 254, 0.8)',
                      color: darkMode ? 'rgb(233, 213, 255)' : '#3b82f6',
                      '&:hover': {
                        backgroundColor: darkMode ? 'rgba(107, 114, 128, 0.3)' : 'rgba(219, 234, 254, 1)',
                      }
                    }}
                  />
                  <ButtonComponent
                    btnText={'Facebook'}
                    startIcon={<Facebook />}
                    handleClick={() => handleAuth(isLogin ? 'login' : 'signup')}
                    darkMode={darkMode}
                    styles={{
                      width: "100%",
                      backgroundColor: darkMode ? 'rgba(107, 114, 128, 0.2)' : 'rgba(219, 234, 254, 0.8)',
                      color: darkMode ? 'rgb(233, 213, 255)' : '#3b82f6',
                      '&:hover': {
                        backgroundColor: darkMode ? 'rgba(107, 114, 128, 0.3)' : 'rgba(219, 234, 254, 1)',
                      }
                    }}
                  />
                </div>
              </div>
            </form>

            <Box className="mt-6 md:mt-8 text-center">
              <Typography className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} flex gap-1 w-full justify-center`} variant="body2">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <a
                  href="#toggle"
                  onClick={switchAuthMode}
                  className={`font-medium hover:underline ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </a>
              </Typography>
            </Box>

            <Box className="mt-6 md:mt-8 text-center">
              <Typography variant="caption" className={darkMode ? "text-gray-400" : "text-gray-500"}>
                © 2025 NotePad App • <span className="cursor-pointer hover:underline">Terms</span> • <span className="cursor-pointer hover:underline">Privacy</span>
              </Typography>
            </Box>
          </div>
        </Box>
      )}
    </Box>
  );
};

export default LoginPage;