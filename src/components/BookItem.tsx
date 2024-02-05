//src/components/BookItem.tsx

import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Author } from '../models/author.model';
import { Book } from '../models/book.model';

interface BookItemProps {
    book: Book;
    author?: Author;
    onEditBook: (book: Book) => void,
    getAuthorFullNameById: (authorId: string) => string;
}

const BookItem: FC<BookItemProps> = ({
    book,
    author,
    onEditBook,
    getAuthorFullNameById,
}) => {
    const authorId = author ? author.id : book.authorId;
    return (
        <TouchableOpacity onPress={() => onEditBook(book)} style={styles.itemContainer}>
            <Text style={[styles.itemText, styles.idText]}>{book.id}</Text>
            <Text style={styles.itemText}>{book.title}</Text>
            <Text style={styles.itemText}>{book.publisher}</Text>
            <Text style={styles.itemText}>
                {getAuthorFullNameById(authorId)}
            </Text>
            <Text style={[styles.itemText, styles.idText]}>{book.year}</Text>
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
        gap: 10
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

export default BookItem;
