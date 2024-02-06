// src/components/AuthorTableHeader.tsx
import React from 'react';
import { Author } from '../models/author.model';
import TableHeader from './TableHeader';

// Define props interface for AuthorTableHeader component
const AuthorTableHeader = ({ sortBy }: { sortBy: (key: keyof Author, order: 'asc' | 'desc') => void }) => {
    // Define columns for author table header
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'middleName', label: 'Middle Name' },
    ];

    // Render TableHeader component with specified columns and sorting function
    return <TableHeader sortBy={sortBy} columns={columns} />;
};

export default AuthorTableHeader;
