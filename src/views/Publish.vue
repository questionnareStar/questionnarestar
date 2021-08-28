<template>
    <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <div class="p-20 mt-20 shadow">
                <div v-if="published" class="link-text">
                    <el-row>
                        <h3 class="header-text">问卷链接<em class="el-icon-link "/></h3>
                        <div class="line-box">
                            <el-input :value="link" :disabled="true"/>
                        </div>
                        <div class="btn-box">
                            <el-button>复制</el-button>
                            <el-button>打开</el-button>
                        </div>
                    </el-row>
                </div>
                <div v-if="published" class="flex">
                    <div class="qrcode-box-inner center">
                        <div id="qrcode"/>
                    </div>
                </div>
                <div class="flex">
                    <div class="center p-20">
                        <el-button>发布</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
    mounted() {
        let qrcode = new QRCode('qrcode',{
            width: 200,
            height: 200,
            text: 'http://localhost:8080/questionnare/' + this.operation.code // 设置二维码内容或跳转地址
        })
        console.log(this.operation)
    },
    computed: {
        operation() {
            return this.$store.state.operatingQ
        }
    },
    data() {
        return {
            published: true,
            link: 'http://localhost:8080/questionnare/' + '1234a'
        }
    }
}
</script>

<style scoped="scoped">
.mt-20 {
    margin-top: 20px;
}
.p-20 {
    padding: 20px;
}
.shadow {
    border:1px darkslategray;
    box-shadow: rgb(233, 231, 231) 2px 2px 10px 1px;
}
.center {
    margin: 0 auto;
}
.flex {
    width: 100%;
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
</style>