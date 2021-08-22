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
import auth from "../util/service/auth.js"
import { message } from "../util/inform.js"

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
            if (this.isPassMode) {
                if (this.loginInfo.email !== '' && this.loginInfo.password !== '') {
                    let formData = {
                        account: this.loginInfo.email,
                        password: this.loginInfo.password
                    }
                    auth.passwordLogin(formData)
                        .then((response) => {
                            const data = response.data
                            console.log(response)
                            if (data.code === 20000) {
                                message({
                                    message: '登录成功',
                                    type: 'success'
                                })
                                this.$router.push('/')
                            } else {
                                message({
                                    message: data.msg,
                                    type: 'error'
                                })
                            }
                        })
                        .catch((error) => {
                            message({
                                message: error.message,
                                type: 'warning'
                            })
                        })
                } else {
                    message({
                        message: '请正确输入邮箱和密码',
                        type: 'error'
                    })
                }
            } else {
                if (this.loginInfo.email !== '' && this.loginInfo.code !== '') {
                    let formData = {
                        account: this.loginInfo.email,
                        code: this.loginInfo.code
                    }
                    auth.codeLogin(formData)
                        .then((response) => {
                            const data = response.data
                            console.log(response)
                            if (data.code === 20000) {
                                message({
                                    message: '登录成功',
                                    type: 'success'
                                })
                                this.$router.push('/')
                            } else {
                                message({
                                    message: data.msg,
                                    type: 'error'
                                })
                            }
                        })
                        .catch((error) => {
                            message({
                                message: error.message,
                                type: 'warning'
                            })
                        })
                } else {
                    message({
                        message: '请正确输入邮箱和验证码',
                        type: 'error'
                    })
                }
            }
        },
        changeLoginMode() {
            this.isPassMode = !this.isPassMode
        },
        fetchCode() {
            if (/^(\w+)(\.\w+)*@(\w+)(\.\w+)*.(\w+)$/i.test(this.loginInfo.email)) {
                this.gotCode = true
                auth.fetchCodeForLogin(this.loginInfo.email)
                    .then((response) => {
                        console.log(response)
                        const data = response.data
                        if (data.code === 20000) {
                            message({
                                message: '验证码获取成功',
                                type: 'success'
                            })
                        } else {
                            message({
                                message: data.msg,
                                type: 'error'
                            })
                        }
                    })
                    .catch((error) => {
                        message({
                            message: error.message,
                            type: 'warning'
                        })
                    })
            } else {
                message({
                message: '正确输入邮箱后方可获取验证码',
                type: 'error'
                })
            }
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