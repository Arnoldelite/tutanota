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

	// function isValidUrl(str) {
	// 	const pattern = new RegExp(
	// 	  '^([a-zA-Z]+:\\/\\/)?' + // protocol
	// 		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
	// 		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
	// 		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
	// 		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
	// 		'(\\#[-a-z\\d_]*)?$', // fragment locator
	// 	  'i'
	// 	);
	// 	return pattern.test(str);
	//   }

	  function isValidHttpUrl(string) {
		try {
			const url = new URL(string);
		  	console.log('chow constructor url >>', url);
			  var inputElement = document.getElementsByName('url');
			  console.log('found input element >>', inputElement);
			  let check = inputElement[0].checkValidity();
			  console.log('check validity >>', check);
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
		console.log('input >>', input);
		console.log('check if url valid >>', check);
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