const config = require(__dirname + './../config/db'),
    mysql = require('mysql'),
    pool = mysql.createPool(config);

module.exports = {
    request: (query, inserts, callback) => {
        if (inserts) {
            query  = mysql.format(query, inserts);
        }
        pool.getConnection( (err, conn) => {
            conn.query(query, (err, rows) => {
                conn.release();
                if (err) {
                    return callback(err);
                }
                return callback(null, rows);
            });
        });
    }
};