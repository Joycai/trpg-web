<template lang="pug">
    div
      div( :class="[{ 'job-skill' : item.jobPerk, 'legend-skill': item.code == 108 }, { 'hob-skill': item.value2 > 0,'job-skill' : item.value > 0 }]" ) {{item.name}} 
        span(style='color:forestgreen;') &nbsp;({{item.value + item.value2 + item.base}})
      div(style='font-size: smaller;') 基础值:
        span(style='color: chocolate;') {{item.base}} 
      div(style='display:flex;margin-top:0.5em;')
        span(style='margin:0.15em 0.25em auto 0;') 职业
        el-input-number( v-model='item.value' :min="0" :max="100" controls-position="right" size='mini' :disabled='!item.enableJobPerk' @change="$emit('change',item.code)")
        span(style='margin:0.15em 0.25em auto 0.25em;') 兴趣
        el-input-number( v-model='item.value2' :min="0" :max="100" controls-position="right" size='mini' :disabled='!item.enableHobPerk')
</template>

<script>
export default {
    props:[
        'item'
    ],
    mounted:function(){
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped>
.hob-skill {
  color: limegreen;
}
.job-skill {
  color: blue;
}
.legend-skill {
  color: gold;
}
</style>
