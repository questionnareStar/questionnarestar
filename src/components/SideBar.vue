<template>
  <div width="100%">
    <el-menu
      :default-active="this.$route.path"
      :router="true"
      background-color="#ffffff"
      text-color="#242424"
      active-text-color="#1998e4"
      mode="horizontal"
    >
      <el-menu-item
        index="/list"
        width="200px"
      >
        <i class="el-icon-document" />
        <span slot="title">个人问卷</span>
      </el-menu-item>
      <el-menu-item
        index="/create"
        width="200px"
      >
        <i class="el-icon-edit" />
        <span slot="title">编辑问卷</span>
      </el-menu-item>
      <el-menu-item
        index="/waste"
        width="200px"
      >
        <i class="el-icon-delete" />
        <span slot="title">回收中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
