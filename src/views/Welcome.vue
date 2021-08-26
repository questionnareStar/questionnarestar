<template>
    <div class="container">
        <div class="intro">
            <h2>问卷星球</h2>
            <p>问卷星球是一款在线问卷制作工具。通过它，您能够轻松完成问卷搜集调查。我们提供了多种问卷类型，满足您的各种需求。</p>
        </div>
        <div v-if="!isLogin()">
            <a class="btn btn-primary size" href="/auth/login">登录</a>
        </div>
    </div>
</template>

<script>
import { isLogin } from "../util/justify";
export default {
    methods: {
        isLogin() {
            return isLogin()
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url(../assets/winter-landscape.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
}
.intro {
    padding: 50px;
}
.size {
    width: 200px;
    height: 56px;
    font-size: 2rem;
    line-height: 42px;
}
</style>