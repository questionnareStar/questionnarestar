<template>
    <div class="backgroud">
        <div class="back-container">
            <el-button @click="back()">返回</el-button>
            <el-button @click="getPdf(head)">导出为pdf</el-button>
        </div>
        <div id="pdfDom" class="survay-container shadow">
            <div class="title-container">
                <h1>{{head}}</h1>
                <p>{{introduction}}</p>
            </div>
            <ValidationObserver class="question-container" ref="form" v-slot="{ handleSubmit }">
                <form novalidate @submit.prevent="handleSubmit(onSubmit)">
                    <div v-for="(item, index) in itemList" :key="index">
                        <blank-question
                            v-if="item.itemType == 1"
                            @getAnswer="updateAnswer"
                            :id="item.topicId"
                            :serial="serial"
                            :sequence="item.sequence"
                            :question="item.question"
                            :required="item.required"
                            :description="item.description"/>
                        <mark-question
                            v-if="item.itemType == 2"
                            @getAnswer="updateAnswer"
                            :id="item.id"
                            :serial="serial"
                            :sequence="item.sequence"
                            :question="item.question"
                            :required="item.required"
                            :description="item.description"
                            :maxScore="item.maxScore"/>
                        <multi-select
                            v-if="item.itemType == 3"
                            @getAnswer="updateAnswer"
                            :id="item.id"
                            :serial="serial"
                            :sequence="item.sequence"
                            :question="item.question"
                            :required="item.required"
                            :description="item.description"
                            :choices="item.choices"/>
                        <single-select
                            v-if="item.itemType == 4"
                            @getAnswer="updateAnswer"
                            :id="item.id"
                            :serial="serial"
                            :sequence="item.sequence"
                            :question="item.question"
                            :required="item.required"
                            :description="item.description"
                            :choices="item.choices"/>
                        <locate-question
                            v-if="item.itemType == 7"
                            @getAnswer="updateAnswer"
                            :id="item.topicId"
                            :serial="serial"
                            :sequence="item.sequence"
                            :question="item.question"
                            :required="item.required"
                            :description="item.description"/>
                    </div>
                    <div class="foot-container">
                        <button type="submit" class="submit">提交</button>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>

<script>
import BlankQuestion from '../components/questions/BlankQuestion.vue'
import LocateQuestion from '../components/questions/LocateQuestion.vue'
import MarkQuestion from '../components/questions/MarkQuestion.vue'
import MultiSelect from '../components/questions/MultiSelect.vue'
import SingleSelect from '../components/questions/SingleSelect.vue'
import { message } from '../util/inform'
import survey from "../util/service/survey";
const locStr = '【locating】'
/**
 * 1: 填空题
 * 2: 评分题
 * 3: 多选题
 * 4: 单选题
 * 7: 定位题
 */
export default {
    components: { SingleSelect, MultiSelect, MarkQuestion, BlankQuestion, LocateQuestion },
    created() {
        const id = this.$route.params.id
        survey.getQuestionnare(id)
            .then((response) => {
                if (response.data.code === 20000) {
                    const data = response.data.data
                    this.head = data.head
                    this.introduction = data.introduction
                    this.itemList = data.itemList
                    this.serial = data.serial
                    this.id = data.id
                    this.type = data.type
                    for (const item of this.itemList) {
                        let str = String(item.question)
                        if (str.indexOf(locStr) != -1) {
                            item.question = str.substring(10)
                            item.itemType = 7
                        }
                        console.log(item)
                    }
                } else {
                    message({
                        message: response.data.msg,
                        type: 'error'
                    })
                }
            })
            .catch((error) => {
                message({
                    message: error.message,
                    type: 'warning'
                })
            })
    },
    data() {
        return {
            head: '',
            introduction: '',
            itemList: [],
            serial: true,
            id: 0,
            type: 0,
            answers: []
        }
    },
    methods: {
        updateAnswer(data) {
            let flag = true
            for (let i = 0; i < this.answers.length; i++) {
                const item = this.answers[i];
                if (item.topicId === data.topicId) {
                    this.answers[i] = data
                    flag = false
                    break
                }
            }
            if (flag) {
                this.answers.push(data)
            }
            console.log(this.answers)
        },
        onSubmit() {
            message({
                message: '预览不能提交问卷',
                type: 'warning'
            })
        },
        back() {
            if (this.$route.params.from == 1) {
                this.$router.replace('/list')
            } else {
                this.$router.replace('/waste')
            }
        }
    }
}
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
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
}
.title-container {
    margin-bottom: 40px;
}
.question-container {
    width: 80%;
}
.foot-container {
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    margin-top: 25px;
    margin-bottom: 20px;

}
.submit {  
    width: 200px;
    padding:8px;
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
    font-size:125%;
}
.submit:hover {
    background-color: #6c9ac2;
}
.shadow {
    border:1px darkslategray;
    box-shadow: rgb(233, 231, 231) 2px 2px 10px 2px;
}
</style>