import AsyncStorage from '@react-native-async-storage/async-storage';

const BEST_SCORE_KEY = 'snake.bestScore.v1';
let pendingWrite = Promise.resolve();

export const loadBestScore = async (): Promise<number> => {
    try {
        const storedScore = await AsyncStorage.getItem(BEST_SCORE_KEY);
        const parsedScore = Number(storedScore);
        return Number.isFinite(parsedScore) && parsedScore > 0 ? parsedScore : 0;
    } catch {
        return 0;
    }
};

export const saveBestScore = (score: number): void => {
    pendingWrite = pendingWrite
        .then(() => AsyncStorage.setItem(BEST_SCORE_KEY, String(score)))
        .catch(() => undefined);
};
