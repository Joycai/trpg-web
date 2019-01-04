<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/trpg">跑团</router-link>
      <router-link to="/about">关于</router-link>
    </div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
