const read = require('./mysql')
const sql = require('../config/sqlMap')

const getLabelList = function(values){
    return read(sql.Label.select+' where classid='+values)
}

const addLabel = function(values){
    return read(sql.Label.add,[values.labelname,values.classid])
}

const delLabel = function(values){
    return read(sql.Label.del+' where id='+values)
}

const updateLabel = function(values){
    return read(sql.Label.update,[values.labelname,values.classid,values.id]);
}



module.exports = {
    getLabelList,
    addLabel,
    delLabel,
    updateLabel
}