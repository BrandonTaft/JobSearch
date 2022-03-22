const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const User = require('./app/models/User');
const config = require('./app/config/db.config');
const getGoogleJobs = require('./app/lib/getGoogleJobs');
const getLinkedInJobs = require('./app/lib/getLinkedInJobs');
const checkPortfolio = require('./app/lib/checkPortfolio');
const serp = require('./app/lib/serp');
const repository = require('./app/repositories/JobRepository');
const UserRepository = require('./app/repositories/UserRepository')
const passport = require("passport");
const jwt = require('jsonwebtoken');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require('bcryptjs');
const salt = 10;

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/')));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// checkPortfolio.startPortfolio();
// getGoogleJobs.startGetGoogleJobs();
// getLinkedInJobs.startGetLinkedInJobs();

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

//************* Middleware ***************/

function verifyJWT(req, res, next) {
   
    console.log("TOkkkkkENnnnn", req.headers["x-access-token"])
    const token = req.headers["x-access-token"]
    console.log("TOkkkkEN", token)
    if (token) {

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) return res.json({ isLoggedIn: false, message: "Failed To Authenticate" })
            req.user = {};
            req.user.id = decoded.id
            req.user.username = decoded.username
            console.log("authenticated")
            next()
        })
    } else {
        res.json({ message: "Incorrect Token Given", isLoggedIn: false })
    }
}

app.get("/isUserAuth", verifyJWT, (req, res) => {
    return res.json({isLoggedIn: true, username: req.user.username})
})

//************* Registration ************//

app.post('/api/register', async (req, res) => {

    const username = req.body.username
    const password = req.body.password

    const persistedUser = await UserRepository.findByName(username)
    if (persistedUser[0] == null) {
        bcrypt.hash(password, salt, async (error, hash) => {
            if (error) {
                res.json({ message: "Something Went Wrong!!!" })
            } else {
                const user = new User({
                    username: username,
                    password: hash
                });
                user.save().then(function () {
                    console.log(user);
                    res.json({ success: true })
                }).catch((error) => console.log(error));
            }
        })
    } else {
        console.log("This is an existing user : ", persistedUser[0].username)
        res.json({ message: " Sorry This UserName Already Exists." })

    }
})

app.post('/api/login', async (req, res) => {

    const username = req.body.username
    const password = req.body.password

    let user = await UserRepository.findByName(username)
    if (user[0] != null) {

        bcrypt.compare(password, user[0].password, (error, result) => {
            if (result) {
                const token = jwt.sign({ username: username, id: user[0]._id }, process.env.JWT_SECRET_KEY)
                res.json({ success: true, token: token, username: username })
            } else {
                res.json({ success: false, message: 'Not Authenticated' })
            }
        })
    } else {
        res.json({ message: "Username Incorrect" })
    }

})


//*******************Passport Serialize User***********************//

passport.serializeUser(function (user, done) {
    console.log("user.id from serializeUser", user.id), done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    //models.Users.findById(id, function(err, user) {
    done(null, id);
    // });
});

//*******************Google Strategy***********************//

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", 'https://www.googleapis.com/auth/gmail.readonly'] })
);
app.get(
    "/auth/google/callback",
    passport.authenticate("google", {

        failureRedirect: "http://127.0.0.1:3000/"
    }),
    function (req, res) {
        const token = jwt.sign({ username: req.user.displayName, id: req.user.id }, process.env.JWT_SECRET_KEY)
        res.cookie("jsonwebtoken", "Bearer " + token)

        res.cookie("id", req.user.id)
        res.cookie("name", req.user.displayName)
        res.redirect("http://127.0.0.1:3000/home")
    }
);
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://127.0.0.1:8001/auth/google/callback",
            passReqToCallback: true
        },
        //     function (accessToken, refreshToken, profile, done) {
        //         return done(null, profile,
        //             console.log(JSON.stringify(profile), 'AccessToken:', accessToken, 'Refresh Token:', refreshToken))
        //     }
        // ))
        async function (request, accessToken, refreshToken, profile, done) {
            const name = profile.displayName;
            const password = profile.id;
            const token = profile.accessToken;

            let persistedUser = await UserRepository.findByName(name)

            if (persistedUser[0] == null) {
                bcrypt.hash(password, salt, async (error, hash) => {
                    if (error) {
                        res.json({ message: "Something Went Wrong!!!" });
                    } else {
                        const user = new User({
                            username: name,
                            id: hash
                        });
                        let savedUser = await user.save();
                        if (savedUser != null) {
                            return done(
                                null,
                                profile,
                                console.log("new user was added by passport")
                            );
                        }
                    }
                });
            } else {
                console.log('res.json({ message: "Existing User" })');
                return done(
                    null,
                    profile,
                    token,
                    console.log("existing user was authenticated")
                );
            }
        }
    )
);

app.get('/api/portfolio', (req, res) => {
    const date = new Date().getDay()
    res.sendFile(__dirname + `/screenshots/status-pic${date}.png`)
});

app.get('/api/googlejobs', verifyJWT, (req, res) => {
    repository.findAllGoogle().then(function (jobs) {
        res.json({ isLoggedIn: true, jobs: jobs });
    }).catch((error) => console.log(error));
});


app.get('/api/linkedin-jobs', verifyJWT, (req, res) => {
    repository.findAllLinkedIn().then(function (jobs) {
        res.json({ isLoggedIn: true, jobs: jobs });
    }).catch((error) => console.log(error));
});


app.get('/api/linkedinjobs', verifyJWT, (req, res) => {
    linkedIn.getLinkedInJobs().then(function (info) {
        res.json({ isLoggedIn: true, info: info });
    });

})

app.get('/api/serpjobs', verifyJWT, (req, res) => {
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
        res.json({ isLoggedIn: true, jobs: myJobs });
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

app.get('/api/savedjobs', verifyJWT, (req, res) => {
    repository.findSaved().then(function (jobs) {
        res.json({ isLoggedIn: true, jobs: jobs });;
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