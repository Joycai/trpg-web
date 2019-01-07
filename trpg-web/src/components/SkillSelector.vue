// 子组件只使用单项绑定
<template lang="pug">
    div
      div( :class="nameStyleObj" ) {{item.name}} 
        span(style='color:forestgreen;') &nbsp;({{item.value + item.value2 + item.base}})
      div(style='font-size: smaller;') 基础值:
        span(style='color: chocolate;') {{item.base}} 
      div(style='display:flex;margin-top:0.5em;')
        span(style='margin:0.15em 0.25em auto 0;') 职业
        el-input-number( v-model='item.value' :min="0" :max="100" controls-position="right" size='mini' :disabled='!item.enableJobPerk' @change="$emit('changeJobPerk',item.code)")
        span(style='margin:0.15em 0.25em auto 0.25em;') 兴趣
        el-input-number( v-model='item.value2' :min="0" :max="100" controls-position="right" size='mini' :disabled='!item.enableHobPerk')
</template>

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
.color-code-1 {
  color:aqua;
}
.color-code-2 {
  color: cornflowerblue;
}
.color-code-3 {
  color: cornsilk;
}
</style>

<script>
export default {
  computed: {
    nameStyleObj: function() {
      return {
        "hob-skill": this.item.value2 > 0,
        "job-skill": this.item.jobPerk || this.item.value > 0,
        "legend-skill": this.item.code == 108,
        "color-code-1": this.colorCode == 0,
        "color-code-2": this.colorCode == 1,
        "color-code-3": this.colorCode == 2
      };
    }
  },
  data: function() {
    return {
      item: {
        name: "111",
        value: 1,
        value2: 2,
        base: 3,
        jobPerk: false,
        enableJobPerk: true,
        enableHobPerk: true,
        groupCode: -1
      }
    };
  },
  // model: {
  //   prop: "item",
  //   event: "change"
  // },
  props: {
    data: Object,
    colorCode: Number,
  },
  mounted: function() {
    //init local data
    this.item = this.data;
  },
  methods: {}
};
</script>