<template>
<div class="login">
    <div class="login-box">
        <div class="title">竹立站管理后台</div>
        <el-form ref="form" :model="form" :rules="rules" class="form"> 
            <el-form-item label="用户名" prop="name" label-width="70px">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码"  prop="password" label-width="70px">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:200px;margin-left:70px;" size="medium" @click="submitForm('form')">登录</el-button>
            </el-form-item>
        </el-form>
        <a class="number" href="https://beian.miit.gov.cn/" target="_blank">粤ICP备19144854号-1</a>
    </div>
</div>
</template>

<script>
export default {
    name:'login',
    data(){
        return{
            form:{
                name:'',
                password:''
            },
            rules :{
                name:[
                    { required: true, message:'请输入名字' , trigger:'blur' }
                ],
                password:[
                    {required:true,message:'请输入密码', trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const result = await this.$http.user.login({
                        name:this.form.name,
                        password:this.form.password
                    })
                    sessionStorage.setItem('Authorization',result.data)
                    this.$router.push('/')
                } else {
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.login{
    background: url('../assets/image/signin_img1.jpg') no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    .login-box{
        width: 350px;
        height: 400px;
        background-color: white;
        margin: 0 auto;
        position: relative;
        border:1px solid rgba(217,217,217,1);
        top:200px;
        border-radius:8px;
        .el-input{
            width: 250px;
        }
        .title{
            font-size: 20px;
            font-weight: 700;
            color: black;
            text-align: center;
            margin-top: 40px;
        }
        .number{
            margin-top: 80px;
            text-align: center;
        }
    }
    .form{
        margin-top: 50px;
    }
}
</style>