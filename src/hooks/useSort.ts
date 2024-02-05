// src/hooks/useSort.ts
import { useState } from 'react';

function useSort<T>() {
    const [currentOrder, setCurrentOrder] = useState<'asc' | 'desc'>('asc');

    const sortBy = (items: T[], setItems: (items: T[]) => void, key: keyof T) => {
        const sortedItems = [...items].sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];

            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return currentOrder === 'asc' ? valueA - valueB : valueB - valueA;
            } else {
                const stringValueA = String(valueA);
                const stringValueB = String(valueB);
                return currentOrder === 'asc' ? stringValueA.localeCompare(stringValueB) : stringValueB.localeCompare(stringValueA);
            }
        });

        setCurrentOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
        setItems(sortedItems);
    };

    return sortBy;
}

export default useSort;
