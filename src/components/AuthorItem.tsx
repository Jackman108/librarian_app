// src/components/AuthorItem.tsx
import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Author } from '../models/author.model';

// Define props interface for AuthorItem component
interface AuthorItemProps {
    author: Author;
    onEditAuthor: (author: Author) => void
}
// Functional component for rendering individual author item
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
        borderBottomColor: 'darksalmon',
        gap: 10
    },
    itemText: {
        flex: 2,
        color: 'dimgrey',
        fontSize: 16,
        fontWeight: '400',
    },
    idText: {
        flex: 1,
        fontWeight: 'bold',
    },
});

export default AuthorItem;
