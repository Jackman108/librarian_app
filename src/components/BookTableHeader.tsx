// src/components/BookTableHeader.tsx
import React from 'react';
import { Book } from '../models/book.model';
import TableHeader from './TableHeader';

// Functional component for rendering the table header for books
const BookTableHeader = ({ sortBy }: { sortBy: (key: keyof Book, order: 'asc' | 'desc') => void }) => {
    // Define columns for the table header
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'title', label: 'Title' },
        { key: 'publisher', label: 'Publisher' },
        { key: 'authorId', label: 'Author' },
        { key: 'year', label: 'Year' },
    ];

    // Render TableHeader component passing sortBy function and columns
    return <TableHeader sortBy={sortBy} columns={columns} />;
};

export default BookTableHeader;
