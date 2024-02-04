import React, { useCallback, useState } from 'react';
import { Button, View } from 'react-native';
import AuthorModal from '../components/AuthorModal';
import SortedAuthorsList from '../components/SortedAuthorsList';
import useAuthors from '../hooks/useAuthors';
import { Author } from '../models/author.model';
import sortAuthors from '../utils/sortAuthors';

const AuthorsScreen = () => {
  const { authors, addAuthor, editAuthor, setAuthors } = useAuthors();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableAuthor, setEditableAuthor] = useState<Partial<Author> | null>(null);
  const [showAuthorForm, setShowAuthorForm] = useState<boolean>(false);

  const sortBy = useCallback((key: keyof Author, order: 'asc' | 'desc') => {
    const sortedAuthors = sortAuthors(authors, key, order); 
    setAuthors(sortedAuthors);
  }, [authors, setAuthors]);

  const handleSaveAuthor = useCallback(() => {
    if (editableAuthor) {
      if (isEditing) {
        editAuthor(editableAuthor as Author);
      } else {
        addAuthor({
          id: (Math.floor(Math.random() * 900) + 100).toString(),
          firstName: editableAuthor.firstName || '',
          lastName: editableAuthor.lastName || '',
          middleName: editableAuthor.middleName || '',
        } as Author);
      }
      setIsEditing(false);
      setEditableAuthor(null);
    }
  }, [editableAuthor, isEditing, addAuthor, editAuthor]);

  const handleAddAuthor = useCallback(() => {
    setIsEditing(false);
    setEditableAuthor({ firstName: '', lastName: '', middleName: '' });
    setShowAuthorForm(true);
  }, []);

  const handleEditAuthor = useCallback((author: Author) => {
    setIsEditing(true);
    setEditableAuthor(author);
    setShowAuthorForm(true);
  }, []);

  const handleCloseAuthorForm = useCallback(() => {
    setShowAuthorForm(false);
  }, []);

  return (
    <View>
      <SortedAuthorsList authors={authors} sortBy={sortBy} onEditAuthor={handleEditAuthor} />
      <Button title={showAuthorForm ? "Hide Author Form" : "Add Author"} onPress={showAuthorForm ? handleCloseAuthorForm : handleAddAuthor} />

      <AuthorModal
        visible={showAuthorForm}
        onClose={handleCloseAuthorForm}
        onSaveAuthor={handleSaveAuthor}
        editableAuthor={editableAuthor || {}}
        onAuthorChange={setEditableAuthor}
        isEditing={isEditing}
      />

    </View>
  );
};

export default AuthorsScreen;