<template>
  <div class="test">
    <h1>Test Page</h1>
    <el-button @click="visible = true">Button</el-button>
    <el-dialog :visible.sync="visible" title="Hello world">
      <p class="modal-title">Try Element</p>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data: function(){
        return{
            visible: false
        }
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