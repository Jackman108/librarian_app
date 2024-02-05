//src/components/BookModal.tsx
import React, { FC } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Author } from '../models/author.model';
import { Book } from '../models/book.model';
import BookForm from './BookForm';

interface BookModalProps {
    authors: Author[];
    visible: boolean;
    onClose: () => void;
    onSaveBook: () => void;
    editableBook: Partial<Book>;
    onBookChange: (updatedBook: Partial<Book>) => void;
    isEditing: boolean;
    getAuthorFullNameById: (authorId: string) => string;
}

const BookModal: FC<BookModalProps> = ({
    authors,
    visible,
    onClose,
    onSaveBook,
    editableBook,
    onBookChange,
    isEditing,
    getAuthorFullNameById
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
                        authors={authors}
                        editableBook={editableBook}
                        onBookChange={onBookChange}
                        onSaveBook={onSaveBook}
                        isEditing={isEditing}
                        getAuthorFullNameById={getAuthorFullNameById}
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
