module.exports = (app, passport, isLoggedIn, User, Note) => {
    require('./registration')(app, passport, User);
    require('./profile')(app, passport, isLoggedIn, User, Note);
}