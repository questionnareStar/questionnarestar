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
    <!--
    <span class="demonstration">问卷截止时间</span>
    <el-date-picker
      v-model="value2"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      value-format="timestamp"
    >
    </el-date-picker>
    -->
    <span class="head">是否需要邀请码
    </span>
    <el-radio-group v-model="modelForm.authority">
      <el-radio :label="0">不需要</el-radio>
      <el-radio :label="1">需要</el-radio>
    </el-radio-group><br/>
    <span class="head">是否需要登录
    </span>
    <el-radio-group v-model="modelForm.isLogin">
      <el-radio :label="0">不需要</el-radio>
      <el-radio :label="1">需要</el-radio>
    </el-radio-group><br/>
    <span class="head">是否需要显示题号
    </span>
    <el-radio-group v-model="modelForm.serial">
      <el-radio :label="true">需要</el-radio>
      <el-radio :label="false">不需要</el-radio>
    </el-radio-group><br/>
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
                :rules="{ required: true, message: '请选择问题类型', trigger: 'blur' }"
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
                :rules="{ required: true, message: '是否必答', trigger: 'blur' }"
              >
                <el-radio-group v-model="item.required">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">不是</el-radio>
                </el-radio-group>
              </el-form-item>
              <!--              //问题-->
              <el-form-item
                :prop="`question.${index}.question`"
                label="问题"
                :rules="{ required: true, message: '请填写问题', trigger: 'blur' }"
              >
                <el-input
                  v-model.trim="item.question"
                  style="width:258px"
                  clearable
                  placeholder="请填写问题"
                />
              </el-form-item>
              <el-form-item
                :prop="`question.${index}.question`"
                label="问题描述"
                :rules="{ required: true, message: '请填写问题描述', trigger: 'blur' }"
              >
                <el-input
                  v-model.trim="item.desc"
                  style="width:258px"
                  clearable
                  placeholder="请填写问题描述"
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
                  v-model="item.maxscore"
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
                <el-button
                  style="margin-top: 10px"
                  @click="copyQuestion(index)"
                >复制问题</el-button>
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
import axios from "../util/service/index";
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
      modelForm: {
        head: "",
        introduction: "",
        isReleased: 0,
        authority: 0,
        isLogin: 0,
        serial: 0,
        question: [
          {
            desc: "",
            type: 0,
            question: "",
            choices: [{ choice: "" }],
            required: -1,
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
    copyQuestion(index) {
      this.modelForm.question.push(this.modelForm.question[index]);
    },
    addQuestion() {
      // 新增题目
      this.modelForm.question.push({
        desc: "",
        type: 0,
        question: "",
        choices: [{ value: "" }],
        required: -1,
      });
    },
    addSubmit() {
      console.log(this.modelForm)
      console.log(this.modelForm.authority)
      console.log(this.modelForm.isLogin)
      var questionreturned = [];
      this.modelForm.question.forEach(function (item, index) {
        console.log(item);
        if (item.type == 0) {
          var choice = [];
          item.choices.forEach(function (items) {
            choice.push(items.value);
          });
          console.log(choice);
          let JsonCreateQuestion = {
            desc: item.desc,
            choices: choice,
            question: item.question,
            required: Number(item.required),
          };
          console.log(JsonCreateQuestion);
          axios({
            method: "post",
            url: "/api/v1/topic/create/single/choice",
            data: JsonCreateQuestion,
          }).then((res) => {
            console.log(res);
            if (res.data.id != 0) {
              questionreturned.push({
                itemId: res.data.data.id,
                itemOrder: index + 1,
                itemType: 0,
              });
            }
          });
        }
        if (item.type == 1) {
          var choice = [];
          item.choices.forEach(function (items) {
            choice.push(items.value);
          });
          console.log(choice);
          let JsonCreateQuestion = {
            desc: item.desc,
            choices: choice,
            question: item.question,
            required: Number(item.required),
          };
          console.log(JsonCreateQuestion);
          axios({
            method: "post",
            url: "/api/v1/topic/create/multi/choice",
            data: JsonCreateQuestion,
          }).then((res) => {
            console.log(res);
            if (res.data.id != 0) {
              questionreturned.push({
                itemId: res.data.data.id,
                itemOrder: index + 1,
                itemType: 1,
              });
            }
          });
        }
        if (item.type == 2) {
          let JsonCreateQuestion = {
            question: item.question,
            required: Number(item.required),
          };
          console.log(JsonCreateQuestion);
          axios({
            method: "post",
            url: "/api/v1/topic/create/fill/blank",
            data: JsonCreateQuestion,
          }).then((res) => {
            console.log(res);
            if (res.data.id != 0) {
              questionreturned.push({
                itemId: res.data.data.id,
                itemOrder: index + 1,
                itemType: 2,
              });
            }
          });
        }
        if (item.type == 3) {
          let JsonCreateQuestion = {
            desc: item.desc,
            maxScore: Number(item.maxscore),
            question: item.question,
            required: Number(item.required),
          };
          console.log(JsonCreateQuestion);
          axios({
            method: "post",
            url: "/api/v1/topic/create/mark",
            data: JsonCreateQuestion,
          }).then((res) => {
            console.log(res);
            if (res.data.id != 0) {
              questionreturned.push({
                itemId: res.data.data.id,
                itemOrder: index + 1,
                itemType: 3,
              });
            }
          });
        }
      });
      console.log(questionreturned);
      let JsonCreateQuestionnaire = {
        head: this.modelForm.head,
        introduction: this.modelForm.introduction,
        isReleased: 0,
        itemList: questionreturned,
        serial: JSON.parse(this.modelForm.serial),
        startTime: "1629767826",
        endTime: "1661303826",
      };
      console.log(JsonCreateQuestionnaire);
      if (Number(this.modelForm.authority) === 0 && Number(this.modelForm.isLogin) === 0) {
        axios({
          headers: {
            token: JSON.parse(localStorage.getItem("userInfo")).token,
          },
          method: "post",
          url: "/api/v1/questionnaire/create",
          data: JsonCreateQuestionnaire,
        }).then((res) => {
          if (res.data.code == 20000) {
            console.log(res);
            this.$alert(
              "您创建的问卷http://47.93.216.213:8081/questionnare/" +
                res.data.data.id +
                "所有人均可回答，点击确认回到“问卷列表”界面",
              "创建问卷成功",
              {
                confirmButtonText: "确定",
                callback: () => {
                  this.$router.push("/list");
                },
              }
            );
          }
        });
      }
      if (Number(this.modelForm.authority) === 1 && Number(this.modelForm.isLogin) === 0) {
        axios({
          headers: {
            token: JSON.parse(localStorage.getItem("userInfo")).token,
          },
          method: "post",
          url: "/api/v1/questionnaire/create/code",
          data: JsonCreateQuestionnaire,
        }).then((res) => {
          if (res.data.code == 20000) {
            console.log(res);
            this.$alert(
              "您创建的问卷http://47.93.216.213:8081/questionnare/" +
                res.data.data.id +
                "他人凭借邀请码" +
                res.data.data.code +
                "即可回答，请记好邀请码信息，点击确认回到“问卷列表”界面",
              "创建问卷成功",
              {
                confirmButtonText: "确定",
                callback: () => {
                  this.$router.push("/list");
                },
              }
            );
          }
        });
      }
      if (Number(this.modelForm.authority) === 0 && Number(this.modelForm.isLogin) === 1) {
        axios({
          headers: {
            token: JSON.parse(localStorage.getItem("userInfo")).token,
          },
          method: "post",
          url: "/api/v1/questionnaire/create/login",
          data: JsonCreateQuestionnaire,
        }).then((res) => {
          if (res.data.code == 20000) {
            console.log(res);
            this.$alert(
              "您创建的问卷http://47.93.216.213:8081/questionnare/" +
                res.data.data.id +
                "他人登录后即可回答，点击确认回到“问卷列表”界面",
              "创建问卷成功",
              {
                confirmButtonText: "确定",
                callback: () => {
                  this.$router.push("/list");
                },
              }
            );
          }
        });
      }
      if (Number(this.modelForm.authority) === 1 && Number(this.modelForm.isLogin) === 1) {
        axios({
          headers: {
            token: JSON.parse(localStorage.getItem("userInfo")).token,
          },
          method: "post",
          url: "/api/v1/questionnaire/create/login/code",
          data: JsonCreateQuestionnaire,
        }).then((res) => {
          if (res.data.code == 20000) {
            console.log(res);
            this.$alert(
              "您创建的问卷http://47.93.216.213:8081/questionnare/" +
                res.data.data.id +
                "他人登陆后凭借邀请码" +
                res.data.data.code +
                "即可回答，请记好邀请码信息，点击确认回到“问卷列表”界面",
              "创建问卷成功",
              {
                confirmButtonText: "确定",
                callback: () => {
                  this.$router.push("/list");
                },
              }
            );
          }
        });
      }
    },
  },
};
</script>
<style scoped>
.questionnare {
  width: 100%;
}
</style>
