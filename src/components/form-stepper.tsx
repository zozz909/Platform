"use client";

import { cn } from "@/lib/utils";

interface FormStepperProps {
  currentStep: number;
  steps: string[];
}

export default function FormStepper({ currentStep, steps }: FormStepperProps) {
  return (
    <div className="flex items-center justify-center w-full max-w-md mx-auto">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={step} className="flex items-center w-full">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300",
                  isActive && "bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/30",
                  isCompleted && "bg-primary text-primary-foreground",
                  !isActive && !isCompleted && "bg-secondary text-secondary-foreground"
                )}
              >
                {isCompleted ? '✓' : stepNumber}
              </div>
              <p className={cn(
                "mt-2 text-sm font-medium text-center transition-colors duration-300",
                isActive || isCompleted ? "text-primary" : "text-muted-foreground"
              )}>
                {step}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                  "flex-1 h-1 mx-2 transition-colors duration-500",
                  isCompleted ? "bg-primary" : "bg-border"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
