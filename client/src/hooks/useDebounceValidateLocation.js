import { useRef } from "react";
import { isValidLocation } from "services/places.service";

function debounce(func, delay) {
    let timerId;
    return function (...args) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => func(...args), delay);
    };
}

const useDebounceValidateLocation = (setIsLoading = () => { }) => {
    const debounceValidate = useRef(debounce(async (value, callback) => {
        setIsLoading(true);
        try {
            const isValid = await isValidLocation(value);
            callback(isValid);
        } finally {
            setIsLoading(false);
        }
    }, 500)).current;

    const validateLocation = async (_, value) => {
        if (!value) {
            return Promise.reject("Enter a valid location");
        }

        return new Promise((resolve, reject) => {
            debounceValidate(value, (isValid) => {
                if (!isValid) {
                    reject("Enter a valid location");
                } else {
                    resolve();
                }
            });
        });
    };

    return validateLocation
}

export default useDebounceValidateLocation;