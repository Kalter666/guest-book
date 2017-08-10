const DB = require('./db');

module.exports = {
    delete: (word, callback) => {
        const query = 'DELETE FROM `stop-word` WHERE `id` = ? limit 1'; // del 1 note
        const inserts = [word.id];
        DB.request(query, inserts, (err) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    select: (id, callback) => {
        const query = 'SELECT * FROM `stop-word` WHERE `id` = ? limit 1'; // select 1 note by id
        const inserts = [id];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            if (!rows[0]) return callback(err, false);
            return callback(err, rows[0]);
        });
    },
    selectByTitle: (title, callback) => {
        const query = 'SELECT * FROM `stop-word` WHERE `title` = ? limit 1'; // select 1 note by title
        const inserts = [title];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            if (!rows[0]) return callback(null, false);
            return callback(err, rows[0]);
        });
    },
    update: (word, callback) => {
        let query = 'UPDATE `stop-word` SET'; // update note
        const inserts = [];
        const queryIns = [];

        if (word.stop_word) {
            inserts.push(word.stop_word);
            queryIns.push('`stop_word` = ?');
        }

        inserts.push(word.id);
        query += queryIns.join(', ') + ' WHERE `id` = ? limit 1';

        DB.request(query, inserts, err => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    add: (word, callback) => {
        const query = 'INSERT INTO `stop-word` (`id`, `stop_word`)' +
            "VALUES (NULL, ?)";
        DB.request(query, word, (err) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    selectAll: callback => {
        const query = 'SELECT * FROM `stop-word`';
        const inserts = [];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            return callback(null, rows);
        });
    }
};