import React, { useState, useEffect, useRef } from 'react';

function NoteForm(props) {
	const [input, setInput] = useState('');
	const [isValid, setIsValid] = useState(false);
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	})

	const handleChange = (e) => {
		setInput(e.target.value);
	};


	  function isValidHttpUrl(string) {
		try {
			const url = new URL(string);
			  var inputElement = document.getElementsByName('url');
			  let check = inputElement[0].checkValidity();
			// return url.protocol === "http:" || url.protocol === "https:";
		  return Boolean(url) || check; 

		} catch (err) {
			console.log("Invalid url error!", err);
		  return false;
		}

	  }

	const handleSubmit = (e) => {
		e.preventDefault();
		// e.persist();

		const check = isValidHttpUrl(input);
		setIsValid(check);

		props.onSubmit({
			id: Math.floor(Math.random() * 10000),
			text: input,
			isValid: isValid,
		});

		setInput('');
	};

	return (
		<form className="note-form" onSubmit={handleSubmit}>
			<input type="url" placeholder={ props.edit ? 'edit existing url!' : 'Enter url to verify!'} value={input} data-testid="add-note" name='url' className='note-input' onChange={handleChange} ref={inputRef}/>
			<button className="note-button"> { props.edit ? 'edit url entry!' : 'Verify url!'} </button>
		</form>
	);

}

export default NoteForm;