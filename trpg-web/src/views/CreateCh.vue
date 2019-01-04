<template>
  <div class="createCh">
    <el-container>
      <el-header>
        <h1>创建角色</h1>
      </el-header>
      <el-container>
        <el-aside width="200px" >
          <el-menu :default-active="$route.path" style="height:45em" router >
            <el-menu-item index="/trpg/createCh/ChBase">基础属性</el-menu-item>
            <el-menu-item index="/trpg/createCh/ChSkill">技能</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "test",
  components: {},
  data: function() {
    return {
      visible: false
    };
  },
  mounted:function(){
      console.log(this.$route.path)
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
.createCh {
    height: 100%;
}
.modal-title {
  color: aqua;
}
</style>