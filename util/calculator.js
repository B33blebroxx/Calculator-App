export const initialState = {
  currentValue: "0",
  operator: null,
  previousValue: null,
  displayValue: "0"
};

export const handleNumber = (value, state) => {
   const { displayValue, currentValue } = state;
   
   return {
    currentValue: currentValue === "0" ? `${value}` : `${currentValue}${value}`,
    displayValue: displayValue === "0" ? `${value}` : `${displayValue}${value}`
   }
  }

  const handleEqual = (state) => {
    const { displayValue } = state;
  
    try {
      const result = eval(displayValue);
      return {
        currentValue: `${result}`,
        displayValue: `${result}`,
        operator: null,
        previousValue: null,
      };
    } catch (error) {
      return state;
    }
  };

const calculator = (type, value, state) => {
  switch (type) {
    case "number":
      return handleNumber(value, state);

    case "clear":
      return initialState;

    case "posneg":
      return {
        ...state,
        currentValue: `${parseFloat(state.currentValue) * -1}`,
        displayValue: `${state.displayValue} * -1` 
      };

    case "percentage":
      return {
        ...state,
        currentValue: `${parseFloat(state.currentValue) * 0.01}`,
        displayValue: `${state.displayValue} * 0.01`
      }

    case "operator":
      return {
        ...state,
        operator: value,
        previousValue: state.currentValue,
        currentValue: "0",
        displayValue: `${state.displayValue} ${value}`,
      }

    case "equal":
      return handleEqual(state);

    default:
      return state;
  }
};

export default calculator;
