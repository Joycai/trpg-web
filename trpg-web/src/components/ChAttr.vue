<template lang="pug">
  div()
    div(class="baseInfo-row" style='margin-left:5em;')
      span(style='color: green;') HP:{{hpMax}}/{{hpMax}} &nbsp;
      span(style='color: blue;') MP:{{mpMax}}/{{mpMax}} &nbsp;
    div(class='baseInfo-row' style='margin-left:1em;')
      span(style='color: gold;') 理智:{{san}}/{{baseInfo.sanMax}} &nbsp;
      span(style='color: gray;') 移动力:{{baseInfo.mov}} &nbsp;
      span(style='color: lightcoral;') 伤害加成:{{baseInfo.db}} &nbsp;
    //- div(class="baseInfo-row" style='margin-left:5em;')
    //-   span(style='color: red;') {{}}
    p(style='margin-left: 5em;margin-bottom:0.5em;') 当前属性总和&nbsp;
      span(style='color: red;') {{totalAttr}}
    div(class="baseInfo-row")
      label(class='baseInfo-label') 力量
      el-input-number( label='力量' v-model.number="baseInfo.str" :min="0" :max="100"  @change="$emit('attrChanged')")
      label(class='baseInfo-info' ) {{notifyStr}}
    div(class="baseInfo-row")
      label(class='baseInfo-label') 体质
      el-input-number( label='体质' v-model.number="baseInfo.con" :min="0" :max="100"  @change="$emit('attrChanged')")
      label(class='baseInfo-info' ) {{notifyCon}}
    div(class="baseInfo-row")
      label(class='baseInfo-label') 体型
      el-input-number( label='体型' v-model.number="baseInfo.siz" :min="0" :max="100"  @change="$emit('attrChanged')")
      label(class='baseInfo-info' ) {{notifySiz}}
    div(class="baseInfo-row")
      label(class='baseInfo-label') 敏捷
      el-input-number( label='力量' v-model.number="baseInfo.dex" :min="0" :max="100"  @change="$emit('attrChanged')")
      label(class='baseInfo-info' ) {{notifyDex}}
    div(class="baseInfo-row")
      label(class='baseInfo-label') 外貌
      el-input-number( label='外貌' v-model.number="baseInfo.app" :min="0" :max="100" )
      label(class='baseInfo-info' ) {{notifyApp}}
    div(class="baseInfo-row")
      label(class='baseInfo-label') 智力
      el-input-number( label='智力' v-model.number="baseInfo.int" :min="0" :max="100" @change="$emit('attrChanged')")
      label(class='baseInfo-info' ) {{notifyInt}}
    div(class="baseInfo-row")
      label(class='baseInfo-label') 意志
      el-input-number( label='意志' v-model.number="baseInfo.pow" :min="0" :max="100"  @change="$emit('attrChanged')")
      label(class='baseInfo-info' ) {{notifyPow}}
    div(class="baseInfo-row")
      label(class='baseInfo-label') 教育
      el-input-number( label='教育' v-model.number="baseInfo.edu" :min="0" :max="100" @change="$emit('attrChanged')")
      label(class='baseInfo-info' ) {{notifyEdu}}
    div(class="baseInfo-row")
      label(class='baseInfo-label') 幸运
      el-input-number( label='幸运' v-model.number="baseInfo.lck" :min="0" :max="100" )
      label(class='baseInfo-info' ) {{notifyLck}}
    div(class="baseInfo-row")
      el-button(type='primary' @click='ranAttr' style='margin-left: 6em;') 试试手气
</template>

<style lang="scss" scoped>
.baseInfo-row {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}
.baseInfo-label {
  margin-right: 1em;
}
</style>

<script>
import {
  str_info,
  con_info,
  siz_info,
  dex_info,
  app_info,
  int_info,
  pow_info,
  edu_info,
  lck_info
} from "@/data/chAttrMsg.js";
import myMath from "@/util/mathUtil.js";

