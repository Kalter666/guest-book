const User = require('./../models/user');
const Note = require('./../models/note');

module.exports = (app, passport) => {
    require('./user/index')(app, passport, isLoggedIn, User, Note);
    require('./note/index')(app, isLoggedIn, Note);
    require('./error/index')(app);
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}