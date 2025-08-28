import React, {useEffect} from "react";

export default function useLocalStorage(key, initValue) {

    const [value, setValue] = React.useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initValue;
        } catch (error) {
            throw error;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
