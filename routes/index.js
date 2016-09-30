var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

//emailer
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    xoauth2: xoauth2.createXOAuth2Generator({
      user: "dashamurauyova@gmail.com", // Your gmail address.
                                            // Not @developer.gserviceaccount.com
      clientId: "238810366383-mrtc83m3s4uh6o9g7me1udo855pl3p4l.apps.googleusercontent.com",
      clientSecret: "XBMgKcPxcDa8_CgyhNFw6ZN9",
      refreshToken: "1/I9lu5ULSvYq2KAbfl4j1ZAUzZkESwOYJvai2FzlejAk",
      accessToken: "ya29.Ci9sAxkpfRFFfyX5yVVJDab3_fuQZy37tGMZhrhP9G24dNR2ZC38Lv1O5USQmkGwKw"
    })
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//Download resume
router.get('/download', function(req, res, next) {
  var file = __dirname + '/../public/files/Resume.pdf'
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
  transporter.sendMail(email, function(err, response) {

    if (err) {
      console.log(err)
    } else {
      res.send('Success')      
    }

    transporter.close()
  });

});



module.exports = router;

