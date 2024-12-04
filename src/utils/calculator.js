import Decimal from "decimal.js";

export const initialState = {
  currentValue: "0",
  operator: null,
  previousValue: null,
  displayValue: "0",
};

const handleNumber = (value, state) => {
  const { displayValue, currentValue } = state;

  return {
    currentValue: currentValue === "0" ? `${value}` : `${currentValue}${value}`,
    displayValue: displayValue === "0" ? `${value}` : `${displayValue}${value}`,
  };
};

const handleEqual = (state) => {
  const { displayValue } = state;

  try {
    // Calculate the result and round it to two decimal places
    const result = new Decimal(eval(displayValue)).toFixed(2); // Use .toFixed(2) for two decimal places
    return {
      currentValue: `${result}`,
      displayValue: `${result}`,
      operator: null,
      previousValue: null,
    };
  } catch (error) {
    return { ...state, displayValue: "Error" };
  }
};

export const calculateResult = (type, value, state) => {
  switch (type) {
    case "number":
      return handleNumber(value, state);

    case "clear":
      return initialState;

    case "posneg":
      const invertedValue = parseFloat(state.currentValue) * -1;
      return {
        ...state,
        currentValue: `${invertedValue}`,
        displayValue: `${invertedValue}`,
      };

    case "percentage":
      return {
        ...state,
        currentValue: `${parseFloat(state.currentValue) * 0.01}`,
        displayValue: `${state.displayValue} * 0.01`,
      };

    case "operator":
      return {
        ...state,
        operator: value,
        previousValue: state.currentValue,
        currentValue: "0",
        displayValue: `${state.displayValue} ${value}`,
      };

    case "equal":
      return handleEqual(state);

    default:
      return state;
  }
};
