// src/components/AuthorModal.tsx
import React, { FC } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Author } from '../models/author.model';
import AuthorForm from './AuthorForm';

// Define props interface for AuthorModal component
interface AuthorModalProps {
    visible: boolean;
    onClose: () => void;
    onSaveAuthor: () => void;
    editableAuthor: Partial<Author>;
    onAuthorChange: (updatedAuthor: Partial<Author>) => void;
    isEditing: boolean;
}

// Functional component for rendering author modal
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
        backgroundColor: 'aliceblue',
        padding: 70,
        alignItems: 'center',
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        padding:10,
        top: 20,
        right: 20,
    },
    closeButtonText: {
        fontSize: 16,
        color: 'steelblue',
    },
});

export default AuthorModal;
