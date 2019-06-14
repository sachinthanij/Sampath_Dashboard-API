/**
 * Created by Castelycrown on 6/13/2019.
 */

'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host: 'sampathuatinstance.c2saqwpvbe74.us-east-1.rds.amazonaws.com',
    user: 'casterlycsat',
    password: 'SampathUAT#2020',
    database: 'csat_sampath_uat',
    port:'3306',
    multipleStatements: true,
    dateStrings:true
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;

