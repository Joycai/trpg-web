<template>
    <div>
        <h1>欢迎使用</h1>
        <router-view></router-view>
    </div>
</template>

<script>
import localData from "@/util/LocalData"
export default {
    name:"trpg",
    beforeMount: function () {
        // window.localStorage.setItem("userToken","test-123456")
        const token = localData.readToken()
        console.log("Token"+token)
        if(token === undefined || token == null){
            this.$router.push("/trpg/login")
        }
        // this.$router
    },
    mounted: function () {
        
    }
}
</script>

<style lang="scss">

</style>
