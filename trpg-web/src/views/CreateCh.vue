<template>
  <div class="createCh">
    <el-container>
      <el-header>
        <h1>创建角色</h1>
      </el-header>
      <el-container>
        <el-aside width="200px" >
          <el-menu :default-active="menu_idx" style="height:45em" @select="selectHandler" >
            <el-menu-item index="1" >基础属性</el-menu-item>
            <el-menu-item index="2">技能</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div v-show="menu_idx==1" >
            <ch-base @transferBaseInfo="updateBaseInfo"></ch-base>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import chBase from '@/components/ChBase.vue'
export default {
  name: "test",
  components: {
    chBase
  },
  data: function() {
    return {
      visible: false,
      menu_idx: "1",
    };
  },
  methods:{
    selectHandler:function(index){
      this.menu_idx = index
    },
    updateBaseInfo:function(baseInfo){
      console.log("1111",baseInfo.str)
    }
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