import React, {useEffect} from "react";

export default function useLocalStorage(key, initValue) {

    const [value, setValue] = React.useState(() => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
