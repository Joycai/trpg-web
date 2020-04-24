<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a-button @click="handleClick ">about</a-button>
  </div>
</template>

<script>
export default {
  methods:{
    handleClick: function(){
      this.$router.push("/about")
    }
  }
}
</script>
