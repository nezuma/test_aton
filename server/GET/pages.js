const path = require('path');
const temp = path.join(__dirname, '../../index.html');

const pages = (req, res) => {
    switch(req.params.page) {
        case 'auth': 
            if (req.session && req.session.User) return res.redirect('/main');
            res.sendFile(temp);
            break;
        case 'main':
            if (req.session && !req.session.User) return res.redirect('/auth');
            res.sendFile(temp);
            break;
    }
}
module.exports = {pages}