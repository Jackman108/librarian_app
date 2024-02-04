// src/components/AuthorTableHeader.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { Author } from '../models/author.model';
import SortIcon from './SortIcon';

const AuthorTableHeader = ({ sortBy }: { sortBy: (key: keyof Author, order: 'asc' | 'desc') => void }) => {
    const [sortKey, setSortKey] = useState<keyof Author>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (key: keyof Author) => {
        const order = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortKey(key);
        setSortOrder(order);
        sortBy(key, order);
    };

    const renderSortIcon = (key: keyof Author) => (
        <SortIcon ascending={sortKey === key && sortOrder === 'asc'} />
    );

    return (
        <View style={styles.tableHeader}>
            <TouchableOpacity onPress={() => handleSort('id')}>
                <Text style={styles.headerText}>ID {renderSortIcon('id')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSort('firstName')}>
                <Text style={styles.headerText}>First Name {renderSortIcon('firstName')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSort('lastName')}>
                <Text style={styles.headerText}>Last Name {renderSortIcon('lastName')}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSort('middleName')}>
                <Text style={styles.headerText}>Middle Name {renderSortIcon('middleName')}</Text>
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

export default AuthorTableHeader;
