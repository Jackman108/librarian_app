//src/components/BookTableHeader.tsx

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { Book } from '../models/book.model';
import SortIcon from './SortIcon';

const BookTableHeader = ({ sortBy }: { sortBy: (key: keyof Book, order: 'asc' | 'desc') => void }) => {
    const [sortKey, setSortKey] = useState<keyof Book>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (key: keyof Book) => {
        const order = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortKey(key);
        setSortOrder(order);
        sortBy(key, order);
    };

    const renderSortIcon = (key: keyof Book) => (
        <SortIcon ascending={sortKey === key && sortOrder === 'asc'} />
    );

    return (
        <View style={styles.tableHeader}>
            <TouchableOpacity onPress={() => handleSort('id')}>
                <Text style={styles.headerText}>ID {renderSortIcon('id')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSort('title')}>
                <Text style={styles.headerText}>Title {renderSortIcon('title')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSort('publisher')}>
                <Text style={styles.headerText}>Publisher {renderSortIcon('publisher')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSort('authorId')}>
                <Text style={styles.headerText}>Author {renderSortIcon('authorId')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSort('year')}>
                <Text style={styles.headerText}>Year {renderSortIcon('year')}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#3498db', // Header background color
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerText: {
        color: '#fff', // Header text color
        fontWeight: 'bold',
    },
});

export default BookTableHeader;
