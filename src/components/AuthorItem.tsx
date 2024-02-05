// src/components/AuthorItem.tsx
import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Author } from '../models/author.model';

interface AuthorItemProps {
    author: Author;
    onEditAuthor: (author: Author) => void
}
const AuthorItem: FC<AuthorItemProps> = ({
    author,
    onEditAuthor
}) => (
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
        flex: 2, 
        color: '#333',
        fontSize: 16,
        fontWeight: '400',
    },
    idText: {
        flex: 1,
        fontWeight: 'bold', 
    },
});

export default AuthorItem;
