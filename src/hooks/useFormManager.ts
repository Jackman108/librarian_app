// src/hooks/useFormManager.ts
import { useState, useCallback } from 'react';

function useFormManager<T extends { id?: string }>(generateId: () => string) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableItem, setEditableItem] = useState<Partial<T> | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleAddItem = useCallback(() => {
        setIsEditing(false);
        setEditableItem({});
        setShowForm(true);
    }, []);

    const handleEditItem = useCallback((item: T) => {
        setIsEditing(true);
        setEditableItem(item);
        setShowForm(true);
    }, []);

    const handleCloseForm = useCallback(() => {
        setShowForm(false);
        setEditableItem(null);
    }, []);

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