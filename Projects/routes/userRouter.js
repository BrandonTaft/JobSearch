const express = require("express")
const router = express.Router()
const User = require("../models/user")
const passport = require("passport")
const models = require("../models");
const bcrypt = require("bcryptjs");
const salt = 10;

const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../authenticate")



router.post('/api/login',
  passport.authenticate('local'),
  function (req, res) {
    // If this function gets called, authentication was successful.
    // To Access specific user info use- req.user.high_score
    console.log("User was Authenticated", "User:",req.user)
    res.redirect('http://localhost:3000');
  });

// app.post('/api/login', passport.authenticate('local', {
//   successRedirect: 'http://google.com',
//   failureRedirect: '/login',
//   failureFlash: true,
// }));

passport.use(new LocalStrategy(
  async function (username, password, done) {

    let user = await (models.Users.findOne({
      where: {
        name: username
      }
    }));

    if (user != null) {
      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          const token = jwt.sign({ name: username }, process.env.JWT_SECRET_KEY);

          console.log("WE GOOD", token)
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
          res.send({ success: true, token })
          return done(null, user)
            ;
        } else {
          console.log("WE NOT GOOD")
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    } else {
      console.log("WE REALLY NOT GOOD")
      return done(null, false, { message: 'Incorrect username.' });

    }
  }));

module.exports = router