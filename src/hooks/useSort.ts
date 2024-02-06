// src/hooks/useSort.ts
import { useState } from 'react';

// Define custom hook useSort for sorting items
function useSort<T>() {
    // Initialize state for current sort order
    const [currentOrder, setCurrentOrder] = useState<'asc' | 'desc'>('asc');

    // Function to sort items based on a key
    const sortBy = (items: T[], setItems: (items: T[]) => void, key: keyof T) => {
        const sortedItems = [...items].sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];

            // Check if values are numbers
            if (typeof valueA === 'number' && typeof valueB === 'number') {
                return currentOrder === 'asc' ? valueA - valueB : valueB - valueA;
            } else {

                // Sort string values
                const stringValueA = String(valueA);
                const stringValueB = String(valueB);
                return currentOrder === 'asc' ? stringValueA.localeCompare(stringValueB) : stringValueB.localeCompare(stringValueA);
            }
        });

        // Toggle current sort order and update items
        setCurrentOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
        setItems(sortedItems);
    };

    return sortBy;
}

export default useSort;
