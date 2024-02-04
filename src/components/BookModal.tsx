//src/components/BookModal.tsx

import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Text, Button } from 'react-native';
import BookForm from './BookForm';
import { Book } from '../models/book.model';

const BookModal = ({ visible, onClose, onSaveBook, editableBook, onBookChange, isEditing }: {
    visible: boolean;
    onClose: () => void;
    onSaveBook: () => void;
    editableBook: Partial<Book>;
    onBookChange: (updatedBook: Partial<Book>) => void;
    isEditing: boolean;
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
                    <BookForm
                        editableBook={editableBook}
                        onBookChange={onBookChange}
                        onSaveBook={onSaveBook}
                        isEditing={isEditing}
                        onClose={onClose}
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

export default BookModal;
