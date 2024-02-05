// src/components/TableHeader.tsx

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import SortIcon from './SortIcon';

interface TableHeaderProps<T> {
    sortBy: (key: keyof T, order: 'asc' | 'desc') => void;
    columns: { key: string; label: string }[];
}

const TableHeader = <T,>({ sortBy, columns }: TableHeaderProps<T>) => {
    const [sortKey, setSortKey] = useState<keyof T>(columns[0].key as keyof T);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (key: keyof T) => {
        const order = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortKey(key);
        setSortOrder(order);
        sortBy(key, order);
    };

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
        backgroundColor: '#3498db',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default TableHeader;
