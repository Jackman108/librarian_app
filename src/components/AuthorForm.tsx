// src/components/AuthorForm.tsx
import React, { FC, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Author } from '../models/author.model';

interface AuthorFormProps {
    editableAuthor: Partial<Author>;
    onAuthorChange: (updatedAuthor: Partial<Author>) => void;
    onSaveAuthor: () => void;
    isEditing: boolean;
}

const AuthorForm: FC<AuthorFormProps> = ({
    editableAuthor,
    onAuthorChange,
    onSaveAuthor,
    isEditing,    

}) => {

    return (
        <View style={styles.formContainer}>
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
                <Button title={isEditing ? "Update Author" : "Save Author"} onPress={onSaveAuthor} />
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
        width: 200,
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
