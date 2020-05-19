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
            <el-select v-model.number="labelid" multiple placeholder="请选择">
                <el-option
                    v-for="item in labelList"
                    :key="item.id"
                    :label="item.labelname"
                    :value="item.id"
                >
                </el-option>
            </el-select>
             <el-button style="margin-left:20px" @click="update" type="success">修改</el-button>
        </div>
        <el-input v-model="title" placeholder="请输入标题" style="margin-top:15px;"></el-input>
        <div class="main">
            <mavon-editor codeStyle="monokai-sublime" :ishljs="true" v-model="value"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "update",
    created() {
        this.id = this.$route.params.id
        this.getClassList();
    },
    data () {
        return {
            classList:[],
            classid:1,
            labelList:[],
            labelid:[],
            value:'',
            title:'',
            id:'',
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
                this.getInfo();
            } catch (error) {
                console.log(error);
            }
        },
        async getInfo(){
            try{
                const result = await this.$http.article.getArticle({
                    id:this.id
                })
                this.classid = result.data.classid;
                this.labelid = result.data.labelid.split(',').map((item)=>{return parseInt(item)})
                this.value = result.data.content;
                this.title =  result.data.title;

            }catch(error){
                console.log(error)
            }
        },
        async update(){
            try{
                const result = await this.$http.article.updateArticle({
                    title:this.title,
                    content:this.value,
                    id:this.id,
                    labelid:this.labelid.join(','),
                    classid:this.classid,
                    time:parseInt(new Date().getTime()/1000)
                })
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
            }catch(error){
                console.log(error);
            }
        }
    },
};
</script>
<style lang="scss" scoped>
.publish {
    width: 100%;
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
