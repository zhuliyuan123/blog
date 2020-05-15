const checkArgument = require('../util/checkArgument')
const labelModel = require('../models/label')

const getLabelList = async(ctx,next) =>{
    try{
        const result = await labelModel.getLabelList();
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

const addLabel = async(ctx,next) =>{
    const data = ctx.request.body;
    if(!checkArgument(data,'labelname')||!checkArgument(data,'classid')){
        ctx.body = {
            error:400,
            msg:'传入的参数有误！'
        }
        return;
    }
    try{
        const result = await labelModel.addLabel(data)
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

const delLabel = async(ctx,next)=>{
    const data = ctx.request.body;
    if(!checkArgument(data,'id')){
        ctx.body = {
            error:400,
            msg:'传入的参数有误！'
        }
        return;
    }
    try{
        const result = await labelModel.delLabel(data.id)
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

const updateLabel = async(ctx,next)=>{
    const data = ctx.request.body;
    if(!checkArgument(data,'id')||!checkArgument(data,'labelname'||!checkArgument(data,'classid'))){
        ctx.body = {
            error:400,
            msg:'传入的参数有误！'
        }
        return;
    }
    try{
        const result = await labelModel.updateLabel(data)
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
    getLabelList,
    addLabel,
    delLabel,
    updateLabel

}