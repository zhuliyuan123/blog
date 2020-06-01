<template>
  <div class="home">
    <div class="header">
      <div class="title">竹立站管理后台</div>
      <el-popover placement="bottom-start" width="160" v-model="visible">
        <p>你确定要退出吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false"
            >取消</el-button
          >
          <el-button type="primary" size="mini" @click="exit">确定</el-button>
        </div>
        <el-button type="danger" slot="reference" round class="exit"
          >退出</el-button
        >
      </el-popover>
    </div>
    <div class="main">
      <div class="aside">
        <el-menu default-active="/articleList" :router="true">
          <el-menu-item index="/articleList">
            <i class="el-icon-reading"></i>
            <span slot="title">文章</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-document-add"></i>
            <span slot="title">发表</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">配置</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="contant">
        <router-view></router-view>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    exit() {
      this.visible = false;
      sessionStorage.removeItem("Authorization");
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow:hidden;
    .header {
      position:absolute;
      width: 100%;
      top:0;
      left:0;
      height: 60px;
      border-bottom: 1px solid #e1e1e1;
      z-index: 1;
      .title{
          height: 100%;
          line-height: 60px;
          font-size: 25px;
          margin-left: 30px;
      }
      .exit {
            position: absolute;
            right: 50px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .main {
        display: flex;
        top:60px;
        bottom: 60px;
        overflow:auto;
        position:absolute;
        width: 100%;
        .aside{
            width: 200px;
            height: inherit;
            .el-menu {
                height: 100%;
            }
        }
        .contant{
            padding-top: 10px;
            flex: 1;
            min-height: 700px;
        }
    }
    .footer {
        background: #23282d;
        color: #666;
        line-height: 60px;
        height: 60px;
        text-align: center;
        font-size: 16px;
        width: 100%;
        z-index: 100;
        position:absolute;
        bottom:0;
        left:0;
    }
}
  

</style>
