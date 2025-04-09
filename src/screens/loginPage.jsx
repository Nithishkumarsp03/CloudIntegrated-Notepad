import React, { useState } from "react";
import { InputField } from "../components/inputField";
import { ButtonComponent } from "../components/button";
import googleIcon from "../assets/googleIcon.png";
import sendIcon from "../assets/sendIcon.png";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import FallingCharacters from "../components/fallingCharacters";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import notePad from "../assets/notepad.png";
import pencil from "../assets/pencil.png";
import eraser from "../assets/eraserImage.png";
import WaterDrop from "../assets/svgs/waterDrop";
import { cn } from '../components/cn';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
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
    <div className="bg-[#edf5fd] w-full min-h-screen flex justify-center items-center relative overflow-hidden p-4">
      {/* WaterDrop backgrounds */}
      <div className="absolute right-10 top-10 sm:right-[250px] rotate-[-125deg]">
        <WaterDrop width={50} height={50} />
      </div>
      <div className="absolute bottom-10 right-20 sm:right-[300px] rotate-[160deg]">
        <WaterDrop width={80} height={80} fill="#C30E59" />
      </div>
      <div className="absolute left-5 bottom-20 rotate-[60deg]">
        <WaterDrop width={90} height={90} fill="#81DAE3" />
      </div>
      <div className="absolute -left-10 top-20 rotate-[30deg]">
        <WaterDrop width={120} height={120} fill="#FFD700" />
      </div>
      <div className="absolute -right-16 bottom-40 rotate-[-45deg]">
        <WaterDrop width={110} height={110} fill="#7FFFD4" />
      </div>
      <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 rotate-[15deg]">
        <WaterDrop width={130} height={130} fill="#FF4500" />
      </div>

      <FallingCharacters />

      <div className="flex flex-col md:flex-row shadow-lg rounded-lg z-10 w-full max-w-[900px]">
        {/* Left decorative panel */}
        <div className="hidden md:flex flex-col bg-[#0b6bcb] text-white w-1/2 rounded-l-lg p-10 relative">
          <div className="absolute w-6 h-6 bg-white opacity-20 rounded-full top-10 left-10"></div>
          <div className="absolute w-4 h-4 bg-white opacity-20 rounded-full bottom-20 right-14"></div>
          <div className="absolute w-3 h-3 bg-white opacity-20 rounded-full top-28 right-20"></div>
          <div className="absolute w-5 h-5 bg-white opacity-20 rounded-full bottom-40 left-20"></div>
          <div className="absolute w-7 h-7 bg-white opacity-20 rounded-full top-48 left-32"></div>

          <div className="absolute w-[300px] h-[300px] rotate-[-20deg] bottom-[120px] left-[50px]">
            <img src={notePad} alt="notepad" />
          </div>
          <div className="absolute w-[70px] h-[70px] rotate-[-35deg] bottom-[280px] right-[30px]">
            <img src={pencil} alt="pencil" />
          </div>
          <div className="absolute w-[40px] h-[40px] top-[120px]">
            <img src={eraser} alt="eraser" />
          </div>

          <p className="text-center text-xl font-semibold mt-5">Online Notepad</p>
          <p className="text-center text-sm mt-auto pb-8 font-medium">
            {isSignUp ? "Join our community today!" : "Your ideas, always within reach. Login to access your notes anywhere."}
          </p>
        </div>

        {/* Right form panel */}
        <div className="bg-white w-full md:w-1/2 sm:p-12 p-8 pb-4 sm:pb-4 rounded-r-lg flex flex-col">
          <span className="ml-8">
            <img src={logo} alt="logo" className="mx-auto mb-4 w-[70px] h-12" />
          </span>
          <p className="text-center text-lg font-semibold">
            {isSignUp ? "Create Your Account" : "Welcome Back"}
          </p>
          <p className={cn("text-center text-sm text-gray-600 font-medium pb-4")}>
            {isSignUp ? "Get started with your free account" : "Sign in to continue"}
          </p>

          <div className={`flex flex-col gap-4 ${isSignUp && 'mb-2.5'}`}>
            {isSignUp && (
              <InputField
                label="Email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
              />
            )}

            <InputField
              label="Username"
              name="userName"
              value={userDetails.userName}
              onChange={handleInputChange}
            />

            <InputField
              label="Password"
              name="password"
              value={userDetails.password}
              onChange={handleInputChange}
              />

          </div>

          {!isSignUp && (
            <div className="flex justify-between items-center mt-4 mb-3">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={<span className="text-sm font-normal">Remember me</span>}
                />
              </FormGroup>
              <p className="text-[#0b6bcb] text-sm cursor-pointer hover:underline font-semibold">
                Forgot password?
              </p>
            </div>
          )}

          <ButtonComponent
            imgAnim={true}
            btnText={isSignUp ? "Sign Up" : "Login"}
            styles={{ boxShadow: 0 }}
            endIcon={<img src={sendIcon} alt="send" width={18} height={18} />}
          />

          <p className="text-center text-sm my-3 font-semibold">Or</p>

          <Link to="/textEditor/1">
            <ButtonComponent
              className="mt-3 bg-transparent hover:bg-gray-200 hover:shadow-md active:scale-95 transition-all"
              styles={{
                backgroundColor: "transparent",
                color: "black",
                border: "1px solid gray",
                "&:hover": { backgroundColor: "transparent" },
                boxShadow: 0,
                "&:active": { backgroundColor: "transparent" }
              }}
              startIcon={<img width={20} height={20} src={googleIcon} alt="googleIcon" />}
              btnText={isSignUp ? "Sign up with Google" : "Sign in with Google"}
            />
          </Link>

          <p className="text-center text-sm font-semibold mt-16">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
            <span
              className="text-[#0b6bcb] cursor-pointer hover:underline font-semibold"
              onClick={toggleSignUp}
            >
              {isSignUp ? "Sign in here!" : "Sign up here!"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;