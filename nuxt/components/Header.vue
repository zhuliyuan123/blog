<template>
<div class="header-main">
    <div class="header">
        <div class="head-content">
            <div class="list-btn" @click="showMenu = !showMenu">
                <svg t="1590582760872" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2341" width="200" height="200"><path d="M128 256h64V192H128zM320 256h576V192H320zM128 544h64v-64H128zM320 544h576v-64H320zM128 832h64v-64H128zM320 832h576v-64H320z" fill="#e6e6e6" p-id="2342"></path></svg>
            </div>
            <div class="back-btn" v-if="showback" @click="back">
                <svg t="1590583418402" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2642" width="200" height="200"><path d="M553.6 790.4l-44.8-44.8 233.6-233.6-233.6-233.6 44.8-44.8L832 512z" fill="#e6e6e6" p-id="2643"></path><path d="M192 480h576v64H192z" fill="#e6e6e6" p-id="2644"></path></svg>
            </div>
            <div class="head-nav">
                <div class="head-nav-item">Github</div>
                <nuxt-link :to="{name:'about'}" class="head-nav-item">关于我</nuxt-link>
                <nuxt-link :to="{name:'index'}" class="head-nav-item">首页</nuxt-link>
            </div>
        </div>
    </div>
    <transition name="fade">
        <div class="menu" v-if="showMenu">
            <nuxt-link :to="{name:'index'}" class="menu-item">首页</nuxt-link>
            <a target="_blank" href="https://github.com/zhuliyuan123" class="menu-item">Github</a>
            <nuxt-link :to="{name:'about'}" class="menu-item">关于我</nuxt-link>
        </div>
    </transition>
</div>
</template>

<script>
export default {
    props:{
        showback:{
            type:Boolean,
            defulat:true
        }
    },
    data(){
        return{
            showMenu:false

        }
    },
    methods:{
        back(){
            window.history.go(-1);
        }
    }
}
</script>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.header-main{
    width: 100%;
    position: fixed;
    top:0px;
    z-index: 200;
}
.menu{
    width: 110px;
    background-color: #3d5581;
    display: flex;
    flex-direction: column; 
    .menu-item{
        width: 100%;
        height: 80px;
        font-size: 30px;
        line-height: 80px;
        text-align: center;
        cursor: pointer;
        color:white;
    }
}
.header{
    width: 100%;
    height: 100px;
    background-color: #3d5581;
    position: relative;
    display: flex;
    align-items: center;
    z-index: 100;
    .list-btn{
        height: 50px;
        width: 50px;
        cursor: pointer;
        margin-left: 30px;
    }
    .back-btn{
        position: absolute;
        height: 50px;
        width: 50px;
        cursor: pointer;
        right: 30px;
        top:50%;
        margin-top: -25px;
    }
    .icon{
        width: 50px;
        height: 50px;
    }
    .head-nav{
        display: none;
    }
}
@media screen and (min-width: 768px) {
    .list-btn{
        display: none;
    }
    .head-content{
        width: 750Px;
        height: 100%;
        margin: auto;
        .head-nav{
            position: relative;
            top:50%;
            transform: translateY(-50%);
            display: block;
            display: flex;
            flex-direction: row-reverse;
            .head-nav-item{
                text-align: center;
                color:white;
                margin: 0 20px 0 20px;
                font-size: 1rem;
            }
        }
    }
}
</style>
