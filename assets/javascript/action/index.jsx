export function handleAddNote (status) {
  return {
    type: 'HANDLE_ADD_NOTE',
    status: status
  }
}

export function addNote (formData) {
  return {
    type: 'ADD_NOTE',
    formData: formData
  }
}

export function handleEditNote (noteId) {
  return {
    type: 'HANDLE_EDIT_NOTE',
    noteId: noteId
  }
}

export function updateNote (formData) {
  return {
    type: 'UPDATE_NOTE',
    formData: formData
  }
}

export function deleteNote (noteId) {
  return {
    type: 'DELETE_NOTE',
    noteId: noteId
  }
}

export function filterNote (filterString) {
  return {
    type: 'FILTER_NOTE',
    filterString: filterString
  }
}
