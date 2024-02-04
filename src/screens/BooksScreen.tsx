// src/screen/BooksScreen.tsx
import React, { useCallback, useState } from 'react';
import { Button, View } from 'react-native';
import BookModal from '../components/BookModal';
import SortedBooksList from '../components/SortedBooksList';
import useBooks from '../hooks/useBooks';
import { Book } from '../models/book.model';
import sortBooks from '../utils/sortBooks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigationTypes';
import { useNavigation } from '@react-navigation/native';


type BooksScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Books'>;

const BooksScreen = () => {
  const { books, addBook, editBook, setBooks } = useBooks();
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
      if (isEditing) {
        editBook(editableBook as Book);
      } else {
        addBook({
          id: (Math.floor(Math.random() * 900) + 100).toString(),
          title: editableBook.title || '',
          publisher: editableBook.publisher || '',
          authorId: editableBook.authorId || '',
          year: editableBook.year || 0,
        } as Book);
      }
      setIsEditing(false);
      setEditableBook(null);
    }
  }, [editableBook, isEditing, addBook, editBook]);

  const handleAddBook = useCallback(() => {
    setIsEditing(false);
    setEditableBook({ title: '', publisher: '', authorId: '', year: 0 });
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
      <SortedBooksList books={books} sortBy={sortBy} onEditBook={handleEditBook} />
      <BookModal
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
