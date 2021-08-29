<template>
  <div class="backgroud">
    <div class="back-container">
      <el-button @click="back()">返回</el-button>
      <el-button @click="getPdf(head)">导出为pdf</el-button>
    </div>
    <div
      id="pdfDom"
      class="survay-container shadow"
    >
      <div class="title-container">
        <h1>{{head}}</h1>
        <p>{{introduction}}</p>
      </div>
      <ValidationObserver
        class="question-container"
        ref="form"
        v-slot="{ handleSubmit }"
      >
        <form
          novalidate
          @submit.prevent="handleSubmit(onSubmit)"
        >
          <div
            v-for="(item, index) in itemList"
            :key="index"
          >
            <blank-question
              v-if="item.itemType == 1"
              @getAnswer="updateAnswer"
              :id="item.id"
              :serial="serial"
              :sequence="item.sequence"
              :question="item.question"
              :required="item.required"
              :description="item.description"
              :num="numlist"
              :numlength="numlength"
            />
            <mark-question
              v-if="item.itemType == 2"
              @getAnswer="updateAnswer"
              :id="item.id"
              :serial="serial"
              :sequence="item.sequence"
              :question="item.question"
              :required="item.required"
              :description="item.description"
              :maxScore="item.maxScore"
              :num="numlist"
              :numlength="numlength"
            />
            <voting-multi-select
              v-if="item.itemType == 3"
              @getAnswer="updateAnswer"
              :id="item.id"
              :serial="serial"
              :sequence="item.sequence"
              :question="item.question"
              :required="item.required"
              :description="item.description"
              :choices="item.choices"
              :num="numlist"
              :numlength="numlength"
            />
            <voting-single-select
              v-if="item.itemType == 4"
              @getAnswer="updateAnswer"
              :id="item.id"
              :serial="serial"
              :sequence="item.sequence"
              :question="item.question"
              :required="item.required"
              :description="item.description"
              :choices="item.choices"
              :num="numlist"
              :numlength="numlength"
            />
          </div>
          <div class="foot-container">
            <button
              type="submit"
              class="submit"
            >提交</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import BlankQuestion from "../components/questions/BlankQuestion.vue";
import MarkQuestion from "../components/questions/MarkQuestion.vue";
import VotingMultiSelect from "../components/questions/VotingMultiSelect.vue";
import VotingSingleSelect from "../components/questions/VotingSingleSelect.vue";
import { message } from "../util/inform";
import survey from "../util/service/survey";
import axios from "axios";
/**
 * 3: 多选题
 * 4: 单选题
 */
export default {
  components: {
    BlankQuestion,
    MarkQuestion,
    VotingMultiSelect,
    VotingSingleSelect,
  },
  created() {
    const id = this.$route.params.id;
    survey
      .getQuestionnare(id)
      .then((response) => {
        console.log(response);
        if (response.data.code === 20000) {
          const data = response.data.data;
          if (data.isReleased) {
            this.head = data.head;
            this.introduction = data.introduction;
            this.itemList = data.itemList;
            this.serial = data.serial;
            this.id = data.id;
            this.type = data.type;
            axios({
              headers: {
                contentType: "application/x-www-form-urlencoded",
              },
              method: "GET",
              url:
                "http://47.93.216.213:3344/api/v1/questionnaire/find/answer/" +
                data.id,
            }).then((response) => {
              console.log(response);
              const data = response.data.data;
              console.log(data);
              for (let i = 0; i < data.length; i++) {
                var templist = [];
                for (let j = 0; j < data[i].choices.length; j++) {
                  templist.push(data[i].choices[j].num);
                }
                this.numlist.push(templist);
                console.log(templist);
              }
              console.log(this.numlist);
              this.numlength = this.numlist.length;
              console.log(this.numlength);
            });
          } else {
            this.$alert("当前问卷未开放，无法提交", "错误", {
              confirmButtonText: "确定",
              callback: (action) => {
                this.$router.push("/welcome");
              },
            });
          }
        } else {
          message({
            message: response.data.msg,
            type: "error",
          });
        }
      })
      .catch((error) => {
        message({
          message: error.message,
          type: "warning",
        });
      });
  },
  data() {
    return {
      head: "",
      introduction: "",
      itemList: [],
      serial: true,
      id: 0,
      type: 0,
      answers: [],
      numlist: [],
      ideal: 0,
      numlength: 0,
    };
  },
  methods: {
    updateAnswer(data) {
      let flag = true;
      for (let i = 0; i < this.answers.length; i++) {
        const item = this.answers[i];
        if (item.topicId === data.topicId) {
          this.answers[i] = data;
          flag = false;
          break;
        }
      }
      if (flag) {
        this.answers.push(data);
      }
    },
    onSubmit() {
      message({
        message: "预览不能提交问卷",
        type: "warning",
      });
    },
    back() {
      if (this.$route.params.from == 1) {
        this.$router.replace("/list");
      } else {
        this.$router.replace("/waste");
      }
    },
  },
};
</script>

<style scoped>
.backgroud {
  background-color: rgb(240, 245, 243);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 1000px;
}
.survay-container {
  background-color: rgba(255, 255, 255, 0.85);
  position: absolute;
  left: 50%;
  top: 100px;
  transform: translate(-50%, 0);
  width: 60%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.question-container {
  width: 80%;
}
.foot-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  margin-bottom: 20px;
}
.submit {
  width: 200px;
  padding: 8px;
  background-color: #428bca;
  border-color: #357ebd;
  color: #fff;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  -khtml-border-radius: 10px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  font-weight: 900;
  font-size: 125%;
}
.submit:hover {
  background-color: #6c9ac2;
}
.shadow {
  border: 1px darkslategray;
  box-shadow: rgb(233, 231, 231) 2px 2px 10px 2px;
}
</style>
