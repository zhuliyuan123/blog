const read = require('./mysql')
const sql = require('../config/sqlMap')

const getClassList = function(){
    return read(sql.Class.select)
}

const addClass = function(values){
    return read(sql.Class.add,[values.classname])
}

const delClass = function(values){
    return read(sql.Class.del+' where id='+values)
}

const delClassLabel = function(values){
    return read(sql.Label.del+' where classid='+values)
}

const updateClass = function(values){
    return read(sql.Class.update,[values.classname,values.id]);
}



module.exports = {
    getClassList,
    addClass,
    delClass,
    updateClass,
    delClassLabel
}