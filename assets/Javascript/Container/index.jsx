import React from 'react';
import Underscore from 'underscore';
import Serialize from 'form-serialize';
import {connect} from 'react-redux';
import {handleAddNote, addNote, handleEditNote, updateNote, deleteNote, filterNote} from '../Action';

class Container extends React.Component{
  constructor(props) {
    super(props);
    this.handleAddNoteSection = this.handleAddNoteSection.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleEditNote = this.handleEditNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.filterNotes = this.filterNotes.bind(this);
    this.getFilteredList = this.getFilteredList.bind(this);
  }

  handleAddNoteSection(event = new Event('')) {
    event.preventDefault();
    const {handleAddNote} = this.props;
    handleAddNote(!this.props.addNotesStatus);
  }

  submitForm(event = new Event('')) {
    event.preventDefault();
    const {addNote} = this.props;
    let formData = Serialize(this.refs.addNoteForm, {hash: true});
    addNote(formData);
  }

  handleEditNote(noteId) {
    const {handleEditNote} = this.props;
    handleEditNote(noteId);
  }

  updateNote(formData) {
    const {updateNote} = this.props;
    updateNote(formData);
  }

  deleteNote(noteId) {
    const {deleteNote} = this.props;
    deleteNote(noteId);
  }

  filterNotes(event = new Event('')) {
    event.preventDefault();
    const {filterNote} = this.props;
    let formData = Serialize(this.refs.filterNotesForm, {hash: true});
    filterNote(formData.filter);
  }

  getFilteredList() {
    let filterString = this.props.filterString ? this.props.filterString.toLowerCase() : '';
    return filterString
      ? Underscore.filter(this.props.notesList, (note) => {
          return note.title.indexOf(filterString) !== -1 || note.description.indexOf(filterString) !== -1;
        })
      : this.props.notesList;
  }

  render() {
    return (
      <section className="container">
        <div className="header-controls">
          {this.props.addNotesStatus
            ? <div className="form-wrapper">
                <form ref="addNoteForm" className="add-note-form clearfix" onSubmit={this.submitForm}>
                  <div className="form-group pull-left">
                    <label>Title</label>
                    <input
                      name="title"
                      type="text"
                      className="form-control"
                      placeholder="Title here"
                      required="required"
                    />
                  </div>
                  <div className="form-group pull-left">
                    <label>Description</label>
                    <textarea
                      name="description"
                      className="form-control description"
                      placeholder="Description here"
                      required="required"
                    />
                  </div>
                  <div className="button-wrapper pull-left">
                    <button className="btn btn-info button-control"><i className="glyphicon glyphicon-save"></i> Save Note</button>
                    <a href="javascript: void(0);" className="btn btn-default button-control" onClick={this.handleAddNoteSection}>Cancel</a>
                  </div>
                </form>
              </div>
            : <div className="add-filter-note clearfix">
                <a href="javascript: void(0);" className="btn btn-default pull-left" onClick={this.handleAddNoteSection}>Add New Note</a>
                <form ref="filterNotesForm" className="custom-form filter-form pull-left" onSubmit={this.filterNotes}>
                  <input
                    name="filter"
                    defaultValue={this.props.filterString}
                    type="text"
                    className="form-control pull-left"
                    placeholder="Filter notes"
                  />
                  <button className="glyphicon glyphicon-search pull-left"></button>
                </form>
              </div>
          }
        </div>
        {this.getFilteredList().length
          ? <ul className="notes-listing-table">
              <li className="table-head">
                <div className="table-content">
                  <div className="table-cell serial">Sr no</div>
                  <div className="table-cell title">Title</div>
                  <div className="table-cell description">Description</div>
                  <div className="table-cell actions">Actions</div>
                </div>
              </li>
              {Underscore.map(this.getFilteredList(), (note, key) => {
                return (
                  <ListItem key={note.id} itemKey={key} note={note} editNote={this.handleEditNote} updateNote={this.updateNote} deleteNote={this.deleteNote} />
                )
              })}
            </ul>
          : <div>No Data</div>
        }
      </section>
    );
  }
};

class ListItem extends React.Component{
  constructor(props) {
    super(props);
    this.editNote = this.editNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  editNote(event = new Event('')) {
    event.preventDefault();
    this.props.editNote(this.props.note.id);
  }

  updateNote(event = new Event('')) {
    event.preventDefault();
    let formData = Serialize(this.refs.updateNoteForm, {hash: true});
    if (formData.title !== this.props.note.title || formData.description !== this.props.description) {
      formData.id = this.props.note.id;
      this.props.updateNote(formData);
    }
  }

  deleteNote(event = new Event('')) {
    event.preventDefault();
    this.props.deleteNote(this.props.note.id);
  }

  render() {
    let note = this.props.note;
    return (
      note.editStatus
        ? <li className="table-data">
            <form ref="updateNoteForm" className="table-content" onSubmit={this.updateNote}>
              <div className="table-cell serial">{this.props.itemKey + 1}</div>
              <div className="table-cell title">
                <input
                  name="title"
                  type="text"
                  defaultValue={note.title}
                  className="form-control"
                  placeholder="Title"
                  required="required"
                />
              </div>
              <div className="table-cell description">
                <textarea
                  name="description"
                  defaultValue={note.description}
                  className="form-control description-area"
                  placeholder="Description here"
                  required="required"
                />
              </div>
              <div className="table-cell actions">
                <button className="btn btn-success" title="Update note"><i className="glyphicon glyphicon-ok"></i> Update</button>
              </div>
            </form>
          </li>
        : <li className="table-data">
            <div className="table-content">
              <div className="table-cell serial">{this.props.itemKey + 1}</div>
              <div className="table-cell title">{note.title}</div>
              <div className="table-cell description">{note.description}</div>
              <div className="table-cell actions">
                <a href="javascript: void(0);" className="action-link btn btn-info cursor-pointer" title="Edit note" onClick={this.editNote}><i className="glyphicon glyphicon-edit"></i> Edit</a>
                <a href="javascript: void(0);" className="action-link btn btn-danger cursor-pointer" title="Delete note" onClick={this.deleteNote}><i className="glyphicon glyphicon-remove"></i> Delete</a>
              </div>
            </div>
          </li>
    )
  }
};

export default connect(state => state, {handleAddNote, addNote, handleEditNote, updateNote, deleteNote, filterNote})(Container);
