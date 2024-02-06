// src/hooks/useFormManager.ts
import { useCallback, useState } from 'react';

// Define custom hook useFormManager for managing form state
function useFormManager<T extends { id?: string }>(generateId: () => string) {
    // Initialize state for form management
    const [isEditing, setIsEditing] = useState(false);
    const [editableItem, setEditableItem] = useState<Partial<T> | null>(null);
    const [showForm, setShowForm] = useState(false);

    // Callback function to handle adding an item
    const handleAddItem = useCallback(() => {
        setIsEditing(false);
        setEditableItem({});
        setShowForm(true);
    }, []);

    // Callback function to handle editing an item
    const handleEditItem = useCallback((item: T) => {
        setIsEditing(true);
        setEditableItem(item);
        setShowForm(true);
    }, []);

    // Callback function to handle closing the form
    const handleCloseForm = useCallback(() => {
        setShowForm(false);
        setEditableItem(null);
    }, []);

    // Callback function to handle saving an item
    const handleSaveItem = useCallback(
        (saveFunc: (item: T) => void) => {
            if (editableItem) {
                if (!isEditing) {
                    editableItem.id = generateId();
                }
                saveFunc(editableItem as T);
                handleCloseForm();
            }
        },
        [editableItem, isEditing, generateId, handleCloseForm]
    );

    return {
        isEditing,
        editableItem,
        showForm,
        handleAddItem,
        handleEditItem,
        handleCloseForm,
        handleSaveItem,
        setEditableItem,
    };
}

export default useFormManager;