import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import {
  School,
  Business,
  Create,
  EventNote,
  Psychology,
  ArrowBack,
  ArrowForward,
  CheckCircle
} from '@mui/icons-material';
import useEditorStore from '../globalStore';
import { cn } from '../components/cn';
import { ButtonComponent } from '../components/button';
import ProfileSwitch from '../components/switch';
import { SunIcon } from '../assets/svgs/sun';
import { MoonIcon } from '../assets/svgs/moon';
import logo from '../assets/logo.png';

const OnboardingFlow = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useEditorStore();
  const [step, setStep] = useState(0);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const isMobile = useMediaQuery('(max-width:768px)');

  const personas = [
    {
      id: 'student',
      title: 'Student',
      description: 'Class notes, study schedules, assignments, revision checklists',
      icon: <School fontSize="large" />,
    },
    {
      id: 'professional',
      title: 'Professional',
      description: 'Meeting minutes, tasklists, project ideas, to-do lists',
      icon: <Business fontSize="large" />,
    },
    {
      id: 'creative',
      title: 'Writer & Creative',
      description: 'Drafts, brainstorms, character/world-building notes, quotes',
      icon: <Create fontSize="large" />,
    },
    {
      id: 'planner',
      title: 'Planner & Organizer',
      description: 'Daily journaling, life goals, bullet journals, meal or habit tracking',
      icon: <EventNote fontSize="large" />,
    },
    {
      id: 'thinker',
      title: 'Thinker & Idea Dumper',
      description: 'Random thoughts, shower ideas, book notes, dream journal',
      icon: <Psychology fontSize="large" />,
    }
  ];

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
      title: "You're all set!",
      subtitle: "Your personalized notepad is ready"
    }
  ];

  const handlePersonaSelect = (persona) => {
    setSelectedPersona(persona);
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Complete onboarding and navigate to dashboard
      navigate('/profile');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSkip = () => {
    navigate('/profile');
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center space-x-2 mt-6">
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
        <div className="flex justify-center">
          <div className="relative pl-10">
            <img src={logo} alt="NotePad Logo" className="w-32 h-28 object-contain" />
          </div>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <Typography variant="h4" className={`font-bold ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
            Welcome to NotePad
          </Typography>

          <Typography className={`${darkMode ? 'text-purple-300' : 'text-blue-600'} text-center`}>
            Your personal space for notes, ideas, and everything in between. Let's set up your workspace to match your needs.
          </Typography>
        </div>
        <div className={cn(
          "p-5 rounded-lg transition-all duration-300 mt-4 transform hover:scale-105 max-w-md mx-auto mb-6",
          "backdrop-blur-md",
          darkMode
            ? "bg-purple-900/30 shadow-lg shadow-purple-900/20"
            : "bg-blue-100/80 shadow-lg shadow-blue-500/10"
        )}>
          <Typography variant="h6" className={`font-medium mb-2 ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
            Personalized Experience
          </Typography>
          <Typography variant="body1" className={`${darkMode ? 'text-purple-300' : 'text-blue-600'}`}>
            Answer a few quick questions to customize NotePad just for you. We'll recommend templates based on your needs.
          </Typography>
        </div>
      </div>
    );
  };

  const renderPersonaSelection = () => {
    return (
      <div className={cn(isMobile && "max-h-[50vh] overflow-y-auto pr-2 pb-4")}>
        <div className={cn(
          "grid gap-4",
          isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        )}>
          {personas.map((persona) => (
            <div
              key={persona.id}
              onClick={() => handlePersonaSelect(persona)}
              className={cn(
                "cursor-pointer p-5 rounded-lg transition-all duration-300",
                "backdrop-blur-md flex flex-col items-center text-center",
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
                "w-16 h-16 rounded-full flex items-center justify-center mb-4",
                selectedPersona?.id === persona.id
                  ? darkMode ? "bg-purple-900 text-purple-200" : "bg-blue-100 text-blue-700"
                  : darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
              )}>
                {persona.icon}
              </div>

              <Typography variant="h6" className={`font-bold mb-2 ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
                {persona.title}
              </Typography>

              <Typography variant="body2" className={`${darkMode ? 'text-purple-300' : 'text-blue-600'}`}>
                {persona.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCompletion = () => {
    return (
      <div className="text-center">
        <div className={cn(
          "w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center",
          darkMode ? "bg-purple-800 text-purple-200" : "bg-blue-100 text-blue-700"
        )}>
          <CheckCircle style={{ fontSize: 48 }} />
        </div>
        <div className='flex flex-col gap-2'>
          <Typography variant="h4" className={`font-bold mb-4 ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
            You're all set!
          </Typography>

          <Typography className={`${darkMode ? 'text-purple-300' : 'text-blue-600'} text-center`}>
            Your personalized NotePad is ready to use. We've set up your workspace based on your preferences.
          </Typography>
        </div>
        <div className={cn(
          "p-5 rounded-lg max-w-md mx-auto mb-6 mt-4",
          "backdrop-blur-md",
          darkMode
            ? "bg-purple-900/30"
            : "bg-blue-100/80"
        )}>
          <Typography variant="h6" className={`font-medium mb-2 ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
            Your selected persona:
          </Typography>
          <div className="flex justify-center items-center gap-3 mt-2">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              darkMode ? "bg-purple-900 text-purple-200" : "bg-blue-100 text-blue-700"
            )}>
              {selectedPersona?.icon}
            </div>
            <Typography className={darkMode ? "text-purple-200" : "text-blue-800"}>
              {selectedPersona?.title}
            </Typography>
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 0: return renderWelcome();
      case 1: return renderPersonaSelection();
      case 2: return renderCompletion();
      default: return null;
    }
  };

  return (
    <Box className={cn(
      "h-screen w-screen overflow-hidden",
      darkMode ? "bg-gradient-to-b from-gray-900 to-gray-800" : "bg-gradient-to-b from-blue-50 to-purple-50"
    )}>
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className={cn(
          "absolute top-20 left-20 w-64 h-64 rounded-full opacity-10",
          darkMode ? "bg-purple-700" : "bg-blue-300"
        )}></div>
        <div className={cn(
          "absolute bottom-40 right-40 w-80 h-80 rounded-full opacity-10",
          darkMode ? "bg-indigo-700" : "bg-indigo-200"
        )}></div>
      </div>

      {/* Dark mode toggle */}
      <div className="absolute top-4 right-4 z-20 cursor-pointer" onClick={setDarkMode}>
        <div className="flex items-center gap-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm p-2 rounded-full">
          <ProfileSwitch checked={darkMode} />
          <SunIcon className={cn("text-gray-400", darkMode ? "hidden" : "block")} />
          <MoonIcon className={cn("text-gray-400", darkMode ? "block" : "hidden")} />
        </div>
      </div>

      {/* Main content - Added extra top padding to avoid overlap with profile switch */}
      <Box className="h-full flex flex-col justify-center items-center px-4 sm:px-6 relative z-10 pt-16">
        <Box className={cn(
          "w-full max-w-3xl p-6 sm:p-8 rounded-xl shadow-lg",
          darkMode ? "bg-gray-800/90 border border-gray-700" : "bg-white/90 border border-gray-100"
        )}>
          {/* Header */}
          <div className="mb-4 text-center">
            <div className='flex items-center justify-center'>
              <div className='w-full'></div>
              <Typography variant="h5" className={`font-bold w-full text-nowrap mb-2 ${darkMode ? 'text-purple-100' : 'text-blue-800'}`}>
              {steps[step].title}
            </Typography>
              <Typography
                className={`font-bold w-full flex justify-end gap-2 cursor-pointer transition-colors duration-300 
    ${darkMode
                    ? 'text-purple-100 hover:text-purple-300'
                    : 'text-blue-800 hover:text-blue-600'
                  }`}
              >
                skip
                  <ArrowForward />
              </Typography>

            </div>

            <Typography className={`${darkMode ? 'text-purple-300' : 'text-blue-600'}`}>
              {steps[step].subtitle}
            </Typography>
          </div>

          {/* Step content */}
          <div className="min-h-[300px]">
            {renderStepContent()}
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 flex gap-4 justify-between">
            <ButtonComponent
              btnText="Back"
              startIcon={<ArrowBack />}
              darkMode={darkMode}
              handleClick={handleBack}
              disabled={step === 0}
              styles={{
                visibility: step === 0 ? 'hidden' : 'visible',
                backgroundColor: darkMode ? 'rgba(107, 114, 128, 0.2)' : 'rgba(219, 234, 254, 0.8)',
                color: darkMode ? 'rgb(233, 213, 255)' : '#3b82f6',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(107, 114, 128, 0.3)' : 'rgba(219, 234, 254, 1)',
                },
              }}
            />
            <ButtonComponent
              btnText={step === steps.length - 1 ? "Get Started" : "Next"}
              endIcon={step === steps.length - 1 ? null : <ArrowForward />}
              darkMode={darkMode}
              handleClick={handleNext}
              disabled={step === 1 && !selectedPersona}
            />
          </div>
        </Box>

        {/* Step indicator */}
        {renderStepIndicator()}
      </Box>
    </Box>
  );
};

export default OnboardingFlow;