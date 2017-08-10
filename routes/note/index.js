const Stop = require('./../../models/stop-words');

module.exports = (app, isLoggedIn, Note) => {
    app.get('/note/editor', isLoggedIn, (req, res) => {
        res.render('note/editor', {
            user: req.user,
            errorMessage: req.flash('error-message'),
            successMessage: req.flash('success-message')
        });
    });

    app.post('/note', isLoggedIn, (req, res) => {
        const note = {
            title: req.body.title,
            text: req.body.text
        };

        const titleWords = note.title.split(' ');
        const textWords = note.text.split(' ');
        const add = () => {
            Note.add(note, req.user, err => {
                if (err) {
                    req.flash('error-message', 'Err: ' + err);
                    return res.redirect('note/editor');
                }
                return res.redirect('/profile/' + req.user.username);
            });
        };

        Stop.selectAll((err, words) => {
            if (err) {
                req.flash('error-message', 'Err: ' + err);
                return res.redirect('note/editor');
            } else if (!words[0]) {
                return add();
            }

            function burst(arr1, arr2) {
                for (let i = 0; i < arr1.length; i++) {
                    for (let j = 0; j < arr2.length; j++) {
                        if (arr1[i] === arr2[j].replace(/[^A-Za-zА-Яа-яЁё]/g, "")) {
                            console.log(arr2[j].replace(/[^A-Za-zА-Яа-яЁё]/g, ""));
                            req.flash('error-message', 'Не используй: ' + arr[i]);
                            return res.redirect('note/editor');
                        }
                    }
                }
            }

            burst(words, titleWords);
            burst(words, textWords);

            add();
        });
    });

    app.get('/notes/:page', isLoggedIn, (req, res) => {
        Note.selectForPage(req.user, req.params.page, (err, notes, pageCount) => {
            if (err)
                return res.send(err);
            if (!notes[0])
                notes = null;
            res.render('note/notes', {
                user: req.user,
                notes: notes,
                pageCount: pageCount
            });
        });
    });
};