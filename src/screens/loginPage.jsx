import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  useMediaQuery,
} from '@mui/material';
import useEditorStore from '../store/globalStore';
import { cn } from '../components/cn';
import { useLoginStore } from '../store/loginStore';
import { VideoComponent,LoginSwitch, LoginHeader, LoginForm, SignupForm } from '../components';
import { Snackbar } from '../components';

const LoginPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function getNote() {
      if (token) {
        navigate(`/`);
      }
      else {
        navigate("/login")
      }
    }
    getNote();
  }, []);
  const { authentication, firstLogin, loaders, resetAll } = useLoginStore();
  const { darkMode, setDarkMode } = useEditorStore();

  const [snackBar, setSnackBar] = useState({
    variant: "",
    state: false,
    msg: ""
  });

  const [formData, setFormData] = useState({
    loginName: '',
    loginEmail: '',
    loginPass: '',
    loginConfirmPass: ''
  });

  const [formState, setFormState] = useState({
    showPassword: false,
    showConfirmPassword: false,
    rememberMe: false,
    isLogin: true,
    showLeftPanel: true,
    formSubmitted: false,
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
    resetAll();
    setSnackBar({
      variant: "",
      state: false,
      msg: ""
    })
    setFormData({
      loginName: '',
      loginEmail: '',
      loginPass: '',
      loginConfirmPass: ''
    });
    updateFormState('isLogin', !formState.isLogin);
    updateFormState('formSubmitted', false);
    if (isMobile) updateFormState('showLeftPanel', false);
  };

  const toggleLeftPanel = () => {
    if (isMobile) {
      updateFormState('showLeftPanel', !formState.showLeftPanel);
    }
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
    const errors = [];
    if (!password) return "Password is required";
    const hasLength = password.length >= 8;
    if (!hasLength) {
      errors.push("Password must be at least 8 characters long");
    }
    const hasLowercase = /[a-z]/.test(password);
    if (!hasLowercase) {
      errors.push("Include at least one lowercase letter");
    }
    const hasUppercase = /[A-Z]/.test(password);
    if (!hasUppercase) {
      errors.push("Include at least one uppercase letter");
    }
    const hasDigit = /\d/.test(password);
    if (!hasDigit) {
      errors.push("Include at least one number");
    }
    const hasSpecial = /[\W_]/.test(password);
    if (!hasSpecial) {
      errors.push("Include at least one special character");
    }
    const strengthScore = [hasLength, hasLowercase, hasUppercase, hasDigit, hasSpecial].filter(Boolean).length;
    if (strengthScore < 3) {
      return `Password is too weak. ${errors.join(", ")}`;
    }
    return "";
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword && !formState.isLogin) return "Confirm password is required";
    if (confirmPassword !== password) return "Passwords do not match";
    return "";
  };

  const validateForm = () => {
    const nameError = validateName(formData.loginName);
    const emailError = validateEmail(formData.loginEmail);
    const passwordError = validatePassword(formData.loginPass);
    const confirmPasswordError = validateConfirmPassword(formData.loginConfirmPass, formData.loginPass);

    setFormState(prev => ({
      ...prev,
      formSubmitted: true,
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
    if (formState.isLogin) {
      await handleAuth('login');
    }
    else if (validateForm()) {
      await handleAuth('register');
    }
  }

  async function handleAuth(authType) {
    if (authType === 'login') {
      let response;
      if (!firstLogin) {
        await authentication("set", formData.loginEmail, formData.loginPass, formData.loginName);
        response = await authentication("login");
        if (!response.state && response.message) {
          setSnackBar({
            variant: response.state ? "success" : "error",
            state: true,
            msg: response.message
          })
        }
        if (response?.twoFa) {
          localStorage.setItem("otpExpiryTime", 10);
          navigate('/twoStepAuth');
        }
        else if (response?.state) {
          navigate(`/`);
        }
      }
    }
    else {
      await authentication("set", formData.loginEmail, formData.loginPass, formData.loginName);
      navigate('/onBoarding-flow');
    }
  }

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (formState.formSubmitted) {
      let errorMessage = '';
      switch (field) {
        case 'loginName':
          errorMessage = validateName(value);
          updateErrorState('name', errorMessage);
          break;
        case 'loginEmail':
          errorMessage = validateEmail(value);
          updateErrorState('email', errorMessage);
          break;
        case 'loginPass':
          errorMessage = validatePassword(value);
          updateErrorState('password', errorMessage);

          if (!formState.isLogin) {
            const confirmError = validateConfirmPassword(formData.loginConfirmPass, value);
            updateErrorState('confirmPassword', confirmError);
          }
          break;
        case 'loginConfirmPass':
          errorMessage = validateConfirmPassword(value, formData.loginPass);
          updateErrorState('confirmPassword', errorMessage);
          break;
        default:
          break;
      }
    }
  };

  return (
    <Box className="h-screen w-screen flex flex-col md:flex-row overflow-hidden">
      <Snackbar
        variant={snackBar.variant}
        open={snackBar.state}
        message={snackBar.msg}
        onClose={() => setSnackBar(p => ({ ...p, state: false }))}
        loading={false}
      />
      {(!isMobile || formState.showLeftPanel) && (
        <VideoComponent
          darkMode={darkMode}
          isLogin={formState.isLogin}
          isMobile={isMobile}
          showLeftPanel={formState.showLeftPanel}
          toggleLeftPanel={toggleLeftPanel}
        />
      )}
      {(!isMobile || !formState.showLeftPanel) && (
        <Box className={cn(
          isMobile ? "w-full h-full" : "w-1/2",
          "flex flex-col relative",
          darkMode ? "bg-gray-800" : "bg-white"
        )}>
          <LoginSwitch isMobile={isMobile} toggleLeftPanel={toggleLeftPanel} setDarkMode={setDarkMode} darkMode={darkMode} />
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16">
            <LoginHeader darkMode={darkMode} isLogin={formState.isLogin} />
            {formState.isLogin ? (
              <>
                <LoginForm
                  darkMode={darkMode}
                  isMobile={isMobile}
                  loginEmail={formData.loginEmail}
                  loginPass={formData.loginPass}
                  handleFieldChange={handleFieldChange}
                  formState={formState}
                  updateFormState={updateFormState}
                  handleForgotPassword={handleForgotPassword}
                  handleFormSubmit={handleFormSubmit}
                  loaders={loaders}
                  handleTogglePasswordVisibility={handleTogglePasswordVisibility}
                  switchAuthMode={switchAuthMode}
                />
              </>
            ) : (
              <>
                <SignupForm
                  darkMode={darkMode}
                  loginName={formData.loginName}
                  loginEmail={formData.loginEmail}
                  loginPass={formData.loginPass}
                  loginConfirmPass={formData.loginConfirmPass}
                  handleFieldChange={handleFieldChange}
                  formState={formState}
                  handleFormSubmit={handleFormSubmit}
                  loaders={loaders}
                  handleTogglePasswordVisibility={handleTogglePasswordVisibility}
                  handleToggleConfirmPasswordVisibility={handleToggleConfirmPasswordVisibility}
                  switchAuthMode={switchAuthMode}
                  renderPasswordStrengthIndicator={() => validatePassword(formData.loginPass)}
                />
              </>
            )}

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