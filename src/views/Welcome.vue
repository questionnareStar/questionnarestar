<template>
  <div>
    <div class="container">
      <div class="intro">
        <h2>问卷星球</h2>
      </div>
      <div id="wrapper">
        <h3> 问卷星球是一款在线问卷制作工具。通过它，您能够轻松完成问卷搜集调查。我们提供了多种问卷类型，满足您的各种需求。登陆后点击图片文字开始编辑问卷。</h3>
        <el-carousel
          :interval="4000"
          type="card"
          height="300px"
        >
          <el-carousel-item>
            <div
              class="banner"
              @click="click1()"
            >普通问卷</div>
            <img src="../assets/bag.png" />
          </el-carousel-item>
          <el-carousel-item>
            <div
              class="banner"
              @click="click2()"
            >投票问卷</div>
            <img src="../assets/reportbar.png" />
          </el-carousel-item>
          <el-carousel-item>
            <div
              class="banner"
              @click="click3()"
            >疫情打卡问卷</div>
            <img src="../assets/time.png" />
          </el-carousel-item>
          <el-carousel-item>
            <div
              class="banner"
              @click="click4()"
            >报名问卷</div>
            <img src="../assets/agreement.png" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div v-if="!isLogin()">
        <a
          class="btn btn-primary size"
          href="/auth/login"
        >登录</a>
      </div>
      <el-divider></el-divider>
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
    click1() {
      if (isLogin()) {
        this.$router.push("/normal/edit");
      } else {
        this.$message({
          message: "请先登录",
          type: "error",
        });
      }
    },

    click2() {
      if (isLogin()) {
        this.$router.push("/voting/create");
      } else {
        this.$message({
          message: "请先登录",
          type: "error",
        });
      }
    },

    click3() {
      if (isLogin()) {
        this.$router.push("/checkin/edit");
      } else {
        this.$message({
          message: "请先登录",
          type: "error",
        });
      }
    },

    click4() {
      if (isLogin()) {
        this.$router.push("/registration/create");
      } else {
        this.$message({
          message: "请先登录",
          type: "error",
        });
      }
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
  background-image: url(../assets/R-C.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: fixed;
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
  color: #261a68;
  font-family: 微软雅黑（ "Microsoft Yahei" ） "Segoe UI";
}
.el-carousel__item img {
  height: 100%;
  max-width: 50%;
}
</style>
