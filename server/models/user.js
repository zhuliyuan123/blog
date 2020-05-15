const read = require('./mysql')
const sql = require('../config/sqlMap')


const login =  function (values){
    return read(sql.User.select+` where name = ${values}`);
}


module.exports = {
    login
}