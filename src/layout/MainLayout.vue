<template>
    <el-container style="solid #eee">
        <el-aside width="125px">
            <side-bar/>
        </el-aside>
        <el-container>
            <router-view/>
        </el-container>
    </el-container>
</template>

<script>
import SideBar from '../components/SideBar.vue'
export default {
  components: { SideBar },
    
}
</script>