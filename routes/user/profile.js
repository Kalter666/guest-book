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

    app.post('/settings', isLoggedIn, (req, res) => {
        if (!req.body.pass && !req.body.username) {
            req.flash('error-message', 'Хотя бы одно поле должно быть заполненным!');
            return res.redirect('/settings');
        }
        const newInfo = {
            id: req.user.id,
            username: req.body.username,
            pass: req.body.pass,
            admin: req.user.admin
        };

        User.update(newInfo, err => {
            if (err){
                req.flash('errorMessage', 'try again \r\n' + err);
                return res.redirect('/settings');
            }
            req.flash('successMessage', 'Successfully updated!');
            res.redirect('/settings');
        })
    });

    app.post('/deleteuser', isLoggedIn, (req, res) => {
        User.delete(req.user, (err) => {
            if (err) {
                req.flash('errorMessage', 'Sorry, try again later. Error:' + err);
                res.redirect('/settings');
            }
            res.redirect('/logout');
        });
    });
};