// src/screen/BooksScreen.tsx
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { Button, View } from 'react-native';
import { RootStackParamList } from '../../navigationTypes';
import BookModal from '../components/BookModal';
import SortedBooksList from '../components/SortedBooksList';
import useBooks from '../hooks/useBooks';
import { Book } from '../models/book.model';
import sortBooks from '../utils/sortBooks';


type BooksScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Books'>;

const BooksScreen = () => {
  const { books, authors, addBook, editBook, setBooks } = useBooks();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableBook, setEditableBook] = useState<Partial<Book> | null>(null);
  const [showBookForm, setShowBookForm] = useState<boolean>(false);
  const navigation = useNavigation<BooksScreenNavigationProp>();

  const sortBy = useCallback((key: keyof Book, order: 'asc' | 'desc') => {
    const sortedBooks = sortBooks(books, key, order);
    setBooks(sortedBooks);
  }, [books, setBooks]);

  const handleSaveBook = useCallback(() => {
    if (editableBook) {
      const bookToSave = {
        ...editableBook,
        id: isEditing ? editableBook.id : (Math.floor(Math.random() * 900) + 100).toString(),
      };

      if (isEditing) {
        editBook(bookToSave as Book);
      } else {
        addBook(bookToSave as Book);
      }

      setIsEditing(false);
      setEditableBook(null);
      setShowBookForm(false);
    }
  }, [editableBook, isEditing, addBook, editBook]);

  const handleAddBook = useCallback(() => {
    setIsEditing(false);
    setEditableBook({ title: '', publisher: '', year: 0 });
    setShowBookForm(true);
  }, []);

  const handleEditBook = useCallback((book: Book) => {
    setIsEditing(true);
    setEditableBook(book);
    setShowBookForm(true);
  }, []);

  const handleCloseBookForm = useCallback(() => {
    setShowBookForm(false);
  }, []);

  const handleAddAuthor = () => {
    navigation.navigate('Authors');
  };

  return (
    <View>
      <Button title={showBookForm ? "Hide Book Form" : "Add Book"} onPress={showBookForm ? handleCloseBookForm : handleAddBook} />
      <Button title="Add Author" onPress={handleAddAuthor} />
      <SortedBooksList authors={authors} books={books} sortBy={sortBy} onEditBook={handleEditBook} />
      <BookModal
        authors={authors}
        visible={showBookForm}
        onClose={handleCloseBookForm}
        onSaveBook={handleSaveBook}
        editableBook={editableBook || {}}
        onBookChange={setEditableBook}
        isEditing={isEditing}
      />
    </View>
  );
};

export default BooksScreen;
