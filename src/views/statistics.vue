<template>
<div>
    <div class="output">
        <el-tooltip effect="dark" content="导出数据" placement="top-start">
            <el-button type="primary" class="el-icon-download" circle @click="output()"/>
        </el-tooltip>
    </div>
    <el-card class="box-card" shadow="always">
        <el-page-header @back="goBack" v-bind:content="'------------------------------------------------------------------------------------'+title+'------------------------------------------------------------------------------------'">
        </el-page-header>
    </el-card>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1">总体数据</el-menu-item>
        <el-menu-item @click="s()" index="2">各题数据</el-menu-item>
        <el-menu-item @click="d()" index="3">交叉分析</el-menu-item>
    </el-menu>
    <div v-if="activeIndex==1">
        <el-row class="monitor-header-two" :gutter="20">
            <el-col :span="24">
                <div class="monitor-cart-name">

                    <div class="monitor-cart-name-left-icon">
                        <i class="el-icon-s-data"></i>
                    </div>
                    <div class="monitor-cart-name-left-1">
                        每日填写量数据统计-[总填写量：{{this.whole}}]
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="monitor-visitors">
                    <ve-histogram :data="chartData"></ve-histogram>
                </div>
            </el-col>
        </el-row>
    </div>
    <div v-else-if="activeIndex==2">
        <el-card class="box-card" shadow="always">

            <el-card class="form">
                <el-form>
                    <el-form-item label="选择查看的题目:">
                        <el-select @change="changeSelect()" v-model="option" placeholder="请选择" size="medium">
                            <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-card>
        <div v-if="quID==0">
            <el-row class="monitor-header-two" :gutter="20">
                <el-col :span="24">
                    <div class="monitor-cart-name">
                        <div class="monitor-cart-name-left-icon">
                            <i class="el-icon-s-data"></i>
                        </div>
                        <div class="monitor-cart-name-left">
                            {{option}}--填写量：{{total}}
                        </div>
                        <div class="monitor-cart-name-right">
                            <div class="monitor-cart-name-right-list">题目类型:</div>
                            <div class="monitor-cart-name-right-list">{{type}}</div>
                            <div class="monitor-cart-name-right-list"></div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="monitor-visitors monitor-visitors-scale">
                        <div class="monitor-visitors-left">
                            <ve-ring :data="scaleData" :colors="colors"></ve-ring>
                        </div>
                        <div class="monitor-visitors-right">
                            <el-card class="monitor-visitors-right-list" v-for="(item,index) in colors" :key="index">
                                <div class="monitor-visitors-right-list-content" shadow="hover">
                                    {{scaleData.rows[index]['类目']}}：{{scaleData.rows[index]['内容']}}
                                </div>
                            </el-card>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-else-if="quID==1">
            <el-row class="monitor-header-two" :gutter="20">
                <el-col :span="24">
                    <div class="monitor-cart-name">
                        <div class="monitor-cart-name-left-icon">
                            <i class="el-icon-s-data"></i>
                        </div>
                        <div class="monitor-cart-name-left">
                            {{option}}--填写量：{{total}}
                        </div>
                        <div class="monitor-cart-name-right">
                            <div class="monitor-cart-name-right-list">题目类型:</div>
                            <div class="monitor-cart-name-right-list">{{type}}</div>
                            <div class="monitor-cart-name-right-list"></div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <el-table :data="tableData" :border="true" height="900" style="width: 100%">
                        <el-table-column label="序号" width="50px">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.id }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="---------------------------------------------------------------------------------------------------------------------------------------------------题目回答--------------------------------------------------------------------------------------------------------------------------------------------------------------" width="1500px">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.answer }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
    </div>
    <div v-else-if="activeIndex==3">
        <el-row class="monitor-header-two" :gutter="20">
            <el-col :span="24">
                <div class="monitor-cart-name">

                    <div class="monitor-cart-name-left-icon">
                        <i class="el-icon-s-data"></i>
                    </div>
                    <div class="monitor-cart-name-left-2">
                        选择两个题目进行选项交叉分析
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="monitor-visitors">
                    <el-card>
                        <el-row>
                            <el-col :span="3">
                                <p class="ch">请选择题目一:</p>
                            </el-col>
                            <el-col :span="6">
                                <el-select class="select" @change="changeSelect1()" v-model="option1" placeholder="请选择" size="medium">
                                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.label">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="3">
                                <p class="ch">请选择题目二:</p>
                            </el-col>
                            <el-col :span="6">
                                <el-select class="select" @change="changeSelect2()" v-model="option2" placeholder="请选择" size="medium">
                                    <el-option v-for="item in options2" :key="item.label" :label="item.label" :value="item.label">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="primary" @click="submit()" class="el-button">开始分析</el-button>
                            </el-col>
                        </el-row>
                    </el-card>
                    <ve-ring :data="chartData1" :colors="colors" height="2500px" :settings="chartSettings" :extend="chartExtend" width="1500px">
                                    </ve-ring>
                </div>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script>
