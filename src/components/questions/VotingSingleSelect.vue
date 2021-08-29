<template>
  <div style="width=85% mb-8">
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
      <el-row class="question-choices">
        <el-radio-group
          v-model="answers[0]"
          @change="onchange()"
        >
          <el-radio
            class="choice-block"
            v-for="(item, index) in choices"
            :key="index"
            :label="item"
          >{{item}} &emsp;&emsp;<font color="red"><b>目前获得了{{num[numlength-sequence][index]}}票</b></font>
          </el-radio>
        </el-radio-group>
      </el-row>
      <el-row class="red mb-8">
        <span>{{ errors[0] }}</span>
      </el-row>
    </ValidationProvider>
  </div>
</template>

<script>
export default {
  props: [
    "id",
    "serial",
    "sequence",
    "question",
    "required",
    "description",
    "choices",
    "num",
    "numlength",
  ],
  data() {
    return {
      answers: [],
    };
  },
  methods: {
    onchange() {
      let data = {
        answerList: this.answers,
        itemType: 4,
        topicId: this.$props.id,
      };
      this.$emit("getAnswer", data);
    },
  },
};
</script>

<style scoped>
.choice-block {
  display: block;
  margin: 3px;
  font-size: 16px;
}
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
