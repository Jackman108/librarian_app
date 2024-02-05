// src/screen/AuthorsScreen.tsx
import React, { useCallback } from 'react';
import { Button, View } from 'react-native';
import AuthorModal from '../components/AuthorModal';
import SortedAuthorsList from '../components/SortedAuthorsList';
import useAuthors from '../hooks/useAuthors';
import useFormManager from '../hooks/useFormManager';
import useId from '../hooks/useId';
import useSort from '../hooks/useSort';
import { Author } from '../models/author.model';

const AuthorsScreen = () => {
  const { authors,
    addAuthor,
    editAuthor,
    setAuthors
  } = useAuthors();
  const generateNewAuthorId = useId(authors);
  const sortAuthors = useSort<Author>();

  const {
    isEditing,
    editableItem,
    showForm,
    handleAddItem,
    handleEditItem,
    handleCloseForm,
    handleSaveItem,
    setEditableItem,
  } = useFormManager<Author>(generateNewAuthorId);

  const handleSortAuthors = (key: keyof Author) => {
    sortAuthors(authors, setAuthors, key);
};

  const saveAuthor = useCallback((author: Author) => {
    isEditing ? editAuthor(author) : addAuthor(author);
  }, [editAuthor, addAuthor, isEditing]);

  return (
    <View>
      <Button
        title={showForm ? "Hide Author Form" : "Add Author"}
        onPress={showForm ? handleCloseForm : handleAddItem}
      />
      <SortedAuthorsList
        authors={authors}
        sortBy={handleSortAuthors}
        onEditAuthor={handleEditItem} />
      <AuthorModal
        visible={showForm}
        onClose={handleCloseForm}
        onSaveAuthor={() => handleSaveItem(saveAuthor)}
        editableAuthor={editableItem || {}}
        onAuthorChange={setEditableItem}
        isEditing={isEditing}
      />
    </View>
  );
};

export default AuthorsScreen;