"use client";

import { useState } from "react";

export function useMultiplestepForm(totalSteps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const nextStep = () => {
    setCurrentStepIndex((prevIndex) => Math.min(prevIndex + 1, totalSteps - 1));
  };

  const previousStep = () => {
    setCurrentStepIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const goTo = (index) => {
    const newIndex = Math.max(0, Math.min(index, totalSteps - 1));
    setCurrentStepIndex(newIndex);
  };

  return {
    currentStepIndex,
    totalSteps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === totalSteps - 1,
    goTo,
    nextStep,
    previousStep,
  };
}
