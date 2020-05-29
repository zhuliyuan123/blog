<template>
<div>
    <Header :showback="true"></Header>
    <div class="main">
        <div class="label-content ls" style="position:fixed;" >
        <div class="label-item" :class="{active:labelid.includes(item.id)}" @click="choose(item.id)" v-for="item in labelList" :key="item.id">{{item.labelname}}</div>
        </div>
        <div class="label-content" style="visibility:hidden;">
            <div class="label-item" :class="{active:labelid.includes(item.id)}" @click="choose(item.id)" v-for="item in labelList" :key="item.id">{{item.labelname}}</div>
        </div>
        <div class="list-content">
            <div class="list-content-item" v-for="item in artList" :key="item.id">
                <div class="title">{{item.title}}</div>
                <div class="item-foot">{{changeTime(item.time)}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Header from '../../components/Header'
import Axios from 'axios'
export default {
    async asyncData ({app,params}) {
        let json = {classid:params.id}
        let jsonArt = {classid:params.id,page:1,pagesize:10} 
        try{
            const res = await app.$axios.get(`/getLabelList`,{params:json})
            const resArt = await app.$axios.get(`/getArticleList`,{params:jsonArt})
            return {labelList:res.data.data,artList:resArt.data.data}
        }catch(error){
            console.log(error)
        }
    },
    data(){
        return{
            labelid:[]
        }
    },
    methods:{
        choose(n){
            if(this.labelid.indexOf(n) === -1){
                this.labelid.push(n);
            }else{
                this.labelid.splice(this.labelid.indexOf(n),1)
            }
            this.getList(this.labelid,1)
        },
        changeTime(n){
            let data = new Date(n*1000)
            let year = data.getFullYear();
            let month = data.getMonth() + 1 < 10 ? '0'+data.getMonth() : data.getMonth();
            let day = data.getDate() + 1 <10 ? '0'+data.getDate() : data.getDate();
            return year+'-'+month+'-'+day
        },
        async getList(arr,page){
            let json = {}
            if(arr.length == 0){
                json= {
                    classid:this.$route.params.id,
                    page:page,
                    pagesize:10
                }
            }else{
                json= {
                    classid:this.$route.params.id,
                    page:page,
                    pagesize:10,
                    labelid:this.labelid.join(',')
                }
            }
            const res = await Axios.get('http://api.zhuliyuan123.com/api/getArticleList',{params:json});
            this.artList = res.data.data;
        }
    },
    components: {
        Header
    }
    

}
</script>
<style lang="scss" scoped>
.main{
    margin-top: 100px;
}
.ls{
    top:100px;
}
.label-content{
    padding: 20px 20px 20px 20px;
    width: 100%;
    background-color: white;
    display: flex;
    flex-wrap:wrap;

    .label-item{
        height: 70px;
        text-align: center;
        line-height: 70px;
        background-color:white;
        border: 1px solid #3d5581;
        color: #3d5581;
        border-radius:  5px;
        margin: 10px 10px 10px 10px;
        padding: 0 20px 0 20px;
    }
    .active{
        background-color: #3d5581;
        color:white;
    }

    
}
.list-content{
    width: 100%;
    .list-content-item{
        width: 90%;
        border-radius: 20px;
        margin: 20px auto 0 auto;
        background-color: white;
        .title{
            font-size: 36px;
            font-weight: 500;
            padding: 10px 10px 0 20px;
            word-break:break-all;
        }

        .item-foot{
            margin-top: 30px;
            margin-left: 20px;
            display: flex;
            padding-bottom: 20px;
        }
    }
}
</style>