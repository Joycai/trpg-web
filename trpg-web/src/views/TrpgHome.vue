<template lang="pug">
    div(id="trpghome")
      p 施工中
      div(class="trpg-nav")
       router-link(to="/trpg/home") home
       ||
       router-link(to="/trpg/createCh") createCh
</template>

<style lang="scss">
.trpg-nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
