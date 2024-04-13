const hash = require('crypto-js');
const mysql = require('../../data/mysql.js');
const auth = async (req, res) => {
    const data = req.body;
    const user = await mysql.Users.findOne({where: {login: data.login}});
    const password = hash.MD5(data.password).toString().toUpperCase();
    if(!data.login) return res.status(400).send({message: 'Поле логина пустое'});
    if(!data.password) return res.status(400).send({message: 'Поле пароля пустое'});
    if(!user) return res.status(400).send({message: 'Такого пользователя не существует'});
    if(user.password != password) return res.status(400).send({message: 'Пароль введен неверно'});
    req.session.User = {
        name: user.username,
        uuid: hash.MD5(`${user.username}, ${user.id}, ${user.login}`).toString(),
    };
    req.session.save();
    res.status(200).send();
}
module.exports = {auth}