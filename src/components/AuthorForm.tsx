// src/components/AuthorForm.tsx
import React, { FC, useState } from 'react';
import { Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Author } from '../models/author.model';

// Define props interface for AuthorForm component
interface AuthorFormProps {
    editableAuthor: Partial<Author>;
    onAuthorChange: (updatedAuthor: Partial<Author>) => void;
    onSaveAuthor: () => void;
    isEditing: boolean;
}

// Functional component for rendering author form
const AuthorForm: FC<AuthorFormProps> = ({
    editableAuthor,
    onAuthorChange,
    onSaveAuthor,
    isEditing,

}) => {
    // State for validation errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Function to validate form fields
    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};

        // Check if First Name is empty
        if (!editableAuthor.firstName || editableAuthor.firstName.trim() === '') {
            newErrors.firstName = 'First Name is required';
        }

        // Check if Last Name is empty
        if (!editableAuthor.lastName || editableAuthor.lastName.trim() === '') {
            newErrors.lastName = 'Last Name is required';
        }

        // Check if Middle Name is empty
        if (!editableAuthor.middleName || editableAuthor.middleName.trim() === '') {
            newErrors.middleName = 'Middle Name is required';
        }

        setErrors(newErrors);

        return newErrors;
    };

    // Handler for saving author
    const handleSaveAuthor = () => {
        const validationErrors = validateFields();

        if (Object.keys(validationErrors).length === 0) {
            onSaveAuthor();
        }
    };

    return (
        // KeyboardAvoidingView to handle keyboard behavior
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={styles.container}>
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
                    <Button title={isEditing ? "Update Author" : "Save Author"} onPress={handleSaveAuthor} color={'steelblue'} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
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
        marginTop: 30,
    }

});

export default AuthorForm;
