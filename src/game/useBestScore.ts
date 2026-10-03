import { useEffect, useState } from 'react';
import { loadBestScore, saveBestScore } from '../storage/bestScore';

export const useBestScore = (score: number): number => {
    const [bestScore, setBestScore] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;

        loadBestScore().then((storedScore) => {
            if (isMounted) {
                setBestScore(storedScore);
                setIsLoaded(true);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (!isLoaded || score <= bestScore) {
            return;
        }

        saveBestScore(score);
    }, [bestScore, isLoaded, score]);

    return Math.max(bestScore, score);
};
