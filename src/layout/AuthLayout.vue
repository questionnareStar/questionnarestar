<template>
  <div class="root">
    <div class="auth-card">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.root {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-image: url(../assets/authbackground.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  width: 100vw;
  height: 100vh;
}
.auth-card {
  border: #cccccc solid thin;
  border-radius: 30px;
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  height: auto;
}
</style>
