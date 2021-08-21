<template>
    <el-container style="solid #eee">
        <el-header>
            <top-bar></top-bar>
        </el-header>
        <el-container>
            <el-aside width="125px">
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