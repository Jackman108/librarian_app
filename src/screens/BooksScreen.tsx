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

type BooksScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Books'>;

const BooksScreen = () => {
  const navigation = useNavigation<BooksScreenNavigationProp>();

  const { books,
    authors,
    addBook,
    editBook,
    setBooks,
    getAuthorFullNameById
  } = useBooks();

  const generateNewBookId = useId(books);

  const sortBooks = useSort<Book>();

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

  const handleSortBooks = (key: keyof Book) => {
    sortBooks(books, setBooks, key);
  };
  const saveBook = useCallback((book: Book) => {
    if (!book.authorId) {
      book.authorId = '001';
    }
    isEditing ? editBook(book) : addBook(book);
  }, [editBook, addBook, authors, isEditing, editableItem]);

  const handleAddAuthor = () => {
    navigation.navigate('Authors');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Authors" onPress={handleAddAuthor} />
        <Button title={showForm ? "Hide Book Form" : "Add Book"} onPress={showForm ? handleCloseForm : handleAddItem} />
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
});

export default BooksScreen;
