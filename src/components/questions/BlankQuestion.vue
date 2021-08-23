<template>
    <div style="width=85% mb-8 height=100px">
        <el-row class="question-title mb-8">
            <span v-if="serial">{{sequence}}</span>
            <span>{{question}}</span>
            <span v-if="required" class="red">*</span>
        </el-row>
        <el-row v-if="description" class="question-des mb-8">
            <span>{{description}}</span>
        </el-row>
        <el-row class="question-choices mb-8">
            <el-input v-model="answers[0]" type="textarea" autosize placeholder="请输入内容" @change="onchange()"/>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ['id', 'serial', 'sequence', 'question', 'required', 'description'],
    data() {
        return {
            answers: []
        }
    },
    methods: {
        onchange() {
            let data = {
                answerList: this.answers,
                itemType: 1,
                topicId: this.$props.id
            }
            this.$emit('getAnswer', data)
        }
    }
}
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
    font-weight:lighter;
}
.red {
    color: red;
}
</style>