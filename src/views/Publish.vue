<template>
    <div class="row noscroll">
        <div class="col-md-6 col-md-offset-3">
            <div class="p-20 mt-20 shadow">
                <div class="link-text">
                    <el-row>
                        <h3 class="header-text">问卷链接<em class="el-icon-link "/></h3>
                        <div class="line-box">
                            <el-input :value="link" :disabled="true"/>
                        </div>
                        <div class="btn-box">
                            <el-button type="primary" round @click.native="copy()">复制</el-button>
                            <el-button @click.native="openPage()">打开</el-button>
                        </div>
                    </el-row>
                </div>
                <div class="flex">
                    <div class="qrcode-box-inner center">
                        <div id="qrcode"/>
                    </div>
                    <div class="flex downbtn">
                        <el-button type="primary" round @click.native="download()">下载二维码</el-button>
                    </div>
                    <div class="flex downbtn">
                        <el-button v-if="!operation.isReleased" type="success" round @click.native="publish()">发布</el-button>
                        <el-button v-else type="info" round disabled>已发布</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { message } from "../util/inform";
import list from '../util/service/list';
export default {
    created() {
    },
    mounted() {
        let qrcode = new QRCode('qrcode', {
            width: 200,
            height: 200,
            text: this.link // 设置二维码内容和跳转地址
        })
        console.log(qrcode)
    },
    computed: {
        operation() {
            return this.$store.state.operatingQ
        },
        stamp() {
            return this.$store.state.stamp
        },
        link() {
            let str = 'http://47.93.216.213:8081/questionnare/'
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
        download() {
            var img = document.getElementById('qrcode').lastChild
            var url = img.src;
            var a = document.createElement('a')
            var event = new MouseEvent('click')
            a.download = '问卷二维码'
            a.href = url
            a.dispatchEvent(event)
        },
        publish() {
            list
                .openQu(this.operation.id)
                .then((response) => {
                    if (response.data.code === 20000) {
                        this.$store.commit('updateOperation', { id: this.operation.id, code: this.operation.code, isReleased: true })
                        message({
                            message: '发布成功',
                            type: 'success'
                        })
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
                        type: 'error'
                    })
                })
        }
    }
}
</script>

<style scoped="scoped">
.noscroll {
    overflow: hidden;
}
.mt-20 {
    margin-top: 20px;
}
.p-20 {
    padding: 20px;
}
.shadow {
    border:1px darkslategray;
    box-shadow: rgb(233, 231, 231) 2px 2px 10px 2px;
}
.center {
    margin: 0 auto;
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
.link-text {
    padding-left: 100px;
    padding-right: 100px;
    padding-bottom: 20px;
}
.header-text {
    font-size: 28px;
    font-weight: bold;
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
.downbtn {
    width: 50%;
    margin: auto;
    padding-top: 20px;
}
</style>