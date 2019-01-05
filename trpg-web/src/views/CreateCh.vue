<template lang='pug'>
  div(class='createCh')
    el-container()
      el-header()
        h1(style='text-align: center;') 创建角色  
      el-container
        el-aside(width='200px')
          el-menu( :default-active='menu_idx' style='height:45em;text-align: center;' @select='selectHandler')
            el-menu-item(index='1') 简介
            el-menu-item(index='2') 属性
            el-menu-item(index='3') 技能
        el-main
          //- 人物基本信息
          div( v-show='menu_idx==1' )
            el-form(label-width='80px' style='max-width:460px;')
              el-form-item(label='角色名')
                el-input(clearable v-model='chInfo.name')
              el-form-item(label='性别' )
                el-radio-group(v-model='chInfo.gender')
                  el-radio(label="0") 男
                  el-radio(label="1") 女
              el-form-item(label='年龄')
                el-input-number(v-model.number='chInfo.age' :min=1 :max=99 @change='extAttrCal')
              el-form-item(label='时代' )              
                el-select(v-model='chInfo.era' placeholder='时代')
                  el-option(label="1920s" value='0') 
                  el-option(label="现代" value='1') 
              el-form-item(label='职业')
                el-input(clearable v-model='chInfo.profession')
              el-form-item(label='职业模板')
                el-select(v-model='chInfo.professionCode' placeholder='职业模板' filterable)
                  el-option(v-for='item in professionList' :key = 'item.code' :label='item.name' :value='item.code')
              el-form-item(label='国籍')
                el-input(clearable v-model='chInfo.nationality')
              el-form-item(label='家乡')
                el-input(clearable v-model='chInfo.homeland')
          //- 人物属性
          div( v-show='menu_idx==2' style="text-align: left; margin-left: 2em;")
            div(class="baseInfo-row" style='margin-left:5em;')
              span(style='color: green;') HP:{{baseInfo.hp}}/{{baseInfo.hpMax}} &nbsp;
              span(style='color: blue;') MP:{{baseInfo.mp}}/{{baseInfo.mpMax}} &nbsp;
            div(class='baseInfo-row' style='margin-left:1em;')
              span(style='color: gold;') 理智:{{baseInfo.san}}/{{baseInfo.san}} &nbsp;
              span(style='color: gray;') 移动力:{{baseInfo.mov}} &nbsp;
              span(style='color: lightcoral;') 伤害加成:{{baseInfo.db}} &nbsp;
            //- div(class="baseInfo-row" style='margin-left:5em;')
            //-   span(style='color: red;') {{}}
            p(style='margin-left: 5em;margin-bottom:0.5em;') 当前属性总和&nbsp;
              span(style='color: red;') {{totalAttr}}
            div(class="baseInfo-row")
              label(class='baseInfo-label') 力量
              el-input-number( label='力量' v-model.number="baseInfo.str" :min="0" :max="100"  @change='extAttrCal')
              label(class='baseInfo-info' ) {{notifyStr}}
            div(class="baseInfo-row")
              label(class='baseInfo-label') 体质
              el-input-number( label='体质' v-model.number="baseInfo.con" :min="0" :max="100"  @change='extAttrCal')
              label(class='baseInfo-info' ) {{notifyCon}}
            div(class="baseInfo-row")
              label(class='baseInfo-label') 体型
              el-input-number( label='体型' v-model.number="baseInfo.siz" :min="0" :max="100"  @change='extAttrCal')
              label(class='baseInfo-info' ) {{notifySiz}}
            div(class="baseInfo-row")
              label(class='baseInfo-label') 敏捷
              el-input-number( label='力量' v-model.number="baseInfo.dex" :min="0" :max="100"  @change='extAttrCal')
              label(class='baseInfo-info' ) {{notifyDex}}
            div(class="baseInfo-row")
              label(class='baseInfo-label') 外貌
              el-input-number( label='外貌' v-model.number="baseInfo.app" :min="0" :max="100" )
              label(class='baseInfo-info' ) {{notifyApp}}
            div(class="baseInfo-row")
              label(class='baseInfo-label') 智力
              el-input-number( label='智力' v-model.number="baseInfo.int" :min="0" :max="100" )
              label(class='baseInfo-info' ) {{notifyInt}}
            div(class="baseInfo-row")
              label(class='baseInfo-label') 意志
              el-input-number( label='意志' v-model.number="baseInfo.pow" :min="0" :max="100"  @change='extAttrCal')
              label(class='baseInfo-info' ) {{notifyPow}}
            div(class="baseInfo-row")
              label(class='baseInfo-label') 教育
              el-input-number( label='教育' v-model.number="baseInfo.edu" :min="0" :max="100" )
              label(class='baseInfo-info' ) {{notifyEdu}}
            div(class="baseInfo-row")
              label(class='baseInfo-label') 幸运
              el-input-number( label='幸运' v-model.number="baseInfo.lck" :min="0" :max="100" )
              label(class='baseInfo-info' ) {{notifyLck}}
            div(class="baseInfo-row")
              el-button(type='primary' @click='ranAttr' style='margin-left: 6em;') 试试手气
          //- 技能
          div( v-show='menu_idx==3')
            el-row()
              p 剩余职业点: 剩余兴趣点:
            el-row()
              el-col( v-for='item in baseSkills' :key='item.code' :xs={span:12} :span='6')
                div(style='margin-bottom: 1em;')
                  div() {{item.name}} 
                  div(style='font-size: smaller;') 基础值:
                    span(style='color: chocolate;') {{item.base}} 
                    span 合计:
                    span(style='color:forestgreen;') {{item.value+item.base}}
                  el-input-number( v-model='item.value' :min="0" :max="100" controls-position="right" size='small' :disabled='item.code==100')

