const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/users")
const models = require("../models");

//Called during login/sign up.
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
    
    

//called while after logging in / signing up to set user details in req.user
passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((obj, done) => {
    done(null, obj)
  })