import Underscore from 'underscore';

const payload = {
  notesList: [],
  addNotesStatus: false,
  filterString: ''
}

function handleAddNote (updatedStatus) {
  payload.addNotesStatus = updatedStatus;
  return payload;
}

function addNote (formData) {
  formData.id = Underscore.now();
  formData.editStatus = false;
  payload.notesList.push(formData);
  payload.addNotesStatus = false;
  return payload;
}

function handleEditNote (noteId) {
  payload.notesList = Underscore.map(payload.notesList, (note) => {
    if(note.id === noteId) {
      note.editStatus = true;
    }
    return note;
  });
  return payload;
}

function updateNote (formData) {
  payload.notesList = Underscore.map(payload.notesList, (note) => {
    if(note.id === formData.id) {
      note.title = formData.title;
      note.description = formData.description;
      note.editStatus = false;
    }
    return note;
  });
  return payload;
}

function deleteNote (noteId) {
  payload.notesList = Underscore.reject(payload.notesList, (note) => {
    return note.id === noteId;
  });
  return payload;
}

function filterNote (filterString) {
  payload.filterString = filterString;
  return payload;
}

export default function Reducer (state = payload, action) {
  switch (action.type) {
    case 'HANDLE_ADD_NOTE':
      handleAddNote(action.status);
      return {
        ...payload
      };
    case 'ADD_NOTE':
      addNote(action.formData);
      return {
        ...payload
      };
    case 'HANDLE_EDIT_NOTE':
      handleEditNote(action.noteId);
      return {
        ...payload
      };
    case 'UPDATE_NOTE':
      updateNote(action.formData);
      return {
        ...payload
      };
    case 'DELETE_NOTE':
      deleteNote(action.noteId);
      return {
        ...payload
      };
    case 'FILTER_NOTE':
      filterNote(action.filterString);
      return {
        ...payload
      };
    default:
      return {
        ...payload
      };
  }
};
