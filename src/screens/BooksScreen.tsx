// src/screen/BooksScreen.tsx
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../navigationTypes';
import BookModal from '../components/BookModal';
import SortedBooksList from '../components/SortedBooksList';
import useBooks from '../hooks/useBooks';
import useFormManager from '../hooks/useFormManager';
import useId from '../hooks/useId';
import useSort from '../hooks/useSort';
import { Book } from '../models/book.model';

// Define the type for navigation props
type BooksScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Books'>;

// Define the BooksScreen component
const BooksScreen = () => {
  // Get navigation prop for navigating to Authors screen
  const navigation = useNavigation<BooksScreenNavigationProp>();

  // Destructure necessary methods and states from useBooks hook
  const { books, authors, addBook, editBook, setBooks, getAuthorFullNameById } = useBooks();

  // Generate new book ID using useId hook
  const generateNewBookId = useId(books);

  // Sort books using useSort hook
  const sortBooks = useSort<Book>();

  // Destructure methods and states from useFormManager hook for managing form
  const {
    isEditing,
    editableItem,
    showForm,
    handleAddItem,
    handleEditItem,
    handleCloseForm,
    handleSaveItem,
    setEditableItem,
  } = useFormManager<Book>(generateNewBookId);

  // Callback function to handle sorting books by a specific key
  const handleSortBooks = (key: keyof Book) => {
    sortBooks(books, setBooks, key);
  };

  // Function to save a book, either adding or editing
  const saveBook = useCallback((book: Book) => {
    if (!book.authorId) {
      book.authorId = '001';
    }
    isEditing ? editBook(book) : addBook(book);
  }, [editBook, addBook, authors, isEditing, editableItem]);

  // Function to navigate to the Authors screen
  const handleAddAuthor = () => {
    navigation.navigate('Authors');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Authors" onPress={handleAddAuthor} color="steelblue" />
        <Button title={showForm ? "Hide Book Form" : "Add Book"} onPress={showForm ? handleCloseForm : handleAddItem} color="steelblue" />
      </View>
      <SortedBooksList
        books={books}
        authors={authors}
        sortBy={handleSortBooks}
        onEditBook={handleEditItem}
        getAuthorFullNameById={getAuthorFullNameById}
      />
      <BookModal
        authors={authors}
        visible={showForm}
        onClose={handleCloseForm}
        onSaveBook={() => handleSaveItem(saveBook)}
        editableBook={editableItem || {}}
        onBookChange={setEditableItem}
        isEditing={isEditing}
        getAuthorFullNameById={getAuthorFullNameById}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  button: {
    elevation: 10,
  },
});

export default BooksScreen;
