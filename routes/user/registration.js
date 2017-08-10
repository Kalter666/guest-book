module.exports = (app, passport) => {
    app.get('/', function (req, res) {
        res.render('index', {
            user: req.user
        });
    });

    app.get('/login', function (req, res) {
        res.render('auth/login', { message: req.flash('loginMessage') });
    });

    app.get('/signup', function (req, res) {
        res.render('auth/signup', { message: req.flash('signupMessage') });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/signup', passport.authenticate('local-signup', {
        failureRedirect: '/signup',
        failureFlash: true
    }), (req, res) => {
        res.redirect('/profile/' + req.user.username);
    });

    app.post('/login', passport.authenticate('local-login', {
        failureRedirect: '/login',
        failureFlash: true
    }), (req, res) => {
        res.redirect('/profile/' + req.user.username);
    });
};