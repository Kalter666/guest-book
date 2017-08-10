module.exports = (app, passport, isLoggedIn, User, Note) => {
    app.get('/profile/:username', isLoggedIn, (req, res) => {
        User.selectByUsername(req.params.username, (err, user) => {
            if (err)
                return res.send(err);
            else if (!user)
                return res.status(404).send('No user');
            else
                Note.selectByUser(user, (err, notes) => {
                    if (err)
                        return res.send(err);
                    if (!notes[0])
                        notes = null;
                    return res.render('user/profile', {
                        user: req.user,
                        anotherUser: user,
                        notes: notes
                    });
                });
        });
    });
    app.get('/settings', isLoggedIn, (req, res) => {
        res.render('user/settings', {
            user: req.user,
            successMessage: req.flash('successMessage'),
            errorMessage: req.flash('errorMessage')
        });
    });
};