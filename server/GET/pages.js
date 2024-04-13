const path = require('path');
const temp = path.join(__dirname, '../../index.html');

const pages = (req, res) => {
    switch(req.params.page) {
        case 'auth': 
            res.sendFile(temp);
            break;
        case 'main':
            res.sendFile(temp);
            break;
    }
}
module.exports = {pages}