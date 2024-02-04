// src/components/AuthorForm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Author } from '../models/author.model';

const AuthorForm = ({
    editableAuthor,
    onAuthorChange,
    onSaveAuthor,
    isEditing,
    onClose // Добавлен параметр для закрытия модального окна
}: {
    editableAuthor: Partial<Author>;
    onAuthorChange: (updatedAuthor: Partial<Author>) => void;
    onSaveAuthor: () => void;
    isEditing: boolean;
    onClose: () => void; // Добавлен параметр для закрытия модального окна
}) => {
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleSave = () => {
        if (!editableAuthor.firstName || !editableAuthor.lastName || !editableAuthor.middleName) {
            setValidationError('All fields must be filled in.');
        } else {
            setValidationError(null);
            onSaveAuthor();
            onClose(); // Закрываем модальное окно после успешного сохранения
        }
    };

    return (
        <View style={styles.formContainer}>
            {validationError && (
                <Text style={styles.validationError}>{validationError}</Text>
            )}

            <Text style={styles.label}>First Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter First Name"
                value={editableAuthor?.firstName || ''}
                onChangeText={(text) => onAuthorChange({ ...editableAuthor, firstName: text })}
            />

            <Text style={styles.label}>Last Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Last Name"
                value={editableAuthor?.lastName || ''}
                onChangeText={(text) => onAuthorChange({ ...editableAuthor, lastName: text })}
            />

            <Text style={styles.label}>Middle Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Middle Name"
                value={editableAuthor?.middleName || ''}
                onChangeText={(text) => onAuthorChange({ ...editableAuthor, middleName: text })}
            />

            <View style={styles.buttonContainer}>
                <Button title={isEditing ? "Update Author" : "Save Author"} onPress={handleSave} />
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

export default AuthorForm;
