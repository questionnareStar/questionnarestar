<template>
    <div class="backgroud">
        <div class="survay-container">
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
import MarkQuestion from '../components/questions/MarkQuestion.vue'
import MultiSelect from '../components/questions/MultiSelect.vue'
import SingleSelect from '../components/questions/SingleSelect.vue'
import { message } from '../util/inform'
import survey from "../util/service/survey";
/**
 * 1: 填空题
 * 2: 评分题
 * 3: 多选题
 * 4: 单选题
 */
export default {
    components: { SingleSelect, MultiSelect, MarkQuestion, BlankQuestion },
    created() {
        const id = this.$route.params.id
        survey.getQuestionnare(id)
            .then((response) => {
                console.log(response)
                if (response.data.code === 20000) {
                    const data = response.data.data
                    if (data.isReleased) {
                        // TODO: 添加对于登录的验证
                        if (data.type === 2 || data.type === 3) {
                            message({
                                message: '本问卷需登录方可填写',
                                type: 'info'
                            })
                            this.$$router.push('/auth/validate/' + data.id)
                        }
                        this.head = data.head
                        this.introduction = data.introduction
                        this.itemList = data.itemList
                        this.serial = data.serial
                        this.id = data.id
                        this.type = data.type
                    } else {
                        this.$alert('当前问卷未开放，无法提交', '错误', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push('/auth/login')
                            }
                        })
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
        },
        onSubmit() {
            console.log('提交数据')
            switch (this.type) {
                case 0:
                case 2:
                    this.submit()
                    break
                case 1:
                case 3:
                    this.$prompt('请输入邀请码', '此问卷需要邀请码', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(({ value }) => {
                        this.codeSubmit(value)
                    }).catch(() => {
                        message({
                            type: 'info',
                            message: '取消提交'
                        })
                    })
                    break
                default:
                    message({
                        message: '未知错误',
                        type: 'warning'
                    })
                    break;
            }
        },
        submit() {
            survey.submitSurvey(this.id, this.answers)
                .then((response) => {
                    console.log(response)
                    const data = response.data
                    if (data.code === 20000) {
                        message({
                            message: '提交成功',
                            type: 'success'
                        })
                        this.$router.push('/finish')
                    } else {
                        message({
                            message: data.msg,
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
        async codeSubmit(value) {
            // TODO: 待测试
            let flag = false
            await survey.validateAuthority(this.id, value)
                .then((response) => {
                    console.log(response)
                    const data = response.data
                    if (data.code === 20000) {
                        flag = true
                    } else {
                        message({
                            message: '邀请码错误',
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
            if (flag) this.submit()
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
</style>