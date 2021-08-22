<template>
<div id="table">
    <el-card shadow="never">
        <el-row>
            <el-col :span="6">
                <el-select v-model="option" filterable @change="changeSelect()" placeholder="请选择排序方式">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="10">
                <el-input placeholder="请输入问卷标题关键词查找" prefix-icon="el-icon-search" v-model="input">
                </el-input>
            </el-col>
            <el-col :span="8">
                <el-button type="primary" @click="Search(input)">
                    搜索</el-button>
            </el-col>

        </el-row>
    </el-card>
    <el-table :data="tableData" :border="true" height="1000" style="width: 100%">
        <el-table-column label="问卷ID" width="150">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.ID }}</span>
            </template>
        </el-table-column>
        <el-table-column label="问卷标题" width="250">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.title }}</span>
            </template>
        </el-table-column>
        <el-table-column label="创建日期" width="180">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
        </el-table-column>
        <el-table-column label="问卷回收量" width="100">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.num }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="Preview(scope.$index, scope.row)">预览</el-button>
                <el-button size="mini" type="danger" @click="Delete(scope.$index, scope.row)">删除</el-button>
                <el-button size="mini" type="success" @click="Recover(scope.$index, scope.row)">恢复</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import list from "../util/service/list.js"
import {
    message
} from "../util/inform.js"

export default {
    mounted() {
        let listinit = {
            current: 1,
            size: 100000,
        }
        list.getwaste(listinit).then((res) => {

            console.log(res)
            for (let item of res.data.data.records) {
                this.tableData.push({
                    date: item.createTime,
                    num: item.writeNum,
                    ID: item.id,
                    title: item.head,
                });
            }
        })
    },
    data() {
        return {
            options: [{
                    label: "按创建时间排序-增序",
                    value: "2"
                },
                {
                    label: "按创建时间排序-降序",
                    value: "0"
                },
                {
                    label: "按问卷回收量排序-增序",
                    value: "3"
                },
                {
                    label: "按问卷回收量排序-降序",
                    value: "1"
                },
            ],
            option: "",
            input: "",
            tableData: []
        }
    },
    methods: {
        Preview(index, row) {
            console.log(index, row);
        },
        Delete(index, row) {
            list.deleteDeath(row.ID).then((res) => {
                console.log(res)
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

        },
        Recover(index, row) {
            list.recovery(row.ID).then((res) => {
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
        //测试用创建问卷函数
        /*  create() {
              let par = {

                  endTime: "11243424",
                  head: "测试标题3",
                  startTime: "21432535",
                  isReleased: 1,
                  type: 1,
                  itemList: [{
                      itemId: 1,
                      itemOrder: 1,
                      itemType: 1
                  }]
              }
              list.createQu(par).then((res) => {
                  console.log(res)
              })
          },*/
        changeSelect() {
            console.log(this.option)
            let listinit = {
                current: 1,
                size: 100000,
                sortBy: this.option
            }
            list.getwaste(listinit).then((res) => {
                console.log(res)
                this.tableData = []
                for (let item of res.data.data.records) {
                    this.tableData.push({
                        date: item.createTime,
                        num: item.writeNum,
                        ID: item.id,
                        title: item.head,
                    });
                }
            })
        },
        Search(input) {
            console.log(input);

            let listinit = {
                current: 1,
                size: 100000,
                head: input,
            }
            list.getwaste(listinit).then((res) => {
                if (res.data.code == 20000 && res.data.data.total != 0) {
                    message({
                        message: '查询成功',
                        type: 'success'
                    })
                    this.tableData = []
                    console.log(res)
                    for (let item of res.data.data.records) {
                        this.tableData.push({
                            date: item.createTime,
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

        },
    }
}
</script>

<style>
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}
</style>


