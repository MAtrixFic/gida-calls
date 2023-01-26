const cors = require('cors');
const express = require('express');

const CORSES = cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
})
const PORT = process.env.PORT || 3001;
const URLENCODER = express.urlencoded({ extended: true });
const ADDRESS = '192.168.1.25';

module.exports = {PORT, ADDRESS URLENCODER, CORSES}