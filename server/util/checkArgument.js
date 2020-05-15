module.exports =  function checkArgument(obj,name,arr=[]){
    if(obj.hasOwnProperty(name)){
        arr.forEach(item => {
            if(item === obj[name]){
                return false;
            }
        });
        return true;

    }else{
        return false;
    }
}







