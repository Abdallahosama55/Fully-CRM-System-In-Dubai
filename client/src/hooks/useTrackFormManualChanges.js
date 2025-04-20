import { useState, useRef, useEffect } from "react";

/**
 * Custom hook to track manual changes in an Ant Design form while ignoring the initial render
 * and allowing programmatic updates to be skipped.
 * 
 * @returns {Object} - An object containing:
 *  - isChanged: Boolean indicating whether a manual change has occurred.
 *  - stopWatchChanges: Function to temporarily stop tracking changes (for programmatic updates).
 *  - continueWatchChanges: Function to resume tracking changes after a programmatic update.
 *  - handleValuesChange: Callback function to be used with the Form's `onValuesChange` prop.
 */
const useTrackManualChanges = () => {
  const [isChanged, setIsChanged] = useState(false);
  const ignoreChangeRef = useRef(); // Ref to manage ignoring programmatic updates
  const isFirstRender = useRef(true); // Ref to track the first render
  
  console.log(ignoreChangeRef.current); // Debug log for the current state of ignoreChangeRef

  useEffect(() => {
    isFirstRender.current = false; // Mark the first render as complete
  }, []);

  /**
   * Handles changes in form values and tracks only manual changes.
   * Skips changes during the initial render or when explicitly ignoring updates.
   *
   * @param {Object} _ - The changed fields (unused here).
   * @param {Object} allValues - The current form values.
   */
  const handleValuesChange = (_, allValues) => {
    if (isFirstRender.current || ignoreChangeRef.current) return; // Ignore first render or programmatic updates
    console.log(allValues, "allValues"); // Debug log for current values
    setIsChanged(true); // Mark as manually changed
  };

  /**
   * Temporarily stops tracking changes to avoid detecting programmatic updates.
   */
  const stopWatchChanges = () => {
    console.log("stopWatchChanges")
    ignoreChangeRef.current = true;
  };

  /**
   * Resumes tracking changes after programmatic updates are complete.
   */
  const continueWatchChanges = () => {
    console.log("continueWatchChanges")
    ignoreChangeRef.current = false;
  };
  
  return { isChanged, stopWatchChanges, continueWatchChanges, handleValuesChange };
};

export default useTrackManualChanges;
