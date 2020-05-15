const read = require('./mysql')
const sql = require('../config/sqlMap')

const getArticlesList = function(values){
    let size = 10;
    if(values.pagesize){
        size = Number(values.pagesize);
    } 
    let head = (values.page <1 ? 1:values.page - 1)*size;
    if(values.hasOwnProperty('classid') && values.hasOwnProperty('labelid')){
        // classid 和 labelid 查询
        let arr = values.labelid.split(',')
        arr=arr.map((item)=>{
            return 'labelid='+item;
        })
        let insql = sql.Article.selectList + ' where classid='+values.classid+' and ('+arr.join(' or ')+') LIMIT '+head+','+size
        return read(insql)
    } else if(values.hasOwnProperty('classid')){
        //查询classid
        let insql = sql.Article.selectList + ' where classid='+values.classid+' LIMIT '+head+','+size
        return read(insql)
    } else if(values.hasOwnProperty('labelid')){
        //查询labelid
        let arr = values.labelid.split(',')
        arr=arr.map((item)=>{
            return 'labelid='+item;
        })
        let insql = sql.Article.selectList + ' where '+arr.join(' or ')+' LIMIT '+head+','+size
        return read(insql)
    } else {
        return read(sql.Article.selectList+' LIMIT '+head+','+size)
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
