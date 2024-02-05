// src/hooks/useBooks.ts
import { useState, useEffect, Dispatch, SetStateAction, useCallback } from 'react';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';

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

const useBooks = (): BooksHook => {
    const [books, setBooks] = useState<Book[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);

    const addBook = useCallback((book: Book) => {
        setBooks((prevBooks) => [...prevBooks, book]);
    }, []);

    const editBook = useCallback((updatedBook: Book) => {
        setBooks((prevBooks) =>
            prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
        );
    }, []);

    const getAuthorById = useCallback((authorId: string) => {
        console.log('Searching for author with ID:', authorId);
        const foundAuthor = authors.find((author) => author.id === authorId);
        console.log('Found author:', foundAuthor);
        return foundAuthor;
    }, [authors]);

    const getAuthorFullNameById = useCallback((authorId: string) => {
        const author = getAuthorById(authorId);
        if (!author) {
            console.warn(`Author not found for id: ${authorId}`);
            return 'Unknown Author';
        }
        return `${author?.firstName} ${author?.lastName}`;
    }, [getAuthorById]);

    const loadInitialData = useCallback(() => {
        const initialData = require('../data/initialData.json');
        const allBooks = initialData.authors.flatMap((author: Author) => author.books);
        setBooks(allBooks);
        setAuthors(initialData.authors);
    }, []);

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

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
