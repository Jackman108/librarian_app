// src/hooks/useAuthors.ts
import { useState, useEffect, Dispatch, SetStateAction, useCallback } from 'react'; // Import Dispatch and SetStateAction
import { Author } from '../models/author.model';

interface AuthorsHook {
    authors: Author[];
    addAuthor: (author: Author) => void;
    editAuthor: (updatedAuthor: Author) => void;
    loadInitialData: () => void;
    setAuthors: Dispatch<SetStateAction<Author[]>>;
}

const useAuthors = (): AuthorsHook => {
    const [authors, setAuthors] = useState<Author[]>([]);

    const addAuthor = (author: Author) => {
        setAuthors([...authors, author]);
    };

    const editAuthor = (updatedAuthor: Author) => {
        const updatedAuthors = authors.map((author) =>
            author.id === updatedAuthor.id ? updatedAuthor : author
        );
        setAuthors(updatedAuthors);
    };

    const loadInitialData = useCallback(() => {
        const initialData = require('../data/initialData.json');

        setAuthors(initialData.authors);
    }, []);

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    return {
        authors,
        addAuthor,
        editAuthor,
        loadInitialData,
        setAuthors,
    };
};

export default useAuthors;
