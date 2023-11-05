import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import NoteList from '../components/NoteList/NoteList';

test('renders the NoteList component', () => {
  render(<NoteList />);
  const headingElement = screen.getByText('Enter URL to Verify!');
  expect(headingElement).toBeInTheDocument();
});

test('adds a note to the list', async () => {
  render(<NoteList />);

  const inputElement = screen.getByTestId('add-url');
  const submitButton = screen.getByText('Verify url');

    // eslint-disable-next-line testing-library/no-unnecessary-act
	act(() => {
        /* fire events that update state */

		fireEvent.change(inputElement, { target: { value: 'http://example.com' } });
		fireEvent.click(submitButton); 
	     });


  await waitFor(() => {
    const noteElement = screen.getByText('http://example.com');
    expect(noteElement).toBeInTheDocument();
  });
});

test('updates a note in the list', async () => {
  render(<NoteList />);

  const inputElement =screen.getByTestId('add-url');
  const submitButton = screen.getByText('Verify url');

    // eslint-disable-next-line testing-library/no-unnecessary-act
	act(() => {
        /* fire events that update state */

		
		fireEvent.change(inputElement, { target: { value: 'http://example.com' } });
		fireEvent.click(submitButton);
	     });


  const editButton = screen.getByText('Edit');
  
// eslint-disable-next-line testing-library/no-unnecessary-act
act(() => {
    /* fire events that update state */
	fireEvent.click(editButton);
});
  const editInputElement = screen.getByTestId('edit-note');
  const updateButton = screen.getByText('Update');

  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    /* fire events that update state */
	fireEvent.change(editInputElement, { target: { value: 'http://updated.com' } });
	fireEvent.click(updateButton);  });
 

  await waitFor(() => {
    const updatedNoteElement = screen.getByText('http://updated.com');
    expect(updatedNoteElement).toBeInTheDocument();
  });
});

test('completes and removes a note from the list', async () => {
  render(<NoteList />);

  const inputElement = screen.getByTestId('add-url');
  const submitButton = screen.getByText('Verify url');
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    /* fire events that update state */
	fireEvent.change(inputElement, { target: { value: 'http://example.com' } });
	fireEvent.click(submitButton);
  });



  const completeButton = screen.getByText('Complete');
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    /* fire events that update state */
	fireEvent.click(completeButton);
});

  await waitFor(() => {
    const completedNoteElement = screen.getByText('http://example.com');
    expect(completedNoteElement).toHaveClass('complete');
  });

  const removeButton = screen.getByText('Remove');
    // eslint-disable-next-line testing-library/no-unnecessary-act
	act(() => {
		/* fire events that update state */
		fireEvent.click(removeButton);
	});

  await waitFor(() => {
    const removedNoteElement = screen.queryByText('http://example.com');
    expect(removedNoteElement).not.toBeInTheDocument();
  });
});