export default {
  data: function() {
    return {
      baseInfo: {}
    };
  },
  props: {
    data: Object
  },
  computed: {
    hpMax: function() {
      let info = this.baseInfo;
      //计算hp
      let hpMax = Math.floor((info.con + info.siz) / 10);
      info.hpMax = hpMax;
      info.hp = hpMax;
      return hpMax;
    },
    mpMax: function() {
      //计算mp
      let info = this.baseInfo;
      let mpMax = Math.floor(info.pow / 5);
      info.mpMax = mpMax;
      info.mp = mpMax;
      return mpMax;
    },
    san: function () {
      let info = this.baseInfo;
      let san = info.pow
      info.san = san
      return san
    },
    notifyStr: function() {
      var v = this.baseInfo.str;
      return this.findMsgByArray(v, str_info.range, str_info.msg);
    },
    notifyCon: function() {
      var v = this.baseInfo.con;
      return this.findMsgByArray(v, con_info.range, con_info.msg);
    },
    notifySiz: function() {
      var v = this.baseInfo.siz;
      return this.findMsgByArray(v, siz_info.range, siz_info.msg);
    },
    notifyDex: function() {
      var v = this.baseInfo.dex;
      return this.findMsgByArray(v, dex_info.range, dex_info.msg);
    },
    notifyApp: function() {
      var v = this.baseInfo.app;
      return this.findMsgByArray(v, app_info.range, app_info.msg);
    },
    notifyInt: function() {
      var v = this.baseInfo.int;
      return this.findMsgByArray(v, int_info.range, int_info.msg);
    },
    notifyPow: function() {
      var v = this.baseInfo.pow;
      return this.findMsgByArray(v, pow_info.range, pow_info.msg);
    },
    notifyEdu: function() {
      var v = this.baseInfo.edu;
      return this.findMsgByArray(v, edu_info.range, edu_info.msg);
    },
    notifyLck: function() {
      var v = this.baseInfo.lck;
      return this.findMsgByArray(v, lck_info.range, lck_info.msg);
    },
    totalAttr: function() {
      let baseInfo = this.baseInfo;
      return (
        baseInfo.str +
        baseInfo.con +
        baseInfo.siz +
        baseInfo.dex +
        baseInfo.app +
        baseInfo.int +
        baseInfo.pow +
        baseInfo.edu +
        baseInfo.lck
      );
    }
  },
  mounted: function() {
    this.baseInfo = this.data;
  },
  methods: {
    //从数组1的区间中找到数组2对应的提示信息
    findMsgByArray: function(v, rangeArray, msgArray) {
      for (var i = 1, len = rangeArray.length; i < len; i++) {
        if (v >= rangeArray[i - 1] && v < rangeArray[i]) {
          return msgArray[i - 1];
        }
      }
      return msgArray[msgArray.length - 1];
    },
    //计算随机属性
    ranAttr: function() {
      var info = this.baseInfo;
      info.str = 5 * (myMath.ranD6() + myMath.ranD6() + myMath.ranD6());
      info.con = 5 * (myMath.ranD6() + myMath.ranD6() + myMath.ranD6());
      info.siz = 5 * (myMath.ranD6() + myMath.ranD6() + 6);
      info.dex = 5 * (myMath.ranD6() + myMath.ranD6() + myMath.ranD6());
      info.app = 5 * (myMath.ranD6() + myMath.ranD6() + myMath.ranD6());
      info.int = 5 * (myMath.ranD6() + myMath.ranD6() + 6);
      info.pow = 5 * (myMath.ranD6() + myMath.ranD6() + myMath.ranD6());
      info.edu = 5 * (myMath.ranD6() + myMath.ranD6() + 6);
      info.lck = 5 * (myMath.ranD6() + myMath.ranD6() + myMath.ranD6());

      this.$emit("attrChanged");
    }
  }
};
</script>
