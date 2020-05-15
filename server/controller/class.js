const checkArgument = require('../util/checkArgument')
const classModel = require('../models/class')

const getClassList = async(ctx,next) =>{
    try{
        const result = await classModel.getClassList();
        ctx.body = {
            error:0,
            msg:'获取成功！',
            data:result
        }
    }catch(error){
        ctx.body = {
            error:500,
            msg:error.toString()
        }
    }
}

const addClass = async(ctx,next) =>{
    const data = ctx.request.body;
    if(!checkArgument(data,'classname')){
        ctx.body = {
            error:400,
            msg:'传入的参数有误！'
        }
        return;
    }
    try{
        const result = await classModel.addClass(data)
        if(result){
            ctx.body = {
                error:0,
                msg:'增加成功！'
            }
        }
    }catch(error){
        ctx.body = {
            error:500,
            msg:error.toString()
        }
    }
}

const delClass = async(ctx,next)=>{
    const data = ctx.request.body;
    if(!checkArgument(data,'id')){
        ctx.body = {
            error:400,
            msg:'传入的参数有误！'
        }
        return;
    }
    try{
        const result = await classModel.delClass(data.id)
        if(result){
            const res = await classModel.delClassLabel(data.id)
            if(res){
                ctx.body = {
                    error:0,
                    msg:'删除成功！'
                }
            }
        }
    }catch(error){
        ctx.body = {
            error:500,
            msg:error.toString()
        }
    }
}

const updateClass = async(ctx,next)=>{
    const data = ctx.request.body;
    if(!checkArgument(data,'id')||!checkArgument(data,'classname')){
        ctx.body = {
            error:400,
            msg:'传入的参数有误！'
        }
        return;
    }
    try{
        const result = await classModel.updateClass(data)
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
    getClassList,
    addClass,
    delClass,
    updateClass

}