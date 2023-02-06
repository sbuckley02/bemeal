// Imports
import axios from 'axios';
import {useState, useEffect} from 'react';

// A sample component arbitrarily called "Home"
function Home() {
	const [sampleBackendText, setSampleBackendText] = useState();

	// When the component mounts, call the back-end API endpoint to
	// get its text
	useEffect(() => {
		axios.get('http://localhost:4000/api/sample-req')
			.then(response => {
				setSampleBackendText(response.data);
			}).catch(err => {
				console.log(err);
				setSampleBackendText('null');
			})
	}, []);

	// Return the HTML that will display for this component, including an
 	// embedded variable
	return (
		<div>
			<h2>BeMeal</h2>
			<p>This text can be found in the nested component "Home". You're gonna want to change this text when you're able to</p>
			<p>Here's something cool - the following text is retreived from the back-end:</p>
			<code>{sampleBackendText}</code>
			<p>If you see <code>null</code> above, it means it didn't work. That likely means that you don't have the
 				back-end running on a separate port on your computer. If you see something else, it's working</p>
		</div>
	)
}

export default Home;