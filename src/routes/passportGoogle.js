const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "65394186998-mpiojhdtfsb733917i1mjf92eoc2nrqn.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const { id, displayName, emails } = profile;

        // Buscar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ username: id });

        if (existingUser) {
          // Si el usuario ya existe, devuelve el usuario encontrado
          return done(null, existingUser);
        }

        // Si no existe, crea un nuevo usuario con más detalles
        const newUser = new User({
          username: id,
          password: accessToken,
          name: displayName,
          email: emails && emails.length > 0 ? emails[0].value : null, // Obtener el primer email (si existe)
        });

        await newUser.save();

        // Devuelve el perfil del usuario recién creado
        return done(null, newUser);
      } catch (error) {
        return done(error); // Manejo de errores
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
