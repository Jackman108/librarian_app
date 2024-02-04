// src/hooks/useBooks.ts
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';

interface BooksHook {
    books: Book[];
    authors: Author[];  // Add authors to the interface
    addBook: (book: Book) => void;
    editBook: (updatedBook: Book) => void;
    loadInitialData: () => void;
    setBooks: Dispatch<SetStateAction<Book[]>>;
}

const useBooks = (): BooksHook => {
    const [books, setBooks] = useState<Book[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);

    const addBook = (book: Book) => {
        setBooks([...books, book]);
    };

    const editBook = (updatedBook: Book) => {
        const updatedBooks = books.map((book) =>
            book.id === updatedBook.id ? updatedBook : book
        );
        setBooks(updatedBooks);
    };

    const loadInitialData = () => {
        const initialData = require('../data/initialData.json');
        const allBooks = initialData.authors.flatMap((author: Author) => author.books);
        setBooks(allBooks);
        setAuthors(initialData.authors);
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    return {
        books,
        authors,
        addBook,
        editBook,
        loadInitialData,
        setBooks,
    };
};

export default useBooks;
