require('dotenv').config()
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); 

const connection = require('./database');

app.route('/Users')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM `Users`LIMIT 100",
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

  app.route('/Products')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM `Products`LIMIT 100",
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

  app.post('/Users/Authenticate',function(req, res) {
    let userName = req.body.userNm;
    let password = req.body.userPwd;
    connection.query('CALL AuthenticateUser(?,?,@Output);select @Output', [userName, password],
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

  app.route('/Users/Insert')
  .get(function(req, res, next) {
  connection.query('INSERT INTO Users SET ?', {UserName:'New User40', Password:'TempPwd', IsVendor:0,EmailAddress:'test@gmail.com',MobileNumber:1234567890},
   function (error, results, fields) {
    if (error) throw error;
    res.json(results.insertId);
  });
});

  app.get('/status', (req, res) => res.send('Working!'));


// Port 8080 for Google App Engine
app.set('port', process.env.PORT || 3001);
app.listen(3001 );





