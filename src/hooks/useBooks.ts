// src/hooks/useBooks.ts
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';

interface BooksHook {
    books: Book[];
    addBook: (book: Book) => void;
    editBook: (updatedBook: Book) => void;
    loadInitialData: () => void;
    setBooks: Dispatch<SetStateAction<Book[]>>;
}

const useBooks = (): BooksHook => {
    const [books, setBooks] = useState<Book[]>([]);

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
    };
    
    useEffect(() => {
        loadInitialData();
    }, []);

    return {
        books,
        addBook,
        editBook,
        loadInitialData,
        setBooks,
    };
};

export default useBooks;
