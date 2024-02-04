// src/components/SortIcon.tsx
import React from 'react';
import { Text } from 'react-native';

const SortIcon = ({ ascending }: { ascending: boolean }) => (
    <Text style={{ fontSize: 20, color: 'darkblue' }}>
        {ascending ? '\u25B2' : '\u25BC'}
    </Text>
);

export default SortIcon;
