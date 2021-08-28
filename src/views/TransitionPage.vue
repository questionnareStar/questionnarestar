<template>
  <div class="demo-image">
    <div class="block">
      <el-image
        style="width: 400px; height: 300px"
        :src="imgUrl1"
      ></el-image>
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
  data:function(){
    return {
      imgUrl1: jpg1
    }
  }
}
</script>
