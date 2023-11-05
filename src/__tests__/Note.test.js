import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Note from '../components/Note/Note';

// Sample test data
const sampleNotes = [
  { id: 1, text: 'Note 1', isValid: true, isFile: false, isComplete: false },
  { id: 2, text: 'Note 2', isValid: false, isFile: true, isComplete: false },
];

test('renders a list of notes', () => {
  render(<Note notes={sampleNotes} />);
  
  const noteContentElements = screen.getAllByTestId('note-content');
  expect(noteContentElements).toHaveLength(sampleNotes.length);
});

test('renders edit and delete icons for each note', () => {
  render(<Note notes={sampleNotes} />);
  
  const editIcons = screen.getAllByTestId('edit-icon');
  const deleteIcons = screen.getAllByTestId('delete-icon');
  
  expect(editIcons).toHaveLength(sampleNotes.length);
  expect(deleteIcons).toHaveLength(sampleNotes.length);
});

test('clicking on the edit icon should set the edit mode', () => {
  render(<Note notes={sampleNotes} />);
  
  const editIcons = screen.getAllByTestId('edit-icon');
  
  fireEvent.click(editIcons[0]);

  const editButtonElement = screen.getByText(/Edit Url Entry/i);
  expect(editButtonElement).toBeInTheDocument();
  
  // Check if the edit form is displayed (you'll need to write additional tests for this)
});

