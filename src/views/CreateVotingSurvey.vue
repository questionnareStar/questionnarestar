<template>
  <div class="container-fluid p-20">
    <div class="row">
      <div class="col-md-8">
        <div class="shadow ml-40 p-5">
          <!-- 问卷抬头 -->
          <div class="header">
            <div class="mouseon">
              <div
                class="center-block"
                @click="titleEdit=!titleEdit"
              >
                <el-input
                  v-if="titleEdit"
                  v-focus
                  type="textarea"
                  autosize
                  @blur="titleEdit=false"
                  v-model="data.head"
                />
                <h3 v-else>{{data.head}}</h3>
              </div>
              <div
                class="clearfix pd-5"
                width="100%"
              >
                <div class="pull-right">
                  <el-button
                    v-if="titleEdit"
                    type="success"
                    icon="el-icon-check"
                    size="small"
                    circle
                    @click="titleEdit=false"
                  />
                  <el-button
                    v-else
                    type="primary"
                    icon="el-icon-edit"
                    size="small"
                    circle
                    @click="titleEdit=true"
                  />
                </div>
              </div>
            </div>
            <div class="mouseon">
              <div
                class="center-block"
                @click="desEdit=!desEdit"
              >
                <el-input
                  v-if="desEdit"
                  v-focus
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  @blur="desEdit=false"
                  v-model="data.introduction"
                />
                <p v-else>{{data.introduction}}</p>
              </div>
              <div
                class="clearfix pd-5"
                width="100%"
              >
                <div class="pull-right">
                  <el-button
                    v-if="desEdit"
                    type="success"
                    icon="el-icon-check"
                    size="small"
                    circle
                    @click="desEdit=false"
                  />
                  <el-button
                    v-else
                    type="primary"
                    icon="el-icon-edit"
                    size="small"
                    circle
                    @click="desEdit=true"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- 问卷内容 -->
          <div class="body p-5">
            <draggable
              v-model="data.questions"
              @start="onStart"
              @end="onEnd"
            >
              <transition-group>
                <div
                  v-for="(item, index) in data.questions"
                  :key="index"
                  class="cursoron"
                >
                  <!-- 填空题 -->
                  <div v-if="item.type === 1">
                    <el-row class="mb-8">
                      <span
                        class="question"
                        v-if="data.serial"
                      >{{index + 1}}</span>
                      <span class="question">{{item.question}}</span>
                      <span
                        class="question red"
                        v-if="item.required"
                      >*</span>
                    </el-row>
                    <el-row class="mb-8">
                      <span class="des">{{item.desc}}</span>
                    </el-row>
                    <el-row class="mb-8">
                      <el-input
                        type="textarea"
                        autosize
                        disabled
                        placeholder="此处作答"
                      />
                    </el-row>
                  </div>
                  <!-- 评分题 -->
                  <div
                    class="cursoron"
                    v-if="item.type === 2"
                  >
                    <el-row class="mb-8">
                      <span
                        class="question"
                        v-if="data.serial"
                      >{{index + 1}}</span>
                      <span class="question">{{item.question}}</span>
                      <span
                        class="question red"
                        v-if="item.required"
                      >*</span>
                    </el-row>
                    <el-row class="mb-8">
                      <span class="des">{{item.desc}}</span>
                    </el-row>
                    <el-row class="mb-8">
                      <el-rate :max="item.maxScore" />
                    </el-row>
                  </div>
                  <!-- 多选题 -->
                  <div
                    class="cursoron"
                    v-if="item.type === 3"
                  >
                    <el-row class="mb-8">
                      <span
                        class="question"
                        v-if="data.serial"
                      >{{index + 1}}</span>
                      <span class="question">{{item.question}}</span>
                      <span
                        class="question red"
                        v-if="item.required"
                      >*</span>
                      【多选题】
                    </el-row>
                    <el-row class="mb-8">
                      <span class="des">{{item.desc}}</span>
                    </el-row>
                    <el-row class="mb-8">
                      <el-checkbox
                        class="choice-block"
                        v-for="(choice, idx) in item.choices"
                        :key="idx"
                        :label="choice.value"
                      >{{choice.value}}</el-checkbox>
                    </el-row>
                  </div>
                  <!-- 单选题 -->
                  <div
                    class="cursoron"
                    v-if="item.type === 4"
                  >
                    <el-row class="mb-8">
                      <span
                        class="question"
                        v-if="data.serial"
                      >{{index + 1}}</span>
                      <span class="question">{{item.question}}</span>
                      <span
                        class="question red"
                        v-if="item.required"
                      >*</span>
                    </el-row>
                    <el-row class="mb-8">
                      <span class="des">{{item.desc}}</span>
                    </el-row>
                    <el-row class="mb-8">
                      <el-radio
                        class="choice-block"
                        v-for="(choice, idx) in item.choices"
                        :key="idx"
                        :label="choice.value"
                      >{{choice.value}}</el-radio>
                    </el-row>
                  </div>
                  <el-row>
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      size="small"
                      circle
                      @click.native="editQ(index, item)"
                    />
                    <el-button
                      type="info"
                      icon="el-icon-document-copy"
                      size="small"
                      circle
                      @click.native="copyQ(item)"
                    />
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="small"
                      circle
                      @click.native="deleteQ(index)"
                    />
                  </el-row>
                  <el-divider class="mt-8" />
                </div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </div>
      <!-- 操作面板 -->
      <div class="col-md-4">
        <div class="ml-10 panel">
          <div class="shadow p-5 mb-20">
            <h3>问卷设置</h3>
            <el-divider />
            <el-row class="mb-8">
              <el-switch
                v-model="data.serial"
                active-text="显示题号"
              />
            </el-row>
            <el-row class="mb-8">
              <el-switch
                v-model="setEndtime"
                active-text="截止时间"
              />
            </el-row>
            <el-row
              class="mb-8"
              v-if="setEndtime"
            >
              <el-date-picker
                v-model="data.endTime"
                type="date"
                placeholder="选择日期"
                :picker-options="datePickerOptions"
              />
            </el-row>
            <el-row class="mb-8 p-5">
              <el-button
                type="primary"
                @click.native="submit()"
              >提交</el-button>
            </el-row>
          </div>
          <div class="shadow p-5 mb-20">
            <h3>添加题目</h3>
            <el-divider />
            <el-row class="ml-40 mb-8 p-5">
              <el-button
                type="primary"
                plain
                @click="single.visible = true"
              ><em class="el-icon-plus mr-5" />单选题</el-button>
              <el-button
                type="primary"
                plain
                @click="multi.visible = true"
              ><em class="el-icon-plus mr-5" />多选题</el-button>
            </el-row>
            <el-row class="ml-40 mb-8 p-5">
              <el-button
                type="primary"
                plain
                @click="blank.visible = true"
              ><em class="el-icon-plus mr-5" />填空题</el-button>
              <el-button
                type="primary"
                plain
                @click="mark.visible = true"
              ><em class="el-icon-plus mr-5" />评分题</el-button>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <!-- 填空题 -->
    <el-dialog
      title="编辑填空题"
      :visible.sync="blank.visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form :model="blank">
        <el-form-item label="题目">
          <el-input
            v-model="blank.question"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="blank.desc"
            placeholder="此处输入题目描述"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-switch
            v-model="blank.required"
            active-text="必答"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click.native="addBlank()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 评分题 -->
    <el-dialog
      title="编辑评分题"
      :visible.sync="mark.visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form :model="mark">
        <el-form-item label="题目">
          <el-input
            v-model="mark.question"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="mark.desc"
            placeholder="此处输入题目描述"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-input-number
            v-model="mark.maxScore"
            :min="2"
            :max="20"
            label="最大分数"
          />
        </el-form-item>
        <el-form-item>
          <el-switch
            v-model="mark.required"
            active-text="必答"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="addMark()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 多选题 -->
    <el-dialog
      title="编辑多选题"
      :visible.sync="multi.visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form :model="multi">
        <el-form-item label="题目">
          <el-input
            v-model="multi.question"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="multi.desc"
            placeholder="此处输入题目描述"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <div
            v-for="(item, index) in multi.choices"
            :key="index"
          >
            <div class="edit_choice">
              <span>{{`选项${index+1}  `}}</span>
              <input v-model="item.value" />
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="el-icon-plus"
            size="small"
            circle
            @click="multi.choices.push({ value: '新增选项' })"
          />
          <el-button
            type="danger"
            class="el-icon-minus"
            size="small"
            circle
            @click="multi.choices.pop()"
          />
        </el-form-item>
        <el-form-item>
          <el-switch
            v-model="multi.required"
            active-text="必答"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="addMulti()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 单选题 -->
    <el-dialog
      title="编辑单选题"
      :visible.sync="single.visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-form :model="single">
        <el-form-item label="题目">
          <el-input
            v-model="single.question"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="single.desc"
            placeholder="此处输入题目描述"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <div
            v-for="(item, index) in single.choices"
            :key="index"
          >
            <div class="edit_choice">
              <span>{{`选项${index+1}  `}}</span>
              <input v-model="item.value" />
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="el-icon-plus"
            size="small"
            circle
            @click="single.choices.push({ value: '新增选项' })"
          />
          <el-button
            type="danger"
            class="el-icon-minus"
            size="small"
            circle
            @click="single.choices.pop()"
          />
        </el-form-item>
        <el-form-item>
          <el-switch
            v-model="single.required"
            active-text="必答"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="addSingle()"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { message } from "../util/inform";
