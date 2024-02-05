//src/components/BookForm.tsx
import { Picker } from '@react-native-picker/picker';
import React, { FC, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Author } from '../models/author.model';
import { Book } from '../models/book.model';
interface BookFormProps {
    editableBook: Partial<Book>;
    onBookChange: (updatedBook: Partial<Book>) => void;
    onSaveBook: () => void;
    isEditing: boolean;
    authors: Author[];
    getAuthorFullNameById: (authorId: string) => string;
}

const BookForm: FC<BookFormProps> = ({
    editableBook,
    onBookChange,
    onSaveBook,
    isEditing,
    authors,
    getAuthorFullNameById,
}) => {
    const [selectedAuthor, setSelectedAuthor] = useState<string | undefined>(editableBook.authorId);


    const handleInputChange = (key: keyof Book, value: string | number) => {
        onBookChange({ ...editableBook, [key]: value });
    };

    const handleAuthorChange = (authorId: string) => {
        setSelectedAuthor(authorId);
        onBookChange({ ...editableBook, authorId });
        console.log(editableBook, authorId)
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
                style={styles.picker}
                selectedValue={selectedAuthor}
                onValueChange={(itemValue) => handleAuthorChange(itemValue as string)}
            >
                {authors.map((author) => (
                    <Picker.Item
                        key={author.id}
                        label={getAuthorFullNameById(author.id)}
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
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    buttonContainer: {
        marginTop: 40,
    },
    picker: {
        color: 'white',
        backgroundColor: 'gray',
    },
});

export default BookForm;
