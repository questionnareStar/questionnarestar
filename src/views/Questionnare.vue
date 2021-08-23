<template>
    <div class="backgroud">
        <div class="survay-container">
            <div class="title-container">
                <h1>{{head}}</h1>
                <p>{{introduction}}</p>
            </div>
            <div class="question-container">
                <div v-for="(item, index) in itemList" :key="index">
                    <blank-question
                        v-if="item.itemType == 1"
                        @getAnswer="updateAnswer"
                        :id="item.id"
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BlankQuestion from '../components/questions/BlankQuestion.vue'
import MarkQuestion from '../components/questions/MarkQuestion.vue'
import MultiSelect from '../components/questions/MultiSelect.vue'
import SingleSelect from '../components/questions/SingleSelect.vue'
/**
 * 1: 填空题
 * 2: 评分题
 * 3: 多选题
 * 4: 单选题
 */
export default {
    components: { SingleSelect, MultiSelect, MarkQuestion, BlankQuestion },
    created() {

    },
    data() {
        return {
            head: '饮食情况调查',
            introduction: '对您的身体状况做出评估',
            itemList: [
                {
                    itemType: 4,
                    id: 3,
                    question: '你喜欢吃什么',
                    description: 'des',
                    choices: [
                        'A苹果',
                        'B香蕉',
                        'C馒头',
                        'D茄子'
                    ],
                    required: 1,
                    sequence: 1
                },
                {
                    itemType: 3,
                    id: 5,
                    question: '时间',
                    choices: [
                        '早上',
                        '中午',
                        '晚上',
                        '清晨'
                    ],
                    required: 1,
                    sequence: 2
                },
                {
                    itemType: 2,
                    id: 6,
                    question: '打分',
                    maxScore: 10,
                    required: 1,
                    sequence: 3
                },
                {
                    itemType: 1,
                    id: 7,
                    question: '填空',
                    description: '描述',
                    required: 1,
                    sequence: 4
                }
            ],
            serial: true,
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
        }
    }
}
</script>

<style scoped>
.backgroud {
    background-image: url(../assets/questionnare.jpg);
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
.question-container {
    width: 55%;
}
</style>