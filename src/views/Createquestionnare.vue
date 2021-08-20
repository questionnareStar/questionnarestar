<template>
    <div class="questionnaire">
        <div class="box">
            <el-form label-width="100px">
                <el-form-item label="问卷标题">
                    <el-input v-model="questionnaireName" class="input"></el-input>
                </el-form-item>
                <el-form-item label="问卷问题">
                    <div class="input">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
                            <el-table-column prop="problemTitle" label="题目" align="left"> </el-table-column>
                        </el-table>
                        <el-button type="primary" class="button" @click="dialogVisible = true">添加问题</el-button>
                    </div>
                </el-form-item>
                <el-form-item label="结束语">
                    <el-input v-model="questionnaireOver" class="input"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="fabu">发布问卷</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>

            <el-dialog title="添加问题" :visible.sync="dialogVisible" width="30%">
                <el-form label-width="80px">
                    <el-form-item label="题目标题">
                        <el-input v-model="problemTitle"></el-input>
                    </el-form-item>
                    <el-form-item label="题目类型">
                        <el-radio-group v-model="radio">
                            <el-radio :label="1">单选题</el-radio>
                            <el-radio :label="2">多选题</el-radio>
                            <el-radio :label="3">文本描述</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="选项" v-show="!textProblem">
                        <el-table :data="option" border style="width: 100%">
                            <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
                            <el-table-column label="选项" align="left">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.optionContent"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-button type="primary" class="button" @click="AddOption">添加选项</el-button>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addProbilem">确 定</el-button>
                </span>
            </el-dialog>
        </div>

        <el-dialog title="问卷地址" :visible.sync="qinni" width="30%">
            <span>http://121.4.31.152/questionnaire/#/{{ questionnaireid }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="qinni = false">取 消</el-button>
                <el-button type="primary" @click="qinni = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            qinni: false,
            textProblem: false,
            radio: 1,
            problemTitle: '',
            questionnaireid: '',
            dialogVisible: false,
            questionnaireName: '',
            questionnaireOver: '',
            tableData: [],
            option: [
                {
                    optionContent: ''
                }
            ]
        };
    },
    mounted() {
        // 生成问卷的id
        this.questionnaireid = this.uuid();
        // console.log(sessionStorage.getItem('userid'));
        // console.log(this.questionnaireid)
        this.problemSeeqin();
    },
    watch: {
        radio(newradio, oldradio) {
            this.option = [{ optionContent: '' }];
            this.textProblem = false;
            if (newradio == 3) {
                this.textProblem = true;
            }
        }
    },
    methods: {
        // 生成唯一id
        uuid() {
            var s = [];
            var hexDigits = '0123456789abcdef';
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = '-';
            var uuid = s.join('');
            return uuid;
        },
        // 取消发布
        cancel() {
            this.questionnaireName = '';
            this.questionnaireOver = '';
            this.option = [];
            this.$set(this.option);
        },
        // 发布问卷
        fabu() {
            questionnaireAdd({
                id: this.questionnaireid,
                userid: sessionStorage.getItem('userid'),
                questionnaireTitle: this.questionnaireName,
                questionnaireOver: this.questionnaireOver
            }).then((res) => {
                console.log(res);
                if (res.code == 200) {
                    this.cancel();
                    // 发布成功 弹出一个框框
                    this.qinni = true;
                    this.tableData = []
                    this.$set(this.tableData)
                }
            });
        },
        addProbilem() {
            // 生成problemid
            let problemid = this.uuid();
            // 添加问卷的里面的一个题目
            problemAdd({
                id: problemid,
                questionnaireid: this.questionnaireid,
                problemType: this.radio,
                problemTitle: this.problemTitle
            }).then((res) => {
                console.log(res);
            });
            // 添加问题里面的选项
            if (this.radio != 3) {
                for (let i = 0; i < this.option.length; i++) {
                    optionAdd({
                        problemid: problemid,
                        optionContent: this.option[i].optionContent
                    }).then((res) => {
                        console.log(res);
                    });
                }
            }
            this.$message({
                message: '操作成功！',
                type: 'success'
            });
            setTimeout(() => {
                this.problemTitle = '';
                this.problemSeeqin();
                this.dialogVisible = false;
                this.option = [];
            }, 1000);
        },
        sortByKey(array, key) {
				return array.sort(function(a, b) {
					var x = a[key];
					var y = b[key];
					return ((x < y) ? -1 : ((x < y) ? 1 : 0));
				})
			},
        // 查询发布过的问题 展示
        problemSeeqin() {
            let that = this;
            problemSee({
                questionnaireId: this.questionnaireid
            }).then((res) => {
                this.tableData = [];
                this.tableData = this.sortByKey(res.data,'sort')
                this.$set(this.tableData);
                console.log(res.data, 'resdata');
                console.log(that.tableData, 'tableData');
                console.log(res, '123');
            });
        },
        AddOption() {
            this.option.push({
                optionContent: ''
            });
        }
    }
};
</script>

<style scoped>
.button {
    margin-top: 20px;
}
.questionnaire {
    width: 100%;
    display: flex;
    justify-content: center;
}
.input {
    width: 600px;
}
</style>