import survey from "../util/service/survey";
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      editIndex: -1,
      titleEdit: false,
      desEdit: false,
      setEndtime: false,
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now();
        },
        shortcuts: [
          {
            text: "五天",
            onClick(picker) {
              picker.$emit("pick", Date.now() + 1000 * 3600 * 24 * 5);
            },
            multi: {
              visible: false,
              sequence: 4,
              question: "请输入题目",
              desc: "",
              required: true,
              choices: [{ value: "新增选项" }],
            },
          },
        ],
      },
      data: {
        head: "请在此处输入问卷标题",
        introduction: "请在此处输入问卷描述",
        isReleased: 0,
        serial: true, // 是否显示题号
        questions: [],
        startTime: "1629388800000",
        endTime: "",
      },
      multi: {
        visible: false,
        question: "请输入题目",
        desc: "",
        required: true,
        choices: [{ value: "新增选项" }],
      },
      single: {
        visible: false,
        question: "请输入题目",
        desc: "",
        required: true,
        choices: [{ value: "新增选项" }],
      },
      itemList: [],
    };
  },
  methods: {
    resetModel() {
      this.multi = {
        visible: false,
        question: "请输入题目",
        desc: "",
        required: true,
        choices: [{ value: "新增选项" }],
      };
      this.single = {
        visible: false,
        question: "请输入题目",
        desc: "",
        required: true,
        choices: [{ value: "新增选项" }],
      };
    },
    addMulti() {
      let q = {
        type: 3,
        desc: this.multi.desc,
        question: this.multi.question,
        required: this.multi.required,
        choices: this.multi.choices,
      };
      if (this.editIndex == -1) {
        this.data.questions.push(q);
      } else {
        this.data.questions[this.editIndex] = q;
        this.editIndex = -1;
      }
      this.resetModel();
    },
    addSingle() {
      let q = {
        type: 4,
        desc: this.single.desc,
        question: this.single.question,
        required: this.single.required,
        choices: this.single.choices,
      };
      if (this.editIndex == -1) {
        this.data.questions.push(q);
      } else {
        this.data.questions[this.editIndex] = q;
        this.editIndex = -1;
      }
      this.resetModel();
    },
    editQ(index, item) {
      this.editIndex = index;
      switch (item.type) {
        case 1:
          this.blank = {
            visible: true,
            question: item.question,
            desc: item.desc,
            required: item.required,
          };
          break;
        case 2:
          this.mark = {
            visible: true,
            question: item.question,
            desc: item.desc,
            required: item.required,
            maxScore: item.maxScore,
          };
          break;
      }
    },
    copyQ(item) {
      let q = JSON.parse(JSON.stringify(item));
      this.data.questions.push(q);
    },
    deleteQ(index) {
      this.data.questions.splice(index, 1);
    },
    onStart() {
      this.drag = true;
    },
    onEnd() {
      this.drag = false;
    },
    async submitQuestion() {
      let formData;
      for (let i = 0; i < this.data.questions.length; i++) {
        const item = this.data.questions[i];
        switch (item.type) {
          case 1:
            formData = {
              question: item.question,
              desc: item.desc,
              required: Number(item.required),
            };
            await survey.createBlank(formData).then((response) => {
              if (response.data.code === 20000) {
                console.log("题目信息");
                console.log(response.data);
                this.itemList.push({
                  itemId: response.data.data.id,
                  itemOrder: i + 1,
                  itemType: 1,
                });
                console.log(this.itemList);
              }
            });
            console.log(i + "q");
            break;
          case 2:
            formData = {
              question: item.question,
              desc: item.desc,
              maxScore: item.maxScore,
              required: Number(item.required),
            };
            await survey.createMark(formData).then((response) => {
              if (response.data.code === 20000) {
                this.itemList.push({
                  itemId: response.data.data.id,
                  itemOrder: i + 1,
                  itemType: 2,
                });
              }
            });
            console.log(i + "q");
            break;
        }
      }
    },
    async submitQuestionnare(submitData) {
      survey
        .createQuestionnare(submitData)
        .then((response) => {
          console.log(response);
          if (response.data.code === 20000) {
            this.$store.commit("updateOperation", {
              id: response.data.data.id,
              code: response.data.data.code,
              isReleased: false,
            });
            this.$router.push("/publish");
            message({
              message: response.data.msg,
              type: "success",
            });
          } else {
            message({
              message: response.data.msg,
              type: "warning",
            });
          }
        })
        .catch((error) => {
          message({
            message: error.message,
            type: "error",
          });
        });
    },
    async submit() {
      if (this.setEndtime) {
        if (this.data.endTime === "") {
          message({
            message: "请选择截止日期",
            type: "warning",
          });
          return;
        }
      }
      await this.submitQuestion();
      let submitData = {
        endTime: this.setEndtime ? this.data.endTime : "4785667200000",
        head: this.data.head,
        introduction: this.data.introduction,
        isReleased: 0,
        itemList: this.itemList,
        serial: this.data.serial,
        startTime: this.data.startTime,
        stamp: 2, // 投票问卷
      };
      this.submitQuestionnare(submitData);
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.children[0].focus();
        },
      },
    },
  },
};
</script>

<style scoped="scoped">
.p-20 {
  padding: 20px;
}
.p-5 {
  padding: 5px;
}
.mb-8 {
  margin-bottom: 8px;
}
.mb-20 {
  margin-bottom: 20px;
}
.ml-15 {
  margin-left: 15px;
}
.ml-40 {
  margin-left: 40px;
}
.mr-5 {
  margin-right: 5px;
}
.shadow {
  border: 1px darkslategray;
  box-shadow: rgb(233, 231, 231) 2px 2px 10px 1px;
}
.mouseon:hover {
  padding: 2px;
  background-color: rgb(235, 246, 255);
}
.cursoron:hover {
  cursor: move;
  background-color: rgb(245, 247, 248);
}
.blank {
  width: 85%;
  margin-bottom: 8px;
}
h3 {
  font-weight: bold;
}
span.question {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}
span.des {
  font-size: 13px;
  font-weight: lighter;
}
span.red {
  color: red;
}
.choice-block {
  display: block;
  margin: 3px;
  font-size: 16px;
}
.panel {
  padding: 10px;
  width: 350px;
  position: fixed;
  right: 100px;
  top: 100px;
}
</style>
