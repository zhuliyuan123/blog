<template>
<div>
    <Header :showback="true"></Header>
    <div class="main">
        <div class="header-pic">
            <img src="../../assets/images/my.jpg" alt="">
        </div>
        <div class="info-box">
            <div class="info-box-item"></div>
            <div class="info-box-item">朱笠源</div>
            <div class="info-box-item">julian</div>
            <div class="info-box-item">前端开发工程师</div>
            <div class="info-box-item">邮箱:645872684@qq.com</div>
            <div class="info-box-item">github:zhuliyuan123</div>
            <div class="info-box-item">深圳大学(计算机科学与技术)</div>
            <div class="info-box-item">2019年毕业</div>
            <div class="info-box-item"></div>
        </div>
    </div>
    <Foot></Foot>
</div>
</template>

<script>
import Header from '../../components/Header'
import Foot from '../../components/Foot'
export default {
    components:{
        Header,
        Foot
    },
    head:{
        title:'竹立站',
        meta:[
            { charset:'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '朱笠源;个人博客;前端;'}
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
        ]
    }

}
</script>
<style lang="scss" scoped>
.header-pic{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 5px solid white;
    overflow: hidden;
    margin: 200px auto 0 auto;
    img{
        width: 150px;
        height: 150px;
    }
}
.main{
    margin-top: 100px;
    .info-box{
        width: 80%;
        background-color: white;
        display: flex;
        align-items: center;
        margin: 30px auto 0 auto;
        flex-direction: column;
        .info-box-item{
            margin-top: 15px;
            margin-bottom: 15px;
        }
    }
}
@media screen and (min-width: 768px) {
    .info-box{
        background-color: #3d5581!important;
        color: white;
    }
}

</style>