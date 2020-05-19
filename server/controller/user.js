const checkArgument = require('../util/checkArgument')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const config =  require('../config/default')

const login = async(ctx,next) => {
    const data = ctx.request.body;
    if(!checkArgument(data,'name') || !checkArgument(data,'password')){
        ctx.body = {
            error:400,
            msg:'传入的参数有误！'
        }
        return;
    }
    try{
        const result = await userModel.login(data.name);
        if(result.length == 0 ){
            ctx.body = {
                error:404,
                msg:'用户名不存在！'
            }
        } else {
            const token = jwt.sign({name:data.name,time:new Date().getTime(),timeout:1000*60*60*24},config.secret)
            if(result[0].password === data.password){
                ctx.body = {
                    error:0,
                    msg:'登录成功！',
                    data:token
                }
            }else{
                ctx.body = {
                    error:404,
                    msg:'密码错误！'
                }
            }
        }
    }catch(err){
        ctx.body = {
            error:500,
            msg:err.toString()
        }
    }  
}





module.exports= {
    login
}