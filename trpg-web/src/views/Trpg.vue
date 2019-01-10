<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
</style>

<script lang="ts">
import Vue from "vue";
import localData from "@/util/LocalData";
export default Vue.extend({
  name: "trpg",
  beforeMount: function() {
    // window.localStorage.setItem("userToken","test-123456")
    const token = localData.readToken();
    console.log("Token" + token);
    if (token === undefined || token == null) {
      this.$router.push("/trpg/login");
    } else {
      this.$router.push("/trpg/home");
    }
    // this.$router
  },
  mounted: function() {}
});
</script>
