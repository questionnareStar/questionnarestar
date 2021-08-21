<template>
    <div id="top_bar">
        <div class="top_bar_frame">
            <div class="top_bar_icon" @click="toStart">
                <div class="top_bar_icon_title">Questionnare Star</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        toStart() {
            this.$router.push('/')
            window.location.reload()
        }
    }
}
</script>

<style scoped>
#top_bar {
    position: fixed;
    z-index: 10;
    top: 0px;
    height: 46px;
    widows: 100vw;
    vertical-align: middle;
    border: #cecfd2 solid thin;
    backdrop-filter: blur(20px);
    background-color: rgba(255, 255, 255, 0.5);
}
.nav_bar_frame {
  vertical-align: middle;
  height: 46px;
  width: 100%;
}
.nav_bar_icon {
  margin-left: 25px;
  float: left;
  line-height: 45px;
  vertical-align: middle;
  height: 45px;
  cursor: pointer;
}
.nav_bar_icon_title {
  display: inline;
  font-weight: bold;
}
</style>