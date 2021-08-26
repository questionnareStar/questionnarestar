<template>
  <div class="root">
    <nav-bar/>
    <div class="body" style="solid #eee">
        <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue"
export default {
  components: { NavBar },
  created() {
    if (this.$route.path === "/") {
      this.$router.replace("/welcome");
    }
  },
};
</script>

<style scoped>
.root {
  position: static;
  width: 100%;
  padding-top: 50px;
}
.body {
  width: 100%;
  height: 100vh;
}
.side-bar {
  top: 0;
  left: 0;
  width: 150px;
  height: 100%;
  position: fixed;
}
</style>
