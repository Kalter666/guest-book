module.exports = (app) => {
    app.get('*', (req, res, next) => {
        let err = new Error();
        err.status = 404;
        next(err);
    });
    app.use((err, req, res, next) => {
        if (err.status !== 404) {
            return next();
        }
        let user = null;
        if (req.user)
            user = req.user;
        res.render('error/error', {
            message: 'Bad Url',
            err: err.status,
            user: user
        });
    });
};