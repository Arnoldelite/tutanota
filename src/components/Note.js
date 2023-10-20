import React, {  useState } from 'react';
import NoteForm from './NoteForm';
import Tag from './Tag';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';


const Note = ({ notes, completeNote, removeNote, updateNote}) => {
  const [edit, setEdit] = useState({
	  id: null,
	  value: ''
  });


  const submitUpdate = value => {
	  updateNote(edit.id, value, edit.isValid);
	  setEdit({
		  id: null,
		  value: ''
	  });

  };

  if (edit.id) {
	return <NoteForm edit={edit} onSubmit={submitUpdate} />
  }


  return notes.map((note, index) => {

	return (<div className={ note.isComplete || !note.isValid ? 'note-row complete' : 'note-row'} key={index}>
	   <div key={note.id} data-testid="note-content" onClick={() => completeNote(note.id)}>{note.text}</div>
	   <div className="icons">
	   		{note.isValid ? <Tag name={"Valid Format"}/> : <Tag name={"Invalid Format"}/>}
		   <TiEdit data-testid="edit-icon" onClick={() => setEdit({ id: note.id, value: note.text})} className="edit-icon" />
		   <RiCloseCircleLine data-testid="delete-icon" onClick={() => removeNote(note.id)} className="delete-icon" />
	   </div>

	</div>);
  });
}

export default Note;