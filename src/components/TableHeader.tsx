// src/components/TableHeader.tsx

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SortIcon from './SortIcon';

// Props interface for TableHeader component
interface TableHeaderProps<T> {
    sortBy: (key: keyof T, order: 'asc' | 'desc') => void;
    columns: { key: string; label: string }[];
}

// Functional component for rendering table header
const TableHeader = <T,>({ sortBy, columns }: TableHeaderProps<T>) => {
    // State for sorting key and order
    const [sortKey, setSortKey] = useState<keyof T>(columns[0].key as keyof T);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Handler for sorting
    const handleSort = (key: keyof T) => {
        const order = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortKey(key);
        setSortOrder(order);
        sortBy(key, order);
    };

    // Render sort icon based on ascending or descending order
    const renderSortIcon = (key: keyof T) => (
        <SortIcon ascending={sortKey === key && sortOrder === 'asc'} />
    );

    return (
        <View style={styles.tableHeader}>
            {columns.map((column) => (
                <TouchableOpacity key={column.key} onPress={() => handleSort(column.key as keyof T)}>
                    <Text style={styles.headerText}>
                        {column.label} {renderSortIcon(column.key as keyof T)}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'darksalmon',

    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default TableHeader;
