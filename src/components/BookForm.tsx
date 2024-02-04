//src/components/BookForm.tsx

import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Book } from '../models/book.model';

const BookForm = ({ editableBook, onBookChange, onSaveBook, isEditing, onClose }: {
    editableBook: Partial<Book>;
    onBookChange: (updatedBook: Partial<Book>) => void;
    onSaveBook: () => void;
    isEditing: boolean;
    onClose: () => void;
}) => {
    const handleInputChange = (key: keyof Book, value: string | number) => {
        onBookChange({ ...editableBook, [key]: value });
    };

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={editableBook.title as string}
                onChangeText={(value) => handleInputChange('title', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Publisher"
                value={editableBook.publisher as string}
                onChangeText={(value) => handleInputChange('publisher', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Author ID"
                value={editableBook.authorId as string}
                onChangeText={(value) => handleInputChange('authorId', value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Year"
                value={editableBook.year ? editableBook.year.toString() : ''}
                onChangeText={(value) => handleInputChange('year', value)}
                keyboardType="numeric"
            />

            <Button title={isEditing ? 'Update Book' : 'Add Book'} onPress={onSaveBook} />
            <Button title="Cancel" onPress={onClose} />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default BookForm;
