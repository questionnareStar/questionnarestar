<template>
  <div style="width=85% mb-8 height=100px">
    <ValidationProvider
      :rules="`${required ? 'required' : ''}`"
      v-slot="{ errors }"
    >
      <el-row class="question-title mb-8">
        <span v-if="serial">{{sequence}}</span>
        <span>{{question}}</span>
        <span
          v-if="required"
          class="red"
        >*</span>
      </el-row>
      <el-row
        v-if="description"
        class="question-des mb-8"
      >
        <span>{{description}}</span>
      </el-row>
      <el-row class="question-des mb-8">
        <el-button v-if="!located" @click.native="getLocation()" round>点击获取当前位置</el-button>
      </el-row>
      <el-row class="question-choices">
          <el-input
            disabled
            v-model="answers[0]"
            placeholder="点击按钮获取当前位置"
            />
      </el-row>
      <el-row class="red mb-8">
        <span>{{ errors[0] }}</span>
      </el-row>
    </ValidationProvider>
    <div id="map-container"></div>
  </div>
</template>

<script>
import { location } from "../../util/locate";
export default {
  props: ["id", "serial", "sequence", "question", "required", "description"],
  data() {
    return {
      answers: [],
      located: false
    };
  },
  methods: {
    getLocation() {
        this.$confirm('此操作将获取您的位置信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let geolocation = location.initMap("map-container"); //定位
          AMap.event.addListener(geolocation, "complete", result => {
              this.answers.push(result.formattedAddress)
              console.log(result)
          });
          let data = {
              answerList: this.answers,
              itemType: 1,
              topicId: this.$props.id,
          };
          this.$emit("getAnswer", data);
        })
    }
  },
};
</script>

<style scoped>
.mb-8 {
  margin-bottom: 8px;
}
.question-title > span {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}
.question-des > span {
  font-size: 13px;
  font-weight: lighter;
}
.red {
  color: red;
}
</style>
