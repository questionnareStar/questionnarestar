<template>
    <div>
        <single-select :no="1" question="这是一个问题" description="dis"/>
    </div>
</template>

<script>
import SingleSelect from '../components/SingleSelect.vue'
/**
 * 1: 填空题
 * 2: 评分题
 * 3: 多选题
 * 4: 单选题
 */
export default {
  components: { SingleSelect },
    created() {

    }
}
</script>

<style scoped>

</style>