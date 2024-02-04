//src/components/BookForm.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';
import { Picker } from '@react-native-picker/picker';

const BookForm = ({ editableBook, onBookChange, onSaveBook, isEditing, onClose, authors }: {
    editableBook: Partial<Book>;
    onBookChange: (updatedBook: Partial<Book>) => void;
    onSaveBook: () => void;
    isEditing: boolean;
    onClose: () => void;
    authors: Author[];
}) => {
    const [selectedAuthor, setSelectedAuthor] = useState<string>(editableBook.authorId || '');

    const handleInputChange = (key: keyof Book, value: string | number) => {
        onBookChange({ ...editableBook, [key]: value });
    };

    const handleAuthorChange = (authorId: string) => {
        setSelectedAuthor(authorId);
        onBookChange({ ...editableBook, authorId });
    };

    return (
        <View>
            <Text style={styles.label}>Title:</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={editableBook.title as string}
                onChangeText={(value) => handleInputChange('title', value)}
            />
            <Text style={styles.label}>Publisher:</Text>
            <TextInput
                style={styles.input}
                placeholder="Publisher"
                value={editableBook.publisher as string}
                onChangeText={(value) => handleInputChange('publisher', value)}
            />
            <Text style={styles.label}>Author:</Text>
            <Picker
                selectedValue={selectedAuthor}
                onValueChange={(itemValue) => handleAuthorChange(itemValue as string)}
            >
                {authors.map((author) => (
                    <Picker.Item
                        key={author.id}
                        label={`${author.firstName} ${author.lastName}`}
                        value={author.id}
                    />
                ))}
            </Picker>
            <Text style={styles.label}>Year:</Text>
            <TextInput
                style={styles.input}
                placeholder="Year"
                value={editableBook.year ? editableBook.year.toString() : ''}
                onChangeText={(value) => handleInputChange('year', value)}
                keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
                <Button title={isEditing ? 'Update Book' : 'Add Book'} onPress={onSaveBook} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        padding: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        height: 40,
        width:200,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    validationError: {
        color: 'red',
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 40,
    }
});

export default BookForm;
