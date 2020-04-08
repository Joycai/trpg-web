<template>
  <div id="app" class="layout">
    <router-view />
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import Battle from "./views/Battle.vue";

// const con = console;

export default {
  name: "app",
  data() {
    return {
      leftMenu: {
        active: "1"
      }
    };
  },
  components: {
    // Battle
  },
  methods: {
    sideSelect: function(name) {
      if (name == "2") {
        this.$router.push("/");
      }
      if (name == "1") {
        this.$router.push("/battle");
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
#app {
  // font-size: 1.5em;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  // margin-top: 60px;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
