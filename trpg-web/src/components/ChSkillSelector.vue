// 子组件只使用单项绑定
<template lang="pug">
    div
      h1 {{cData}}
</template>

<style lang="scss">
</style>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: function() {
    return {
      skill: "MySkill"
    };
  },
  computed:{
    cData:function(){
      return this.skill+"ABC"
    }
  },
  methods:{
    testFun: function (name:string) {
      
    }
  }
});
</script>
