//src/components/SortedBooksList.tsx

import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Book } from '../models/book.model';
import BookItem from './BookItem';
import BookTableHeader from './BookTableHeader';
import { Author } from '../models/author.model';

const SortedBooksList = ({ books, sortBy, onEditBook, authors }: {
    books: Book[];
    sortBy: (key: keyof Book, order: 'asc' | 'desc') => void;
    onEditBook: (book: Book) => void;
    authors: Author[];
}) => {
    
    const renderItem = ({ item }: { item: Book }) => {
        // Find the corresponding author for each book
        const author = authors.find((author) => author.books.some(b => b.id === item.id));
        return (
            <BookItem key={item.id} book={item} onEditBook={onEditBook} author={author} />
        );
    };

    return (
        <View style={styles.container}>
        <Text style={styles.listHeaderText}>Books List</Text>
        <BookTableHeader sortBy={sortBy} />
        <FlatList
            data={books}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            // Add styles for scrolling
            style={styles.flatList}
        />
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
        color: '#3498db', 
        marginTop: 10, 
    },
    flatList: {
        maxHeight: '80%', 
    },
});

export default SortedBooksList;
