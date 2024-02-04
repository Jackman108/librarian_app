// src/utils/sortAuthors.ts
import { Author } from '../models/author.model';

const sortAuthors = (authors: Author[], key: keyof Author, order: 'asc' | 'desc') => {
    return [...authors].sort((a, b) => {
        if (a[key] === b[key]) return 0;
        if (order === 'asc') return a[key]! < b[key]! ? -1 : 1;
        return a[key]! > b[key]! ? -1 : 1;
    });
};

export default sortAuthors;
