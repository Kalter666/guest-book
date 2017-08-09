const DB = require(__dirname + './db');

module.exports = {
    delete: (user, callback) => {
        const query = 'DELETE FROM `user` WHERE `id` = ? limit 1'; // del 1 user
        const inserts = [user.id];
        DB.request(query, inserts, (err) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    select: (id, callback) => {
        const query = 'SELECT * FROM `user` WHERE `id` = ? limit 1'; // select 1 user by id
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
    selectByUsername: (username, callback) => {
        const query = 'SELECT * FROM `user` WHERE `username` = ? limit 1'; // select 1 user by username
        const inserts = [username];
        DB.request(query, inserts, (err, rows) => {
            if (err) {
                return callback(err);
            }
            if (!rows[0]) return callback(null, false);
            return callback(err, rows[0]);
        });
    },
    update: (user, callback) => {
        let query = 'UPDATE `user` SET'; // update user params
        const inserts = [];
        const queryIns = [];
        if (user.pass) {
            inserts.push(user.pass);
            queryIns.push('`pass` = ?');
        }
        if (user.username) {
            inserts.push(user.username);
            queryIns.push('`username` = ?');
        }
        if (user.admin) {
            inserts.push(user.admin);
            queryIns.push('`admin` = ?')
        }
        query += queryIns.join(', ') + ' WHERE `id` = ? limit 1';
        inserts.push(user.id);
        DB.request(query, inserts, err => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    add: (user, callback) => {
        const query = 'INSERT INTO `user` (`id`, `username`, `pass`, `admin`,`create`)' +
            "VALUES (NULL, ?, ?, 0, NULL)";
        const inserts = [user.username, user.pass];
        DB.request(query, inserts, (err) => {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    }
};