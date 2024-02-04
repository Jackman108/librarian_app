// src/components/AuthorItem.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Author } from '../models/author.model';

const AuthorItem = ({ author, onEditAuthor }: { author: Author; onEditAuthor: (author: Author) => void }) => (
    <TouchableOpacity onPress={() => onEditAuthor(author)} style={styles.itemContainer}>
        <Text style={[styles.itemText, styles.idText]}>{author.id}</Text>
        <Text style={styles.itemText}>{author.firstName}</Text>
        <Text style={styles.itemText}>{author.lastName}</Text>
        <Text style={styles.itemText}>{author.middleName}</Text>
    </TouchableOpacity>
);

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

export default AuthorItem;
