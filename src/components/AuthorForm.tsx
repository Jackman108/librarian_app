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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};

        if (!editableAuthor.firstName || editableAuthor.firstName.trim() === '') {
            newErrors.firstName = 'First Name is required';
        }

        if (!editableAuthor.lastName || editableAuthor.lastName.trim() === '') {
            newErrors.lastName = 'Last Name is required';
        }

        if (!editableAuthor.middleName || editableAuthor.middleName.trim() === '') {
            newErrors.middleName = 'Middle Name is required';
        }

        setErrors(newErrors);

        return newErrors;
    };

    const handleSaveAuthor = () => {
        const validationErrors = validateFields();

        if (Object.keys(validationErrors).length === 0) {
            onSaveAuthor();
        }
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.label}>First Name:</Text>
            <TextInput
                style={styles.input ?? (errors.firstName && styles.inputError)}
                placeholder="Enter First Name"
                value={editableAuthor?.firstName || ''}
                onChangeText={(text) => onAuthorChange({ ...editableAuthor, firstName: text })}
                keyboardType="default"
            />
            {errors.firstName && <Text style={styles.validationError}>{errors.firstName}</Text>}

            <Text style={styles.label}>Last Name:</Text>
            <TextInput
                style={styles.input ?? (errors.lastName && styles.inputError)}
                placeholder="Enter Last Name"
                value={editableAuthor?.lastName || ''}
                onChangeText={(text) => onAuthorChange({ ...editableAuthor, lastName: text })}
                keyboardType="default"
            />
            {errors.lastName && <Text style={styles.validationError}>{errors.lastName}</Text>}
            <Text style={styles.label}>Middle Name:</Text>
            <TextInput
                style={styles.input ?? (errors.middleName && styles.inputError)}
                placeholder="Enter Middle Name"
                value={editableAuthor?.middleName || ''}
                onChangeText={(text) => onAuthorChange({ ...editableAuthor, middleName: text })}
                keyboardType="default"
            />
            {errors.middleName && <Text style={styles.validationError}>{errors.middleName}</Text>}

            <View style={styles.buttonContainer}>
                <Button title={isEditing ? "Update Author" : "Save Author"} onPress={handleSaveAuthor} />
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
    }

});

export default AuthorForm;
