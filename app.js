const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
port = process.env.PORT || 3000;

var allowCrossDomain = function(req, res, next) {
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

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: 'sampathuatinstance.c2saqwpvbe74.us-east-1.rds.amazonaws.com',
    user: 'casterlycsat',
    password: 'SampathUAT#2020',
    database: 'csat_sampath_uat',
    port:'3306',
    multipleStatements: true,
    dateStrings:true
});

// connect to database
mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./router'); //importing route
routes(app); //register the route