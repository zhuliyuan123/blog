const mysql = require('mysql');
const config = require('../config/default')


const pool = mysql.createPool({
    host     : config.database.HOST,
    user     : config.database.USERNAME,
    password : config.database.PASSWORD,
    database : config.database.DATABASE
})

/**
 * @msg: 链接数据库，通过sql，获取数据
 * @param {sql:string,values:any} 
 * @return promise
 */
module.exports = function(sql,values){
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return;
            }
            connection.query(sql,values,(err,rows) =>{
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
                connection.release();
            })
        })
    })
}