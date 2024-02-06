// src/hooks/useBooks.ts
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { MMKVLoader } from 'react-native-mmkv-storage';
import { Author } from '../models/author.model';
import { Book } from '../models/book.model';
// Define interface for books hook
interface BooksHook {
    books: Book[];
    authors: Author[];
    addBook: (book: Book) => void;
    editBook: (updatedBook: Book) => void;
    loadInitialData: () => void;
    setBooks: Dispatch<SetStateAction<Book[]>>;
    setAuthors: Dispatch<SetStateAction<Author[]>>;
    getAuthorById: (authorId: string) => Author | undefined;
    getAuthorFullNameById: (authorId: string) => string;
}

// Custom hook for managing books
const useBooks = (): BooksHook => {
    // Initialize state for books and authors
    const [books, setBooks] = useState<Book[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const MMKV = new MMKVLoader().initialize();

    // Function to add a book
    const addBook = useCallback((book: Book) => {
        setBooks(prevBooks => {
            const newBooks = [...prevBooks, book];
            MMKV.setArrayAsync('books', newBooks);
            return newBooks;
        });
    }, []);

    // Function to edit a book
    const editBook = useCallback((updatedBook: Book) => {
        setBooks(prevBooks => {
            const updatedBooks = prevBooks.map(book => (book.id === updatedBook.id ? updatedBook : book));
            MMKV.setArrayAsync('books', updatedBooks);
            return updatedBooks;
        });
    }, []);

    // Function to get author by ID
    const getAuthorById = useCallback((authorId: string) => {
        const foundAuthor = authors.find((author) => author.id === authorId);
        return foundAuthor;
    }, [authors]);

    // Function to get author full name by ID
    const getAuthorFullNameById = useCallback((authorId: string) => {
        const author = getAuthorById(authorId);
        if (!author) {
            return 'Unknown Author';
        }
        return `${author?.firstName} ${author?.lastName}`;
    }, [getAuthorById]);

    // Function to load initial data
    const loadInitialData = useCallback(async () => {
        const storedBooks = await MMKV.getArrayAsync<Book>('books');
        if (storedBooks) {
            setBooks(storedBooks);
        } else {
            const initialData = require('../data/initialData.json');
            const allBooks = initialData.authors.flatMap((author: Author) => author.books);
            setBooks(allBooks);
            setAuthors(initialData.authors);
            MMKV.setArrayAsync('books', initialData.books);
        }
    }, []);

    // Function to load authors
    const loadAuthors = useCallback(async () => {
        const storedAuthors = await MMKV.getArrayAsync<Author>('authors');
        if (storedAuthors) {
            setAuthors(storedAuthors);
        } else {
            const initialData = require('../data/initialData.json');
            setAuthors(initialData.authors);
            MMKV.setArrayAsync('authors', initialData.authors);
        }
    }, []);

    // Effect hook to load initial data and authors
    useEffect(() => {
        loadInitialData();
        loadAuthors();
    }, [loadAuthors]);

    // Return books hook object
    return {
        books,
        authors,
        addBook,
        editBook,
        loadInitialData,
        setBooks,
        setAuthors,
        getAuthorById,
        getAuthorFullNameById,
    };
};

export default useBooks;
