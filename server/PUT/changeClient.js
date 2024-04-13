const mysql = require('../../data/mysql.js');
const changeclient = async (req, res) => {
    const data = req.body;
    const client = await mysql.Clients.findOne({where: {number: data.client.number}});
    client.update({ status: data.status });
    return res.status(200).send({message: 'Статус изменен'});
}
module.exports = {changeclient}