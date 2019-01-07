<template lang='pug'>
  div(class='createCh')
    el-container()
      el-header()
        h1(style='text-align: center;') 创建角色  
      el-container
        el-aside(width='200px')
          el-menu( :default-active='menu_idx' style='height:45em;text-align: center;' @select='pageSelectHandler')
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
                el-select(v-model='chInfo.professionCode' placeholder='职业模板' filterable @change='jobChangeHandle')
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
          div( v-show='menu_idx==3' style="margin-left:2em;")
            el-row()
              span 剩余职业点: 
              span(class='job-skill') {{jobPerks}} 
              span 剩余兴趣点: 
              span(class='hob-skill') {{hobPerks}}
              span(style='color: crimson;') &nbsp; {{this.jobInfo.jobSkillMsg}}
            el-row()
              el-col( v-for='item in baseSkills' :key='item.code' :xs={span:24} :span='12' :lg={span:8})
                skill-selector(style='margin-bottom: 1em;' :item='item' @change="skillChangeHandle")
            hr(style='margin:0.5em auto 1.5em auto')
            el-row()
              el-col(:xs={span:24} :span='12' :lg={span:8})
                div()
                  span 选择专精:
                  el-cascader( expand-trigger='hover' :options='options' v-model='proSkillSelecterValue' size='small' style='margin-left:0.5em;margin-right:0.75em;')
                  el-button(icon='el-icon-plus' type="success" size='mini' circle @click='proPerkAdd')
            el-row()
              el-col(:xs={span:24} :span='12' :lg={span:8})
                div()
                 skill-selector( :item='testItem')
</template>

<script>
import skillSelector from "@/components/SkillSelector.vue";
import myMath from "@/util/mathUtil.js";
// import skillData from "@/data/skillList.js";
import { isInArray } from "@/util/commonUtils.js";
import { queryDB } from "@/data/dbData.js";

