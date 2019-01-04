<template>
  <div class="login_form">
    <el-container>
      <el-main>
        <el-form :model="form1" ref="form1"  class="my-login-form">
          <el-form-item label="用户名" prop="input_username">
            <el-input v-model="form1.input_username" placeholder="用户名" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="input_password">
            <el-input
              type="password"
              v-model="form1.input_password"
              placeholder="密码"
              auto-complete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login()">登陆</el-button>
            <!-- <el-button @click="">登陆</el-button> -->
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import localData from "@/util/LocalData"

export default {
  name: "login",
  data: function() {
    return {
      form1: {
        input_username: "",
        input_password: ""
      }
    };
  },
  methods: {
    login: function() {
      // this.$http.get("http://localhost:8090/data/autoCleanEmployee?companyUid=241")
      // .then(function(res){
      //   console.log(res.data)
      // })
      localData.setToken("test-123456")
    }
  }
};
</script>
<style lang="scss" scoped>
.my-login-form {
  max-width: 21em;
  width:100%;
  margin: 0 auto;
}
</style>
