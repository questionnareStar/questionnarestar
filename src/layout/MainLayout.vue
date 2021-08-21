<template>
    <el-container class="root" style="solid #eee">
        <el-header class="header">
            <top-bar></top-bar>
        </el-header>
        <el-container>
            <el-aside width="150px">
                <side-bar/>
            </el-aside>
            <el-container>
                <router-view/>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import TopBar from '../components/TopBar.vue'
export default {
    components: { SideBar, TopBar },
    created() {
        if (this.$route.path === '/') {
            this.$router.replace('/list')
        }
    }
}
</script>

<style scoped>
.root {
    background-image: url(../assets/mainbackground.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100vw;
    height: 100vh;
}
.header {
    padding: 0;
}
</style>