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
    <el-card class="box-card" body-style="color:rgb(0, 100, 128)" shadow="always" style="float: right;margin-top: 20px;" v-for="(item,index) in tableData" :key="index">
        <div slot="header" class="clearfix">
            <span style=" font-weight: 900;">{{tableData[index]['title']}}</span>
            <div class="description-container" style="float: right; ">
                <div class="description" style="margin-right:20px;font-size: 16px; font-weight: 900;">创建时间:{{tableData[index]['time_1']}}</div>
                <div class="description" v-if="tableData[index]['value']" style="margin-right:20px;font-size: 16px; font-weight: 900;">发布时间:{{tableData[index]['time_2']}}</div>
                <div class="description" v-if="tableData[index]['showendTime']" style="margin-right:20px;font-size: 16px; font-weight: 900;">截止时间:{{tableData[index]['time_3']}}</div>
                <div v-bind:class="{ 'description-1': tableData[index]['value'], 'description-2': !tableData[index]['value'] }" >{{tableData[index]['state']}}</div>
                <div class="description" style="margin-right:20px  ;font-size: 16px; font-weight: 900;">答卷:{{tableData[index]['num']}}</div>
            </div>
        </div>
        <div class="icon" style="float: right;margin-top: 20px;margin-bottom:10px;">
            <i @click="change(index)" v-bind:class="{ 'el-icon-video-pause': tableData[index]['value'], 'el-icon-video-play': !tableData[index]['value'] }" :title="tableData[index]['value_2']" style="margin-right:20px;font-size:25px;cursor: pointer;"></i>
            <i class="el-icon-edit" @click="edit(index)" title="编辑问卷" style="margin-right:20px; font-size:25px;cursor:pointer;"></i>
            <i @click="Statistics(index)" class="el-icon-s-data" title="问卷数据统计" style="margin-right:20px;  font-size:25px;cursor: pointer;"></i>
            <i @click="Preview(index)" class="el-icon-view" title="预览问卷" style="margin-right:20px;font-size:25px;cursor: pointer;"></i>
            <i @click="showlink(index)" class="el-icon-link" title="问卷链接" style="margin-right:20px;font-size:25px;cursor: pointer;"></i>
            <i @click="copyQu(index)" class="el-icon-document-copy" title="复制问卷" style="margin-right:20px;font-size:25px;cursor: pointer;"></i>
            <i @click="Delete(index)" class="el-icon-delete" title="删除问卷" style="margin-right:20px;font-size:25px;cursor: pointer;"></i>
        </div>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible">
        <div class="row noscroll">
            <div class="col-md-8 col-md-offset-2">
                <div class="p-20 mt-20 ">
                    <div class="link-text">
                        <el-row>
                            <h3 class="header-text">问卷链接<em class="el-icon-link " /></h3>
                            <div class="line-box">
                                <el-input :value="link" :disabled="true" />
                            </div>
                            <div class="btn-box">
                                <el-button type="primary" round @click.native="copy()">复制</el-button>
                                <el-button @click.native="openPage()">打开</el-button>
                            </div>
                        </el-row>
                    </div>
                    <div class="flex">
                        <div class="qrcode-box-inner center">
                            <div id="qrcode" />
                        </div>
                    </div>
                    <div class="flex downbtn">
                        <el-button type="primary" round @click.native="download()">下载二维码</el-button>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</div>
</template>

