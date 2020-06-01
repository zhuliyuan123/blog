<template>
    <div class="publish">
        <div class="option">
            <div class="title">文章类型：</div>
            <el-select v-model="classid" placeholder="请选择">
                <el-option
                    v-for="item in classList"
                    :key="item.id"
                    :label="item.classname"
                    :value="item.id"
                >
                </el-option>
            </el-select>
            <div class="title">标签：</div>
            <el-select v-model="labelid" multiple placeholder="请选择">
                <el-option
                    v-for="item in labelList"
                    :key="item.id"
                    :label="item.labelname"
                    :value="item.id"
                >
                </el-option>
            </el-select>
             <el-button style="margin-left:20px" @click="publish" type="success">发布</el-button>
        </div>
        <el-input v-model="title" placeholder="请输入标题" style="margin-top:15px;"></el-input>
        <div class="main">
            <mavon-editor codeStyle="monokai-sublime" :ishljs="true" v-model="value"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "publish",
    created() {
        this.getClassList();
    },
    data () {
        return {
            classList:[],
            classid:1,
            labelList:[],
            labelid:[],
            value:'',
            title:''
        }
    },
    methods: {
        async getClassList() {
            try {
                const result = await this.$http.classes.getClassList();
                this.classList = result.data;
                this.getLabelList();
            } catch (error) {
                console.log(error);
            }
        },
        async getLabelList() {
            try {
                const result = await this.$http.label.getLabelList({
                    classid: this.classid,
                });
                this.labelList = result.data;
            } catch (error) {
                console.log(error);
            }
        },
        async publish(){
            try{
                const result = await this.$http.article.addArticle({
                    title:this.title,
                    classid:this.classid,
                    labelid:this.labelid.join(','),
                    time:parseInt(new Date().getTime()/1000),
                    content:this.value
                })
                this.$message({
                    message: '发布成功！',
                    type: 'success'
                });

            }catch(error){
                console.log(error)
            }
        }
    },
};
</script>
<style lang="scss" scoped>
.publish {
    width: 95%;
    margin: 0 auto 0 auto;
    .option {
        width: 100%;
        display: flex;
    }
    .title {
        height: 40px;
        line-height: 40px;
        margin-left: 15px;
    }
    .main{
        margin-top: 20px;
    }
}
</style>
