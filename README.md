# test.aton

## DEMO: <a href="https://test.rimworlda.ru">CLICK</a>

Для запуска потребуется:

`Node.JS, npm, pm2(на сервере)` либо просто можно использовать `node название.файла`

Библиотеки: vue, vue-router, express, crypto-js, axios, body-parser, sequelize, mysql2

```
npm i express express-sessions crypto-js axios body-parser sequelize mysql2
```

Cервер полностью на node.js

nginx настройки
```nginx
    location = / {
        return 301 /auth;
    }
    location ~^ /server {
        deny all;
        return 404;
    }
    location ~^ /data {
        deny all;
        return 404;
    }
    location ~^ /testaton.js {
        deny all;
        return 404;
    }
```
Порт сервера: `5220`, соответственно в nginx его тоже надо установить!!!
```JavaScript
app.listen(5220)
```
Сайт успешно будет работать и на `https` протоколе.

Последний штрих: компилируем код через vite и грузим на домен.
```
npm run build
```
Создаем файл в data `data.json` с данными:
```json
{
    "database": {
        "db_name": "", // название базы данных
        "db_usr_name": "", // имя пользователя от базы
        "db_pass": "" // пароль
    },
    "cookies": {
        "secret": "" // секретный ключ для сессий, можно сгенерировать, можно самому написать
    }
}
```

Вместе с ним грузим папку "server", "data" и файл testaton.js

Готово, заранее скажу, что написанное выше не 100% гарантирует запуск сайта, тут я расписал лишь то, что нужно обязательно для запуска, но если что-то упустил, значит будьте внимательнее =D
