export const isEmpty = (value) => {
  if (value == null) {
    // Check for null or undefined
    return true;
  }

  if (typeof value === "string" || Array.isArray(value)) {
    // Check if string or array is empty
    return value.length === 0;
  }

  if (typeof value === "object") {
    // Check if object is empty
    return Object.keys(value).length === 0;
  }

  return false;
};

export const numberToOrdinal = (number) => {
  if (typeof number !== "number" || isNaN(number)) {
    throw new Error("Input should be a valid number.");
  }

  // Special case for 11, 12, and 13
  if (number % 100 === 11 || number % 100 === 12 || number % 100 === 13) {
    return number + "th";
  }

  // General rule for other numbers
  switch (number % 10) {
    case 1:
      return number + "st";
    case 2:
      return number + "nd";
    case 3:
      return number + "rd";
    default:
      return number + "th";
  }
};
