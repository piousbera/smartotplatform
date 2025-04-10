
import { Check } from "lucide-react";

interface WizardStepsProps {
  currentStep: number;
}

export const WizardSteps = ({ currentStep }: WizardStepsProps) => {
  const steps = [
    { id: 1, name: "Template" },
    { id: 2, name: "Bot Info" },
    { id: 3, name: "Knowledge" },
    { id: 4, name: "Customize" },
    { id: 5, name: "Deploy" },
  ];

  return (
    <div className="flex justify-between items-center">
      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const isComplete = step.id < currentStep;

        return (
          <div 
            key={step.id}
            className={`step-item ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}
          >
            <div className={`step-icon relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 bg-white z-10 transition-all duration-300`}>
              {isComplete ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{step.id}</span>
              )}
            </div>
            <p className="text-xs mt-2">{step.name}</p>
          </div>
        );
      })}
    </div>
  );
};
