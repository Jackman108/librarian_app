//src/components/BookItem.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Book } from '../models/book.model';

const BookItem = ({ book, onEditBook }: { book: Book; onEditBook: (book: Book) => void }) => {
    return (
        <TouchableOpacity onPress={() => onEditBook(book)} style={styles.itemContainer}>
                <Text style={[styles.itemText, styles.idText]}>{book.id}</Text>
                <Text style={styles.itemText}>{book.title}</Text>
                <Text style={styles.itemText}>{book.publisher}</Text>
                <Text style={styles.itemText}>{book.authorId}</Text>
                <Text style={styles.itemText}>{book.year}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemText: {
        flex: 2, // Adjust the flex value as needed
        color: '#333',
        fontSize: 16,
        fontWeight: '400',
    },
    idText: {
        flex: 1, // Adjust the flex value for ID column
        fontWeight: 'bold', // Make ID text bold for emphasis
    },
});

export default BookItem;
