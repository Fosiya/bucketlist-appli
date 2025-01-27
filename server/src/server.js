const express = require('express');
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config({path:'../.env'});
const { authenticationRoute } = require('./routes/authenticationRoute');
const { config } = require('./database/config');
const { listRoute } = require('./routes/listRoute');
const { goalRoute } = require('./routes/goalRoute');
const { checkCookie } = require('./middlewares/checkCookie');

const server = express();
const connection = mysql.createConnection(config)

server.use(express.json());
server.use(cookieParser());
server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

connection.connect();

server.use('/auth', authenticationRoute);
server.use('/list', checkCookie, listRoute);
server.use('/goals', checkCookie, goalRoute);

server.listen(5050)
console.log('Server is running on http://localhost:5050/');