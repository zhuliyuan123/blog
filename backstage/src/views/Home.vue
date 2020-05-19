<template>
    <div class="home">
        <el-container style="height:100%;">
            <el-header style="padding:0;">
                <div class="title">竹立站管理后台</div>
                <el-popover
                    placement="bottom-start"
                    width="160"
                    v-model="visible"
                >
                    <p>你确定要退出吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button
                            size="mini"
                            type="text"
                            @click="visible = false"
                            >取消</el-button
                        >
                        <el-button
                            type="primary"
                            size="mini"
                            @click="exit"
                            >确定</el-button
                        >
                    </div>
                    <el-button type="danger" slot="reference" round class="exit"
                        >退出</el-button
                    >
                </el-popover>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu
                        default-active="/articleList"
                        :router="true"
                    >
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
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
            <el-footer>粤ICP备19144854号-1</el-footer>
        </el-container>
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
    methods:{
        exit(){
            this.visible = false;
            sessionStorage.removeItem('Authorization')
            this.$router.push({
                name:'login'
            })
        }
    }
  
};
</script>
<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    .exit {
        position: absolute;
        right: 50px;
        top: 50%;
        transform: translateY(-50%);
    }
    .title {
        font-size: 20px;
        font-weight: 700;
        line-height: 60px;
        margin-left: 30px;
    }
    .el-header {
        position: relative;
        border-bottom: 1px solid #e1e1e1;
    }
    .el-menu {
        height: 100%;
    }
    .el-footer {
        background: #23282d;
        color: #666;
        line-height: 60px;
        text-align: center;
        font-size: 16px;
    }
}
</style>
