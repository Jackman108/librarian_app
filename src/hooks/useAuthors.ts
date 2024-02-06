// src/hooks/useAuthors.ts
import { useState, useEffect, Dispatch, SetStateAction, useCallback } from 'react'; // Import Dispatch and SetStateAction
import { Author } from '../models/author.model';
import { MMKVLoader } from 'react-native-mmkv-storage';

interface AuthorsHook {
    authors: Author[];
    addAuthor: (author: Author) => void;
    editAuthor: (updatedAuthor: Author) => void;
    loadInitialData: () => void;
    setAuthors: Dispatch<SetStateAction<Author[]>>;
}

const useAuthors = (): AuthorsHook => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const MMKV = new MMKVLoader().initialize();

    const addAuthor = useCallback((author: Author) => {
        setAuthors(prevAuthors => {
            const newAuthors = [...prevAuthors, author];
            MMKV.setArrayAsync('authors', newAuthors);
            return newAuthors;
        });
    }, []);

    const editAuthor = useCallback((updatedAuthor: Author) => {
        setAuthors(prevAuthors => {
            const updatedAuthors = prevAuthors.map(author => author.id === updatedAuthor.id ? updatedAuthor : author);
            MMKV.setArrayAsync('authors', updatedAuthors);
            return updatedAuthors;
        });
    }, []);

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

    useEffect(() => {
        loadInitialData();
    }, []);

    return {
        authors,
        addAuthor,
        editAuthor,
        loadInitialData,
        setAuthors,
    };
};

export default useAuthors;
