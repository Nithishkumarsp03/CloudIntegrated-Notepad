  import React, { useState, useEffect } from 'react';
  import { useNavigate } from "react-router-dom";
  import {
    Box,
    Typography,
    FormControlLabel,
    Checkbox,
    useMediaQuery,
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
  import  Snackbar  from '../components/snackBar';

  const LoginPage = () => {
    const navigate = useNavigate();
    const { darkMode, setDarkMode } = useEditorStore();
    const { loginName, loginEmail, loginPass, loginConfirmPass, onChange, login, firstLogin, loaders, resetAll } = useLoginStore();
    const [snackBar, setSnackBar] = useState({
      variant:"",
      state: false,
      msg:""
    })

    const [formState, setFormState] = useState({
      showPassword: false,
      showConfirmPassword: false,
      rememberMe: false,
      isLogin: true,
      videoLoaded: false,
      showLeftPanel: true,
      errors: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    });

    const isMobile = useMediaQuery('(max-width:768px)');

    const updateFormState = (field, value) => {
      setFormState(prev => ({
        ...prev,
        [field]: value
      }));
    };

    const updateErrorState = (field, value) => {
      setFormState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          [field]: value
        }
      }));
    };

    const handleTogglePasswordVisibility = () => {
      updateFormState('showPassword', !formState.showPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
      updateFormState('showConfirmPassword', !formState.showConfirmPassword);
    };

    const switchAuthMode = (e) => {
      e.preventDefault();
      updateFormState('isLogin', !formState.isLogin);
      if (isMobile) updateFormState('showLeftPanel', false);

      setFormState(prev => ({
        ...prev,
        errors: {
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      }));
    };

    const toggleLeftPanel = () => {
      if (isMobile) {
        updateFormState('showLeftPanel', !formState.showLeftPanel);
      }
    };

    const handleVideoLoad = () => {
      updateFormState('videoLoaded', true);
    };

    function handleForgotPassword() {
      navigate('/forgotPassword');
    }

    const validateName = (name) => {
      if (!name && !formState.isLogin) return "Name is required";
      if (name && name.length < 2) return "Name must be at least 2 characters";
      return "";
    };

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) return "Email is required";
      if (!emailRegex.test(email)) return "Please enter a valid email address";
      return "";
    };

    const validatePassword = (password) => {
      if (!password) return "Password is required";
      if (password.length < 5) return "Password must be at least 5 characters";
      return "";
    };

    const validateConfirmPassword = (confirmPassword, password) => {
      if (!confirmPassword && !formState.isLogin) return "Confirm password is required";
      if (confirmPassword !== password) return "Passwords do not match";
      return "";
    };

    const validateForm = () => {
      const nameError = validateName(loginName);
      const emailError = validateEmail(loginEmail);
      const passwordError = validatePassword(loginPass);
      const confirmPasswordError = validateConfirmPassword(loginConfirmPass, loginPass);

      setFormState(prev => ({
        ...prev,
        errors: {
          name: nameError,
          email: emailError,
          password: passwordError,
          confirmPassword: confirmPasswordError
        }
      }));

      return !nameError && !emailError && !passwordError &&
        (formState.isLogin || !confirmPasswordError);
    };

    async function handleFormSubmit(e) {
      e.preventDefault();

      if (validateForm()) {
        await handleAuth(formState.isLogin ? 'login' : 'signup');
      }
    }

    async function handleAuth(authType) {
      if (authType === 'login') {
        let response;
        if (!firstLogin) {
          response = await login();
          setSnackBar({
            variant: response.state ? "success" : "error",
            state:response.state === false && response.message ? true : false,
            msg: response.message
          })
          if (response.twoFa) {
            navigate('/twoStepAuth');
          }
          else {
            navigate('/note-pad/1'); 
          }
        }
      }
      else {
        navigate('/onBoarding-flow');
      }
    }

    const handleFieldChange = (field, value) => {
      onChange(field, value);

      switch (field) {
        case "loginName":
          updateErrorState('name', validateName(value));
          break;
        case "loginEmail":
          updateErrorState('email', validateEmail(value));
          break;
        case "loginPass":
          updateErrorState('password', validatePassword(value));
          if (loginConfirmPass) {
            updateErrorState('confirmPassword', validateConfirmPassword(loginConfirmPass, value));
          }
          break;
        case "loginConfirmPass":
          updateErrorState('confirmPassword', validateConfirmPassword(value, loginPass));
          break;
        default:
          break;
      }
    };

    return (
      <Box className="h-screen w-screen flex flex-col md:flex-row overflow-hidden">
        <Snackbar
          variant={snackBar.variant}
          open={snackBar.state}
          message={snackBar.msg}
          autoHideDuration={5000}
          onClose={() => setSnackBar(p => ({...p,state:false}))}
        />
        {(!isMobile || formState.showLeftPanel) && (
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
                {formState.isLogin ? "Login" : "Sign Up"}
              </button>
            )}

            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className={cn(
                "absolute inset-0 transition-opacity duration-700",
                formState.videoLoaded ? "opacity-0" : "opacity-100",
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
        )}

        {(!isMobile || !formState.showLeftPanel) && (
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
                  {formState.isLogin ? 'Welcome Back' : 'Create Account'}
                </Typography>
                <Typography variant="body1" className={`${darkMode ? 'text-purple-300' : 'text-blue-600'}`}>
                  {formState.isLogin ? 'Log in to continue to your workspace' : 'Join NotePad to start organizing your thoughts'}
                </Typography>
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="space-y-4 md:space-y-5">
                  {!formState.isLogin && (
                    <InputField
                      name="name"
                      label="Full Name"
                      value={loginName}
                      onChange={e => handleFieldChange("loginName", e.target.value)}
                      hasError={!!formState.errors.name}
                      errorMessage={formState.errors.name}
                    />
                  )}

                  <InputField
                    autofocus
                    name="email"
                    label="Email"
                    type="email"
                    value={loginEmail}
                    onChange={e => handleFieldChange("loginEmail", e.target.value)}
                    hasError={!!formState.errors.email}
                    errorMessage={formState.errors.email}
                  />

                  <InputField
                    name="password"
                    label="Password"
                    type={formState.showPassword ? 'text' : 'password'}
                    value={loginPass}
                    onChange={e => handleFieldChange("loginPass", e.target.value)}
                    hasError={!!formState.errors.password}
                    errorMessage={formState.errors.password}
                    endIcon={
                      <div
                        onClick={handleTogglePasswordVisibility}
                        className='cursor-pointer pr-2 pb-0.5'
                      >
                        {formState.showPassword ?
                          <VisibilityOff sx={{ color: darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb' }} /> :
                          <Visibility sx={{ color: darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb' }} />
                        }
                      </div>
                    }
                  />

                  {!formState.isLogin && (
                    <InputField
                      name="confirmPassword"
                      label="Confirm Password"
                      type={formState.showConfirmPassword ? 'text' : 'password'}
                      value={loginConfirmPass}
                      onChange={e => handleFieldChange("loginConfirmPass", e.target.value)}
                      hasError={!!formState.errors.confirmPassword}
                      errorMessage={formState.errors.confirmPassword}
                      endIcon={
                        <div
                          onClick={handleToggleConfirmPasswordVisibility}
                          className='cursor-pointer pr-2 pb-0.5'
                        >
                          {formState.showConfirmPassword ?
                            <VisibilityOff sx={{ color: darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb' }} /> :
                            <Visibility sx={{ color: darkMode ? 'rgb(233, 213, 255)' : '#0b6bcb' }} />
                          }
                        </div>
                      }
                    />
                  )}

                  {formState.isLogin && (
                    <div className="flex items-center justify-between flex-wrap">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formState.rememberMe}
                            onChange={(e) => updateFormState('rememberMe', e.target.checked)}
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
                    loading = {loaders.isLoginLoading}
                    btnText={formState.isLogin ? 'Log In' : 'Continue to Sign Up'}
                    startIcon={formState.isLogin ? <Login /> : <AppRegistration />}
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
                      handleClick={() => handleAuth(formState.isLogin ? 'login' : 'signup')}
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
                      handleClick={() => handleAuth(formState.isLogin ? 'login' : 'signup')}
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
                  {formState.isLogin ? "Don't have an account?" : "Already have an account?"}
                  <a
                    href="#toggle"
                    onClick={switchAuthMode}
                    className={`font-medium hover:underline ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}
                  >
                    {formState.isLogin ? 'Sign up' : 'Log in'}
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