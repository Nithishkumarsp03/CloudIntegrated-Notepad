// OnboardingFlow.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { cn } from '../components';
import { ButtonComponent } from '../components/button';
import { Snackbar } from '../components';
import { useLoginStore } from '../store/loginStore';
import useEditorStore from '../store/globalStore';
import { logo } from '../assets';
import StepIndicator from '../components/onBoarding/components/stepIndicator';
import WelcomeStep from '../components/onBoarding/components/welcomeStep';
import PersonaSelectionStep from '../components/onBoarding/components/personaSelection';
import AdditionalSettingsStep from '../components/onBoarding/components/additional';
import CompletionStep from '../components/onBoarding/components/complete';
import ThemeToggle from '../components/onBoarding/components/theme';
import { useSecureStorageStore } from '../hooks';

const OnboardingFlow = () => {
  // nav
  const navigate = useNavigate();
    const { setItem, getItem } = useSecureStorageStore(); 
  // store
  const darkMode = useEditorStore(state => state.darkMode);
  const setDarkMode = useEditorStore(state => state.setDarkMode);
  const getOnBoardingFlow = useLoginStore(state => state.getOnBoardingFlow);
  const loaders = useLoginStore(state => state.loaders);
  const email = useLoginStore(state => state.email);
  const onChange = useLoginStore(state => state.onChange);
  const authentication = useLoginStore(state => state.authentication);
  const twoFa = useLoginStore(state => state.twoFa);
  const token = getItem("token");


  const [step, setStep] = useState(0);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [gender, setGender] = useState('');
  const isMobile = useMediaQuery('(max-width:768px)');
  const [personas, setPersonas] = useState([]);
  const [register, setRegister] = useState(false);
  const [snackBar, setSnackBar] = useState({
    state: false,
    message: ""
  });
  const [timeoutDuration, setTimeoutDuration] = useState(0);

  if (!email) {
    navigate('/login');
  }

  useEffect(() => {
    if (token) {
      let data = getItem("notes");
      if (data) {
        const uuid = data[0]?.uuid;
        if (uuid) {
          navigate(`/note-pad/${uuid}`);
        }
      }
    }
  }, [navigate]);

  const handleGenderSelect = (e) => {
    setGender(e.target.value);
    onChange("gender", e.target.value);
  };

  const handleTwoFaChange = () => {
    onChange("twoFa", !twoFa);
  };

  useEffect(() => {
    if (timeoutDuration === 0) {
      setTimeoutDuration(300000);
    }
  }, [timeoutDuration]);

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
        }, timeoutDuration);
      } else {
        setPersonas(response?.data || []);
      }
    };
    fetchPersonas();
  }, [timeoutDuration, getOnBoardingFlow, navigate]);

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
    setItem("categoryId", persona.id);
    onChange("categoryId", persona.id);
    setSelectedPersona(persona);
  };

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else if (!register) {
      setRegister(true);
      const response = await authentication("register");
      if (response.status) {
        navigate('/notes');
      } else {
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
      setRegister(false);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <WelcomeStep
            darkMode={darkMode}
            isMobile={isMobile}
            logo={logo}
          />
        );
      case 1:
        return (
          <PersonaSelectionStep
            personas={personas}
            selectedPersona={selectedPersona}
            onPersonaSelect={handlePersonaSelect}
            isLoading={loaders.isFlowLoading}
            darkMode={darkMode}
            isMobile={isMobile}
          />
        );
      case 2:
        return (
          <AdditionalSettingsStep
            gender={gender}
            onGenderChange={handleGenderSelect}
            twoFa={twoFa}
            onTwoFaChange={handleTwoFaChange}
            darkMode={darkMode}
            isMobile={isMobile}
          />
        );
      case 3:
        return (
          <CompletionStep
            selectedPersona={selectedPersona}
            darkMode={darkMode}
            isMobile={isMobile}
          />
        );
      default:
        return null;
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

      <ThemeToggle
        darkMode={darkMode}
        onToggle={() => setDarkMode(!darkMode)}
        isMobile={isMobile}
      />

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
              loading={loaders.isRegisterLoading}
              btnText={step === steps.length - 1 ? "Get Started" : "Next"}
              endIcon={step === steps.length - 1 ? null : <ArrowForward />}
              darkMode={darkMode}
              handleClick={handleNext}
              disabled={(step === 1 && !selectedPersona) || (step === 2 && !gender) || (step === 1 && loaders.isFlowLoading)}
            />
          </div>

          {isMobile && (
            <StepIndicator
              steps={steps}
              currentStep={step}
              darkMode={darkMode}
            />
          )}
        </Box>

        {!isMobile && (
          <StepIndicator
            steps={steps}
            currentStep={step}
            darkMode={darkMode}
          />
        )}
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