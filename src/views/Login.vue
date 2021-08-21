<template>
    <div>
        <h2>用户登录</h2>
        <el-form :model="loginInfo">
            <el-form-item label="邮箱">
                <el-input placeholder="请输入邮箱" v-model="loginInfo.email"/>
            </el-form-item>
            <el-form-item v-if="isPassMode" label="密码">
                <el-input placeholder="请输入密码" v-model="loginInfo.password"/>
            </el-form-item>
            <el-form-item v-else label="验证码">
                <el-input placeholder="请输入验证码" v-model="loginInfo.code"/>
            </el-form-item>
        </el-form>
        <el-button v-if="!isPassMode" @click="fetchCode()">获取验证码</el-button>
        <el-button type="primary" @click="login()">登录</el-button>
        <el-divider/>
        <div class="other-choice">
            <span @click="changeLoginMode()">验证码登录</span>
            <el-divider direction="vertical"/>
            <span @click="toRegister()">注册账号</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isPassMode: true,
            loginInfo: {
                email: "",
                password: "",
                code: ""
            }
        }
    },
    methods: {
        login() {
            this.$router.push('/')
        },
        changeLoginMode() {
            this.isPassMode = !this.isPassMode
        },
        fetchCode() {
            
        },
        toRegister() {
            this.$router.push('/auth/register')
        }
    }
}
</script>

<style scoped>
.other-choice {
    display: inline-flex;
    margin-bottom: 25px;
}
.other-choice span {
    color:#2f71dc;
    margin-inline: 15px;
    cursor: pointer;
}
</style>