const mysql = require('../../data/mysql.js');
const getclients = async (req,res) => {
    const username = req.session.User.name;
    const clientlist = await mysql.Clients.findAll({where: {nameresponsible: username}});
    if(!clientlist) return res.status(400).send({message: null})
    return res.status(200).send({clientlist});
}
module.exports = {getclients};