const nodemailer = require('nodemailer');
require('dotenv').config();


//create and define reusable transporter object
//specifying what email service, name, and password
//rejectUnauthorized: false means it won't fail on invalid tls certificate
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

//specify options, tell nodemailer the recipients and sender
var mailOptions = {
    from: process.env.USER,
    to: process.env.MYEMAIL,
    subject: "",
    text: ""
};

//specify subject and text of email
//we are sending html so we can provide link w/ a tag
//then send email with specified mail options
//if errors it logs them, otherwise it prints success and email info
function sendMail(subject,text,link,url) {
    console.log(process.env.PASS)
    console.log(process.env.USER)
    mailOptions.subject = subject;
    mailOptions.html = "<a href="+url+link+ ">" + text + "</a>";
        transporter.sendMail(mailOptions, function(error, info){
            if(error) {
                console.log(error);
            }else{
                console.log('Email Sent: ' + info.response);
            }
        });

}

module.exports.sendMail = sendMail