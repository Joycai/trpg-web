// 子组件只使用单项绑定
<template lang="pug">
    div
</template>

<style lang="scss">
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
    return {};
  },
  // model: {
  //   prop: "item",
  //   event: "change"
  // },
  props: {
    data: Object,
    colorCode: Number
  },
  mounted: function() {
    //init local data
    this.item = this.data;
  },
  methods: {}
};
</script>