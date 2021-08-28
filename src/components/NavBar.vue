<template>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link class="navbar-brand" to="/welcome">
                    <img alt="Brand" width="30px" src="../assets/logo.png" />
                </router-link>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li :class="`${isLogin() ? '' : 'disabled'} ${activeLink('list') ? 'active' : ''}`">
                        <router-link to="/list">
                            <em class="el-icon-document" />
                            <span>我的问卷</span>
                        </router-link>
                    </li>
                    <li :class="`${isLogin() ? '' : 'disabled'} ${activeLink('edit') ? 'active' : ''}`">
                        <router-link to="/trans">
                            <em class="el-icon-edit" />
                            <span>编辑问卷</span>
                        </router-link>
                    </li>
                    <li :class="`${isLogin() ? '' : 'disabled'} ${activeLink('waste') ? 'active' : ''}`">
                        <router-link to="/waste">
                            <em class="el-icon-delete" />
                            <span>回收中心</span>
                        </router-link>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a v-if="isLogin()" href="/welcome" @click="logout()">
                            退出登录
                        </a>
                        <a v-else href="/auth/login">
                            登录/注册
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { isLogin } from "../util/justify";
export default {
    methods: {
        activeLink(name) {
            return this.$route.name === name
        },
        isLogin() {
            return isLogin()
        },
        logout() {
            localStorage.removeItem('userInfo')
        }
    }
}
</script>

<style scoped>
em {
    margin-right: 3px;
}
</style>
