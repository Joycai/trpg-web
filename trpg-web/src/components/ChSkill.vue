<template lang="pug">
    
</template>

<style lang="scss">

</style>

<script>
//技能选择器
import SkillSelector from "@/components/ChSkillSelector.vue";
export default {
    components:{
        SkillSelector
    },
    data: function () {
        return {

        }
    },
    mounted: function () {
        this.$http.get("/resource/testdata.json")
        .then(
            function(res){
                console.log(res.body);
            },
            function(res){

            }
        )
    }
}
</script>
