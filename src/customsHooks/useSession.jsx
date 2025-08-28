import React, {useEffect} from "react";

export default function useSession(key, initValue) {

    const [value, setValue] = React.useState(() => {
        try {
            const stored = sessionStorage.getItem(key);
            return stored ? JSON.parse(stored) : initValue;
        } catch (error) {
            throw error;
        }
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
