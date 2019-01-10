// 角色基础属性
<template lang="pug">
  div(class="")
    div()
      span(class="info-hp") HP: {{baseInfo.hp}} / {{baseInfo.hpMax}} &nbsp;
      span(class="info-mp") MP: {{baseInfo.mp}} / {{baseInfo.mpMax}} &nbsp;
      span(class="info-san") 理智: {{baseInfo.san}} / {{baseInfo.sanMax}} &nbsp;
      span(class="info-mov") 移动力: {{baseInfo.mov}} &nbsp;
      span(class="info-db") 伤害加成: {{baseInfo.db}} &nbsp;
    div 当前属性总和 &nbsp;
      span(style="color: blue;") {{totalAttr}}

    div(class="attr-container") 
      div(class="att-item")
        div(class="baseInfo-label") 力量
        div(class="baseInfo-notify") {{notifyStr}}
        el-input-number( label='力量' v-model.number="baseInfo.str" :min="0" :max="100" @input="handleStr")

      div(class="att-item")
        div(class='baseInfo-label') 体质
        div(class='baseInfo-notify' ) {{notifyCon}}
        el-input-number( label='体质' v-model.number="baseInfo.con" :min="0" :max="100" @input="handleCon")

      div(class="att-item")
        div(class='baseInfo-label') 体型
        div(class="baseInfo-notify" ) {{notifySiz}}
        el-input-number( label='体型' v-model.number="baseInfo.siz" :min="0" :max="100" @input="handleSiz")

      div(class="att-item")
        div(class='baseInfo-label') 敏捷
        div(class="baseInfo-notify" ) {{notifyDex}}
        el-input-number( label='力量' v-model.number="baseInfo.dex" :min="0" :max="100" @input="handleDex")

      div(class="att-item")
        div(class='baseInfo-label') 外貌
        div(class="baseInfo-notify" ) {{notifyApp}}
        el-input-number( label='外貌' v-model.number="baseInfo.app" :min="0" :max="100")

      div(class="att-item")
        div(class='baseInfo-label') 智力
        div(class="baseInfo-notify" ) {{notifyInt}}
        el-input-number( label='智力' v-model.number="baseInfo.int" :min="0" :max="100")

      div(class="att-item")
        div(class='baseInfo-label') 意志
        div(class="baseInfo-notify" ) {{notifyPow}}
        el-input-number( label='意志' v-model.number="baseInfo.pow" :min="0" :max="100" @input="handlePow")

      div(class="att-item")
        div(class='baseInfo-label') 教育
        div(class="baseInfo-notify" ) {{notifyEdu}}
        el-input-number( label='教育' v-model.number="baseInfo.edu" :min="0" :max="100" )

      div(class="att-item")
        div(class='baseInfo-label') 幸运
        div(class="baseInfo-notify" ) {{notifyLck}}
        el-input-number( label='幸运' v-model.number="baseInfo.lck" :min="0" :max="100" )
    div(class="baseInfo-row-btn")
      el-button(class="my-button" type='primary' @click='ranAttr') 试试手气
</template>

<style lang="scss" scoped>
@import "@/style/InfoStyle.scss";

.attr-container {
  // text-align: center;
  // justify-content:center;
  // align-items: center;
  display: flex;
  flex-wrap: wrap;
  // flex-direction: column;
}
.att-item {
  // text-align: center;
  // justify-content: center;
  // display: flex;
  // width: 200px;
  padding: 1em;
}
.baseInfo-row-btn {
}
@mixin row-label {
  margin-bottom: 0.5em;
}
.baseInfo-label {
  @include row-label();
}
.baseInfo-notify {
  @include row-label();
  color: #606266;
  font-style: oblique;
  font-size: 0.9em;
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
} from "@/data/chAttrMsg";
import { queryDB } from "@/data/DataDB";
import myMath from "@/util/mathUtil";

