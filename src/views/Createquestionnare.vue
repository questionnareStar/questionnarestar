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
    </el-radio-group><br />
    <span class="head">是否需要登录
    </span>
    <el-radio-group v-model="modelForm.isLogin">
      <el-radio :label="0">不需要</el-radio>
      <el-radio :label="1">需要</el-radio>
    </el-radio-group><br />
    <span class="head">是否需要显示题号</span>
    <el-radio-group v-model="modelForm.serial">
      <el-radio :label="true">需要</el-radio>
      <el-radio :label="false">不需要</el-radio>
    </el-radio-group><br />
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
                  <el-radio :label="4">单选题</el-radio>
                  <el-radio :label="3">多选题</el-radio>
                  <el-radio :label="1">填空题</el-radio>
                  <el-radio :label="2">评分题</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                :prop="`question.${index}.type`"
                :label="`问题${index + 1}是否必答`"
                :rules="{ required: true, message: '是否必答', trigger: 'blur' }"
              >
                <el-radio-group v-model="item.required">
                  <el-radio :label="0">是</el-radio>
                  <el-radio :label="1">不是</el-radio>
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
                v-show="item.type!=1&&item.type!=2"
                :key="idx"
                :label="`选项${idx + 1}`"
                :prop="`question.${index}.choices.${idx}.value`"
                :rules="[
                  { required: true, message: '请输入答案', trigger: 'blur' },
                ]"
              >
                <el-input
                  v-model.trim="opt.value"
                  v-show="item.type==3||item.type==4"
                  style="width:258px"
                  clearable
                  placeholder="请输入答案"
                />
                <el-button
                  style="margin-left: 20px"
                  v-show="item.type==3||item.type==4"
                  @click.prevent="removeDomain(index,idx)"
                >删除</el-button>
              </el-form-item>
              '<el-form-item
                v-for="(opt, idx) in item.choices"
                v-show="item.type==2"
                :key="idx"
                :label="`总分`"
                :prop="`question.${index}.choices.${idx}.value`"
                :rules="[
                  { required: true, message: '请输入总分', trigger: 'blur' },
                ]"
              >
                <el-input
                  v-model="item.maxscore"
                  v-show="item.type==2"
                  style="width:258px"
                  clearable
                  placeholder="请输入总分"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  v-show="item.type!=1 && item.type!=2"
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
import { message } from "../util/inform";
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
        serial: true,
        question: [
          {
            desc: "",
            type: 4,
            question: "",
            choices: [{ choice: "" }],
            required: -1,
          },
        ],
      },
      flag: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  methods: {
    end(evt) {
      this.$refs.modelForm.clearValidate();
    },
    removeDomain(index, idx) {
      // 删除选项
      if (idx != 0) {
        this.modelForm.question[index].choices.splice(idx, 1);
      } else {
        this.$alert("至少要有一个选项", "提示", {
          confirmButtonText: "确定",
        });
      }
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
        type: 4,
        question: "",
        choices: [{ value: "" }],
        required: -1,
      });
    },
    addSubmit() {
      var questionreturned = [];
      this.flag = true;
      let _this = this;
      this.modelForm.question.forEach(function (item, index) {
        // console.log(item);
        //单选
        if (item.type == 4) {
          var choice = [];
          item.choices.forEach(function (items) {
            choice.push(items.value);
          });
          console.log(choice);
          if (!(choice[0] === undefined && choice.length === 1)) {
            choice.forEach(function (item) {
              if (item === undefined || item === "") {
                message({
                  message: "请填写选项",
                  type: "warning",
                });
                this.flag = false;
              }
            });
          } else {
            this.flag = false;
          }
          console.log(this.flag);
          if (!this.flag) {
            return;
          }
          let JsonCreateQuestion = {
            desc: item.desc,
            choices: choice,
            question: item.question,
            required: Number(item.required),
          };
          axios({
            method: "post",
            url: "/api/v1/topic/create/single/choice",
            data: JsonCreateQuestion,
            timeout: 1000,
          }).then((res) => {
            console.log(res);
            if (res.data.code == 20000) {
              questionreturned.push({
                itemId: res.data.data.id,
                itemOrder: index + 1,
                itemType: 4,
              });
            } else {
              message({
                message: res.data.msg,
                type: "warning",
              });
            }
          });
        }
        if (item.type == 3) {
          var choice = [];
          item.choices.forEach(function (items) {
            choice.push(items.value);
          });
          console.log(choice);
          choice.forEach(function (item) {
            if (item === undefined || item === "") {
              message({
                message: "请填写选项",
                type: "warning",
              });
              return;
            }
          });
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
            timeout: 1000,
          }).then((res) => {
            console.log(res);
            if (res.data.code == 20000) {
              questionreturned.push({
                itemId: res.data.data.id,
                itemOrder: index + 1,
                itemType: 3,
              });
            } else {
              this.flag = false;
              message({
                message: res.data.msg,
                type: "warning",
              });
            }
          });
        }
        if (item.type == 1) {
          let JsonCreateQuestion = {
            question: item.question,
            required: Number(item.required),
          };
          console.log(JsonCreateQuestion);
          axios({
            method: "post",
            url: "/api/v1/topic/create/fill/blank",
            data: JsonCreateQuestion,
            timeout: 1000,
          }).then((res) => {
            console.log(res);
            if (res.data.code == 20000) {
              questionreturned.push({
                itemId: res.data.data.id,
                itemOrder: index + 1,
                itemType: 1,
              });
            } else {
              _this.flag = false;
              message({
                message: res.data.msg,
                type: "warning",
              });
            }
          });
        }
        if (item.type == 2) {
          if (item.maxScore === undefined) {
            message({
              message: "请填写总分",
              type: "warning",
            });
          }
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
            timeout: 1000,
          }).then((res) => {
            console.log(res);
            if (res.data.code == 20000) {
              questionreturned.push({
                itemId: res.data.data.id,
                itemOrder: index + 1,
                itemType: 2,
              });
            } else {
              _this.flag = false;
              message({
                message: res.data.msg,
                type: "warning",
              });
            }
          });
        }
      });
      // 判断其他内容是否已填
      if (!this.modelForm.head || !this.modelForm.introduction) {
        message({
          message: "请填写问卷标题或简介",
          type: "warning",
        });
        this.flag = false;
      }
      this.modelForm.question.forEach(function (item) {
        console.log(item.choices.length);
        console.log(item.choices[0].value);
        if (item.choices.length === 1 && item.choices[0].value == "") {
          this.flag = false;
          message({
            message: "请填写选项",
            type: "warning",
          });
        }
      });
      if (questionreturned.length === this.modelForm.question.length) {
        this.flag = false;
      }
      console.log(this.flag);
      if (!this.flag) {
        return;
      }
      // TODO: 选项未填仍可通过
      // this.$refs[this.modelForm].validate((valid) => {
      //   if(!valid) {
      //     _this.flag = false;
      //     return;
      //   }
      // })
      // if (! this.flag) {
      //   message({
      //     message: '请检查选项是否填写',
      //     type: 'warning'
      //   })
      //   return;
      // }
      console.log(questionreturned);
      setTimeout(() => {
        let JsonCreateQuestionnaire = {
          head: this.modelForm.head,
          introduction: this.modelForm.introduction,
          isReleased: 0,
          itemList: questionreturned,
          serial: this.modelForm.serial,
          startTime: "1629767826",
          endTime: "1661303826",
        };
        console.log(JsonCreateQuestionnaire);
        if (
          Number(this.modelForm.authority) === 0 &&
          Number(this.modelForm.isLogin) === 0
        ) {
          axios({
            headers: {
              token: JSON.parse(localStorage.getItem("userInfo")).token,
            },
            method: "post",
            url: "/api/v1/questionnaire/create",
            data: JsonCreateQuestionnaire,
            timeout: 1000,
          }).then((res) => {
            if (res.data.code == 20000) {
              console.log(res);
              this.$alert(
                "问卷链接: http://47.93.216.213:8081/questionnare/" +
                  res.data.data.id +
                  "\n所有人均可回答，点击确认回到“问卷列表”界面",
                "创建问卷成功",
                {
                  confirmButtonText: "确定",
                  callback: () => {
                    this.$router.push("/list");
                  },
                }
              );
            } else {
              this.$alert(res.data.msg, {
                confirmButtonText: "确定",
              });
            }
          });
        }
        if (
          Number(this.modelForm.authority) === 1 &&
          Number(this.modelForm.isLogin) === 0 &&
          this.flag
        ) {
          axios({
            headers: {
              token: JSON.parse(localStorage.getItem("userInfo")).token,
            },
            method: "post",
            url: "/api/v1/questionnaire/create/code",
            data: JsonCreateQuestionnaire,
            timeout: 1000,
          }).then((res) => {
            if (res.data.code == 20000) {
              console.log(res);
              this.$alert(
                "问卷链接: http://47.93.216.213:8081/questionnare/" +
                  res.data.data.id +
                  "他人凭借邀请码: " +
                  res.data.data.code +
                  "\n即可回答，请记好邀请码信息，点击确认回到“问卷列表”界面",
                "创建问卷成功",
                {
                  confirmButtonText: "确定",
                  callback: () => {
                    this.$router.push("/list");
                  },
                }
              );
            } else {
              this.$alert(res.data.msg, {
                confirmButtonText: "确定",
              });
            }
          });
        }
        if (
          Number(this.modelForm.authority) === 0 &&
          Number(this.modelForm.isLogin) === 1
        ) {
          axios({
            headers: {
              token: JSON.parse(localStorage.getItem("userInfo")).token,
            },
            method: "post",
            url: "/api/v1/questionnaire/create/login",
            data: JsonCreateQuestionnaire,
            timeout: 1000,
          }).then((res) => {
            if (res.data.code == 20000) {
              console.log(res);
              this.$alert(
                "问卷链接: http://47.93.216.213:8081/questionnare/" +
                  res.data.data.id +
                  "\n他人登录后即可回答，点击确认回到“问卷列表”界面",
                "创建问卷成功",
                {
                  confirmButtonText: "确定",
                  callback: () => {
                    this.$router.push("/list");
                  },
                }
              );
            } else {
              this.$alert(res.data.msg, {
                confirmButtonText: "确定",
              });
            }
          });
        }
        if (
          Number(this.modelForm.authority) === 1 &&
          Number(this.modelForm.isLogin) === 1
        ) {
          axios({
            headers: {
              token: JSON.parse(localStorage.getItem("userInfo")).token,
            },
            method: "post",
            url: "/api/v1/questionnaire/create/login/code",
            data: JsonCreateQuestionnaire,
            timeout: 1000,
          }).then((res) => {
            console.log(res);
            if (res.data.code == 20000) {
              this.$alert(
                "问卷链接: http://47.93.216.213:8081/questionnare/" +
                  res.data.data.id +
                  "\n他人登陆后凭借邀请码: " +
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
            } else {
              this.$alert(res.data.msg, {
                confirmButtonText: "确定",
              });
            }
          });
        }
      }, 1000);
    },
  },
};
</script>
<style scoped>
.questionnare {
  width: 100%;
}
.head {
  margin-bottom: 5px;
}
</style>
<!--
<el-button
      type="text"
      @click="dialogFormVisible = true"
    >新增题目</el-button>
    <el-dialog
      title="题目"
      :visible.sync="dialogFormVisible"
    >
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
          v-for="(item, index) in modelForm.question"
          :key="index"
        >
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                第{{ index+1 }}题,题目:{{ item.question }}
              </template>
              <el-form-item
                :prop="`question.${index}.type`"
                :label="`问题${index + 1}类型`"
                :rules="{ required: true, message: '请选择问题类型', trigger: 'blur' }"
              >
                <el-radio-group v-model="item.type">
                  <el-radio :label="4">单选题</el-radio>
                  <el-radio :label="3">多选题</el-radio>
                  <el-radio :label="1">填空题</el-radio>
                  <el-radio :label="2">评分题</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                :prop="`question.${index}.type`"
                :label="`问题${index + 1}是否必答`"
                :rules="{ required: true, message: '是否必答', trigger: 'blur' }"
              >
                <el-radio-group v-model="item.required">
                  <el-radio :label="0">是</el-radio>
                  <el-radio :label="1">不是</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                :prop="`question.${index}.question`"
                label="问题"
                :rules="{ required: true, message: '请填写问题', trigger: 'blur' }"
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
                :rules="{ required: true, message: '请填写问题描述', trigger: 'blur' }"
              >
                <el-input
                  v-model.trim="item.desc"
                  style="width:258px"
                  clearable
                  placeholder="请填写问题描述"
                />
              </el-form-item>
              <el-form-item
                v-for="(opt, idx) in item.choices"
                v-show="item.type!=1&&item.type!=2"
                :key="idx"
                :label="`选项${idx + 1}`"
                :prop="`question.${index}.choices.${idx}.value`"
                :rules="[
                  { required: true, message: '请输入答案', trigger: 'blur' },
                ]"
              >
                <el-input
                  v-model.trim="opt.value"
                  v-show="item.type==3||item.type==4"
                  style="width:258px"
                  clearable
                  placeholder="请输入答案"
                />
                <el-button
                  style="margin-left: 20px"
                  v-show="item.type==3||item.type==4"
                  @click.prevent="removeDomain(index,idx)"
                >删除</el-button>
              </el-form-item>
              '<el-form-item
                v-for="(opt, idx) in item.choices"
                v-show="item.type==2"
                :key="idx"
                :label="`总分`"
                :prop="`question.${index}.choices.${idx}.value`"
                :rules="[
                  { required: true, message: '请输入总分', trigger: 'blur' },
                ]"
              >
                <el-input
                  v-model="item.maxscore"
                  v-show="item.type==2"
                  style="width:258px"
                  clearable
                  placeholder="请输入总分"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  v-show="item.type!=1 && item.type!=2"
                  @click="addDomain(index)"
                >新增选项</el-button>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </div>
      </vuedraggable>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false;"
        >确 定</el-button>
      </div>
    </el-dialog>
-->
