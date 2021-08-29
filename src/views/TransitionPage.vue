<template>
  <div class="row">
    <div class="col-md-4">
      <div class="card">
        <router-link to="/normal/edit">
          <el-card shadow="hover">
            <div slot="header">
              <h3>普通问卷</h3>
            </div>
            <div>
              <p>向您提供最基本的问卷收集功能，包括填空、单选、多选、评分四种题型。</p>
            </div>
          </el-card>
        </router-link>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card">
        <router-link to="/registration/create">
          <el-card shadow="hover">
            <div slot="header">
              <h3>报名问卷</h3>
            </div>
            <div>
              <p>相较于普通问卷，报名问卷提供了问卷最大填写数量的设置，您能够借此限制报名人数。</p>
              <p>同时，报名问卷为了达到每个人只能填写一次的需求，将会要求问卷填写者必须登录后才能填写问卷。</p>
              <p>除此之外，我们还预设置有一个填写姓名的填空题、一个填写手机号的填空题和一个报名的单选题，方便您快速便捷的创建问卷</p>
            </div>
          </el-card>
        </router-link>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card">
        <router-link to="/checkin/edit">
          <el-card shadow="hover">
            <div slot="header">
              <h3>疫情打卡问卷</h3>
            </div>
            <div>
              <p>在普通问卷的基础上添加了定位题目，可以在经过填写者允许后获取当前位置，方便您更好地掌握打卡人员的人员信息。</p>
              <p>除此之外，我们还预设置了学号填空题、姓名填空题、体温单选题、有无去过高风险地区单选题、有无新冠症状单选题、定位题，方便您更快地创建问卷。</p>
            </div>
          </el-card>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import jpg1 from "../assets/问卷1.png";
import jpg2 from "../assets/问卷2.png";
import jpg3 from "../assets/问卷3.png";
import jpg4 from "../assets/问卷4.png";
import jpg5 from "../assets/Questionlogo.png";

export default {
  mounted() {
    this.$store.commit("updateOperation", {
      id: "",
      code: "",
      isReleased: false,
    });
  },
  data: function () {
    return {
      imgUrl1: jpg1,
    };
  },
};
</script>

<style scoped>
.card {
  margin-top: 25px;
  padding-left: 30px;
  padding-right: 20px;
}
</style>
