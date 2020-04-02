<template>
  <div id="app" class="layout">
    <!--<img src="./assets/logo.png" />
     <div>
      <p>
        If iView is successfully added to this project, you'll see an
        <code v-text="'<Button>'"></code>
        below
      </p>
      <Button type="primary">Button</Button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />-->
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate" />测试
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger>
          <Menu  width="auto" :active-name="leftMenu.active" @on-select="sideSelect">
            <MenuItem name="1">
              <Icon type="ios-paper" />排序工具
            </MenuItem>
            <!-- <MenuItem name="2">
              <Icon type="ios-navigate" />Item 2
            </MenuItem> -->
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>排序工具</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '780px', background: '#fff'}">
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
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
      if(name == '2'){
        this.$router.push("/")
      }
      if(name == "1"){
        this.$router.push("/battle")
      }
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss">
#app {
  // font-size: 1.5em;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
