import React, { useState, useEffect } from "react";
import { InputField } from "../components/inputField";
import { ButtonComponent } from "../components/button";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Link } from "react-router-dom";
import { Facebook, Brightness4, Brightness7, Send, Mail } from "@mui/icons-material";
import { cn } from '../components/cn';
import WaterDrop from "../assets/svgs/waterDrop";

// Import assets (kept as references)
import logo from "../assets/logo.png";
import notePad from "../assets/notepad.png";
import pencil from "../assets/pencil.png";
import eraser from "../assets/eraserImage.png";
import googleIcon from "../assets/googleIcon.png";
import sendIcon from "../assets/sendIcon.png";
import useEditorStore from "../globalStore";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { darkMode } = useEditorStore();
  const [userDetails, setUserDetails] = useState({
    userName: '',
    password: '',
    email: '',
    confirmPassword: ''
  });

  const toggleSignUp = () => setIsSignUp(!isSignUp);

  const handleInputChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setUserDetails(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className={cn(
      "w-full min-h-screen flex justify-center items-center relative overflow-hidden p-4 transition-colors duration-300",
      darkMode ? "bg-slate-900" : "bg-[#edf5fd]"
    )}>

      {/* Decorative water drops with adaptive colors */}
      <div className="absolute right-10 top-10 sm:right-[250px] rotate-[-125deg] opacity-50">
        <WaterDrop width={50} height={50} fill={darkMode ? "#4B5563" : "#3B82F6"} /> {/* Bright blue */}
      </div>
      <div className="absolute bottom-10 right-20 sm:right-[300px] rotate-[160deg] opacity-50">
        <WaterDrop width={80} height={80} fill={darkMode ? "#9F1239" : "#EF4444"} /> {/* Vibrant red */}
      </div>
      <div className="absolute left-5 bottom-20 rotate-[60deg] opacity-50">
        <WaterDrop width={90} height={90} fill={darkMode ? "#155E75" : "#06B6D4"} /> {/* Cyan */}
      </div>
      <div className="absolute -left-10 top-20 rotate-[30deg] opacity-50">
        <WaterDrop width={120} height={120} fill={darkMode ? "#B45309" : "#F59E0B"} /> {/* Amber */}
      </div>
      <div className="absolute -right-16 bottom-40 rotate-[-45deg] opacity-50">
        <WaterDrop width={110} height={110} fill={darkMode ? "#065F46" : "#10B981"} /> {/* Emerald */}
      </div>
      <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 rotate-[15deg] opacity-50">
        <WaterDrop width={130} height={130} fill={darkMode ? "#9F1239" : "#EC4899"} /> {/* Pink */}
      </div>

      <div className={cn(
        "flex flex-col md:flex-row shadow-xl rounded-2xl z-10 w-full max-w-[900px] overflow-hidden transition-colors duration-300",
        darkMode ? "shadow-slate-700/30" : "shadow-gray-300/70"
      )}>
        {/* Left decorative panel */}
        <div className={cn(
          "hidden md:flex flex-col text-white w-1/2 rounded-l-2xl p-10 relative transition-colors duration-300",
          darkMode ? "bg-indigo-900" : "bg-blue-600"
        )}>
          {/* Decorative elements */}
          <div className="absolute w-6 h-6 bg-white opacity-20 rounded-full top-10 left-10"></div>
          <div className="absolute w-4 h-4 bg-white opacity-20 rounded-full bottom-20 right-14"></div>
          <div className="absolute w-3 h-3 bg-white opacity-20 rounded-full top-28 right-20"></div>
          <div className="absolute w-5 h-5 bg-white opacity-20 rounded-full bottom-40 left-20"></div>
          <div className="absolute w-7 h-7 bg-white opacity-20 rounded-full top-48 left-32"></div>

          {/* App illustrations */}
          <div className="absolute w-[300px] h-[300px] rotate-[-20deg] bottom-[140px] left-[40px]">
            <img src={notePad} alt="notepad" className="filter drop-shadow-lg" /> 
          </div>
          <div className="absolute w-[70px] h-[70px] rotate-[-35deg] bottom-[280px] right-[30px]">
            <img src={pencil} alt="pencil" className="filter drop-shadow-md" />
          </div>
          <div className="absolute w-[40px] h-[40px] top-[120px]">
            <img src={eraser} alt="eraser" className="filter drop-shadow-md" />
          </div>

          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <Mail fontSize="small" className="text-white" />
            </div>
            <p className="text-xl font-bold">Online Notepad</p>
          </div>

          <div className="mt-auto">
            <p className="text-xl font-bold mb-2">
              {isSignUp ? "Start Your Journey" : "Welcome Back"}
            </p>
            <p className="text-sm opacity-90 pb-8 font-normal">
              {isSignUp
                ? "Create your account and join thousands of users organizing their thoughts."
                : "Your ideas, always within reach. Login to access your notes anywhere."}
            </p>
          </div>
        </div>

        {/* Right form panel */}
        <div className={cn(
          "w-full md:w-1/2 sm:p-12 p-8 pb-6 sm:pb-6 rounded-r-2xl flex flex-col transition-colors duration-300",
          darkMode ? "bg-slate-800 text-white" : "bg-white text-slate-800"
        )}>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img src={logo} alt="logo" className="w-[70px] h-12 object-contain" />
            </div>
          </div>

          <h1 className="text-center text-xl font-bold mb-1">
            {isSignUp ? "Create Your Account" : "Welcome Back"}
          </h1>
          <p className={cn(
            "text-center text-sm mb-8 font-medium",
            darkMode ? "text-gray-400" : "text-gray-600"
          )}>
            {isSignUp ? "Get started with your free account" : "Sign in to continue"}
          </p>

          <div className="flex flex-col gap-5 bg-transparent">
            {isSignUp && (
              <div>
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                />
              </div>
            )}
            <div className="bg-transparent">
              <InputField
                label="Username"
                name="userName"
                type="text"
                value={userDetails.userName}
                onChange={handleInputChange}
              />
            </div>

            <div className={`bg-transparent ${isSignUp && 'mb-[22px]'}`}>
              <InputField
                label="Password"
                name="password"
                type="password"
                value={userDetails.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {!isSignUp && (
            <div className="flex justify-between items-center mt-5 mb-6">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      sx={{
                        color: darkMode ? '#6D28D9' : '#2563EB',
                        '&.Mui-checked': {
                          color: darkMode ? '#6D28D9' : '#2563EB',
                        }
                      }}
                    />
                  }
                  label={<span className={cn(
                    "text-sm font-medium",
                    darkMode ? "text-gray-300" : "text-gray-600"
                  )}>Remember me</span>}
                />
              </FormGroup>
              <p className={cn(
                "text-sm cursor-pointer hover:underline font-semibold",
                darkMode ? "text-purple-500" : "text-blue-600"
              )}>
                Forgot password?
              </p>
            </div>
          )}

          <Link to='/profile'>
          <ButtonComponent
            btnText={isSignUp ? "Create Account" : "Login"}
            className={cn(
              "mt-2 py-3 transition-all transform hover:translate-y-[-2px]",
              darkMode
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            )}
            endIcon={<img src={sendIcon} alt="send" width={18} height={18} />}
          />
          </Link>
          <div className="flex items-center my-6">
            <div className={cn(
              "flex-grow h-px",
              darkMode ? "bg-gray-700" : "bg-gray-200"
            )}></div>
            <span className={cn(
              "px-4 text-sm font-medium",
              darkMode ? "text-gray-400" : "text-gray-500"
            )}>Or continue with</span>
            <div className={cn(
              "flex-grow h-px",
              darkMode ? "bg-gray-700" : "bg-gray-200"
            )}></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link to="/textEditor/1" className="w-full">
              <ButtonComponent
                className={cn(
                  "w-full transition-all hover:shadow-md active:scale-95",
                  darkMode
                    ? "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm"
                )}
                startIcon={<img width={20} height={20} src={googleIcon} alt="Google" />}
                btnText="Google"
              />
            </Link>
            <Link to="/textEditor/1" className="w-full">
              <ButtonComponent
                className={cn(
                  "w-full transition-all hover:shadow-md active:scale-95",
                  darkMode
                    ? "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm"
                )}
                startIcon={<Facebook className={darkMode ? "text-blue-400" : "text-blue-600"} />}
                btnText="Facebook"
              />
            </Link>
          </div>

          <p className={cn(
            "text-center text-sm font-medium mt-8",
            darkMode ? "text-gray-300" : "text-gray-600"
          )}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
            <span
              className={cn(
                "cursor-pointer hover:underline font-semibold",
                darkMode ? "text-purple-500" : "text-blue-600"
              )}
              onClick={toggleSignUp}
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;