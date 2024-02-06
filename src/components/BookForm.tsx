//src/components/BookForm.tsx
import React, { FC, useState } from 'react';
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import RollPickerNative from 'roll-picker-native';
import { Author } from '../models/author.model';
import { Book } from '../models/book.model';

// Define props interface for BookForm component
interface BookFormProps {
    editableBook: Partial<Book>;
    onBookChange: (updatedBook: Partial<Book>) => void;
    onSaveBook: () => void;
    isEditing: boolean;
    authors: Author[];
    getAuthorFullNameById: (authorId: string) => string;
}

// Functional component for rendering book form
const BookForm: FC<BookFormProps> = ({
    editableBook,
    onBookChange,
    onSaveBook,
    isEditing,
    authors,
    getAuthorFullNameById,
}) => {
    // State for selected author
    const [selectedAuthor, setSelectedAuthor] = useState<string | undefined>(editableBook.authorId);
    // State for validation errors
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

    // Handler for input change
    const handleInputChange = (key: keyof Book, value: string | number) => {
        onBookChange({ ...editableBook, [key]: value });
    };

    // Handler for author change
    const handleAuthorChange = (authorId: string) => {
        setSelectedAuthor(authorId);
        onBookChange({ ...editableBook, authorId });
        console.log(editableBook, authorId)
    };

    // Function to validate form fields
    const validateFields = () => {
        const errors: { [key: string]: string } = {};

        if (!editableBook.title || editableBook.title.trim() === '') {
            errors.title = 'Title is required';
        }

        if (!editableBook.publisher || editableBook.publisher.trim() === '') {
            errors.publisher = 'Publisher is required';
        }

        if (!editableBook.year || isNaN(editableBook.year) || String(editableBook.year).length !== 4) {
            errors.year = 'Year must be 4 digits';
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    // Handler for saving book
    const handleSaveBook = () => {
        if (validateFields()) {
            onSaveBook();
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.label}>Title:</Text>
                <TextInput
                    style={styles.input ?? (validationErrors.title && styles.inputError)}
                    placeholder="Title"
                    value={editableBook.title as string}
                    onChangeText={(value) => handleInputChange('title', value)}
                    keyboardType="default"
                />
                {validationErrors.title && <Text style={styles.validationError}>{validationErrors.title}</Text>}

                <Text style={styles.label}>Publisher:</Text>
                <TextInput
                    style={styles.input ?? (validationErrors.publisher && styles.inputError)}
                    placeholder="Publisher"
                    value={editableBook.publisher as string}
                    onChangeText={(value) => handleInputChange('publisher', value)}
                    keyboardType="default"
                />
                {validationErrors.publisher && <Text style={styles.validationError}>{validationErrors.publisher}</Text>}
                <Text style={styles.label}>Author:</Text>
                <RollPickerNative
                    items={authors.map(author => getAuthorFullNameById(author.id))}
                    index={authors.findIndex(author => author.id === selectedAuthor)}
                    onIndexChange={(index: number) => handleAuthorChange(authors[index].id)}
                    selectHeight={35}
                    containerHeight={220}
                    itemTextStyle={{ fontSize: 22, color: 'aliceblue' }}
                    selectTextStyle={{ fontSize: 22 }}
                    containerStyle={{ backgroundColor: 'steelblue' }}

                />
                <Text style={styles.label}>Year:</Text>
                <TextInput
                    style={styles.input ?? (validationErrors.year && styles.inputError)}
                    placeholder="Year"
                    value={editableBook.year ? editableBook.year.toString() : ''}
                    onChangeText={(value) => handleInputChange('year', value)}
                    keyboardType="numeric"
                />
                {validationErrors.year && <Text style={styles.validationError}>{validationErrors.year}</Text>}

                <View style={styles.buttonContainer}>
                    <Button title={isEditing ? 'Update Book' : 'Add Book'} onPress={handleSaveBook} color={'steelblue'} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: 'Roboto-Bold',
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        fontFamily: 'Roboto-Regular',
    },
    inputError: {
        borderColor: 'red',
    },
    validationError: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 10,
    },
    buttonContainer: {
        marginTop: 40,
    },
});

export default BookForm;
