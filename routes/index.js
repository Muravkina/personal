var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

//emailer
var options = {
    auth: {
        api_key: process.env.SG_PASSWORD
    }
};

var mailer = nodemailer.createTransport(sgTransport(options));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//Download resume
router.get('/download', function(req, res, next) {
  var file = __dirname + '/../public/files/resume.pdf'
  res.download(file);
});

//Submit Email
router.post('/sendEmail', function(req, res, next) {

  //Email Template
  var email = {
    to: 'dashamurauyova@gmail.com',
    from: req.body.email,
    subject: 'Message from your website',
    html: "<p>You got new message!</p><br><p>Name: " + req.body.name + "</p><p>Email: " + req.body.email + "</p><p>Message: " + req.body.message + "</p><br><p>Don&apos;t forget to reply!</p>"
  };

  //SendEmail
  mailer.sendMail(email, function(err, response) {

    if (err) {
      console.log(err)
    }

    res.send('Success')

  });

});



module.exports = router;

