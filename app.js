const express = require('express'),
    http = require('http'),
    https = require('https');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const router = require('./router');
const config = require('./config/main');

const app = express();

// Configure your middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(cors());






// Start the server
app.listen(config.port);
console.log('Your server is running on ' + config.port);


router(app);