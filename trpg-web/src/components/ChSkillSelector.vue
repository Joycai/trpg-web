// 子组件只使用单项绑定
<template lang="pug">
    div
      div( :class="nameStyleObj" ) {{item.name}} 
        span(style='color:forestgreen;') &nbsp;({{item.value + item.value2 + item.base}})
      div(style='font-size: smaller;') 基础值:
        span(style='color: chocolate;') {{item.base}} 
      div(style='display:flex;margin-top:0.5em;')
        span(style='margin:0.15em 0.3em auto 0;') 职业
        el-input-number(class='input-perk' v-model='item.value' :min="0" :max="100" controls-position="right" size='mini' :disabled='!item.enableJobPerk' @change="$emit('changeJobPerk',item.code)")
        span(style='margin:0.15em 0.3em auto 0.3em;') 兴趣
        el-input-number(class='input-perk' v-model='item.value2' :min="0" :max="100" controls-position="right" size='mini' :disabled='!item.enableHobPerk')
</template>

<style lang="scss">
//输入框的样式补丁
.input-perk {
  width: 80px;
  input {
    padding-right: 35px !important;
  }
  span {
    width: 20px !important;
  }
}

.skill-title-hob {
  color: limegreen;
}
.skill-title-job {
  color: blue;
}
.skill-title-legend {
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
        "skill-title-hob": this.item.value2 > 0,
        "skill-title-job": this.item.jobPerk || this.item.value > 0,
        "skill-title-legend": this.item.code == 108,
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