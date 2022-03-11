app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "https://127.0.0.1:3000"
    }),
    function(req, res) {
      res.redirect("https://quizwiz.surge.sh/profile/" + req.user.displayName);
    }
  );
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://damp-spire-28696.herokuapp.com/auth/google/callback"
      },
      async function(request, accessToken, refreshToken, profile, done) {
        //     return done(null, profile,
        //       console.log(JSON.stringify(profile), 'AccessToken:', accessToken, 'Refresh Token:', refreshToken))
        //   }
        // ));
  
        const name = profile.displayName;
        const password = profile.id;
        const token = profile.accessToken;
  
        const persistedUser = await models.Users.findOne({
          where: {
            name: name
          }
        });
  
        if (persistedUser == null) {
          console.log("user");
          bcrypt.hash(password, salt, async (error, hash) => {
            console.log(hash);
            if (error) {
              res.json({ message: "Something Went Wrong!!!" });
            } else {
              const user = models.Users.build({
                name: name,
                password: hash,
                high_score: "0"
              });
  
              let savedUser = await user.save();
              if (savedUser != null) {
                console.log("{ success: true }");
  
                //res.json(profile);
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
  
            console.log("existing user was authenticated")
          );
        }
      }
    )
  );