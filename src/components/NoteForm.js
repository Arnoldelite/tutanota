import React, { useState, useEffect, useRef } from 'react';

function NoteForm(props) {
	const [input, setInput] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [isFile, setIsFile] = useState(false);
	const [error, setError] = useState(false);
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	})

	const handleChange = (e) => {
		setInput(e.target.value);
		var inputElement = document.getElementsByName('url');
		let check = inputElement[0].checkValidity();
		setIsValid(check);
		setError(false);
	};

	//mock server call with async function that returns a promise
	function isValidHttpUrl(urlToBeTested) {
		console.log('passed in string >>', urlToBeTested);
		return new Promise((resolve, reject) => {

		try {
			if (typeof urlToBeTested !== 'string') {
				return reject(new TypeError('Expected a string'));
			}
		
			urlToBeTested = urlToBeTested.trim();
			if (urlToBeTested.includes(' ')) {
				return reject(false);
			}

			const url = new URL(urlToBeTested);
		
			return resolve(url.protocol === "http:" || url.protocol === "https:");
	

		} catch (err) {
			if (err.message) {
				console.log("Invalid url error!", {error: err});
				setError(true);
				setIsValid(false);
				setIsFile(false);
			}
		   throw err;
		}
		});
	  }


	const handleSubmit = (e) => {
		e.preventDefault();
		// e.persist();

		isValidHttpUrl(input)
		.then((result) => {		
			setIsValid(result);
			const parts = input.split('/');
			console.log('check file type >>', input);
  			const lastPart = parts[parts.length - 1];

			// Check if the last part has a file extension (e.g., ends with .txt, .pdf, .xlsx or .json) this could also be checked using regex
			const checkFile = lastPart.includes('.txt') || lastPart.includes('.pdf')  || lastPart.includes('.xlsx') || lastPart.includes('.json');
			setIsFile(checkFile);
			props.onSubmit({
				id: Math.floor(Math.random() * 10000),
				text: input,
				isValid: isValid,
				isFile: checkFile,
			});
		})
		.catch((error) => {
			if (error) {
				
				setIsValid(false);
				setIsFile(false);
				props.onSubmit({
					id: Math.floor(Math.random() * 10000),
					text: input,
					isValid: false,
					isFile: false,
				});
			
			console.log(`Couldn't check url format: ${error}`)
			}
			
		});

		setInput('');
		setIsFile(false);
		setIsValid(false);
	};

	return (
		<form className="note-form" onSubmit={handleSubmit}>
			<input type="text" placeholder={ props.edit ? 'edit existing url!' : 'Enter url to verify!'} value={input} data-testid="add-note" name='url' className='note-input' onChange={handleChange} ref={inputRef}/>
			<button disabled={input === ''} className="note-button"> { props.edit ? 'edit url entry!' : 'Verify url!'} </button>
		</form>
	);

}

export default NoteForm;