export default {
  data: function() {
    return {
      baseInfo: {
        str: 0,
        con: 0,
        siz: 0,
        dex: 0,
        app: 0,
        int: 0,
        pow: 0,
        edu: 0,
        lck: 0,
        mov: 0,
        san: 0,
        sanMax: 0,
        hp: 0,
        hpMax: 0,
        mp: 0,
        mpMax: 0,
        db: "0",
        bod: 0
      }
    };
  },
  props: {
    data: Object,
    cocSkillValue: {
      type: Number,
      default: 0
    },
    age: {
      typer: Number,
      required: true
    },
    initValue: {
      // 是否在最大值变化的同时修改当前值
      type: Boolean,
      default: false
    }
  },
  computed: {
    notifyStr: function() {
      return this.findMsgByArray(this.baseInfo.str, str_info.range, str_info.msg);
    },
    notifyCon: function() {
      return this.findMsgByArray(this.baseInfo.con, con_info.range, con_info.msg);
    },
    notifySiz: function() {
      return this.findMsgByArray(this.baseInfo.siz, siz_info.range, siz_info.msg);
    },
    notifyDex: function() {
      return this.findMsgByArray(this.baseInfo.dex, dex_info.range, dex_info.msg);
    },
    notifyApp: function() {
      return this.findMsgByArray(this.baseInfo.app, app_info.range, app_info.msg);
    },
    notifyInt: function() {
      return this.findMsgByArray(this.baseInfo.int, int_info.range, int_info.msg);
    },
    notifyPow: function() {
      return this.findMsgByArray(this.baseInfo.pow, pow_info.range, pow_info.msg);
    },
    notifyEdu: function() {
      return this.findMsgByArray(this.baseInfo.edu, edu_info.range, edu_info.msg);
    },
    notifyLck: function() {
      return this.findMsgByArray(this.baseInfo.lck, lck_info.range, lck_info.msg);
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
    if (this.data !== undefined) {
      this.baseInfo = this.data;
    }
    this.calMaxHP();
    this.calMaxMP();
    this.calMaxSAN();
    this.calDB();
    this.calMov();
  },
  methods: {
    //从数组1的区间中找到数组2对应的提示信息
    findMsgByArray: function(v, rangeArray, msgArray) {
      let idx = this.findMsgByIdx(v, rangeArray);
      if (idx == -1) {
        return msgArray[msgArray.length - 1];
      }else{
        return msgArray[idx];
      }
    },
    findMsgByIdx: function(v, rangeArray) {
      for (var i = 1, len = rangeArray.length; i < len; i++) {
        if (v >= rangeArray[i - 1] && v < rangeArray[i]) {
          return i - 1;
        }
      }
      //未找到
      return -1;
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
    },
    // ***********计算参数**************
    calDB: function () {
      let db = queryDB(this.baseInfo.siz + this.baseInfo.str);
      this.baseInfo.db = db.db;
      this.baseInfo.bod = db.bod;
    },
    calMov: function () {
      let movDelta = 0;
      if(this.age > 40){
        movDelta = Math.ceil((this.age - 40) / 10)
      }
      let base = 8;
      let str = this.baseInfo.str;
      let dex = this.baseInfo.dex;
      let siz = this.baseInfo.siz;

      if(str > siz && dex > siz){
        base = 9;
      }else if( str < siz && dex < siz ){
        base = 7;
      }
      this.baseInfo.mov = base - movDelta;
    },
    calMaxHP: function() {
      let info = this.baseInfo;
      //计算hp
      let maxHp = Math.floor((info.con + info.siz) / 10);
      info.hpMax = maxHp;
      if(this.initValue){
        info.hp = maxHp;
      }
    },
    calMaxMP: function() {
      //计算mp
      let info = this.baseInfo;
      let mpMax = Math.floor(info.pow / 5);
      info.mpMax = mpMax;
      if(this.initValue){
        info.mp = mpMax;
      }
    },
    calMaxSAN: function() {
      let sanMax = this.baseInfo.pow - this.cocSkillValue;
      this.baseInfo.sanMax = sanMax;
      if(this.initValue){
        this.baseInfo.san = sanMax;
      }
    },
    // *************钩子*************
    handleStr: function () {
      this.calDB();
      this.calMov();
    },
    handleCon: function () {
      this.calMaxHP();
    },
    handleSiz: function () {
      this.calMaxHP();
      this.calDB();
      this.calMov();
    },
    handleDex: function () {
      this.calMov();
    },
    handlePow: function () {
      this.calMaxSAN();
      this.calMaxMP();
    }
  }
};
</script>
