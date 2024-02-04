// src/utils/sortBooks.ts
import { Book } from '../models/book.model';

const sortBooks = (books: Book[], key: keyof Book, order: 'asc' | 'desc') => {
    return [...books].sort((a, b) => {
        if (a[key] === b[key]) return 0;
        if (order === 'asc') return a[key]! < b[key]! ? -1 : 1;
        return a[key]! > b[key]! ? -1 : 1;
    });
};

export default sortBooks;
