<template>
<div>
    <Header :showback="true"></Header>
    <div class="main">
        <div class="title">{{title}}</div>
        <div class="time">{{changeTime(time)}}</div>
        <div class="content">
            <MarkdownPreview :initialValue="content" theme="dark"></MarkdownPreview>
        </div>
    </div>
    <Foot></Foot>
    
</div>
</template>

<script>
import Header from '../../components/Header'
import {MarkdownPreview } from 'vue-meditor'
import Foot from '../../components/Foot'
export default {
    components:{
        Header,
        Foot,
        MarkdownPreview
    },
    async asyncData ({app,params}) {
        let json = {id:params.id}
        try{
            const res = await app.$axios.get(`/getArticle`,{params:json})
            return {id:res.data.data.id,title:res.data.data.title,time:res.data.data.time,content:res.data.data.content}
        }catch(error){
            console.log(error)
        }
    },
    head(){
        return {
            title:`竹立站-${this.title}`,
            meta:[
                { charset:'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: `朱笠源;个人博客;前端;${this.title}`}
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
            ]
        }
            
    },
    methods:{
        changeTime(n){
            let data = new Date(n*1000)
            let year = data.getFullYear();
            let month = data.getMonth() + 1 < 10 ? '0'+data.getMonth() : data.getMonth();
            let day = data.getDate() + 1 <10 ? '0'+data.getDate() : data.getDate();
            return year+'-'+month+'-'+day
        },
    }
    
}
</script>
<style lang="scss" scoped>
.main{
    margin-top: 100px;
    background-color: white;
    .title{
        width: 600px;
        margin: 0 auto 0 auto;
        padding-top: 40px;
        font-size: 40px;
        text-align: center;
    }
    .time{
        width: 600px;
        margin: 30px auto 0 auto;
        font-size: 30px;
        text-align: center;

    }
    .content{
        width: 690px;
        margin: 10px auto  20px auto;
        background-color: white;
    }
}
@media screen and (min-width: 768px) {
    .main{
      width: 750Px;
      margin: 0 auto 0 auto;
      margin-top: 100px;
      .content{
          width: 690Px;
          margin: 10Px auto  20Px auto;
          background-color: white;
      }
    }
}
</style>
