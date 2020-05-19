<template>
<div class="setting">
    <el-button type="primary" @click="handleEdit()">新增类型</el-button>
    <div class="content">
        <el-table :data="classList">
           <el-table-column prop="id" label="id" width="180"></el-table-column>
           <el-table-column prop="classname" label="文章类型"></el-table-column>
           <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.row)">修改名称</el-button>
                    <el-button
                    size="mini"
                    @click="handleLabel(scope.row)">编辑标签</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog
        :title="word"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="dialog-content">
            <div class="title">文章类型：</div>
            <el-input v-model="classname" placeholder="请输入增加的名称"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="标签"
        :visible.sync="showLabel"
        width="30%">
        <div class="tagContent">
            <el-tag
                :key="tag.id"
                v-for="tag in labelList"
                closable
                :disable-transitions="false"
                @close="delTag(tag.id)">
                {{tag.labelname}}
            </el-tag>
            <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="labelname"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
                >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            
        </div>
    </el-dialog>
</div>
</template>

<script>
export default {
    name:'setting',
    data () {
        return {
            classid:0,
            classList:[],
            classname:'',
            labelList:[],
            centerDialogVisible:false,
            showLabel:false,
            inputVisible :false,
            labelname:''
        }
    },
    computed: {
        word(){
            if(this.classid){
                return '修改类型'

            }else{
                return '增加类型'
            }
        }
    },
    created () {
        this.getClassList();
    },
    methods: {
        async getClassList(){
            try{
                const result = await this.$http.classes.getClassList();
                this.classList = result.data;
            }catch(error){
                console.log(error)
            }
        },
        showInput(){
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });

        },
        async handleInputConfirm() {
            if(this.labelname){
                await this.$http.label.addLabel({
                    labelname:this.labelname,
                    classid:this.classid,
                })
                this.handleLabel({id:this.classid})
                this.$message({
                    message: '添加成功',
                    type: 'success'
                });
                this.inputVisible = false;
                this.labelname = '';


            }else{
                this.inputVisible = false;
            }
        },
        handleEdit(row){
            if(row){
                this.classid = row.id;
                this.classname = row.classname;
            }else{
                this.classname = ''
                this.classid = 0;
            }
            this.centerDialogVisible = true;
        },
        async handleDelete(row){
            this.classid = row.id;
            this.$confirm("此操作将永久删除该类型, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
            .then(async () => {
                try{
                    await this.$http.classes.delClass({
                        id:this.classid
                    })
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });
                    this.getClassList();       
                }catch(error){
                    console.log(error)
                }
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            });
        },
        async handleLabel(row){
            this.classid = row.id;
            try{
                const result = await this.$http.label.getLabelList({
                    classid:this.classid
                })
                this.labelList = result.data;
                this.showLabel = true;


            }catch(error){
                console.log(error)
            }
        },
        async submit(){
            if(this.classid){
                // 修改
                try{
                    const result = await this.$http.classes.updateClass({
                        id:this.classid,
                        classname:this.classname
                    })
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.centerDialogVisible = false;
                    this.getClassList();
                }catch(error){
                    console.log(error)
                }
            } else {
                // 新增class
                try{
                    const result = await  this.$http.classes.addClass({
                        classname:this.classname
                    })
                    this.$message({
                        message: '增加成功',
                        type: 'success'
                    });
                    this.centerDialogVisible = false;
                    this.getClassList();
                }catch(error){
                    console.log(error)
                }
            }
        },
        async delTag(id){
            this.$confirm("此操作将永久删除该类型, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
            .then(async () => {
                try{
                    const result = await this.$http.label.delLabel({
                        id:id,
                    })
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.handleLabel({id:this.classid})

                }catch(error){
                    console.log(error)
                }
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.setting{
    width: 100%;
    .content{
        width: 100%;
        margin: 10px auto 0 auto;
        .classes{
            display: flex;
        }
    }
    .title{
        line-height: 40px;
        width:100px;
    }
    .dialog-content{
        display: flex;
    }
    .tagContent{
        width: 80%;
        margin: 0 auto 0 auto;
    }
      .el-tag + .el-tag {
        margin-left: 10px;
        margin-bottom: 5px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
}
</style>