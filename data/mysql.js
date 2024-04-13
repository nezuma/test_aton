const fs = require('fs');
const readFile = fs.readFileSync('./data/data.json', 'utf8');
const parsedData = JSON.parse(readFile);
const { Sequelize, DataTypes, QueryTypes,Op } = require('sequelize');
const sequelize = new Sequelize(parsedData.database.db_name, parsedData.database.db_usr_name, parsedData.database.db_pass, {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    logging: false
});
const queryInterface = sequelize.getQueryInterface();
sequelize.authenticate().then(() => {
    console.info('Подключение к DataBase.');
}).catch(err => {
    console.fatal(`Ошибка database:\nCode: ${err.parent.code}\nMessage: ${err.parent.sqlMessage}`);
    process.exit(1);
});
const Users = sequelize.define('Users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    login: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});
const Clients = sequelize.define("Clients", {
    number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    surename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    patronymic: {
        type: DataTypes.STRING,
        allowNull: true
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    },
    inn: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nameresponsible: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Не в работе'
    } 
}, {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});
let force = false;
let alter = false;
Users.sync({force: force, alter: alter});
Clients.sync({force: force, alter: alter});
module.exports = {Op,Sequelize,QueryTypes,DataTypes,sequelize,queryInterface,Users,Clients}