const express            = require('express');
const template           = require('consolidate');
const bodyParser         = require('body-parser');
const passport           = require('passport');
const flash              = require('connect-flash');
const cookieParser       = require('cookie-parser');
const cookieSession      = require('cookie-session');

const port = process.env.port || 3000;

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()); // для чтения json
// подключение модуля для рендера представлений
app.engine('pug', template.pug);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(flash());

app.use(cookieParser()); // для чтения кук
// конфигурация кук
app.use(cookieSession({
    name: 'session',
    keys: ['secret'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
// подключаем статичные файлы
app.use(express.static(__dirname + '/public'));
// подключаем конфигурации пасспорта
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);
require('./routes/index')(app, passport);

app.listen(port);
console.log('server start at 3000');