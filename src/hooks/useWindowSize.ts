import {useEffect, useState} from 'react';

export function useWindowSize() {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const setWindowSize = () => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        setWindowSize();
        window.addEventListener('resize', setWindowSize);
        return () => window.removeEventListener('resize', setWindowSize);
    }, []);

    return [width, height]
}
