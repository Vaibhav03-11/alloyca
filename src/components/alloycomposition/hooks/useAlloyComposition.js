import { useCallback } from "react";

const toNumber = (value) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const validateInputs = (weight, currentPurity, targetPurity) => {
  const weightValue = toNumber(weight);
  const currentValue = toNumber(currentPurity);
  const targetValue = toNumber(targetPurity);

  if (weightValue === null || currentValue === null || targetValue === null) {
    return { value: null, error: "Enter all values to calculate." };
  }

  if (weightValue <= 0) {
    return { value: null, error: "Current weight must be greater than 0." };
  }

  if (targetValue <= 0 || currentValue <= 0) {
    return { value: null, error: "Purity values must be greater than 0." };
  }

  if (currentValue <= targetValue) {
    return {
      value: null,
      error: "Current purity must be higher than target purity.",
    };
  }

  return { value: null, error: "" };
};

const calculateAlloyWeight = (weight, currentPurity, targetPurity) =>
  weight * ((currentPurity - targetPurity) / targetPurity);

export default function useAlloyComposition() {
  const calculateResult = useCallback(
    ({ weight, currentPurity, targetPurity }) => {
      const validation = validateInputs(weight, currentPurity, targetPurity);
      if (validation.error) {
        return validation;
      }

      const weightValue = toNumber(weight);
      const currentValue = toNumber(currentPurity);
      const targetValue = toNumber(targetPurity);

      const alloyWeight = calculateAlloyWeight(
        weightValue,
        currentValue,
        targetValue
      );

      return { value: alloyWeight, error: "" };
    },
    []
  );

  return { calculateResult };
}
