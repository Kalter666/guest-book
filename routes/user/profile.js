module.exports = (app, passport, isLoggedIn, User, Note) => {
    app.get('/profile/:username', isLoggedIn, (req, res) => {
        const you = req.params.username === req.user.username;
        User.selectByUsername(req.params.username, (err, user) => {
            if (err)
                return res.send(err);
            else if (!user)
                return res.status(404).send('No user');
            else
                Note.selectByUser(user, (err, notes) => {
                    if (err)
                        return res.send(err);
                    return res.render('user/profile', {
                        user: req.user,
                        anotherUser: user,
                        notes: notes
                    });
                });
        });
    });
}