<script>
import QRCode from 'qrcodejs2'
import list from "../util/service/list.js";
import {
    message
} from "../util/inform.js";
export default {
    data() {
        return {
            options: [{
                    label: "创建时间较早优先",
                    value: "3",
                },
                {
                    label: "创建时间较晚优先",
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
            qrcode: undefined,
            img: undefined
        }
    },
    mounted() {
        localStorage.removeItem('input')
        localStorage.removeItem('sort')
        localStorage.setItem('sort', JSON.stringify("0"))
        let listinit = {
            current: 1,
            size: 100000,
        };
        let value_2 = ""
        let state = ""
        let showendTime = false
        list.getlist(listinit).then((res) => {
            console.log(res)
            for (let item of res.data.data.records) {
                if (item.isReleased == 1) {
                    value_2 = "关闭问卷"
                    state = "·已发布"
                } else {
                    value_2 = "发布问卷"
                    state = "·未发布"
                }
                showendTime = true
                if (item.endTime == "4785667200000") {
                    showendTime = false
                }
                this.tableData.unshift({
                    time_1: this.formatDate(item.createTime),
                    time_2: this.formatDate(item.startTime),
                    time_3: this.formatDate(item.endTime),
                    num: item.writeNum,
                    ID: item.id,
                    title: item.head,
                    value: item.isReleased == 1,
                    value_2: value_2,
                    state: state,
                    code: item.code,
                    stamp: item.stamp,
                    showendTime: showendTime
                });
            }
            // console.log(this.tableData)
        });

    },
    computed: {
        operation() {
            return this.$store.state.operatingQ
        },
        stamp() {
            return this.$store.state.stamp
        },
        link() {
            let str = 'http://localhost:8080/questionnare/'
            let type
            switch (this.stamp) {
                case 1:
                    type = 'normal/'
                    break
                case 2:
                    type = 'vote/'
                    break
                case 3:
                    type = 'signfor/'
                    break
                case 4:
                    type = 'checkin/'
            }
            return str + type + this.operation.code
        }
    },
    methods: {
        copy() {
            var input = document.createElement('input');
            input.setAttribute('id', 'input_for_copyText');
            input.value = this.link;
            document.getElementsByTagName('body')[0].appendChild(input);
            document.getElementById('input_for_copyText').select();
            document.execCommand('copy');
            document.getElementById('input_for_copyText').remove();
            message({
                message: '复制成功',
                type: 'success'
            })
        },
        openPage() {
            window.open(this.link, '_blank');
        },
        showlink(index) {
            this.$store.commit('updateOperation', {
                id: this.tableData[index]['ID'],
                code: this.tableData[index]['code'],
                isReleased: this.tableData[index]['value']
            })
            this.$store.commit('setStamp', this.tableData[index]['stamp'])
            this.dialogVisible = true
            this.$nextTick(() => {
                if (this.qrcode === undefined) {
                    this.qrcode = new QRCode(document.getElementById("qrcode"), {
                        width: 200,
                        height: 200
                    })
                }
                this.img = document.getElementById('qrcode').lastChild
                this.qrcode.clear()
                this.qrcode.makeCode(this.link)
                console.log(this.qrcode)
            })
        },
        download() {
            var url = this.img.src;
            var a = document.createElement('a')
            var event = new MouseEvent('click')
            a.download = '问卷二维码'
            a.href = url
            a.dispatchEvent(event)
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
        // 暂时默认是编辑方式一
        edit(index) {
            this.$store.commit('updateOperation', {
                id: this.tableData[index]['ID'],
                code: this.tableData[index]['code'],
                isReleased: this.tableData[index]['value']
            })
            if (this.tableData[index]['stamp'] == 3) {
                this.$router.push('/registration/edit')
            } else if (this.tableData[index]['stamp'] == 1) {
                this.$router.push('/normal/edit')
            } else if (this.tableData[index]['stamp'] == 4) {
                this.$router.push('/checkin/edit')
            } else {
                this.$router.push('/vote/edit')
            }

        },
        Preview(index) {
           switch (this.tableData[index]['stamp']) {
                case 1:
                    this.$router.push('/preview/normal/1/' + this.tableData[index]['code'])
                    break
                case 2:
                    this.$router.push('/preview/vote/1/' + this.tableData[index]['code'])
                    break
                case 3:
                    this.$router.push('/preview/signfor/1/' + this.tableData[index]['code'])
                    break
                case 4:
                    this.$router.push('/preview/checkin/1/' + this.tableData[index]['code'])
                    break
            }
        },
        Statistics(index) {
            list.getStatistics(parseInt(this.tableData[index]['ID'])).then((res) => {
                console.log(res)
                 console.log("上面是统计数据")
                localStorage.setItem('questionnaireID', JSON.stringify(this.tableData[index]['ID']))
                localStorage.setItem('qutitle', JSON.stringify(this.tableData[index]['title']))
                localStorage.setItem("statistics", JSON.stringify(res.data))
            })
            list.getStatisticsWhole(parseInt(this.tableData[index]['ID'])).then((res) => {
                console.log(res)
                localStorage.setItem("statisticsWhole", JSON.stringify(res.data))

            })
            list.getQuID(this.tableData[index]['code']).then((res) => {
                console.log(res)
                localStorage.setItem("questionDetail", JSON.stringify(res.data.data))
                console.log(JSON.parse(localStorage.getItem('questionDetail')))
                this.$router.push("/statistics");
            })
        },
        Delete(index) {
            if (confirm('确定要删除吗?') == true) {
                list.closeQu(this.tableData[index]['ID']).then((res) => {
                    console.log(res);
                    list.deleteQu(this.tableData[index]['ID']).then((res) => {
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
            }
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
            let value_2 = ""
            let state = ""
            let showendTime = false
            list.getlist(listinit).then((res) => {
                this.tableData = [];
                for (let item of res.data.data.records) {
                    if (item.isReleased == 1) {
                        value_2 = "关闭问卷"
                        state = "·已发布"
                    } else {
                        value_2 = "发布问卷"
                        state = "·未发布"
                    }
                    showendTime = true
                    if (item.endTime == "4785667200000") {
                        showendTime = false
                    }
                    this.tableData.push({
                        time_1: this.formatDate(item.createTime),
                        time_2: this.formatDate(item.startTime),
                        time_3: this.formatDate(item.endTime),
                        num: item.writeNum,
                        ID: item.id,
                        title: item.head,
                        value: item.isReleased == 1,
                        value_2: value_2,
                        state: state,
                        code: item.code,
                        stamp: item.stamp,
                        showendTime: showendTime
                    });
                }
            });
        },
        Search(input) {
            let showendTime = false
            if (input == "") {
                message({
                    message: '输入为空！',
                    type: 'error'
                })
            } else {
                this.isSearch = true
                let value_2 = ""
                let state = ""
                console.log(input);
                localStorage.setItem('input', JSON.stringify(input))
                let listinit = {
                    current: 1,
                    size: 100000,
                    sortBy: JSON.parse(localStorage.getItem('sort')),
                    head: JSON.parse(localStorage.getItem('input')),
                };
                list.getlist(listinit).then((res) => {
                    console.log(res);
                    if (res.data.code == 20000 && res.data.data.total != 0) {
                        message({
                            message: '查询成功',
                            type: 'success'
                        })
                        this.tableData = [];
                        for (let item of res.data.data.records) {
                            if (item.isReleased == 1) {
                                value_2 = "关闭问卷"
                                state = "·已发布"
                            } else {
                                value_2 = "发布问卷"
                                state = "·未发布"
                            }
                            showendTime = true
                            if (item.endTime == "4785667200000") {
                                showendTime = false
                            }
                            this.tableData.push({
                                time_1: this.formatDate(item.createTime),
                                time_2: this.formatDate(item.startTime),
                                time_3: this.formatDate(item.endTime),
                                num: item.writeNum,
                                ID: item.id,
                                title: item.head,
                                value: item.isReleased == 1,
                                value_2: value_2,
                                state: state,
                                code: item.code,
                                stamp: item.stamp,
                                showendTime: showendTime
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
            let showendTime = false
            let value_2 = ""
            let state = ""
            localStorage.setItem('sort', JSON.stringify(this.option))
            let listinit = {
                current: 1,
                size: 100000,
                sortBy: JSON.parse(localStorage.getItem('sort')),
                head: JSON.parse(localStorage.getItem('input')),
            };
            list.getlist(listinit).then((res) => {
                console.log(res);
                this.tableData = [];
                for (let item of res.data.data.records) {
                    if (item.isReleased == 1) {
                        value_2 = "关闭问卷"
                        state = "·已发布"
                    } else {
                        value_2 = "发布问卷"
                        state = "·未发布"
                    }
                    showendTime = true
                    if (item.endTime == "4785667200000") {
                        showendTime = false
                    }
                    this.tableData.push({
                        time_1: this.formatDate(item.createTime),
                        time_2: this.formatDate(item.startTime),
                        time_3: this.formatDate(item.endTime),
                        num: item.writeNum,
                        ID: item.id,
                        title: item.head,
                        value: item.isReleased == 1,
                        value_2: value_2,
                        state: state,
                        code: item.code,
                        stamp: item.stamp,
                        showendTime: showendTime
                    });
                }
            });
        },
        change(index) {
            let showendTime = false
            let value_2 = ""
            let state = ""
            if (this.tableData[index]['value'] == true) {
                list.closeQu(this.tableData[index]['ID']).then((res) => {
                    console.log(res);
                    if (res.data.code == 20000) {
                        message({
                            message: '问卷关闭成功',
                            type: 'success'
                        })
                        this.tableData = [];
                        let listinit = {
                            current: 1,
                            size: 100000,
                            sortBy: JSON.parse(localStorage.getItem('sort')),
                            head: JSON.parse(localStorage.getItem('input')),
                        };
                        list.getlist(listinit).then((res) => {
                            console.log(res);
                            for (let item of res.data.data.records) {
                                if (item.isReleased == 1) {
                                    value_2 = "关闭问卷"
                                    state = "·已发布"
                                } else {
                                    value_2 = "发布问卷"
                                    state = "·未发布"
                                }
                                showendTime = true
                                if (item.endTime == "4785667200000") {
                                    showendTime = false
                                }
                                this.tableData.push({
                                    time_1: this.formatDate(item.createTime),
                                    time_2: this.formatDate(item.startTime),
                                    time_3: this.formatDate(item.endTime),
                                    num: item.writeNum,
                                    ID: item.id,
                                    title: item.head,
                                    value: item.isReleased == 1,
                                    value_2: value_2,
                                    state: state,
                                    code: item.code,
                                    stamp: item.stamp,
                                    showendTime: showendTime
                                });
                            }
                        });
                    }
                });
            } else {
                list.openQu(this.tableData[index]['ID']).then((res) => {
                    console.log(res);
                    if (res.data.code == 20000) {
                        message({
                            message: '问卷开启成功',
                            type: 'success'
                        })
                    }
                    this.tableData = [];
                    let listinit = {
                        current: 1,
                        size: 100000,
                        sortBy: JSON.parse(localStorage.getItem('sort')),
                        head: JSON.parse(localStorage.getItem('input')),
                    };
                    list.getlist(listinit).then((res) => {
                        console.log(res);
                        for (let item of res.data.data.records) {
                            if (item.isReleased == 1) {
                                value_2 = "关闭问卷"
                                state = "·已发布"
                            } else {
                                value_2 = "发布问卷"
                                state = "·未发布"
                            }
                            showendTime = true
                            if (item.endTime == "4785667200000") {
                                showendTime = false
                            }
                            this.tableData.push({
                                time_1: this.formatDate(item.createTime),
                                time_2: this.formatDate(item.startTime),
                                time_3: this.formatDate(item.endTime),
                                num: item.writeNum,
                                ID: item.id,
                                title: item.head,
                                value: item.isReleased == 1,
                                value_2: value_2,
                                state: state,
                                code: item.code,
                                stamp: item.stamp,
                                showendTime: showendTime
                            });
                        }
                    });
                });
            }
        },
        copyQu(index) {
            let showendTime = false
            list.copy(this.tableData[index]['ID']).then((res) => {
                console.log(res);
                if (res.data.code == 20000) {
                    message({
                        message: '复制成功',
                        type: 'success'
                    })
                    this.tableData = [];
                    let listinit = {
                        current: 1,
                        size: 100000,
                    };

                    list.getlist(listinit).then((res) => {
                        console.log(res);
                        for (let item of res.data.data.records) {
                               showendTime = true
                        if (item.endTime == "4785667200000") {
                            showendTime = false
                        }
                            this.tableData.unshift({
                                time_1: this.formatDate(item.createTime),
                                time_2: this.formatDate(item.startTime),
                                time_3: this.formatDate(item.endTime),
                                num: item.writeNum,
                                ID: item.id,
                                title: item.head,
                                value: item.isReleased == 1,
                                code: item.code,
                                stamp: item.stamp,
                                showendTime: showendTime
                            });
                        }
                    });
                } else
                    message({
                        message: '复制失败',
                        type: 'error'
                    })
            });
        },
    },
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

.box-card{
    width: 1500px;
    color: rgb(0, 100, 128);
}


.description {
    display: inline-block;
}

.description-1 {
    display: inline-block;
    margin-right: 20px;
    color: green;
    font-size: 16px;
    font-weight: 900;
}

.description-2 {
    display: inline-block;
    margin-right: 20px;
    color: red;
    font-size: 16px;
    font-weight: 900;
}

/** 弹窗样式 */
.link-text {
    margin-bottom: 20px;
}

.line-box {
    display: inline;
    width: 60%;
    float: left;
}

.btn-box {
    display: inline;
    width: 35%;
    float: right;
}

.flex {
    /* width: 100% !important; */
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.qrcode-box-inner {
    width: 200px;
    height: 200px;
}

.center {
    margin: 0 auto;
}

.downbtn {
    width: 50%;
    margin: auto;
    padding-top: 20px;
}
</style>
