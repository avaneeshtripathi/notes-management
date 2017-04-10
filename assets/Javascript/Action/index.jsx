import AppConstants from '../AppConstants';

export function handleAddNote(status) {
  return {
    type: AppConstants.actions.handleAddNote,
    status: status
  }
}

export function addNote(formData) {
  return {
    type: AppConstants.actions.addNote,
    formData: formData
  }
}

export function handleEditNote(noteId) {
  return {
    type: AppConstants.actions.editNote,
    noteId: noteId
  }
}

export function updateNote(formData) {
  return {
    type: AppConstants.actions.updateNote,
    formData: formData
  }
}

export function deleteNote(noteId) {
  return {
    type: AppConstants.actions.deleteNote,
    noteId: noteId
  }
}

export function filterNote(filterString) {
  return {
    type: AppConstants.actions.filterNote,
    filterString: filterString
  }
}
