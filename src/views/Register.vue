<template>
  <div>
        <h2>注册用户</h2>
        <el-form
          :model="registerInfo"
          status-icon
          label-position="top"
          :rules="rules"
          ref="registerInfo">
          <el-form-item label="邮箱" prop="email">
            <el-input placeholder="请输入邮箱" v-model="registerInfo.email"/>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" placeholder="请输入密码" v-model="registerInfo.pass"/>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" placeholder="请再次输入密码" v-model="registerInfo.checkPass"/>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input placeholder="请输入验证码" v-model="registerInfo.code" :disabled="!gotCode"/>
          </el-form-item>
        </el-form>
        <el-button @click="fetchCode()">获取验证码</el-button>
        <el-button type="primary" @click="register('registerInfo')">注册</el-button>
        <el-divider/>
        <div class="other-choice">
            <span @click="toLogin()">已有帐号？返回登录</span>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else if (/^(\w+)(\.\w+)*@(\w+)(\.\w+)*.(\w+)$/i.test(value)){
        callback();
      } else {
        return callback(new Error("邮箱格式不正确"));
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 6 || value.length > 20) {
          callback(new Error("请输入六至二十位"));
        }
        var regx = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/;
        if (!this.registerInfo.pass.match(regx)) {
          callback(new Error("请同时包含字母数字"));
        }
        if (this.registerInfo.checkPass !== "") {
          this.$refs.registerInfo.validateField("checkPass");
        }
        callback();
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerInfo.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    }
    var validateCode = (rule, value, callback) => {
      if (value === this.$store.state.realCode) {
        callback()
      } else {
        callback(new Error("验证码错误"))
      }
    }
    return {
      registerInfo: {
        email: "",
        pass: "",
        checkPass: "",
        code: ""
      },
      rules: {
        email: [{ validator: checkEmail, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      },
      realCode: "",
      gotCode: false
    };
  },
  methods: {
    register(registerInfo) {
      // this.$router.push('/auth/login');
      this.$refs[registerInfo].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    toLogin() {
      this.$router.push('/auth/login');
    },
    fetchCode() {
      if (/^(\w+)(\.\w+)*@(\w+)(\.\w+)*.(\w+)$/i.test(this.registerInfo.email)) {
        this.gotCode = true
        // 从后端获取验证码
      } else {
        this.$message({
          showClose: true,
          message: '正确输入邮箱后方可获取验证码',
          type: 'error'
        })
      }
    }
  },
};
</script>

<style scoped>
.other-choice {
    display: inline-flex;
    margin-bottom: 25px;
}
.other-choice span {
    color:#2f71dc;
    margin-inline: 15px;
    cursor: pointer;
}
</style>