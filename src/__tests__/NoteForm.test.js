/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import NoteForm from '../components/NoteForm/NoteForm';

// Mocking the isValidHttpUrl function
const mockIsValidHttpUrl = jest.fn(() => Promise.resolve(true));

test('renders the NoteForm component', () => {
  render(<NoteForm />);
  const noteForm = screen.getByTestId('note-form');
  expect(noteForm).toBeInTheDocument();
});

test('handles user input and submission', async () => {
  const onSubmit = jest.fn();

  render(<NoteForm onSubmit={onSubmit} />);

  const inputElement = screen.getByTestId('add-url');
  const submitButton = screen.getByText('Verify url');

  // Simulate user input
   // eslint-disable-next-line testing-library/no-unnecessary-act
   act(() => {
        /* fire events that update state */
        fireEvent.change(inputElement, { target: { value: 'http://example.com' } });
      });

  // Simulate form submission
  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    /* fire events that update state */
    fireEvent.click(submitButton);
  });

  // Expect the form to be submitted
  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith({
      id: expect.any(Number),
      text: 'http://example.com',
      isValid: true,
      isFile: false,
    });
  });
});

test('handles invalid URL input', async () => {
  const onSubmit = jest.fn();

  render(<NoteForm onSubmit={onSubmit} />);

  const inputElement = screen.getByTestId('add-url');
  const submitButton = screen.getByText('Verify url');


     // eslint-disable-next-line testing-library/no-unnecessary-act
     act(() => {
      /* fire events that update state */
  // Simulate invalid user input
  fireEvent.change(inputElement, { target: { value: 'invalid url' } });

  // Simulate form submission
  fireEvent.click(submitButton);    });

  // Expect the form to be submitted with invalid data
  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith({
      id: expect.any(Number),
      text: 'invalid url',
      isValid: false,
      isFile: false,
    });
  });
});

test('focuses on input field on mount', () => {
  render(<NoteForm />);
  const inputElement = screen.getByTestId('add-url');
  // eslint-disable-next-line testing-library/no-node-access
  expect(document.activeElement).toBe(inputElement);
});
