// src/components/BookTableHeader.tsx
import React from 'react';
import { Book } from '../models/book.model';
import TableHeader from './TableHeader';

const BookTableHeader = ({ sortBy }: { sortBy: (key: keyof Book, order: 'asc' | 'desc') => void }) => {
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'title', label: 'Title' },
        { key: 'publisher', label: 'Publisher' },
        { key: 'authorId', label: 'Author' },
        { key: 'year', label: 'Year' },
    ];

    return <TableHeader sortBy={sortBy} columns={columns} />;
};

export default BookTableHeader;
