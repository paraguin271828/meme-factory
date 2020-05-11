const express = require('express');
const port = 4000;

const fetchImageRoute = require('./routes/fetchImage');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/fetchimage', fetchImageRoute);

app.listen(port, (req, res) => console.log(`Server listening on port ${port}`));

