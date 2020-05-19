<template>
<div class="detail">
    <div class="title">{{title}}</div>
    <div class="time">{{showTime}}</div>
    <div class="content" v-highlight v-html="content"></div>
</div>
</template>

<script>
var marked = require('marked');
import hljs from "highlight.js";
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
});
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
                this.content = marked(result.data.content);
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
    .title{
        text-align: center;
        font-size: 20px;
        font-weight: 600;
    }
    .time{
        margin-top: 20px;
        text-align: center;
    }
    .content{
        width: 800px;
        min-height: 700px;
        padding: 20px 50px 0 50px;
        margin: 10px auto 0 auto;
        background-color: #e1e1e1;
    }
}
</style>