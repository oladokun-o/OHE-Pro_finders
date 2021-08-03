const db = require('../config/index').get(process.env.NODE_ENV);
var fs = require('fs');
var handlebars = require('handlebars');
var path = require('path')
const app = require('../server/index')

module.exports = {
    getChat: async (req, res) => {
        fs.readFile('./views/chat.html', { encoding: 'utf-8' }, function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                //username: user.firstname + ' ' + user.lastname,
                link: 'link',
            };
            var pugToSend = template(replacements);
            var options = {
                root: path.join(__dirname, '../views'),
            }
            return res.status(200).sendFile('chat.html', options, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('sent')
                }
            })//.status(200).json({ msg: 'awesome', file: pugToSend })
        })
    }
}