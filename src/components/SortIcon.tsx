// src/components/SortIcon.tsx
import React from 'react';
import { Text } from 'react-native';

// Functional component for rendering sort icon
const SortIcon = ({ ascending }: { ascending: boolean }) => (
    <Text style={{ fontSize: 20, color: 'white' }}>
        {ascending ? '\u25B2' : '\u25BC'}
    </Text>
);

export default SortIcon;
