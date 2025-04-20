import { useSearchParams } from "react-router-dom";

function useSearchState(key, defaultValue = null) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Helper function to parse values correctly
  const parseValue = (val) => {
    if (!val) return defaultValue;
    try {
      return JSON.parse(val); // Try parsing as JSON
    } catch {
      return val; // If not JSON, return as is (for strings, numbers, etc.)
    }
  };

  // Get current value from URL
  const value = parseValue(searchParams.get(key));

  // Function to update the URL param (acts like setState)
  const setValue = (newValue) => {
    const newParams = new URLSearchParams(searchParams);
    let finalValue =
      typeof newValue === "function" ? newValue(value) : newValue;

    if (finalValue === null || finalValue === undefined || finalValue === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, JSON.stringify(finalValue)); // Store as JSON
    }

    setSearchParams(newParams, { replace: true }); // Avoids adding to history stack
  };

  return [value, setValue];
}

export default useSearchState;
