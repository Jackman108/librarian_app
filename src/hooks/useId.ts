// src/hooks/useId.ts
import { useCallback } from 'react';

const useId = (items: { id: string }[]) => {
    const generateNewId = useCallback(() => {
        if (items.length === 0) {
            return '001';
        }
        const maxId = Math.max(...items.map(item => parseInt(item.id, 10)), 0);
        const newId = (maxId + 1).toString().padStart(3, '0');
        return newId;
    }, [items]);

    return generateNewId;
};

export default useId;
