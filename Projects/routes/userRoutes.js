const express = require("express")
const router = express.Router()
const User = require("../models/users")
const models = require("../models");
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../authenticate")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt
const salt = 10;

router.post("/api/register", async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const token = req.body.token;
    const refreshToken = req.body.refreshToken;
  
  
    const persistedUser = await models.Users.findOne({
      where: {
        name: userName
      }
    });
    console.log("new user comin thru")
    if (persistedUser == null) {
      bcrypt.hash(password, salt, async (error, hash) => {
        console.log(hash);
        if (error) {
          res.json({ message: "Something Went Wrong!!!" });
        } else {
          const user = models.Users.build({
            name: userName,
            password: hash,
            token: token,
            spare_one: refreshToken 
          });
  
          let savedUser = await user.save();
          if (savedUser != null) {
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
            
            res.json({ success: true ,token: token});
          }
        }
      });
    } else {
      res.json({ message: " Sorry This UserName Already Exists." });
    }
  });

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
          //res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
          //es.send({ success: true, token })
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