const cors = require('cors');
const express = require('express');

const CORSES = cors({
    origin: '*',
    optionsSuccessStatus: 200,
})
const PORT = process.env.PORT || 3001;
const URLENCODER = express.urlencoded({ extended: true });
const ADDRESSES = { school: '192.168.1.25', local: 'localhost' };

module.exports = { PORT, ADDRESSES, URLENCODER, CORSES }