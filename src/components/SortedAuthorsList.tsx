// src/components/SortedAuthorsList.tsx
import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Author } from '../models/author.model';
import AuthorItem from './AuthorItem';
import AuthorTableHeader from './AuthorTableHeader';

interface SortedAuthorsListProps {
    authors: Author[];
    sortBy: (key: keyof Author, order: 'asc' | 'desc') => void;
    onEditAuthor: (author: Author) => void;
}

const SortedAuthorsList: FC<SortedAuthorsListProps> = ({
    authors,
    sortBy,
    onEditAuthor
}) => {
    const renderItem = ({ item }: { item: Author }) => (
        <AuthorItem
            author={item}
            onEditAuthor={onEditAuthor}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.listHeaderText}>Authors List</Text>
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
        maxHeight: '84%',
    },
});

export default SortedAuthorsList;
