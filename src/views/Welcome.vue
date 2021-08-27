<template>
  <div>
    <div class="container">
      <div class="intro">
        <h2>问卷星球</h2>
        <p>问卷星球是一款在线问卷制作工具。通过它，您能够轻松完成问卷搜集调查。我们提供了多种问卷类型，满足您的各种需求。</p>
      </div>
      <div v-if="!isLogin()">
        <a
          class="btn btn-primary size"
          href="/auth/login"
        >登录</a>
      </div>
    </div>
    <div id="wrapper">
      <img
        style="width:600px"
        src="../assets/图标.jpg"
      />
      <h3>您的问卷解决方案</h3>
      <el-divider></el-divider>
      <el-carousel
        :interval="4000"
        type="card"
        height="300px"
      >
        <el-carousel-item>
          <div class="banner">投票问卷</div>
          <img src="../assets/问卷图标.jpg" />
        </el-carousel-item>
        <el-carousel-item>
          <div class="banner">投票问卷</div>
          <img src="../assets/问卷图标.jpg" />
        </el-carousel-item>
        <el-carousel-item>
          <div class="banner">投票问卷</div>
          <img src="../assets/问卷图标.jpg" />
        </el-carousel-item>
        <el-carousel-item>
          <div class="banner">普通问卷</div>
          <img src="../assets/问卷图标.jpg" />
        </el-carousel-item>
        <el-carousel-item>
          <div class="banner">投票问卷</div>
          <img src="../assets/问卷图标.jpg" />
        </el-carousel-item>
        <el-carousel-item>
          <div class="banner">普通问卷</div>
          <img src="../assets/问卷图标.jpg" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { isLogin } from "../util/justify";
import About from "./About.vue";
export default {
  components: { About },
  methods: {
    isLogin() {
      return isLogin();
    },
  },
};
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
#wrapper {
  /* height: 50%; */
  align-content: center;
}
.el-carousel__item h3 {
  color: #5b04ce;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item .banner {
  position: absolute;
  bottom: 20px;
  left: 40%;
  font-size: 25px;
  z-index: 100;
  color: #ffffff;
  font-family: 微軟正黑體;
}
.el-carousel__item img {
  height: 100%;
  max-width: 100%;
}
.el-carousel__item:nth-child(2n) {
  background-color: #925eb4;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #493d52;
}
</style>
