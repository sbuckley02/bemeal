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

'use strict';
// Import libraries
const express = require('express');
const cors = require('cors');

// Firebase-specific libraries
const firebase = require("firebase");
require("firebase/firestore");
require("firebase/storage");
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
app.use(express.static('..\\public'));
app.use("..\\public\\images", express.static('images'));

// Authentication for the database - you'll want to make sure this JSON file is
// present in the service_key folder as specified here
const serviceAccount = require('./service_key/bemeal-415be-69cf0765fd75.json');

// Initialize the firebase app
initializeApp({
  credential: cert(serviceAccount)
});

// Database object you can use to interact with Firebase DB
const db = getFirestore();
global.XMLHttpRequest = require("xhr2");

// A sample API endpoint - a GET request that returns some text
// when you make a request at .../api/sample-req
app.get("/api/sample-req", (req, res) => {
	res.send('if you see this text, it worked 😎');
});

app.get('/api/get-posts', async (req, res) => {
	const snapshot = await db.collection('posts').get();
	const posts = [];
	snapshot.forEach((doc) => {
		posts.push(doc.data())
	});
	if (posts.length == 0) {
		return res.status(404).send('User not found.');
	} else {
		return res.status(200).send({'data' : data});
	}
});

// app.post("/api/add-post/", (req, res) => {
// 	try {
//      // Grab the file
// 		console.log(req.body);
//         // Format the filename
//         const timestamp = Date.now();
//         const name = file.originalname.split(".")[0];
//         const type = file.originalname.split(".")[1];
//         const fileName = `${name}_${timestamp}.${type}`;
//          // Step 1. Create reference for file name in cloud storage 
//         const imageRef = storage.child(fileName);
//         // Step 2. Upload the file in the bucket storage
//         const snapshot = await imageRef.put(file.buffer);
//         // Step 3. Grab the public url
//         const downloadURL = await snapshot.ref.getDownloadURL();
//         res.send(downloadURL);
// 		res.status(500).send("Test");
//      } catch (error) {
//     	console.log(error);
//         res.status(400).send(error.message);
//     }
// });

// app.post("/api/add-post", async (req, res) => {
// 	try {
// 		const postTime = new Date();
// 		const month = (postTime.getUTCMonth() + 1) / 10 < 1 ? "0" + (postTime.getUTCMonth() + 1).toString() : (postTime.getUTCMonth() + 1).toString();
// 		const date = postTime.getUTCDate() / 10 < 1 ? "0" + postTime.getUTCDate().toString() : postTime.getUTCDate().toString();
// 		const hours = postTime.getUTCHours() / 10 < 1 ? "0" + postTime.getUTCHours().toString() : postTime.getUTCHours().toString();
// 		const minutes = postTime.getUTCMinutes() / 10 < 1 ? "0" + postTime.getUTCMinutes().toString() : postTime.getUTCMinutes().toString();
// 		const seconds = postTime.getUTCSeconds() / 10 < 1 ? "0" + postTime.getUTCSeconds().toString() : postTime.getUTCSeconds().toString();

// 		const user = "/users/" + req.query.user;
// 		if (!user) {
// 			return res.status(400).send('Not all required body parameters given');
// 		}
	
// 		await db.collection('posts').doc(postTime.getUTCFullYear().toString() + month + date + hours
// 			+ minutes + seconds + "_" + req.query.user.toLowerCase()).set({
// 				'user': user,
// 				'time': postTime
// 		});
// 		return res.status(201).send({'success': 'Document successfully created'})
// 	} catch (error) {
// 		console.log(error);
// 		return res.status(500).send({'error': 'Internal service error occurred'});
// 	}
// });

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

			await db.collection('users').doc(username).set({
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

	const snapshot = await db.collection('users').get();
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

// Start the server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});