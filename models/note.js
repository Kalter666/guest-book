const DB = require('./db');

module.exports = {
    delete: (note, callback) => {
        const query = 'DELETE FROM `note` WHERE `id` = ? limit 1'; // del 1 note
        const inserts = [note.id];
        DB.request(query, inserts, (err) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    select: (id, callback) => {
        const query = 'SELECT * FROM `note` WHERE `id` = ? limit 1'; // select 1 note by id
        const inserts = [id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            if (!rows[0]) return callback(err, false);
            const user = rows[0];
            return callback(err, user);
        });
    },
    selectByTitle: (title, callback) => {
        const query = 'SELECT * FROM `note` WHERE `title` = ? limit 1'; // select 1 note by title
        const inserts = [title];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            if (!rows[0]) return callback(null, false);
            return callback(err, rows[0]);
        });
    },
    update: (note, callback) => {
        let query = 'UPDATE `note` SET'; // update note
        const inserts = [];
        const queryIns = [];
        if (note.id_user) {
            inserts.push(note.id_user);
            queryIns.push('`id_user` = ?');
        }
        if (note.title) {
            inserts.push(note.title);
            queryIns.push('`title` = ?');
        }
        if (note.text) {
            inserts.push(note.text);
            queryIns.push('`title` = ?')
        }
        inserts.push(note.id);
        query += queryIns.join(', ') + ' WHERE `id` = ? limit 1';

        DB.request(query, inserts, err => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    selectByUser: (user, callback) => {
        const query = 'SELECT * FROM `note` WHERE `id_user` = ? ORDER BY `create` DESC LIMIT 5';
        const inserts = user.id;
        DB.request(query, inserts, (err, rows) => {
            if (err)
                return callback(err);
            return callback(null, rows);
        })
    },
    add: (note, user, callback) => {
        const query = 'INSERT INTO `note` (`id`, `id_user`, `title`, `text`,`create`)' +
            "VALUES (NULL, ?, ?, ?, NULL)";
        const inserts = [user.id, note.title, note.text];
        DB.request(query, inserts, (err) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    selectForPage: (user, callback) => {
        const query = 'SELECT * FROM `note` WHERE `id_user` = ? ORDER BY `create` DESC LIMIT 5';
        const inserts = user.id;
        DB.request(query, inserts, (err, rows) => {
            if (err)
                return callback(err);
            return callback(null, rows);
        })
    },
};