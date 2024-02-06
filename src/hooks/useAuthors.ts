// src/hooks/useAuthors.ts
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'; // Import Dispatch and SetStateAction
import { MMKVLoader } from 'react-native-mmkv-storage';
import { Author } from '../models/author.model';

// Define interface for authors hook
interface AuthorsHook {
    authors: Author[];
    addAuthor: (author: Author) => void;
    editAuthor: (updatedAuthor: Author) => void;
    loadInitialData: () => void;
    setAuthors: Dispatch<SetStateAction<Author[]>>;
}

// Custom hook for managing authors
const useAuthors = (): AuthorsHook => {
    // Initialize state for authors
    const [authors, setAuthors] = useState<Author[]>([]);
    const MMKV = new MMKVLoader().initialize();

    // Function to add an author
    const addAuthor = useCallback((author: Author) => {
        setAuthors(prevAuthors => {
            const newAuthors = [...prevAuthors, author];
            MMKV.setArrayAsync('authors', newAuthors);
            return newAuthors;
        });
    }, []);

    // Function to edit an author
    const editAuthor = useCallback((updatedAuthor: Author) => {
        setAuthors(prevAuthors => {
            const updatedAuthors = prevAuthors.map(author => author.id === updatedAuthor.id ? updatedAuthor : author);
            MMKV.setArrayAsync('authors', updatedAuthors);
            return updatedAuthors;
        });
    }, []);

    // Function to load initial data
    const loadInitialData = useCallback(async () => {
        const storedAuthors = await MMKV.getArrayAsync<Author>('authors');
        if (storedAuthors) {
            setAuthors(storedAuthors);
        } else {
            const initialData = require('../data/initialData.json');
            setAuthors(initialData.authors);
            MMKV.setArrayAsync('authors', initialData.authors);
        }
    }, []);

    // Effect hook to load initial data
    useEffect(() => {
        loadInitialData();
    }, []);

    // Return authors hook object
    return {
        authors,
        addAuthor,
        editAuthor,
        loadInitialData,
        setAuthors,
    };
};

export default useAuthors;
