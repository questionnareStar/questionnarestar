<template>
  <div class="questionnare">
    <span class="head">问卷标题
    </span>
    <el-input
      class="问卷标题"
      label="问卷标题"
      v-model="modelForm.head"
    >
    </el-input>
    <span class="Introduction">问卷简介
    </span>
    <el-input
      class="问卷简介"
      label="问卷简介"
      v-model="modelForm.introduction"
    >
    </el-input>
    <span class="demonstration">问卷截止时间</span>
    <el-date-picker
      v-model="value2"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
    >
    </el-date-picker>
    <span class="head">问卷权限
    </span>
    <el-radio-group v-model="modelForm.authority">
      <el-radio label="0">任何人</el-radio>
      <el-radio label="1">凭邀请码</el-radio>
    </el-radio-group>
    <span class="head">是否需要登录
    </span>
    <el-radio-group v-model="modelForm.isLogin">
      <el-radio label="0">需要</el-radio>
      <el-radio label="1">不需要</el-radio>
    </el-radio-group>
    <el-form
      ref="modelForm"
      :rule="rules"
      :model="modelForm"
      label-position="right"
      label-width="100px"
    >
      <vuedraggable
        v-model="modelForm.question"
        class="wrapper"
        @end="end"
      >
        <div
          v-for="(item, index) in modelForm.question"
          :key="index"
        >
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                第{{ index+1 }}题,题目:{{ item.question }}
              </template>
              <!-- 问题 -->
              <el-form-item
                :prop="`question.${index}.type`"
                :label="`问题${index + 1}类型`"
                :rules="{ required: true, message: '请选择问题类型', trigger: 'change' }"
              >
                <el-radio-group v-model="item.type">
                  <el-radio :label="0">单选题</el-radio>
                  <el-radio :label="1">多选题</el-radio>
                  <el-radio :label="2">填空题</el-radio>
                  <el-radio :label="3">评分题</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                :prop="`question.${index}.type`"
                :label="`问题${index + 1}是否必答`"
                :rules="{ required: true, message: '是否必答', trigger: 'change' }"
              >
                <el-radio-group v-model="modelForm.question.isNecessary">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">不是</el-radio>
                </el-radio-group>
              </el-form-item>
              <!--              //问题-->
              <el-form-item
                :prop="`question.${index}.question`"
                label="问题"
                :rules="{ required: true, message: '请填写问题', trigger: 'change' }"
              >
                <el-input
                  v-model.trim="item.question"
                  style="width:258px"
                  clearable
                  placeholder="请填写问题"
                />
              </el-form-item>
              <!-- 答案 -->
              <el-form-item
                v-for="(opt, idx) in item.choices"
                v-show="item.type!=2&&item.type!=3"
                :key="idx"
                :label="`选项${idx + 1}`"
                :prop="`question.${index}.choices.${idx}.value`"
                :rules="[
                  { required: true, message: '请输入答案', trigger: 'blur' },
                ]"
              >
                <el-input
                  v-model.trim="opt.value"
                  v-show="item.type==0||item.type==1"
                  style="width:258px"
                  clearable
                  placeholder="请输入答案"
                />
                <el-button
                  style="margin-left: 20px"
                  v-show="item.type!=3"
                  @click.prevent="removeDomain(index,idx)"
                >删除</el-button>
              </el-form-item>
              '<el-form-item
                v-for="(opt, idx) in item.choices"
                v-show="item.type==3"
                :key="idx"
                :label="`总分`"
                :prop="`question.${index}.choices.${idx}.value`"
                :rules="[
                  { required: true, message: '请输入总分', trigger: 'blur' },
                ]"
              >
                <el-input
                  v-model.trim="opt.value"
                  v-show="item.type==3"
                  style="width:258px"
                  clearable
                  placeholder="请输入总分"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  v-show="item.type!=2 && item.type!=3"
                  @click="addDomain(index)"
                >新增选项</el-button>
                <el-button @click="removeQuestion(index)">删除题目</el-button>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </div>
      </vuedraggable>
      <el-form-item>
        <el-button @click="addQuestion">新增题目</el-button>
        <el-button
          style="margin-top: 10px"
          @click="addSubmit()"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import vuedraggable from "vuedraggable";
export default {
  name: "HelloWorld",
  components: {
    vuedraggable,
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
      rules: {},
      value2: 0,
      modelForm: {
        head: "",
        introduction: "",
        isReleased: 0,
        authority: -1,
        starttime: 0,
        endtime: 0,
        isLogin: 0,
        question: [
          {
            type: 0,
            question: "",
            choices: [{ choice: "" }],
            isNecessary: 0,
          },
        ],
      },
    };
  },
  methods: {
    end(evt) {
      this.$refs.modelForm.clearValidate();
    },
    removeDomain(index, idx) {
      // 删除选项
      this.modelForm.question[index].choices.splice(idx, 1);
    },
    removeQuestion(index) {
      //删除题目
      this.modelForm.question.splice(index, 1);
    },
    addDomain(index) {
      // 新增选项
      this.modelForm.question[index].choices.push({ value: "" });
    },
    addQuestion() {
      // 新增题目
      this.modelForm.question.push({
        type: "",
        question: "",
        choices: [{ value: "" }],
        isNecessary: 0,
      });
    },
    resetForm(formName) {
      // 重置
      this.$refs[formName].resetFields();
    },
    addSubmit() {
      this.$axios({
        method: "post",
        url: "http://47.93.216.213:3344/api/v1/questionnaire/create",
        data: modelData,
      }).then((res) => {
        console.log(res);
        if (res.data.type == 0) {
          this.$message({
            showClose: true,
            message: "创建问卷成功，任何人均可填写问卷",
            type: "success",
          });
          window.location.herf = "../find/me/all";
        } else {
          this.$message({
            showClose: true,
            message: "创建问卷成功，他人可凭邀请码可填写问卷",
            type: "success",
          });
        }
      });
    },
  },
};
</script>
<style scoped>
</style>
