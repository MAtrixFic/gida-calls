const cors = require('cors');
const express = require('express');

const CORSES = cors({
    origin: 'http://localhost:3000',
})
const PORT = process.env.PORT || 3001;
const URLENCODER = express.urlencoded({ extended: true });

module.exports = {PORT, URLENCODER, CORSES}