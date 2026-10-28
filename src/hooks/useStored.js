import {useEffect, useState} from 'react';
import {readStorage} from '../data/catalog';

export default function useStored(key, fallback, validate) {
    const [value, setValue] = useState(() => readStorage(key, fallback, validate));
    const [available, setAvailable] = useState(true);
    useEffect(() => {
        try {
            localStorage.setItem(`bella:${key}`, JSON.stringify(value));
        } catch {
            setAvailable(false);
        }
    }, [key, value]);
    return [value, setValue, available];
}
