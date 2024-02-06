//src/components/SortedBooksList.tsx

import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Author } from '../models/author.model';
import { Book } from '../models/book.model';
import BookItem from './BookItem';
import BookTableHeader from './BookTableHeader';

// Props interface for SortedBooksList component
interface SortedBooksListProps {
    books: Book[];
    authors: Author[];
    sortBy: (key: keyof Book, order: 'asc' | 'desc') => void;
    onEditBook: (book: Book) => void;
    getAuthorFullNameById: (authorId: string) => string;
}

// Functional component for rendering a sorted list of books
const SortedBooksList: FC<SortedBooksListProps> = ({
    books,
    authors,
    sortBy,
    onEditBook,
    getAuthorFullNameById
}) => {
    // Function to render each item in the list
    const renderItem = ({ item }: { item: Book }) => {
        return (
            <BookItem
                key={item.id}
                book={item}
                onEditBook={onEditBook}
                author={authors.find((author) => author.id === item.authorId)}
                getAuthorFullNameById={getAuthorFullNameById}
            />
        );
    };

    return (
        <View style={styles.container}>
            {/* Render BookTableHeader passing sortBy function */}
            <BookTableHeader sortBy={sortBy} />
            <FlatList
                data={books}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.flatList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,

    },
    listHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'sandybrown',
        margin: 10,
    },
    flatList: {
        maxHeight: '86%',
    },
});

export default SortedBooksList;
