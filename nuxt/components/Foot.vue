<template>
<div>
    <div class="bank"></div>
    <a class="foot" href="https://beian.miit.gov.cn/" target="_blank">粤ICP备19144854号-1</a>
</div>
</template>

<script>
export default {

}
</script>
<style lang="scss" scoped>
.bank{
    height: 100px;
    background-color: #3d5581;
}
.foot{
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: white;
  width: 100%;
  background-color: #3d5581;
  position: fixed;
  bottom:0;
}
@media screen and (min-width: 768px) {
    .bank{
        background-color: white;
    }

}

</style>
