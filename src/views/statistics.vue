<!--
 * @Description: 
 * @version: 
 * @Author: 张怡健
 * @Date: 2021-08-21 18:54:25
 * @LastEditors: 张怡健
 * @LastEditTime: 2021-08-24 09:18:51
-->
<template>
<div>
    <el-card class="box-card" shadow="always">
        <el-page-header @back="goBack" v-bind:content="'--------------------------------'+title+'--------------------------------'">
        </el-page-header>
        <el-button style="float: right; padding: 3px 0" type="text" @click="refresh()">点此刷新数据</el-button>
        <el-divider></el-divider>
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
                    <el-table-column label="------------------------------------------------------------------------------------------------------------题目回答-----------------------------------------------------------------------------------------------------------------------" width="1500px">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.answer }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script>
import list from "../util/service/list.js";
import {
    message
} from "../util/inform.js";

export default {
    mounted() {
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
    },
    methods: {
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
                console.log(this.colors)
                console.log(this.scaleData)
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
                console.log(this.colors)
                console.log(this.scaleData)
            }
        }
    },
    data() {
        return {
            options: [],
            option: "",
            tableData: [],
            total: 0,
            title: JSON.parse(localStorage.getItem('qutitle')),
            type: "",
            choicenum: 0,
            quID: 2,
            quesNum: 1,
            colorMax: ['#F141AF', '#F85E1F', '#000000', '#A52A2A', '#9830FA', '#0C99FD', '#25D9B4', '#1AA2FC', '#7FFF00', '#DC143C', '#00BFFF', '#FFA07A',"#FFD700","#4B0082","#F08080"],
            colors: [],
            scaleData: {
                columns: ['类目', '填写量', "内容"],
                rows: []
            },
        }
    }
}
</script>

<style scoped>
.box-card {
    width: "50%";
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
    width: 500px;
    height: 100%;
    /* background: blueviolet; */
    line-height: 42px;
    color: #5C5C5C;
    font-size: 14px;
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
</style>
