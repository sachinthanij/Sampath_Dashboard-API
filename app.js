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


const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
};

app.use(allowCrossDomain);
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

const db_config = {
    host: 'sampathuatinstance.c2saqwpvbe74.us-east-1.rds.amazonaws.com',
    user: 'casterlycsat',
    password: 'SampathUAT#2020',
    database: 'csat_sampath_uat',
    port:'3306',
    multipleStatements: true,
    dateStrings:true

};

var mc;

function handleDisconnect() {
    mc = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.

    mc.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }else{

        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    mc.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();


// Start the server
app.listen(config.port);
console.log('Your server is running on ' + config.port);


router(app);