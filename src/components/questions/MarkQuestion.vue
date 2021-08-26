<template>
  <div style="width=85% mb-8 height=100px">
    <ValidationProvider
      :rules="`${required ? 'mark' : ''}`"
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
        <el-rate
          v-model="answers[0]"
          :maxScore="maxScore"
          @change="onchange()"
        />
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
    "maxScore",
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
        itemType: 2,
        topicId: this.$props.id,
      };
      this.$emit("getAnswer", data);
    },
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