import list from "../util/service/list.js";
import axios from '../util/service/index'
import {
    message
} from "../util/inform.js";
import { export_json_to_excel } from '../util/vendor/Export2Excel'
export default {
    mounted() {
        let detal = ""
        let wholeData = JSON.parse(localStorage.getItem('statisticsWhole')).data
        let data = JSON.parse(localStorage.getItem('statistics')).data
        let quDetail = []
        for (let item of JSON.parse(localStorage.getItem('questionDetail')).itemList) {
            quDetail.unshift(item)
        }
        this.quDetail = quDetail
        let i = 1
        let format = ""
        for (let item of wholeData.rawRecords) {
            this.rawRecords.push({
                answerTime: item.answerTime,
                recordId: item.recordId,
                userAccount: item.userAccount
            })
        }
        this.whole = 0
        for (let item of wholeData.answerNumbers) {
            this.chartData.rows.push({
                日期: this.formatDate(item.date),
                填写量: item.number
            })
            this.whole = this.whole + item.number
        }
        i = 1
        for (let item of data.questions) {
            if (item.type == 1)
                format = "题目" + i + ":" + item.topic + "[" + "填空题]"
            else if (item.type == 2)
                format = "题目" + i + ":" + item.topic + "[" + "评分题]"
            else if (item.type == 4)
                format = "题目" + i + ":" + item.topic + "[" + "单选题]"
            else
                format = "题目" + i + ":" + item.topic + "[" + "多选题]"
            this.options.push({
                value: i,
                label: format,
                type: item.type,
                Quid: quDetail[i - 1].topicId
            })
            i = i + 1
        }
        i = 0
        for (let item of data.questions) {
            i = i + 1
            if (item.type == 1)
                continue
            else if (item.type == 2)
                continue
            else if (item.type == 4)
                format = "题目" + i + ":" + item.topic + "[" + "单选题]"
            else
                format = "题目" + i + ":" + item.topic + "[" + "多选题]"
            this.options1.push({
                value: i,
                label: format,
                type: item.type,
                Quid: quDetail[i - 1].topicId
            })
            this.options2.push({
                value: i,
                label: format,
                type: item.type,
                Quid: quDetail[i - 1].topicId
            })
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            this.activeIndex = key
        },
        formatDate(value) {
            let date = new Date(value);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d + ' ';
        },
        formatDateM(value) {
            let date = new Date(value);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        },
        refresh() {
            list.getStatistics(JSON.parse(localStorage.getItem('questionnaireID'))).then((res) => {
                console.log(res);
                localStorage.setItem("statistics", JSON.stringify(res.data))
                let data = JSON.parse(localStorage.getItem('statistics')).data
                console.log(data)
                let i = 1
                let format = ""
                for (let item of data.questions) {
                    if (item.type == 1)
                        format = "题目" + i + ":" + item.topic + "[" + "填空题]"
                    else if (item.type == 2)
                        format = "题目" + i + ":" + item.topic + "[" + "评分题]"
                    else if (item.type == 3)
                        format = "题目" + i + ":" + item.topic + "[" + "单选题]"
                    else
                        format = "题目" + i + ":" + item.topic + "[" + "多选题]"
                    this.options.push({
                        value: i,
                        label: format,
                        type: item.type
                    })
                    i = i + 1
                }
                this.$router.go(0);
            })
        },
        goBack() {
            this.$router.push("/list");
        },
          changeSelect1() {
            this.message1 = this.options1[this.option1.substring(2, 3) - this.options1[0].value]
            console.log("message1")
            console.log(this.message1)
        },
        changeSelect2() {
            this.message2 = this.options2[this.option2.substring(2, 3) - this.options2[0].value]
            console.log("message2")
            console.log(this.message2)
        },
        s() {
            this.changeSelect()
        },
        d() {
            this.colors = []
            this.submit()
        },
        submit() {
            this.chartData1.rows = []
            this.data = []
            this.colors=[]
               if(this.option1==""&&this.option2!=""){
                 message({
                message: '题目1为空！',
                type: 'error'
            })
            return
            }
            if(this.option2==""&&this.option1!=""){
                 message({
                message: '题目2为空！',
                type: 'error'
            })
            return
            }
            if(this.option1==this.option2&&this.option1!=""){
                 message({
                message: '选择的题目重复！',
                type: 'error'
            })
            return
            }
            list.getcross(JSON.parse(localStorage.getItem('questionnaireID')), this.message1.type, this.message1.Quid, this.message2.type, this.message2.Quid).then((res) => {
                console.log("交叉分析")
                console.log(res)
                this.data = res.data.data
                this.i = 0
                this.j = 0
                let q = 1
                for (let item of this.data.analysisResult) {
                    console.log(item)
                    for (let key of item) {
                        this.chartData1.rows.push({
                            Quname: "题目1:" + this.data.question1Choices[this.i] + ";题目2:" + this.data.question2Choices[this.j],
                            num: item[this.j],
                        })
                        this.j++
                        this.colors[q - 1] = this.colorMax[q - 1]
                        q++
                    }
                    this.i++
                    this.j = 0
                }
                console.log(this.chartData1)
            })
        },
        changeSelect() {
            this.scaleData.rows = []
            this.colors = []
            this.tableData = []
            this.type = ((this.option.split("").reverse().join("")).substring(1, 4)).split("").reverse().join("")
            let ques = JSON.parse(localStorage.getItem('statistics')).data.questions
            if (this.type == "填空题") {
                this.quID = 1
                let i = 1
                this.quesNum = this.option.substring(2, 3) - "0" - 1

                for (let item of ques[this.quesNum].answers) {
                    this.tableData.push({
                        id: i,
                        answer: item
                    })
                    i = i + 1
                }
                this.total = i - 1
            } else if (this.type == "评分题") {
                this.quID = 0
                let i = 1
                this.quesNum = this.option.substring(2, 3) - "0" - 1
                this.total = 0
                for (let item of ques[this.quesNum].choices) {
                    this.colors[i - 1] = this.colorMax[i - 1]
                    this.scaleData.rows.push({
                        类目: "选项" + i,
                        填写量: item.number,
                        内容: item.mark + "分",
                    })
                    this.total = this.total + item.number
                    i = i + 1
                }
            } else if (this.type == "单选题" || this.type == "多选题") {
                this.quID = 0
                let i = 1
                this.total = 0
                this.quesNum = this.option.substring(2, 3) - "0" - 1
                for (let item of ques[this.quesNum].choices) {
                    this.colors[i - 1] = this.colorMax[i - 1]
                    this.scaleData.rows.push({
                        类目: "选项" + i,
                        填写量: item.number,
                        内容: item.choice,
                    })
                    this.total = this.total + item.number
                    i = i + 1
                }
            }
        },
        exportDataWhole() {
            const {
                export_json_to_excel
            } = require('../util/vendor/Export2Excel');
            const tHeader = ['1', '2', '3'];
            const filterVal = ['row1', 'row2', 'row3'];
            const list = this.listData
            const data = this.formatJson(filterVal, list)
            export_json_to_excel(tHeader, data, 'fileName');
        },

        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        formatDate(value) {
            let date = new Date(value);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m;
        },
        async output() {
            let wholeData = JSON.parse(localStorage.getItem('statisticsWhole')).data
            let rawRecords = wholeData.rawRecords
            // console.log('每人答题记录')
            // console.log(rawRecords)
            // console.log('问卷详情')
            // console.log(wholeData)
            let columnNames = ['账号', '填写时间']
            let columnValues = ['userAccount', 'answerTime']
            let content = []
            for (let i = 0; i < rawRecords.length; i++) {
                const element = rawRecords[i]
                await axios({
                    method: 'POST',
                    url: '/api/v1/statics/answer/detail'+"?questionnaireId="+wholeData.questionnaire.id+"&recordId="+element.recordId
                })
                    .then((response) => {
                        const data = response.data.data
                        // console.log(response)
                        let str = '{"userAccount":"'
                        str += data.account
                        str += '","answerTime":"'
                        str += this.formatDate(element.answerTime)
                        str += '",'
                        for (let index = 0; index < data.questionAnswers.length; index++) {
                            const item = data.questionAnswers[index];
                            // console.log(item)
                            if (columnNames.length-3 < index) {
                                columnNames[index+2] = '【问题' + (index+1) + '】' + item.question
                                columnValues[index+2] = 'question' + (index+1)
                            }
                            if (item.type == 2) {
                                item.userAnswer = [''+item.score]
                            }
                            str += '"question'
                            str += (index + 1)
                            str += '":['
                            for (let j = 0; j < item.userAnswer.length; j++) {
                                let answer = item.userAnswer[j]
                                str += '"'
                                str += answer
                                if (j < item.userAnswer.length - 1)
                                    str += '",'
                            }
                            str += '"]'
                            if (index < data.questionAnswers.length - 1)
                                str += ','
                        }
                        str += '}'
                        content.push(JSON.parse(str))
                    })
            }
            console.log(content)
            console.log(columnNames)
            console.log(columnValues)
            // const {
            //     export_json_to_excel
            // } = require('../util/vendor/Export2Excel')
            const tHeader = columnNames
            const filterVal = columnValues
            const list = content
            const data = this.formatJson(filterVal, list)
            export_json_to_excel(tHeader, data, this.title)
        }
    },

    data() {
        return {
            chartExtend: {
                legend: {
                show: false
                }
            },

            crossdata: [],
            i: 0,
            j: 0,
            chartData1: {
                columns: ['Quname', 'num', ],
                rows: []
            },
            whole: 0,
            message1: {},
            message2: {},
            option1: "",
            option2: "",
            options1: [],
            options2: [],
            listData: [{
                    row1: '123',
                    row2: '111',
                    row3: [1, 2],
                },
                {
                    row1: '123',
                    row2: '111',
                    row3: '112',
                },
                {
                    row1: '123',
                    row2: '111',
                    row3: '112',
                },
                {
                    row1: '123',
                    row2: '111',
                    row3: '112',
                },
                {
                    row1: '123',
                    row2: '111',
                    row3: '112',
                },
            ],

            quDetail: [],

            options: [],
            option: "",
            tableData: [],
            total: 0,
            activeIndex: '1',
            title: JSON.parse(localStorage.getItem('qutitle')),
            type: "",
            choicenum: 0,
            quID: 2,
            quesNum: 1,
            colorMax: ['#F141AF', '#F85E1F', '#000000', '#A52A2A', '#9830FA', '#0C99FD', '#25D9B4', '#1AA2FC', '#7FFF00', '#DC143C', '#00BFFF', '#FFA07A', "#FFD700", "#4B0082", "#F08080", '#B8860B', '#556B2F', '#FF8C00', '#FF1493', '#8B0000'],
            colors: [],
            scaleData: {
                columns: ['类目', '填写量', "内容"],
                rows: []
            },
            chartData: {
                columns: ['日期', '填写量', ],
                rows: []
            },
            rawRecords: [],
            DetailDate: {
                columns: ['用户名', '日期', '回答'],
                rows: []
            }
        }
    }
}
</script>

