<template>
<div class="main">
    <el-card shadow="never">
        <el-row>
            <el-col :span="6">
                <el-select v-model="option" @change="changeSelect()" filterable placeholder="请选择排序方式">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="10">
                <el-input placeholder="请输入问卷标题关键词查找" prefix-icon="el-icon-search" v-model="input">
                </el-input>
            </el-col>
            <el-col :span="8">
                <el-button type="primary" @click="Search(input)"> 搜索</el-button>
                <el-button v-if="isSearch==true" type="primary" @click="outSearch()"> 退出搜索</el-button>
                <i v-else></i>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="box-card" shadow="always" style="float: right;margin-top: 20px;" v-for="(item,index) in tableData" :key="index">
        <div slot="header" class="clearfix">
            <span style=" font-weight: 900;">{{tableData[index]['title']}}</span>
            <div class="description-container" style="float: right; ">
                <div class="description" style="margin-right:20px   ;font-size: 16px; font-weight: 900;">id:{{tableData[index]["ID"]}}</div>
                <div class="description" style="margin-right:20px  ;font-size: 16px; font-weight: 900;">创建时间:{{tableData[index]['time_1']}}</div>
                <div class="description" style="margin-right:20px  ;font-size: 16px; font-weight: 900;">答卷:{{tableData[index]['num']}}</div>
            </div>
        </div>
        <div class="icon" style="float: right;margin-top: 20px;margin-bottom:10px;">
            <i @click="Preview(index)" class="el-icon-view" title="预览问卷" style="margin-right:20px;font-size:25px"></i>
            <i @click="Recovery(index)" class="el-icon-document-checked" title="恢复问卷" style="margin-right:20px;font-size:25px"></i>
            <i @click="Delete(index)" class="el-icon-delete" title="删除问卷" style="margin-right:20px;font-size:25px"></i>
        </div>
    </el-card>
</div>
</template>

<script>
import list from "../util/service/list.js";
import {
    message
} from "../util/inform.js";
export default {
    data() {
        return {
            options: [{
                    label: "创建时间较晚优先",
                    value: "3",
                },
                {
                    label: "创建时间较早优先",
                    value: "0",
                },
                {
                    label: "问卷回收量较少优先",
                    value: "4",
                },
                {
                    label: "问卷回收量较多优先",
                    value: "1",
                },
            ],
            option: "",
            input: "",
            tableData: [],
            isSearch: false,
            dialogVisible: false,
        }
    },
    mounted() {
        localStorage.removeItem('input')
        localStorage.removeItem('sort')
        let listinit = {
            current: 1,
            size: 100000,
        };
        list.getwaste(listinit).then((res) => {
            console.log(res.data.data.records);

            for (let item of res.data.data.records) {
                this.tableData.push({
                    time_1: this.formatDate(item.createTime),
                    num: item.writeNum,
                    ID: item.id,
                    title: item.head,
                });
            }
        });
    },
    methods: {
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
        Preview(index) {
            this.$router.push('/preview/' + this.tableData[index]['ID'])
        },
        Delete(index) {
            if(confirm('确定要删除吗?(不可恢复)')==true){
                list.closeQu(this.tableData[index]['ID']).then((res) => {
                console.log(res);
                list.deleteDeath(this.tableData[index]['ID']).then((res) => {
                    console.log(res);
                    if (res.data.code == 20000) {
                        message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.tableData.splice(index, 1);
                    } else
                        message({
                            message: '删除失败',
                            type: 'error'
                        })
                })
            })
            this.judge=false
            }
            else{

            }

        },
        Recovery(index) {
            list.recovery(this.tableData[index]['ID']).then((res) => {
                console.log(res)
                if (res.data.code == 20000) {
                    message({
                        message: '恢复成功',
                        type: 'success'
                    })
                    this.tableData.splice(index, 1);
                } else
                    message({
                        message: '恢复失败',
                        type: 'error'
                    })
            })
        },
        outSearch() {
            this.input = ""
            this.isSearch = "false"
            localStorage.setItem('input', JSON.stringify(this.input))
            let listinit = {
                current: 1,
                size: 100000,
                sortBy: JSON.parse(localStorage.getItem('sort')),
                head: JSON.parse(localStorage.getItem('input')),
            };
            list.getwaste(listinit).then((res) => {
                this.tableData = [];
                for (let item of res.data.data.records) {
                    this.tableData.push({
                        time_1: this.formatDate(item.createTime),
                        num: item.writeNum,
                        ID: item.id,
                        title: item.head,
                    });
                }
            });
        },
        Search(input) {
            if (input == "") {
                message({
                    message: '输入为空！',
                    type: 'error'
                })
            } else {
                this.isSearch = true
                console.log(input);
                localStorage.setItem('input', JSON.stringify(input))
                let listinit = {
                    current: 1,
                    size: 100000,
                    sortBy: JSON.parse(localStorage.getItem('sort')),
                    head: JSON.parse(localStorage.getItem('input')),
                };
                list.getwaste(listinit).then((res) => {
                    console.log(res);
                    if (res.data.code == 20000 && res.data.data.total != 0) {
                        message({
                            message: '查询成功',
                            type: 'success'
                        })
                        this.tableData = [];
                        for (let item of res.data.data.records) {
                            this.tableData.push({
                                time_1: this.formatDate(item.createTime),
                                num: item.writeNum,
                                ID: item.id,
                                title: item.head,
                            });
                        }
                    } else if (res.data.code == 20000 && res.data.data.total == 0) {
                        message({
                            message: '未查找到相关问卷',
                            type: 'warning'
                        });
                    } else {
                        message({
                            message: '查询错误',
                            type: 'error'
                        })
                        this.tableData = [];
                    }
                })
            }
        },
        changeSelect() {
            console.log(this.option);
            localStorage.setItem('sort', JSON.stringify(this.option))
            let listinit = {
                current: 1,
                size: 100000,
                sortBy: JSON.parse(localStorage.getItem('sort')),
                head: JSON.parse(localStorage.getItem('input')),
            };
            list.getwaste(listinit).then((res) => {
                console.log(res);
                this.tableData = [];
                for (let item of res.data.data.records) {
                    this.tableData.push({
                        time_1: this.formatDate(item.createTime),
                        num: item.writeNum,
                        ID: item.id,
                        title: item.head,
                    });
                }
            });
        },

    }
}
</script>

<style>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 1500px;
}

.description {
    display: inline-block;
}
</style>