import jobData from "@/data/jobData.js";
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
    skillSelector
    // chSkill
  },
  data: function() {
    return {
      testItem: {
        name: "111",
        value: 1,
        value2: 2,
        base: 3
      },
      proSkillSelecterValue: [],
      options: [
        {
          value: "sc",
          label: "科学",
          children: [
            { value: "1001", label: "物理" },
            { value: "1002", label: "化学" }
          ]
        }
      ],
      visible: false,
      menu_idx: "1",
      professionList: [],
      //基本技能列表
      // [ {
      // "name": "会计",
      // "code": "100",
      // "base": 5,
      // "value": 0,
      // "value2": 0,
      // "enableHobPerk": true,
      // "jobPerk": false
      // }]
      baseSkills: {},
      // 专精技能
      // name:[{ name: , code: , base: , value: ,value2: }]结构，下标为大类名，
      specSkills: {},
      chInfo: {
        name: "",
        gender: 0,
        era: "0",
        age: 0,
        profession: "",
        professionCode: "", //职业模板代号
        nationality: "",
        homeland: ""
      },
      // data 基本属性
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
      // data 职业数据
      jobInfo: {
        mainAttr: [],
        baseSkills: [""],
        exJobNum: 0,
        customJobGroup: [
          {
            num: 0,
            skills: [""]
          }
        ],
        jobSkillMsg: "",
        credRange: {
          min: 30,
          max: 70
        }
      }
    };
  },
  computed: {
    jobPerks: function() {
      let total = 0;
      let attrArray = this.jobInfo.mainAttr;
      if (attrArray !== undefined && attrArray.length > 0) {
        let arr = new Array();
        for (var i in attrArray) {
          arr[i] = this.getAttrById(attrArray[i]);
        }
        let usedAttr = Math.max.apply(null, arr);
        total = usedAttr * 2 + this.baseInfo.edu * 2;
      }
      total = this.baseInfo.edu * 4;

      //计算已经用掉的
      let used = 0;
      let skills = this.baseSkills;
      for (var j in skills) {
        used += skills[j].value;
      }
      return total - used;
    },
    hobPerks: function() {
      let total = this.baseInfo.edu * 2;
      //计算已经用掉的
      let used = 0;
      let skills = this.baseSkills;
      for (var j in skills) {
        used += skills[j].value2;
      }
      return total - used;
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
    },
    customJobSkillNum: function() {
      //计算自选技能数量
      //遍历数组
      let skills = this.baseSkills;
      var count = 0;
      if (skills.length > 0) {
        for (var i in skills) {
          let skill = skills[i];
          if (!this.isJobPerk(skill.name) && skill.value > 0) {
            count++;
          }
        }
      }
      return count;
    }
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
    //根据技能代码寻找某个技能的数据对象
    findBaseSkill: function(code) {
      var skills = this.baseSkills;
      for (var idx = 0, total = skills.length; idx < total; idx++) {
        if (skills[idx].code == code) {
          return skills[idx];
        }
      }
      return undefined;
    },
    // 1~8对应 strt~edu
    getAttrById: function(code) {
      let baseInfo = this.baseInfo;
      var array = [
        baseInfo.str,
        baseInfo.con,
        baseInfo.siz,
        baseInfo.dex,
        baseInfo.app,
        baseInfo.int,
        baseInfo.pow,
        baseInfo.edu
      ];
      return array[code - 1];
    },
    //计算额外属性
    extAttrCal: function() {
      var info = this.baseInfo;
      //计算移动
      var age = parseInt(this.chInfo.age);
      var mov_alt = 0;
      if (age > 40) {
        mov_alt = Math.ceil((age - 40) / 10);
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
      var missSkill = this.findBaseSkill("110");
      missSkill.base = Math.floor(info.dex / 2);
      //计算母语
      var lanSkill = this.findBaseSkill("119");
      lanSkill.base = info.edu;
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
      this.extAttrCal();
    },
    //转换数组
    convertArray: function(src) {
      let arr = new Array();
      let idx = 0;
      for (let i in src) {
        arr[idx] = src[i];
        idx++;
      }
      return arr;
    },
    // [初始化]技能表
    initSkillList: function() {
      this.professionList = jobData.getJobList();
      // this.baseSkills = skillData.readSkillList();
      this.$http.get("/resource/testdata.json").then(response => {
        let data = response.body;
        //base
        this.baseSkills = this.convertArray(data.base);
        // 科学
        this.specSkills.sc = this.convertArray(data.sc);
        // 生存
        this.specSkills.sv = this.convertArray(data.sv);
        // 技艺
        this.specSkills.art = this.convertArray(data.art);
        // 驾驶
        this.specSkills.dr = this.convertArray(data.dr);
        // 格斗
        this.specSkills.ft = this.convertArray(data.ft);
        // 射击
        this.specSkills.st = this.convertArray(data.st);
      });
    },
    //刷新技能可选状态
    //
    // 1.将所有可用本职技能的enableJobPerk设为true，注意要处理多选1的情况
    // 2.将本职技能jobPerk改为true
    refreshSkillStatus: function(resetValue) {
      //获取技能组信息
      // let baseSkillsArr = this.baseSkills;
      // let specSkillsMap = this.specSkills;
      //获取职业技能信息
      // let jobBaseSkillsArr = this.jobInfo.baseSkills;
      // let jobGroupSkillsArr = this.jobInfo.customJobGroup;
      // let exSkillNum = this.jobInfo.exJobNum;
      //重设状态
      this.restSkillStatusToDefault(resetValue);
    },
    //重设技能可选状态（108克苏鲁始终禁止, 107信用始终设为兴趣不可）
    restSkillStatusToDefault: function(resetValue) {
      let baseSkillsArr = this.baseSkills;
      let specSkillsMap = this.specSkills;
      for (let i in baseSkillsArr) {
        let skill = baseSkillsArr[i];
        if (skill.code == "108") {
          skill.jobPerk = false;
          skill.enableJobPerk = false;
          skill.enableHobPerk = false;
        } else if (skill.code == "107") {
          skill.jobPerk = true;
          skill.enableJobPerk = true;
          skill.enableHobPerk = false;
        }
        if (resetValue) {
          skill.value = 0;
          skill.value2 = 0;
        }
      }
      for (let i in specSkillsMap) {
        let arr = specSkillsMap[i];
        for (let j in arr) {
          let skill = arr[j];
          skill.jobPerk = false;
          skill.enableJobPerk = false;
          skill.enableHobPerk = true;
          if (resetValue) {
            skill.value = 0;
            skill.value2 = 0;
          }
        }
      }
    },
    // -------------以下是事件钩子---------------
    pageSelectHandler: function(index) {
      this.menu_idx = index;
    },
    // 添加专精技能
    proPerkAdd: function() {
      // this.testItem.name = '信用评级'
      console.debug(this.testItem.value + " " + this.testItem.value2);
      console.log(this.proSkillSelecterValue);
    },
    // 处理技能变更
    skillChangeHandle: function(code) {
      console.debug("变更了技能" + code);
      this.refreshSkillStatus(false);
    },
    // 处理职业变更后的本职技能变更导致的数据更新
    jobChangeHandle: function() {
      if (
        this.chInfo.professionCode === undefined &&
        this.chInfo.professionCode.length == 0
      )
        return;
      //获取职业数据
      var jobInfo = jobData.findJobInfo(this.chInfo.professionCode);
      //将调整所有职业技能
      if (jobInfo !== undefined) {
        //基础职业技能
        this.jobInfo.baseSkills = jobInfo.jobSkill;
        //自由职业点
        this.jobInfo.exJobNum = jobInfo.exJobNum;
        //n选m职业点
        this.jobInfo.customJobGroup = jobInfo.customJobGroup;
        //提示信息
        this.jobInfo.jobSkillMsg = jobInfo.jobSkillMsg;
        //主属性
        this.jobInfo.mainAttr = jobInfo.mainAttr;
        //信用范围
        this.jobInfo.credRange = jobInfo.credRange;
        //重置技能状态
        this.refreshSkillStatus(true);
      }
    }
  },
  mounted: function() {
    this.jobChangeHandle();
    this.initSkillList();
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