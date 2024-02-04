// src/components/SortedAuthorsList.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Author } from '../models/author.model';
import AuthorItem from './AuthorItem';
import AuthorTableHeader from './AuthorTableHeader';

const SortedAuthorsList = ({ authors, sortBy, onEditAuthor }: {
    authors: Author[];
    sortBy: (key: keyof Author, order: 'asc' | 'desc') => void;
    onEditAuthor: (author: Author) => void;
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.listHeaderText}>Authors List</Text>
            <AuthorTableHeader sortBy={sortBy} />
            {authors.map((author) => (
                <AuthorItem key={author.id} author={author} onEditAuthor={onEditAuthor} />
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

export default SortedAuthorsList;
