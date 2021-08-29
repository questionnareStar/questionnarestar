
<template>
<div>
    <div class="bg"></div>
         <div class="back-container">
           <el-button type="primary" round @click="back()">点我返回首页</el-button>
        </div></div>
</template>

<script>

export default {
    methods: {
        back(){
            this.$router.push("/welcome")
        }
    }
}
</script>
<style scoped>
.bg {
    background-image: url('../assets/finish.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 500px;
}
.back-container{
   text-align:center;
}
</style>
