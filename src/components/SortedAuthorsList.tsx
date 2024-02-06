// src/components/SortedAuthorsList.tsx
import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Author } from '../models/author.model';
import AuthorItem from './AuthorItem';
import AuthorTableHeader from './AuthorTableHeader';

// Props interface for SortedAuthorsList component
interface SortedAuthorsListProps {
    authors: Author[];
    sortBy: (key: keyof Author, order: 'asc' | 'desc') => void;
    onEditAuthor: (author: Author) => void;
}

// Functional component for rendering a sorted list of authors
const SortedAuthorsList: FC<SortedAuthorsListProps> = ({
    authors,
    sortBy,
    onEditAuthor
}) => {
    // Function to render each item in the list
    const renderItem = ({ item }: { item: Author }) => (
        <AuthorItem
            author={item}
            onEditAuthor={onEditAuthor}
        />
    );

    return (
        <View style={styles.container}>
            {/* Render AuthorTableHeader passing sortBy function */}
            <AuthorTableHeader sortBy={sortBy} />
            <FlatList
                data={authors}
                renderItem={renderItem}
                keyExtractor={(author) => author.id}
                style={styles.flatList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
    },

    flatList: {
        maxHeight: '86%',
    },
});

export default SortedAuthorsList;
