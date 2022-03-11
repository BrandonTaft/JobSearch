const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const config = require('./app/config/db.config');
const getGoogleJobs = require('./app/lib/getGoogleJobs');
const getLinkedInJobs = require('./app/lib/getLinkedInJobs');
const checkPortfolio = require('./app/lib/checkPortfolio');
const getGmail = require('./app/lib/getGmail');
const serp = require('./app/lib/serp');
const form = require('./app/lib/form');
const repository = require('./app/repositories/JobRepository')
const Job = require('./app/models/Job')
const app = express();
var passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {google} = require('googleapis');

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/')));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true

}))
// const db = require('./app/models');
// db.mongoose.connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => {
//         console.log("Connected to database!");
//     })
//     .catch(err => {
//         console.log("Cannot connect to database!", err);
//         process.exit();
//     });

//************* Create Database Connection ************//

mongoose.connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to database!");
})
    .catch(err => {
        console.log("Cannot connect to database!", err);
        process.exit();
    });


checkPortfolio.startPortfolio();
getGoogleJobs.startGetGoogleJobs();
getLinkedInJobs.startGetLinkedInJobs();
//getGmail.getGmail()

// app.get('/api/gmail', (req,res) => {
//     const gmail = google.gmail({version: 'v1', auth});
//   gmail.users.messages.list({
//     userId: 'me',
//     labelIds: 'INBOX'

//   }, (err, req, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const messages = res.data.messages;
//     if (messages.length) {
//       console.log('Messages:');
//       messages.forEach((message) => {
//         let id = message.id;
//         req.session.id = id
//       })
//     } else {
//       console.log('No messages found.');
//     }
//   })
//   console.log(req.session.id)
// })code=4%2F0AX4XfWhwUwxcjFkYyt8mlYDTGI-v9PdzNI9DGjOunNk7pmKEseK6nhYqnFKaKyT9qlIwjg&scope=profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile
//code=4%2F0AX4XfWi_cD73Rm1r1jL4vnp_PdG5m1AZSwzG5nNOJ54NDXyYKmwCpejXjT5AVMqfKuOW_Q&scope=profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile
//app.get('/api/gmail', (req,res) => {
//*******************Serialize User***********************//

passport.serializeUser(function (user, done) {
    console.log("user.id from serializeUser", user.id), done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    //models.Users.findById(id, function(err, user) {
    done(null, id);
    // });
});

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile",'https://www.googleapis.com/auth/gmail.readonly'] })
    //passport.authenticate("google", { scope: ['https://www.googleapis.com/auth/gmail.readonly'] })
);
app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://127.0.0.1:3000/"
    }),
    function (req, res) {
       
        res.redirect("http://127.0.0.1:3000/home");
    }
);
passport.use(
    new GoogleStrategy(
        {
            clientID: "872626451437-tgq3b333ce4317j9v5ehd05njrjmvale.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://127.0.0.1:8001/auth/google/callback"
        },
        function (accessToken, refreshToken, profile,done) {
            return done(null, profile,
            console.log(JSON.stringify(profile), 'AccessToken:', accessToken, 'Refresh Token:', refreshToken))
            }
            ))
        
    
    

app.get('/api/portfolio', (req, res) => {
    const date = new Date().getDay()
    res.sendFile(__dirname + `/screenshots/status-pic${date}.png`)
});

app.get('/api/googlejobs', (req, res) => {
    repository.findAllGoogle().then(function (jobs) {
        res.json(jobs);
    }).catch((error) => console.log(error));
});


app.get('/api/linkedin-jobs', (req, res) => {
    repository.findAllLinkedIn().then(function (jobs) {
        res.json(jobs);
    }).catch((error) => console.log(error));
});


app.get('/api/linkedinjobs', (req, res) => {
    linkedIn.getLinkedInJobs().then(function (info) {
        res.json(info)
    });

})

app.get('/api/serpjobs', (req, res) => {
    const SerpApi = require('google-search-results-nodejs');
    const search = new SerpApi.GoogleSearch("d2498eb38600b5fef854d9462c8f8b1ec0cda0b4d06b3cd4e2fbbe08379730a3");
    const params = {
        engine: "google_jobs",
        google_domain: "google.com",
        q: "junior software developers",
        hl: "en",
        gl: "us",
        uule: "&uule=w+CAIQICIHQXRsYW50YQ",
        lrad: "2000",
        start: "0"
    };

    const callback = function (data) {
        let string = "Computer Science";
        let myJobs = data.jobs_results
        myJobs.forEach((job) => {
            if (job.description.includes(string) || job.title.includes("No Experience Required"))
                console.log("Name: ", job.company_name, ", Title: ", job.title)
        })
        res.json(myJobs)
    };

    search.json(params, callback);


})

app.put('/api/:id', (req, res) => {
    const { id } = req.params;
    const job = { saved: true };
    repository.updateById(id, job)
        .then(res.status(200).json([]))
        .catch((error) => console.log(error));
});

app.get('/api/savedjobs', (req, res) => {
    repository.findSaved().then(function (jobs) {
        res.json(jobs);
    }).catch((error) => console.log(error));
});

app.delete('/api/:id', (req, res) => {
    const { id } = req.params;
    repository.deleteById(id).then((ok) => {
        console.log(ok);
        console.log(`Deleted record with id: ${id}`);
        res.status(200).json([]);
    }).catch((error) => console.log(error));
});

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server Is Running in ${PORT}...`);
});