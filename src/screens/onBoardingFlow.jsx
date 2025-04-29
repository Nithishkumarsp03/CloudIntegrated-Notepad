import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  useMediaQuery,
  MenuItem,
  Select,
  FormControlLabel,
  Skeleton
} from '@mui/material';
import {
  School,
  Business,
  Create,
  EventNote,
  Psychology,
  ArrowBack,
  ArrowForward,
  CheckCircle,
  Security
} from '@mui/icons-material';
import { cn } from '../components/cn';
import ProfileSwitch from '../components/switch/switch';
import { SunIcon } from '../assets/svgs/sun';
import { ButtonComponent } from '../components/button/button';
import Snackbar from '../components/snackBar/snackBar';
import { MoonIcon } from '../assets/svgs/moon';
import { useLoginStore } from '../store/loginStore';
import useEditorStore from '../store/globalStore';
import { logo } from '../assets';


const OnboardingFlow = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useEditorStore();
  const { getOnBoardingFlow, loaders, onChange, authentication, twoFa } = useLoginStore();
  const [step, setStep] = useState(0);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [gender, setGender] = useState('');
  const isMobile = useMediaQuery('(max-width:768px)');
  const [personas, setPersonas] = useState([]);
  const [snackBar, setSnackBar] = useState({
    state: false,
    message: ""
  });
  const [timeoutDuration, setTimeoutDuration] = useState(0);

  const handleSelect = (e) => {
    setGender(e.target.value);
    onChange("gender", e.target.value);
  };

  useEffect(() => {
    if (timeoutDuration === 0) {
      setTimeoutDuration(300000);
    }
  }, []);

  useEffect(() => {
    const fetchPersonas = async () => {
      const response = await getOnBoardingFlow();
      if (!response.state) {
        setSnackBar({
          state: true,
          message: response.message
        });
        setTimeout(() => {
          navigate('/');
          setSnackBar({
            state: false,
            message: response.message
          });
        }, timeoutDuration || 5000); 
      }
      const personasWithIcons = response?.data?.map(persona => {
        let icon;
        switch (persona.id) {
          case 2:
            icon = <School fontSize="large" />;
            break;
          case 3:
            icon = <Business fontSize="large" />;
            break;
          case 4:
            icon = <Create fontSize="large" />;
            break;
          case 5:
            icon = <EventNote fontSize="large" />;
            break;
          case 6:
            icon = <Psychology fontSize="large" />;
            break;
          default:
            icon = <School fontSize="large" />;
        }
        return { ...persona, icon };
      });
      setPersonas(personasWithIcons);
    };
    fetchPersonas();
  }, [timeoutDuration]);


  const steps = [
    {
      title: "Welcome to NotePad",
      subtitle: "Let's personalize your experience"
    },
    {
      title: "What describes you best?",
      subtitle: "Select the option that fits your main use case"
    },
    {
      title: "Additional Settings",
      subtitle: "Help us customize your account"
    },
    {
      title: "You're all set!",
      subtitle: "Your personalized notepad is ready"
    }
  ];

  const handlePersonaSelect = (persona) => {
    localStorage.setItem("categoryId", persona.id);
    onChange("categoryId", persona.id);
    setSelectedPersona(persona);
  };

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      const response = await authentication("register");
      if (response.status) {
        navigate('/notes');
      }
      else {
        setSnackBar({
          state: true,
          message: response?.message
        });
        setTimeout(() => {
          navigate('/');
          setSnackBar({
            state: false,
            message: ""
          });
        }, timeoutDuration || 7000); 
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center space-x-2 mt-4 mb-6">
        {steps.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === step
                ? darkMode ? "w-8 bg-purple-500" : "w-8 bg-blue-500"
                : darkMode ? "w-2 bg-gray-600" : "w-2 bg-gray-300"
            )}
          />
        ))}
      </div>
    );
  };

  const renderWelcome = () => {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="NotePad Logo"
            className={cn(
              "object-contain",
              isMobile ? "h-16 pl-8" : "h-28 pl-16"
            )}
          />
        </div>
        <div className='flex flex-col items-center gap-3 mb-4'>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            className={`font-bold ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}
          >
            Welcome to NotePad
          </Typography>

          <Typography className={`${darkMode ? 'text-purple-300' : 'text-blue-600'} text-center max-w-lg text-sm md:text-base`}>
            Your personal space for notes, ideas, and everything in between. Let's set up your workspace to match your needs.
          </Typography>
        </div>
        <div className={cn(
          "p-4 md:p-6 rounded-lg max-w-md mx-auto",
          "backdrop-blur-md",
          darkMode
            ? "bg-purple-900/30 shadow-lg shadow-purple-900/20"
            : "bg-blue-100/80 shadow-lg shadow-blue-500/10"
        )}>
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            className={`font-medium mb-2 ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}
          >
            Personalized Experience
          </Typography>
          <Typography
            variant="body2"
            className={`${darkMode ? 'text-purple-300' : 'text-blue-600'}`}
          >
            Answer a few quick questions to customize NotePad just for you. We'll recommend templates based on your needs.
          </Typography>
        </div>
      </div>
    );
  };

  const renderPersonaSkeleton = () => {
    const skeletonCount = isMobile ? 3 : 4;

    return (
      <div className={cn(
        isMobile && "max-h-[40vh] overflow-y-auto overflow-x-hidden pb-2 -mx-2 px-2"
      )}>
        <div className={cn(
          "grid gap-3",
          isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
        )}>
          {Array(skeletonCount).fill(0).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className={cn(
                "p-3 md:p-5 rounded-lg transition-all duration-300",
                "backdrop-blur-md flex items-center gap-3 md:gap-4",
                darkMode
                  ? "bg-gray-800/60 border border-gray-700"
                  : "bg-white border border-gray-200"
              )}
            >
              <Skeleton
                variant="circular"
                width={isMobile ? 40 : 56}
                height={isMobile ? 40 : 56}
                animation="wave"
                className={darkMode ? "bg-gray-700" : "bg-gray-200"}
              />
              <div className="flex-1">
                <Skeleton
                  variant="text"
                  width="60%"
                  height={28}
                  animation="wave"
                  className={darkMode ? "bg-gray-700" : "bg-gray-200"}
                />
                <Skeleton
                  variant="text"
                  width="90%"
                  height={20}
                  animation="wave"
                  className={darkMode ? "bg-gray-700" : "bg-gray-200"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPersonaSelection = () => {
    if (loaders.isFlowLoading) {
      return renderPersonaSkeleton();
    }

    return (
      <div className={cn(
        isMobile && "max-h-[40vh] overflow-y-auto overflow-x-hidden pb-2 -mx-2 px-2"
      )}>
        <div className={cn(
          "grid gap-3",
          isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
        )}>
          {personas?.map((persona) => (
            <div
              key={persona.id}
              onClick={() => handlePersonaSelect(persona)}
              className={cn(
                "cursor-pointer p-3 md:p-5 rounded-lg transition-all duration-300 scrollbar-none",
                "backdrop-blur-md flex items-center gap-3 md:gap-4",
                selectedPersona?.id === persona.id
                  ? darkMode
                    ? "bg-purple-800/30 border border-purple-500 shadow-lg shadow-purple-900/30"
                    : "bg-blue-100/40 border border-blue-500 shadow-lg shadow-blue-500/20"
                  : darkMode
                    ? "bg-gray-800/60 border border-gray-700 hover:bg-gray-700/60"
                    : "bg-white border border-gray-200 hover:bg-blue-50"
              )}
            >
              <div className={cn(
                "rounded-full flex items-center justify-center flex-shrink-0",
                isMobile ? "w-10 h-10" : "w-14 h-14",
                selectedPersona?.id === persona.id
                  ? darkMode ? "bg-purple-900 text-purple-200" : "bg-blue-100 text-blue-700"
                  : darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
              )}>
                {React.cloneElement(persona.icon, {
                  fontSize: isMobile ? "medium" : "large"
                })}
              </div>

              <div>
                <Typography
                  variant={isMobile ? "subtitle1" : "h6"}
                  className={`font-bold mb-0.5 ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}
                >
                  {persona.topic}
                </Typography>

                <Typography
                  variant="body2"
                  className={`${darkMode ? 'text-purple-300' : 'text-blue-600'} text-xs md:text-sm`}
                >
                  {persona.description}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAdditionalSettings = () => {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="mb-4 md:mb-6">
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            className={`font-medium mb-1 md:mb-3 ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}
          >
            Select your gender
          </Typography>
          <Typography
            className={`mb-2 md:mb-4 text-sm ${darkMode ? 'text-purple-300' : 'text-blue-600'} ${isMobile && 'hidden'}`}
          >
            This helps us customize your experience
          </Typography>

          <Select
            labelId="gender-label"
            value={gender}
            displayEmpty
            size={isMobile ? "medium" : "large"}
            onChange={handleSelect}
            sx={{
              width: "100%",
              marginTop: "8px",
              '& .MuiOutlinedInput-notchedOutline': {
                border: '2px solid',
                borderColor: darkMode
                  ? '#6D28D9'
                  : '#0b6bcb',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: '2px solid',
                borderColor: darkMode
                  ? '#8B5CF6'
                  : '#1a73e8',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: darkMode
                  ? '#4C1D95 !important'
                  : '#1557b0 !important'
              },
              color: darkMode ? "rgb(233, 213, 255)" : "black",
              '& .MuiSelect-icon': {
                color: darkMode ? "rgb(233, 213, 255)" : "#0b6bcb",
              },
              '&.Mui-disabled': {
                WebkitTextFillColor: darkMode ? "rgb(233, 213, 255) !important" : "#000000 !important",
                color: darkMode ? "rgb(233, 213, 255) !important" : "#000000 !important",
              },
              '& .MuiSelect-select.Mui-disabled': {
                color: darkMode ? 'rgb(233, 213, 255) !important' : '#000000 !important',
                WebkitTextFillColor: darkMode ? 'rgb(233, 213, 255) !important' : '#000000 !important',
                opacity: 1,
              },
              '& .MuiInputBase-input.Mui-disabled': {
                color: darkMode ? 'rgb(233, 213, 255) !important' : '#000000 !important',
                WebkitTextFillColor: darkMode ? 'rgb(233, 213, 255) !important' : '#000000 !important',
                opacity: 1,
              },
              '&.Mui-disabled': {
                color: darkMode ? 'rgb(233, 213, 255) !important' : '#000000 !important',
                WebkitTextFillColor: darkMode ? 'rgb(233, 213, 255) !important' : '#000000 !important',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: darkMode ? "#374151" : "white",
                  borderRadius: "7px",
                  border: darkMode ? "1px solid #4B5563" : "1px solid #D1D5DB",
                  mt: "4px",
                  color: darkMode ? "rgb(233, 213, 255)" : "black"
                },
              },
              MenuListProps: {
                sx: {
                  padding: 0,
                },
              },
            }}
            className={`rounded-lg ${(darkMode ? 'bg-gray-800' : 'bg-white')}`}
          >
            <MenuItem value="" disabled hidden>Select gender</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Rather not say</MenuItem>
          </Select>
        </div>


        <div className="mb-4 md:mb-6">
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            className={`font-medium mb-1 md:mb-3 ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}
          >
            Security Options
          </Typography>
          <Typography
            className={`mb-2 md:mb-4 text-sm ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}
          >
            Configure additional security settings for your account
          </Typography>

          <Box className={cn(
            "p-3 md:p-4 rounded-lg mb-3 md:mb-4 border transition-all duration-300 mt-2",
            twoFa
              ? darkMode ? "bg-purple-900/20 border-purple-700" : "bg-blue-50 border-blue-200"
              : darkMode ? "bg-gray-700/50 border-gray-600" : "bg-gray-50 border-gray-200"
          )}>
            <FormControlLabel
              control={
                <ProfileSwitch
                  className="mr-1.5 ml-0.5"
                  checked={twoFa}
                  onChange={() => onChange("twoFa", !twoFa)}
                />
              }
              label={
                <Box>
                  <Typography className={`font-medium text-sm md:text-base ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
                    Two-Factor Authentication
                  </Typography>
                  <Typography variant="body2" className={`text-xs md:text-sm ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}>
                    Add an extra layer of security to protect your account
                  </Typography>
                </Box>
              }
            />

            {twoFa && (
              <Box className={cn(
                "mt-3 md:mt-4 pt-3 md:pt-4 border-t",
                darkMode ? "border-purple-700/50" : "border-blue-200"
              )}>
                <div className={cn(
                  "p-2 md:p-4 rounded-lg",
                  darkMode ? "bg-purple-900/20 text-purple-200" : "bg-blue-50 text-blue-700"
                )}>
                  <div className="flex items-center">
                    <Security className="mr-2" fontSize={isMobile ? "small" : "medium"} />
                    <Typography variant="body2" className="font-medium text-xs md:text-sm">
                      Two-factor authentication will be enabled
                    </Typography>
                  </div>
                  <Typography variant="body2" className={`mt-1 md:mt-2 text-xs md:text-sm ${darkMode ? 'text-purple-300' : 'text-blue-600'}`}>
                    Your account will be protected with an additional layer of security.
                    You'll set up an authenticator app to generate verification codes when signing in.
                  </Typography>
                </div>
              </Box>
            )}
          </Box>
        </div>
      </div>
    );
  };

  const renderCompletion = () => {
    return (
      <div className="text-center">
        <div className={cn(
          "rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center",
          isMobile ? "w-16 h-16" : "w-20 h-20",
          darkMode ? "bg-purple-800 text-purple-200" : "bg-blue-100 text-blue-700"
        )}>
          <CheckCircle style={{ fontSize: isMobile ? 36 : 48 }} />
        </div>
        <div className='flex flex-col gap-2 md:gap-4 mb-4 md:mb-6'>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            className={`font-bold ${darkMode ? 'text-purple-100' : 'text-blue-800'} w-full`}
          >
            You're all set!
          </Typography>

          <Typography className={`${darkMode ? 'text-purple-300' : 'text-blue-600'} text-center w-full text-sm md:text-base`}>
            Your personalized NotePad is ready to use. We've set up your workspace based on your preferences.
          </Typography>
        </div>


        <div className={cn(
          "p-3 md:p-5 rounded-lg max-w-md mx-auto",
          "backdrop-blur-md",
          darkMode
            ? "bg-purple-900/30"
            : "bg-blue-100/80"
        )}>
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            className={`font-medium mb-2 md:mb-3 ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}
          >
            Your selected preferences:
          </Typography>

          {selectedPersona && (
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-3">
              <div className={cn(
                "rounded-full flex items-center justify-center",
                isMobile ? "w-8 h-8" : "w-10 h-10",
                darkMode ? "bg-purple-900 text-purple-200" : "bg-blue-100 text-blue-700"
              )}>
                {React.cloneElement(selectedPersona?.icon, {
                  fontSize: isMobile ? "small" : "medium"
                })}
              </div>
              <Typography className={`${darkMode ? "text-purple-200" : "text-blue-800"} text-sm md:text-base`}>
                {selectedPersona?.topic}
              </Typography>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 0: return renderWelcome();
      case 1: return renderPersonaSelection();
      case 2: return renderAdditionalSettings();
      case 3: return renderCompletion();
      default: return null;
    }
  };

  return (
    <Box className={cn(
      "h-screen w-screen overflow-hidden",
      darkMode ? "bg-gray-900" : "bg-blue-50"
    )}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className={cn(
          "absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-5",
          darkMode ? "bg-purple-500" : "bg-blue-300"
        )}></div>
        <div className={cn(
          "absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-5",
          darkMode ? "bg-indigo-500" : "bg-indigo-200"
        )}></div>
      </div>

      <div className="absolute top-3 md:top-5 right-3 md:right-5 z-20">
        <div
          className={cn(
            "flex items-center h-10 gap-2 rounded-full pl-2 cursor-pointer",
            darkMode
              ? "bg-gray-800 border border-gray-600"
              : "bg-white border border-gray-300",
            isMobile ? "bg-transparent" : "p-2 gap-2"
          )}
          onClick={() => setDarkMode(!darkMode)}
        >
          <ProfileSwitch
            checked={darkMode}
            size={isMobile ? "small" : "medium"}
            className="mr-[-8px]"
          />
          <SunIcon size={24} className={cn(
            "text-gray-400",
            darkMode ? "hidden" : "block",
          )} />
          <MoonIcon size={24} className={cn(
            "text-gray-400",
            darkMode ? "block" : "hidden",
          )} />
        </div>
      </div>


      <Box className="h-full flex flex-col justify-center items-center px-3 md:px-6 relative z-10">
        <Box className={cn(
          "w-full max-w-3xl rounded-xl shadow-lg",
          isMobile ? "p-4" : "p-8",
          darkMode
            ? "bg-gray-800/90 border border-gray-700"
            : "bg-white/90 border border-gray-100"
        )}>

          <div className={`mb-4 md:mb-8 text-center`}>
            <div className='flex w-full mb-1'>
              <div className={`w-16 md:w-20 text-left`}>
                {step > 0 && (
                  <button
                    onClick={handleBack}
                    className={cn(
                      "flex items-center justify-center rounded-lg transition-all duration-200",
                      isMobile ? "p-1.5" : "p-2",
                      darkMode
                        ? "bg-gray-800 border border-gray-700 text-purple-200 hover:bg-gray-700"
                        : "bg-white border border-gray-200 text-blue-600 hover:bg-blue-50"
                    )}
                  >
                    <ArrowBack fontSize={isMobile ? "small" : "medium"} />
                  </button>
                )}
              </div>

              <Typography
                variant={isMobile ? "h6" : "h5"}
                className={`font-bold flex justify-center w-full ${isMobile ? 'pr-16' : 'pr-[76px]'} ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}
              >
                {steps[step].title}
              </Typography>
            </div>

            <Typography className={`${darkMode ? 'text-purple-300' : 'text-blue-600'} text-sm md:text-base`}>
              {steps[step].subtitle}
            </Typography>
          </div>


          <div className={cn(
            isMobile ? "min-h-[250px]" : "min-h-[340px]",
            "overflow-y-auto scrollbar-none"
          )}>
            {renderStepContent()}
          </div>

          <div className="mt-4 md:mt-8 flex justify-end">
            <ButtonComponent
              btnText={step === steps.length - 1 ? "Get Started" : "Next"}
              endIcon={step === steps.length - 1 ? null : <ArrowForward />}
              darkMode={darkMode}
              handleClick={handleNext}
              disabled={(step === 1 && !selectedPersona) || (step === 2 && !gender) || (step === 1 && loaders.isFlowLoading)}
              size={isMobile ? "small" : "medium"}
            />
          </div>

          {isMobile && renderStepIndicator()}
        </Box>

        {!isMobile && renderStepIndicator()}
      </Box>
      <Snackbar
        open={snackBar.state}
        autoHideDuration={7000}
        message={snackBar.message}
        variant='error'
      />
    </Box>
  );
};

export default OnboardingFlow;