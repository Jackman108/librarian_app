// src/components/AuthorModal.tsx
import React, { FC } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Text, Button } from 'react-native';
import AuthorForm from './AuthorForm';
import { Author } from '../models/author.model';

interface AuthorModalProps {
    visible: boolean;
    onClose: () => void;
    onSaveAuthor: () => void;
    editableAuthor: Partial<Author>;
    onAuthorChange: (updatedAuthor: Partial<Author>) => void;
    isEditing: boolean;
}

const AuthorModal: FC<AuthorModalProps> = ({
    visible,
    onClose,
    onSaveAuthor,
    editableAuthor,
    onAuthorChange,
    isEditing
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                    <AuthorForm
                        editableAuthor={editableAuthor}
                        onAuthorChange={onAuthorChange}
                        onSaveAuthor={onSaveAuthor}
                        isEditing={isEditing}                       
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 70,
        alignItems: 'center',
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 20,
    },
    closeButtonText: {
        fontSize: 16,
        color: 'blue',
    },
});

export default AuthorModal;
