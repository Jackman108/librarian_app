// src/screens/LoadingScreen.tsx

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/book_logo.png')} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});

export default LoadingScreen;