</template>

<script>
import chBase from "@/components/ChBase.vue";
import chSkill from "@/components/ChSkill.vue";
import myMath from "@/util/mathUtil.js";
import { baseSkillList } from "@/data/skillList.js";
import { queryDB } from "@/data/dbData.js";
import { professionList } from "@/data/profession.js";
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

export default {
  name: "test",
  components: {
    chBase,
    chSkill
  },
  data: function() {
    return {
      visible: false,
      menu_idx: "1",
      professionList: professionList,
      baseSkills: baseSkillList(),
      chInfo: {
        name: "",
        gender: 0,
        era: "0",
        age: 0,
        profession: "",
        professionCode: "",
        nationality: "",
        homeland: ""
      },
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
        san: 0,
        hp: 0,
        hpMax: 0,
        mp: 0,
        mpMax: 0,
        mov: 8,
        db: "0",
        bod: 0
      },
      baseInfoRule: {
        str: [
          {
            type: "integer",
            required: true,
            min: 0,
            max: 100,
            message: "请输入0~100",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
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
      var baseInfo = this.baseInfo;
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
  methods: {
    findMsgByArray: function(v, rangeArray, msgArray) {
      //从数组1的区间中找到数组2对应的提示信息
      for (var i = 1, len = rangeArray.length; i < len; i++) {
        if (v >= rangeArray[i - 1] && v < rangeArray[i]) {
          return msgArray[i - 1];
        }
      }
      return msgArray[msgArray.length - 1];
    },
    findBaseSkill: function(code){
      var skills = this.baseSkills;
      for(var idx=0, total=skills.length ; idx<total;idx++){
        if(skills[idx].code == code){
          return skills[idx];
        }
      }
      return undefined;
    },
    selectHandler: function(index) {
      this.menu_idx = index;
    },
    extAttrCal: function() {
      var info = this.baseInfo;
      //计算移动
      var age = parseInt(this.chInfo.age);
      var mov_alt = 0;
      if(age>40){
        mov_alt = Math.ceil((age-40)/10)
      }
      if (info.str > info.siz && info.dex > info.siz) {
        info.mov = 9 - mov_alt;
      } else if (info.str < info.siz && info.dex < info.siz) {
        info.mov = 7 - mov_alt;
      } else {
        info.mov = 8 - mov_alt;
      }

      //计算hp
      info.hpMax = Math.floor((info.con + info.siz) / 10);
      info.hp = info.hpMax;
      //计算mp
      info.mpMax = Math.floor(info.pow / 5);
      info.mp = info.mpMax;
      //计算san
      info.san = info.pow;
      //计算db
      var ext = queryDB(info.str + info.siz);
      info.db = ext.db;
      info.bod = ext.bod;

      //计算闪避
      var missSkill = this.findBaseSkill("109");
      missSkill.base = Math.floor(info.dex/2);

      //计算母语
      var lanSkill = this.findBaseSkill("118");
      lanSkill.base = info.edu;
    },
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
      this.extAttrCal();
    }
  },
  mounted: function() {
    console.log(this.$route.path);
  }
};
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
.baseInfo-row {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}
.baseInfo-label {
  margin-right: 1em;
}
.baseInfo-info {
  margin-left: 1em;
}
.createCh {
  height: 100%;
}
.modal-title {
  color: aqua;
}
</style>