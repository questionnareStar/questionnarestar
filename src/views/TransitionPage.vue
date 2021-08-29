<template>
  <div class="demo-image">
    <div class="block">
      <el-image
        style="width: 400px; height: 300px"
        :src="imgUrl1"
      ></el-image>
      <router-link to="/normal/edit">
        <button>普通问卷</button>
       </router-link>
      <button>投票问卷</button>
       <router-link to="/registration/create">
      <button>报名问卷</button>
      </router-link>
      <router-link to="/checkin/edit">
        <button>疫情打卡问卷</button>
      </router-link>
    </div>
  </div>
</template>
<script>
import jpg1 from '../assets/问卷1.png'
import jpg2 from '../assets/问卷2.png'
import jpg3 from '../assets/问卷3.png'
import jpg4 from '../assets/问卷4.png'
import jpg5 from '../assets/Questionlogo.png'

export default {
  mounted() {
    this.$store.commit('updateOperation', {id: '', code: '', isReleased: false })
  },
  data:function(){
    return {
      imgUrl1: jpg1
    }
  }
}
</script>
