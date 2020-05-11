const express = require('express');
const router = express.Router();
const axios = require('axios');
const apiUrl = 'https://api.imageflip.com/get_memes';

router.get('/', (req, res) => {
    axios.get('https://api.imgflip.com/get_memes')
      .then(result => {
        res.send(result.data.data.memes);
        console.log(result.data.data.memes);
      })
      .catch(err => console.error(err));
});

module.exports = router;
