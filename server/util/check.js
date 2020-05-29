const Promise = require("bluebird");
const jwt = require("jsonwebtoken");
const verify = Promise.promisify(jwt.verify);
const config = require('../config/default');
const openApiList = ['/api/login','/api/getArticle','/api/getArticleList','/api/getArticleTotle','/api/getLabelList']

async function check(ctx,next){

    if(openApiList.some((item)=>{return item == ctx.request.url.split('?')[0]})){
        await next();
        return;
    }

    const token = ctx.request.header['authorization'];
    if(!token){
        ctx.body ={
            error:401,
            msg:'非法访问！'
        }
        return;
    }
    try{
        let payload = await verify(token,config.secret);
        let {time , timeout } = payload;
        if(new Date().getTime() - time > timeout){
            ctx.body = {
                error:501,
                msg:'token过期了！'
            }
            return ;
        }
        await next();
    }catch(error){
        ctx.body = {
            error:500,
            msg:error.toString()
        }
    }
}

module.exports = check;
