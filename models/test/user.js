const User = require('./../user');

module.exports = {
    userTest: () => {
        // test for add user
        const add = new Promise((resolve, reject) => {
            const newUser = {
                username: 'Vlad654fghj2348fgh7j',
                pass: '123'
            };
            User.add(newUser, err => {
                if (err) reject('User test: Не добавляется пользователь! ' + err);
                resolve(null);
            })
        });
        // test for select user by username
        const selectByUsername = new Promise((res, rej) => {
            const username = 'Vlad654fghj2348fgh7j';
            User.selectByUsername(username, (err, user) => {
                if (err) rej('User test: Не ищет пользоваетля! ' + err);
                res(user);
            })
        })
    }
};