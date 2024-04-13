//*********************************************//
//  _ __    ___  ____ _   _  _ __ ___    __ _  //
// |  _ \  / _ \|_  /| | | ||  _   _ \  / _  | //
// | | | ||  __/ / / | |_| || | | | | || (_| | //
// |_| |_| \___|/___| \____||_| |_| |_| \____| //
//                                             //
//*********************************************//

const express = require('express'); // express, нужен для API
const sessions = require('express-session'); // для сессий (куки там и сохранение авторизации)
const fs = require('fs'); // файловая система
const path = require('path'); // для файловой системы
const app = express(); // Инициализация
const bodyParser = require('body-parser'); // Парсер http запросов

// middleware
app.set('trust proxy', 1);
app.use(express.static(path.join(__dirname, './')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// подключение запросов
const { auth } = require('./server/POST/auth');
const { getclients } = require('./server/GET/getClients');
const { changeclient } = require('./server/PUT/changeClient');
const { pages } = require('./server/GET/pages');

// для сессий
const readFile = fs.readFileSync('./data/data.json', 'utf8');
const parsedData = JSON.parse(readFile);

// куки
app.use(sessions({
    secret: parsedData.cookies.secret,
    cookie: { 
        secure: true, 
        maxAge: 86400000, 
        httpOnly: true,
        domain: 'test.rimworlda.ru',
        path: '/'
    },
    resave: false,
    saveUninitialized: false,
}));

// get запрос для получения списка страниц
app.get('/:page', pages);

// post запрос для авторизации
app.post('/api/users/login', auth);

// get запрос для получения списка клиентов
app.get('/api/clients', getclients);

// put запрос для обновления клиентов(ну их статуса)
app.put('/clients/update', changeclient);

// порт на котором будет запускаться сервер
app.listen(5180);   