const LocalStrategy   = require('passport-local').Strategy;
const Usermodel       = require('./../models/user');

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Usermodel.select(id, function(err, user) {
            if (err) return done(err);
            done(null, user);
        });
    });

    // sing up new user
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            process.nextTick(() => {
                Usermodel.selectByUsername(username, (err, user) => { // ищем пользователя, если такой уже
                    // есть, просим придумать новое имя
                    if (err)
                        return done(err);
                    if (user.username === username) {
                        return done(null, false, req.flash('signupMessage', 'Такой пользователь уже есть!'));
                    } else {
                        const newUser = {
                            username: username,
                            pass: password
                        };
                        // save the user
                        Usermodel.add(newUser, (err) =>  {
                            if (err){
                                return done(null, false, req.flash('signupMessage', 'Что-то пошло не так, попробуйте' +
                                    ' снова.'));
                            }
                            Usermodel.selectByUsername(newUser.username, (err, user) => {
                                if (err) return done(err);
                                return done(null, user);
                            });
                        });
                    }
                });
            });
        }));
    // локальная авторизация
    passport.use('local-login', new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        (req, username, password, done) => { // callback with email and password from our form

            // ищем зарегестрированного пользователя
            Usermodel.selectByUsername(username, (err, user) => {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);
                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'Такого пользователя нет!')); // req.flash is
                // the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (password != user.pass)
                    return done(null, false, req.flash('loginMessage', 'Неправильный пароль!')); // create the
                // loginMessage and save it to session as flashdata
                // all is well, return successful user
                return done(null, user);
            });
        }));
};