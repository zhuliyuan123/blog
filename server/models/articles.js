const read = require('./mysql')
const sql = require('../config/sqlMap')

const getArticlesList = function(values){
    if(values.hasOwnProperty('classid') && values.hasOwnProperty('labelid')){
        // classid 和 labelid 查询
        let arr = values.labelid.split(',')
        arr=arr.map((item)=>{
            return 'labelid='+item;
        })
        let insql = sql.Article.selectList + ' where classid='+values.classid+' and ('+arr.join(' or ')+')'
        return read(insql)
    } else if(values.hasOwnProperty('classid')){
        //查询classid
        let insql = sql.Article.selectList + ' where classid='+values.classid
        return read(insql)
    } else if(values.hasOwnProperty('labelid')){
        //查询labelid
        let arr = values.labelid.split(',')
        arr=arr.map((item)=>{
            return 'labelid='+item;
        })
        let insql = sql.Article.selectList + ' where '+arr.join(' or ')
        return read(insql)
    } else {
        return read(sql.Article.selectList)
    }
}
const getArticlesDetail = function(values){
    return read(sql.Article.select+' where id='+values);
}
const addArticles = function(values){
    return read(sql.Article.add,[values.classid,values.title,values.time,values.content,values.labelid])
}
const delArticles = function(values){
    return read(sql.Article.del+' where id='+values)
}
const updateArticle = function(values){
    return read(sql.Article.update,[values.title,values.time,values.content,values.classid,values.labelid,values.id])
}

module.exports = {
    addArticles,
    getArticlesList,
    getArticlesDetail,
    delArticles,
    updateArticle
}
