//src/components/SortedBooksList.tsx

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Book } from '../models/book.model';
import BookItem from './BookItem';
import BookTableHeader from './BookTableHeader';

const SortedBooksList = ({ books, sortBy, onEditBook }: {
    books: Book[];
    sortBy: (key: keyof Book, order: 'asc' | 'desc') => void;
    onEditBook: (book: Book) => void;
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.listHeaderText}>Books List</Text>
            <BookTableHeader sortBy={sortBy} />
            {books && books.map((book) => (
                <BookItem key={book.id} book={book} onEditBook={onEditBook} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
    },
    listHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#3498db', // Blue color
        marginTop: 10, // Adjust as needed
    },
});

export default SortedBooksList;
