import { useState, useEffect } from 'react';

// Custom hook for session storage
function useSessionStorage(key, initialValue) {
    // Retrieve the initial value from session storage or use the provided initialValue
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading session storage for key '${key}': ${error}`);
            return initialValue;
        }
    });

    // Update the session storage whenever the value changes
    useEffect(() => {
        try {
            if (storedValue === undefined) {
                sessionStorage.removeItem(key);
            } else {
                sessionStorage.setItem(key, JSON.stringify(storedValue));
            }
        } catch (error) {
            console.error(`Error writing session storage for key '${key}': ${error}`);
        }
    }, [key, storedValue]);

    // Function to remove the item from session storage
    const removeItem = () => {
        setStoredValue(undefined); // Remove the value from state
    };

    return [storedValue, setStoredValue, removeItem];
}

export default useSessionStorage;
