var express = require('express');
var router = express.Router();

var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/', function(req, res, next) {
//   // request({
//   //   uri: 'http://localhost:8000/',
//   //
//   // }).pipe(res);
//
// });

router.post('/dashboard', function(req, res, next){
  res.setHeader('Content-Type', 'application/json');

  var email = req.body.email_field;
  var password = req.body.password_field;

  var formData = {
    email : email,
    password : password
  };
  
  request.post({url:'http://localhost:8000/users/auth/', json: formData}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    if(body.success == true){
      res.cookie('sessionid',body.session_id)
      res.send('Your login was successful.');
    }else{
      res.writeHead(301,{Location: 'http://localhost:3000'});
      res.end();
    }

  });
});


router.get('/logout', function(req, res, next) {
  request.get({url:'http://localhost:8000/logout/'}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    res.send('Logout was successful.');
  });
});


module.exports = router;
