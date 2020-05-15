const checkArgument = require('../util/checkArgument')
const articlesModel = require('../models/articles')

const getArticlesList = async(ctx,next) =>{
    
    const data =  JSON.parse(JSON.stringify(ctx.request.query));
    if((!checkArgument(data,'classid') && !checkArgument(data,'labelid') ) || !checkArgument(data,'page')){
        ctx.body = {
            error:400,
            msg:'传入的参数有误！'
        }
        return;
    }
    try{
        const result = await articlesModel.getArticlesList(data);
        ctx.body = {
            error:0,
            msg:'查询成功',
            data:result
        }
    }catch(err){
        ctx.body = {
            error:500,
            msg:err.toString()
        }
    }
}


const getArticle = async (ctx,next)=>{
    const data = ctx.request.query;
    if(!checkArgument(data,'id')){
        ctx.body = {
            error:400,
            msg:'传入的参数有误！'
        }
        return;
    }
    try{
        const result = await articlesModel.getArticlesDetail(data.id);
        if(result.length){
            ctx.body = {
                error:0,
                msg:'查询成功！',
                data:result[0],
            }
        }else{
            ctx.body = {
                error:404,
                msg:'文章不存在！'
            }
        }
        

    }catch(error){
        ctx.body = {
            error:500,
            msg:error.toString()
        }
    }
}

const addArticle = async(ctx,next)=>{
    const data = ctx.request.body;
    if(!checkArgument(data,'title')||!checkArgument(data,'content')||!checkArgument(data,'classid')||!checkArgument(data,'labelid')||!checkArgument(data,'time')){
        ctx.body = {
            error:400,
            msg:'传入的参数有误！'
        }
        return;
    }
    try{
        const result = await articlesModel.addArticles(data);
        if(result){
            ctx.body = {
                error:0,
                msg:'增加成功'
            }
        }
        
    }catch(error){
        ctx.body = {
            error:500,
            msg:error.toString()
        }
    }
}

const delArticle = async(ctx,next)=>{
    const data = ctx.request.body;
    if(!checkArgument(data,'id')){
        ctx.body = {
            error:400,
            msg:'传入的参数有误！'
        }
        return;
    }
    try{
        const result = await articlesModel.delArticles(data.id)
        if(result){
            ctx.body = {
                error:0,
                msg:'删除成功！'
            }
        }
    }catch(error){
        ctx.body = {
            error:500,
            msg:error.toString()
        }
    }
}

const updateArticle = async (ctx,next)=>{
    const data = ctx.request.body;
    if(!checkArgument(data,'title')||!checkArgument(data,'content')||!checkArgument(data,'classid')||!checkArgument(data,'labelid')||!checkArgument(data,'time')||!checkArgument(data,'id')){
        ctx.body = {
            error:400,
            msg:'传入的参数有误！'
        }
        return;
    }
    try{
        const result = await articlesModel.updateArticle(data)
        if(result){
            ctx.body = {
                error:0,
                msg:'修改成功！'
            }
        }
    }catch(error){
        ctx.body = {
            error:500,
            msg:error.toString()
        }
    }
}



module.exports = {
    getArticlesList,
    getArticle,
    addArticle,
    delArticle,
    updateArticle
    
}