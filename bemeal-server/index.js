/**
  * This file is the entrance for the back-end application. When you run "npm start",
  * you are actually just running this file. It creates the server which listens on port
  * 4000 and has API endpoints for the front-end React application to use.
  */

// Import libraries
const express = require('express');
const cors = require('cors');

// Create the Express app
const app = express();
const PORT = 4000;

// Don't worry about this
app.use(cors());

// A sample API endpoint - a GET request that returns some text
// when you make a request at .../api/sample-req
app.get("/api/sample-req", (req, res) => {
	res.send('if you see this text, it worked 😎');
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});