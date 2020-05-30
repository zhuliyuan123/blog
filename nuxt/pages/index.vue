<template>
<div style="position: relative;">
  <Header :showback="false"></Header>
  <div class="app">
      <div class="main">
        <img class="pic" src="../assets/images/my.jpg" alt="">
      </div>
      <div class="choose">
        <nuxt-link :to="{name:'list-id',params:{id:1}}" class="btn">
            <img src="../assets/images/one.jpg" alt="">
            <div class="mark">
              <h2>技术文档</h2>
            </div>
        </nuxt-link>
        <nuxt-link :to="{name:'list-id',params:{id:6}}" class="btn">
          <img src="../assets/images/two.jpg" alt="">
          <div class="mark">
            <h2>生活记录</h2>
          </div>
        </nuxt-link>
        <nuxt-link :to="{name:'list-id',params:{id:7}}" class="btn">
          <img src="../assets/images/four.jpg" alt="">
          <div class="mark">
            <h2>旅行游记</h2>
          </div>
        </nuxt-link>
        <nuxt-link :to="{name:'about'}" class="btn">
          <img src="../assets/images/five.jpg" alt="">
          <div class="mark">
            <h2>个人简介</h2>
          </div>
        </nuxt-link>
      </div>
      <Foot></Foot>
  </div>
</div>
</template>

<script>
import Header from '../components/Header'
import Foot from '../components/Foot'
export default {
  components: {
    Header,
    Foot
  },
  head:{
    title:'竹立站',
    meta:[
      { charset:'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '朱笠源;个人博客;前端;技术文档;'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
    ]
  }
}
</script>
<style lang="scss" scoped>

.app{
  width: 100%;
}
.choose{
  width: 90%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
  display: flex;
  flex-wrap:wrap;
  padding-bottom: 35px;
  
  

  .btn{
    width: 45%;
    margin: 50px auto 0px auto;
    border: 2px solid white;
    cursor: pointer;
    position: relative;
    .mark{
      position: absolute;
      top:0px;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      font-size: 1rem;
      h2{
        text-align: center;
        color: white;
        position: relative;
        top:50%;
        transform: translateY(-50%);
      }
    }
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.foot{
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: white;
  width: 100%;
  background-color: #3d5581;
}
.bank{
  height: 100px;
  background-color: #3d5581;

}
.main{
  width: 100%;
  margin-top: 100px;
  background-color: white;
  .pic{
    position: relative;
    width: 80%;
    margin: 50px auto 50px auto;
    left: 50%;
    transform: translateX(-50%);
  }

}
.me{
  width: 200px;
  height: 50px;
  background-color: red;
  border: 1px solid red;
}
@media screen and (min-width: 768px) {
    .app{
      width: 750Px;
      margin: 0 auto 0 auto;
      background-color: #3d5581;
    }
    .foot{
      position: fixed;
    }
}

</style>
