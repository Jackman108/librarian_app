// src/screen/AuthorsScreen.tsx
import React, { useCallback } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import AuthorModal from '../components/AuthorModal';
import SortedAuthorsList from '../components/SortedAuthorsList';
import useAuthors from '../hooks/useAuthors';
import useFormManager from '../hooks/useFormManager';
import useId from '../hooks/useId';
import useSort from '../hooks/useSort';
import { Author } from '../models/author.model';

// Define the AuthorsScreen component
const AuthorsScreen = () => {
  // Destructure necessary methods and states from useAuthors hook
  const { authors, addAuthor, editAuthor, setAuthors } = useAuthors();

  // Generate new author ID using useId hook
  const generateNewAuthorId = useId(authors);

  // Sort authors using useSort hook
  const sortAuthors = useSort<Author>();

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
  } = useFormManager<Author>(generateNewAuthorId);

  // Callback function to handle sorting authors by a specific key
  const handleSortAuthors = (key: keyof Author) => {
    sortAuthors(authors, setAuthors, key);
  };
// Function to save an author, either adding or editing
  const saveAuthor = useCallback((author: Author) => {
    isEditing ? editAuthor(author) : addAuthor(author);
  }, [editAuthor, addAuthor, isEditing]);

  // Render UI
  return (
    <View>
      <View style={styles.buttonContainer}>
        <Button
          title={showForm ? "Hide Author Form" : "Add Author"}
          onPress={showForm ? handleCloseForm : handleAddItem}
          color="steelblue"
        />
      </View>

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
export default AuthorsScreen;