<style scoped>
.box-card {
    width: 1550px;
}

.monitor-header-two {
    flex: 1;
    border: 1px solid #E6E6E6;
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 20px;
}

.monitor-cart-name {
    width: 100%;
    height: 50px;
    /* background: yellow; */
    margin-bottom: 20px;
    border-bottom: 1px solid #E6E6E6;
    display: flex;
    justify-content: space-between;
}

.monitor-cart-name-left {
    width: 600px;
    height: 100%;
    /* background: blueviolet; */
    line-height: 42px;
    color: #5C5C5C;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
}

.monitor-cart-name-left-1 {
    width: 900px;
    height: 100%;
    /* background: blueviolet; */
    line-height: 60px;
    color: #5C5C5C;
    font-size: 27px;
    font-weight: bold;
    display: flex;
    align-items: center;
}

.monitor-cart-name-left-2 {
    width: 950px;
    height: 100%;
    /* background: blueviolet; */
    line-height: 60px;
    color: #5C5C5C;
    font-size: 27px;
    font-weight: bold;
    display: flex;
    align-items: center;
}

.monitor-cart-name-left-icon {
    width: 50px;
    height: 50px;
    background: #F7EEFF;
    border-radius: 2px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.monitor-cart-name-left-icon-s {
    width: 60px;
    height: 60px;
    color: rgb(198, 43, 226);
    fill: currentColor;
}

.monitor-cart-name-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.monitor-cart-name-right-list {
    width: 60px;
    height: 50px;
    /* background: chartreuse; */
    text-align: center;
    line-height: 50px;
    color: #515A6E;
    font-size: 14px;
    cursor: pointer;
}

.monitor-cart-name-right-list:hover {
    color: #2D8CF0;
}

.monitor-cart-box {
    /* background: chocolate; */
    width: 100%;
    height: 100px;
    padding: 10px 15px 0;
    box-sizing: border-box;
    /* border: 1px solid #E6E6E6; */
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 20px;
}

.monitor-visitors {
    width: 100%;
    height: 400px;
}

.monitor-visitors-scale {
    display: flex;
    justify-content: space-between;
}

.monitor-visitors-left {
    width: 60%;
    height: 100%;
}

.monitor-visitors-right {
    width: 40%;
    height: 100%;
    /* background: chocolate; */
    padding: 20px;
    box-sizing: border-box;
}

.monitor-visitors-right-list {
    width: 100%;
    /* background: cyan; */
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.monitor-visitors-right-list-content {
    flex: 1;
    padding: '10px';
    color: #191818;
    text-align: left;
}

.form {
    height: 80px;
}

.select {
    position: relative;
    right: 60px;
    bottom: 5px;
}

.ch {
    font-size: 16px;
    font-weight: 900;
}

.el-button {
    position: relative;
    bottom: 5px;
}

.dataout {
    position: relative;
    bottom: 25px;
}
.output {
    position: fixed;
    right: 30px;
    top: 30px;
    z-index: 100;
}
</style>

