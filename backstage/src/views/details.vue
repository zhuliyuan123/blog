<template>
<div class="detail">
    <div class="title">{{title}}</div>
    <div class="time">{{showTime}}</div>
    <MarkdownPreview  theme="dark" class="content" :initialValue="content"></MarkdownPreview>
</div>
</template>

<script>
import {MarkdownPreview } from 'vue-meditor'
export default {
    name:'detail',
    data(){
        return{
            id:0,
            title:'',
            content:'',
            time:'',
        }
    },
    components:{
        MarkdownPreview
    },
    created () {
        this.id = this.$route.params.id;
        this.getDetails();
    },
    computed: {
        showTime(){
            const t = new Date(this.time*1000);
            return t.getFullYear()+'-'+t.getMonth()+'-'+t.getDate()
        }
    },
    methods: {
        async getDetails(){
            try{
                const result = await this.$http.article.getArticle({
                    id:this.id
                })
                this.title = result.data.title;
                this.content =result.data.content;
                this.time = result.data.time;
            }catch(error){
                console.log(error)
            }
        }
    }

}
</script>
<style lang="scss" scoped>
.detail{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .title{
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        height: 30px;
        line-height: 30px;
    }
    .time{
        height: 30px;
        padding-top: 20px;
        text-align: center;
        padding-bottom: 20px;
        line-height: 30px;
    }
    .content{
        width: 800px;
        flex: 1;
        overflow: auto;
        margin: 0px auto 0px auto;
        padding-bottom: 20px;
    }
}
</style>