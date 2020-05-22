<template>
    <div class="acticleList">
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
            <el-button
                type="primary"
                icon="el-icon-search"
                style="margin-left:20px;"
                circle
                @click="seach"
            ></el-button>
        </div>
        <div class="table">
            <el-table :data="articleList" style="width:100%" stripe>
                <el-table-column prop="id" label="id" width="180">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="日期"
                    width="280"
                    :formatter="changeTime"
                >
                </el-table-column>
                <el-table-column prop="title" label="题目"> </el-table-column>
                <el-table-column label="操作" fixed="right" width="200">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleClick(scope.row.id)"
                            type="text"
                            size="small"
                            >查看</el-button
                        >
                        <el-button type="text" size="small" @click="toupdata(scope.row.id)">编辑</el-button>
                        <el-button type="danger" @click="del(scope.row.id)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: "articlelist",
    data() {
        return {
            classList: [],
            classid: 1,
            labelList: [],
            labelid: [],
            page: 1,
            articleList: [],
            visible: false,
            total:0,
        };
    },
    watch: {
        classid(n) {
            console.log(n);
        },
    },
    methods: {
        async getClassList() {
            try {
                const result = await this.$http.classes.getClassList();
                this.classList = result.data;
                this.getLabelList();
                this.seach();
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
        async seach() {
            console.log(this.labelid == [])
            try {
                let data =
                    this.labelid.length == 0
                        ? { page: this.page, classid: this.classid }
                        : {
                              page: this.page,
                              classid: this.classid,
                              labelid: this.labelid.join(","),
                          };
                console.log(data)
                const result = await this.$http.article.getArticleList(data);
                this.articleList = result.data;
                this.getTotle();
            } catch (error) {
                console.log(error);
            }
        },
        async getTotle(){
            try{
                const result = await this.$http.article.getArticleTotle();
                this.total = Math.ceil(result.data/10)*10
            }catch(error){
                console.log(error);
            }
        },
        del(id) {
            this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
            .then(async () => {
                try{
                    await this.$http.article.delArticle({
                        id:id
                    })
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });
                    this.seach();       
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
        handleClick(id) {
            this.$router.push({
                name:'details',
                params:{
                    id:id
                }
            })
        },
        changeTime(row) {
            const date = new Date(row.time * 1000);
            return (
                date.getFullYear() +
                "-" +
                `${date.getMonth() + 1}` +
                "-" +
                date.getDate() +
                " " +
                date.getHours() +
                ":" +
                date.getMinutes() +
                ":" +
                date.getSeconds()
            );
        },
        toupdata(id){
            this.$router.push({
                name:'update',
                params:{
                    id:id
                }
            })
        }
    },
    created() {
        this.getClassList();
    },
};
</script>
<style lang="scss" scoped>
.acticleList {
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
    .el-pagination{
        margin-top: 10px;
        text-align: center;
    }
}
</style>
