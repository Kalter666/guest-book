const Stop = require('./../../models/stop-words');

module.exports = (app, isLoggedIn, Note, User) => {
    app.get('/note/editor', isLoggedIn, (req, res) => {
        res.render('note/editor', {
            user: req.user,
            note: null,
            errorMessage: req.flash('error-message'),
            successMessage: req.flash('success-message')
        });
    });
//записать новую запись
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
                return res.redirect('/notes/1');
            });
        };

        function burst(arr1, arr2) {
            for (let i = 0; i < arr1.length; i++) {
                for (let j = 0; j < arr2.length; j++) {
                    if (arr1[i].stop_word === arr2[j].replace(/[^A-Za-zА-Яа-яЁё]/g, "").toLowerCase()) {
                        return req.flash('error-message', 'Не используй: ' + arr1[i].stop_word);
                    }
                }
            }
        }

        Stop.selectAll((err, words) => {
            if (err) {
                req.flash('error-message', 'Err: ' + err);
                return res.redirect('note/editor');
            } else if (!words[0]) {
                return add();
            }

            if (burst(words, titleWords))
                return res.redirect('note/editor');
            if (burst(words, textWords))
                return res.redirect('note/editor');
            return add();
        });
    });
//страница с 5 записями
    app.get('/notes/:username/:page', isLoggedIn, (req, res) => {
        User.selectByUsername(req.params.username, (err, user) => {
            if (err)
                return res.send(err);
            if (!user)
                return res.send('Нет такого пользователя');
            Note.selectForPage(user, req.params.page, (err, notes, pageCount) => {
                if (err)
                    return res.send(err);
                if (!notes[0])
                    notes = null;
                res.render('note/notes', {
                    user: req.user,
                    anotherUser: user,
                    notes: notes,
                    pageCount: pageCount
                });
            });
        });
    });
//добавить стоп слово
    app.post('/stop-word', isLoggedIn, (req, res) => {
        if (req.user.admin !== 1)
            return res.send('Ты не одмен');
        Stop.add(req.body.stopWord.toLowerCase(), (err) => {
            if (err) {
                return res.send(err);
            }
            return res.redirect('/profile/' + req.user.username);
        });
    });
// удалить запись
    app.post('/note/delete/:id', isLoggedIn, (req, res) => {
        Note.select(req.params.id, (err, note) => {
            if (err) {
                return res.send(err);
            }
            User.select(note.id_user, (err, user) => {
                if (err) {
                    return res.send(err);
                }
                if (req.user.admin !== 1 && user.username !== req.user.username) {
                    return res.send('не нарушай правила');
                }
                Note.delete(note, err => {
                    if (err) {
                        return res.send(err);
                    }
                    return res.redirect('/notes/' + user.username + '/1');
                });
            });
        });
    });

    //редактирование записи
    app.get('/note/edit/:id', isLoggedIn, (req, res) => {
        Note.select(req.params.id, (err, note) => {
            if (err) {
                return res.send(err);
            }
            User.select(note.id_user, (err, user) => {
                if (err) {
                    return res.send(err);
                }
                if (req.user.admin !== 1 && user.username !== req.user.username) {
                    return res.send('не нарушай правила');
                }
                res.render('note/editor', {
                    user: req.user,
                    note: note,
                    errorMessage: req.flash('error-message'),
                    successMessage: req.flash('success-message')
                });
            });
        });
    });

    //сохранить редактирование
    app.post('/note/edit/:id', isLoggedIn, (req, res) => {
        Note.select(req.params.id, (err, note) => {
            if (err && !note)
                return res.send('Нет такой записи');
            User.select(note.id_user, (err, user) => {
                if (err)
                    return res.send(err);
                if (user.username === req.user.username || (req.user.admin === 1)) {
                    const newNote = {
                        id: note.id,
                        id_user: note.id_user,
                        title: req.body.title,
                        text: req.body.text
                    };
                    Stop.selectAll((err, words) => {
                        function update() {
                            Note.update(newNote, err => {
                                if (err) {
                                    req.flash('error-message', err);
                                } else {
                                    req.flash('success-message', 'Сохранено успешно.');
                                }
                                return res.redirect('/note/edit/' + req.params.id);
                            });
                        }

                        function burst(arr1, arr2) {
                            for (let i = 0; i < arr1.length; i++) {
                                for (let j = 0; j < arr2.length; j++) {
                                    if (arr1[i].stop_word === arr2[j].replace(/[^A-Za-zА-Яа-яЁё]/g, "").toLowerCase()) {
                                        return req.flash('error-message', 'Не используй: ' + arr1[i].stop_word);
                                    }
                                }
                            }
                        }

                        if (err) {
                            req.flash('error-message', 'Err: ' + err);
                            return res.redirect('note/editor/' + note.id);
                        } else if (!words[0]) {
                            return update();
                        }
                        const titleWords = newNote.title.split(' ');
                        const textWords = newNote.text.split(' ');
                        if (burst(words, titleWords))
                            return res.redirect('/note/edit/' + req.params.id);
                        if (burst(words, textWords))
                            return res.redirect('/note/edit/' + req.params.id);
                        return update();
                    });
                } else
                    return res.send('У вас нет прав на редактирование');
            });
        });
    });
};