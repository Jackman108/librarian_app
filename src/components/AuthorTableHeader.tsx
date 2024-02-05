// src/components/AuthorTableHeader.tsx
import React from 'react';
import { Author } from '../models/author.model';
import TableHeader from './TableHeader';

const AuthorTableHeader = ({ sortBy }: { sortBy: (key: keyof Author, order: 'asc' | 'desc') => void }) => {
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'middleName', label: 'Middle Name' },
    ];

    return <TableHeader sortBy={sortBy} columns={columns} />;
};

export default AuthorTableHeader;
