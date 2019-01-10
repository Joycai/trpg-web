<template lang="pug">
    div
      <skill-selector></skill-selector>
</template>

<style lang="scss">

</style>

<script lang="ts">
//技能选择器
import Vue from "vue";
import SkillSelector from "@/components/ChSkillSelector.vue";
export default Vue.extend({
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
                console.log(res.data);
            },
            function(res){

            }
        )
    }
})
</script>
