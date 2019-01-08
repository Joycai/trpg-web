<template>
  <div class="test">
    <h1>Test Page</h1>
    <el-button @click="visible = true">Button</el-button>
    <el-dialog :visible.sync="visible" title="Hello world">
      <!-- <p class="modal-title">Try Element</p> -->
      <login></login>
    </el-dialog>
  </div>
</template>

<script>
import login from '@/components/Login.vue'
export default {
    name: "test",
    components:{
        login
    },
    data: function(){
        return{
            visible: false
        }
    },
    mounted:function(){
        let obj = {
            a: "aaa",
            b: "bbb",
            c: "ccc"
        }
        console.log(obj[0])
    }
}
</script>

<style lang="scss" scoped>
h1{
    color: red
}
.modal-title{
    color: aqua
}
</style>