import React from 'react';
import { cn } from '../../cn';

const StepIndicator = ({ steps, currentStep, darkMode }) => {
    return (
        <div className="flex justify-center space-x-2 mt-4 mb-6">
            {steps.map((_, index) => (
                <div
                    key={index}
                    className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        index === currentStep
                            ? darkMode ? "w-8 bg-purple-500" : "w-8 bg-blue-500"
                            : darkMode ? "w-2 bg-gray-600" : "w-2 bg-gray-300"
                    )}
                />
            ))}
        </div>
    );
};

export default StepIndicator;