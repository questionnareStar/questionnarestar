<template>
  <div id="top_bar">
    <div class="top_bar_frame">
      <div
        class="top_bar_icon"
        @click="toStart()"
      >
        <span>Questionnare </span>
        <span>Planet</span>
      </div>
      <div class="avatar_icon">
        <el-dropdown>
          <el-avatar
            :size="50"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { message } from "../util/inform";
export default {
  methods: {
    toStart() {
      this.$router.push("/");
      window.location.reload();
    },
    logout() {
      this.$confirm("确认退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        localStorage.removeItem("userInfo");
        this.$router.push("/auth/login");
        message({
          type: "info",
          message: "退出登录",
        });
      });
    },
  },
};
</script>

<style scoped>
#top_bar {
  position: fixed;
  top: 0;
  height: 60px;
  width: 100vw;
  backdrop-filter: blur(20px);
  background-color: rgba(41, 140, 233, 0.5);
  z-index: 10;
}
.top_bar_frame {
  height: 100%;
  width: auto;
}
.top_bar_icon {
  margin-left: 25px;
  float: left;
  line-height: 45px;
  height: 100%;
  cursor: pointer;
}
.top_bar_icon > span {
  font-size: 18px;
}
.top_bar_icon > span:first-child {
  font-weight: bold;
}
.avatar_icon {
  float: right;
  width: auto;
  margin-right: 25px;
}
</style>
