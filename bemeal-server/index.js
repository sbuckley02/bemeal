/**
  * This file is the entrance for the back-end application. When you run "npm start",
  * you are actually just running this file. It creates the server which listens on port
  * 4000 and has API endpoints for the front-end React application to use.
  */

/**
 * Necessary collections:
 * Users:
 *  Collections for each user
 * 	Fields: username, password, first name, last name, pfp (?)
 * 
 * Pictures:
 * 	Collections for each user
 */

// Import libraries
const express = require('express');
const cors = require('cors');

// Firebase-specific libraries
const firebase = require("firebase");
require("firebase/firestore");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

// Create the Express app
const app = express();
const PORT = 4000;

// Don't worry about this
app.use(cors());

// Same with this
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication for the database - you'll want to make sure this JSON file is
// present in the service_key folder as specified here
const serviceAccount = require('./service_key/bemeal-415be-69cf0765fd75.json');

// Initialize the firebase app
initializeApp({
  credential: cert(serviceAccount)
});

// Database object you can use to interact with Firebase DB
const db = getFirestore();

// A sample API endpoint - a GET request that returns some text
// when you make a request at .../api/sample-req
app.get("/api/sample-req", (req, res) => {
	res.send('if you see this text, it worked 😎');
});

app.post("/api/add-post", async (req, res) => {
	try {
		// const postTime = 
		const user = "/nathan-user-test/" + req.query.user;
		if (!user) {
			return res.status(400).send('Not all required body parameters given');
		}
	
		await db.collection('nathan-posts-test').doc("post" + postCount).set({
			'user': user
		});
		return res.status(201).send({'success': 'Document successfully created'})
	} catch (error) {
		console.log(error);
		return res.status(500).send({'error': 'Internal service error occurred'});
	}
});

// Create user with firstname, lastname, username, and password POST request
app.post("/api/add-user", async (req, res) => {
	try {
		const firstname = req.query.firstname;
		const lastname = req.query.lastname;
		const username = req.query.username;
		const password = req.query.password;
		
			if (!firstname || !lastname || !username || !password) {
				return res.status(400).send('Not all required body parameters given');
			}

			await db.collection('nathan-user-test').doc(username).set({
				'firstname': firstname, 'lastname': lastname,
				'username': username, 'password' : password
			});
		
		return res.status(201).send({'success': 'Document successfully created'})
		} catch (error) {
			console.log(error);
			return res.status(500).send({'error': 'Internal service error occurred'});
		}
});

// Returns user information given their username
app.get("/api/get-user", async (req, res) => {
	const username = req.query.username;

	if (!username) {
		return res.status(400).send('No username was provided.');
	}

	const snapshot = await db.collection('nathan-user-test').get();
    const data = [];
	snapshot.forEach((doc) => {
        if (doc._fieldsProto.username.stringValue == username) {
			data.push(doc.data());
		}
	});

	if (data.length == 0) {
		return res.status(404).send('User not found.');
	} else {
		return res.status(200).send({'data' : data});
	}
});


// // Example of a GET request that retrieves all rows from the test-collection collection
// app.get('/api/get-all-rows', async (req,res) => {
// 	const snapshot = await db.collection('test-collection').get();
// 	const data = [];
// 	snapshot.forEach((doc) => {
// 		data.push(doc.data())
// 	});
// 	res.send({'data': data});
// });

// // Example of a GET request that gets all rows with a number equal to the number
// // you specify in the URL. For example, ...api/get-row-by-fav-number/2 gets all
// // rows where favorite_number is 2
// app.get('/api/get-row-by-fav-number/:fav_number', async (req, res) => {
// 	const fav_number = parseInt(req.params.fav_number);

// 	const test_coll = db.collection('test-collection');
// 	const snapshot = await test_coll.where('favorite_number', '==', fav_number).get();
// 	const data = [];
// 	snapshot.forEach((doc) => {
// 		data.push(doc.data())
// 	});
// 	res.send({'data': data});
// });

// // Example of a POST request that creates a document in test-collection
// // You need to specify the name, favorite number, coolness, and states-lived as
// // body parameters. A lot of this is error handling, so I'd focus on the main stuff
// app.post('/api/create-row', async (req, res) => {
// 	try {
//     // Get the values for the new document from the request body
// 		const name = req.body.name;
// 		const fav_number = req.body.favorite_number;
// 		const is_cool = req.body.is_cool;
// 		const states_lived = req.body.states_lived;

//     // If any fields were not specified, tell the requester that they're wrong
// 		if (!name || (fav_number != 0 && !fav_number) || !is_cool
// 			|| !states_lived) {
// 			return res.status(400).send('Not all required body parameters given');
// 		}

//     // If the number specified is not a number, again tell requester they're wrong
// 		if (isNaN(fav_number)) {
// 			return res.status(400).send('The favorite number given must be an actual number');
// 		}

//     // This is where we actually add the document to the database
// 		const test_coll = db.collection('test-collection');
// 		await test_coll.add({
// 			'name': name, 'favorite_number': fav_number,
// 			'is_cool': is_cool, 'states_lived': states_lived
// 		});

//     // Return to the requester telling to them they did a good job
// 		return res.status(201).send({'success': 'Document successfully created'})
// 	} catch (error) {
// 		console.log(error);
// 		return res.status(500).send({'error': 'Internal service error occurred'});
// 	}
// });

// Start the server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});