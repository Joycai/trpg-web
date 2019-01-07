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
          //- 基本信息
          ch-info-panel( v-show='menu_idx==1' :chInfo='chInfo' :professionList='professionList' @jobChange='jobChangeHandle' )
          //- 人物属性
          ch-attr-panel( v-show='menu_idx==2' :data='baseAttr' style="text-align: left; margin-left: 2em;" @attrChanged='calExAttr')
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
                skill-selector(style='margin-bottom: 1em;' :data='item' :colorCode='item.groupCode' @changeJobPerk='skillChangeHandle')
            hr(style='margin:0.5em auto 1.5em auto')
            el-row()
              el-col(:xs={span:24} :span='12' :lg={span:8})
                div()
                  span 选择专精:
                  el-cascader( expand-trigger='hover' :options='proSkillSelecterOptions' v-model='proSkillSelecterValue' size='small' style='margin-left:0.5em;margin-right:0.75em;')
                  el-button(icon='el-icon-plus' type="success" size="mini"  @click='proPerkAdd' circle)
            el-row(v-for='(group, catcode) in specSkills' :key='catcode')
              el-col(v-for='(item,skillcode) in group' :key='skillcode' v-show="item.visible" :xs={span:24} :span='12' :lg={span:8})
                //- 通过visible来控制渲染
                el-button(icon='el-icon-minus' type="danger" class="btn-del-proskill" @click='proPerkRemove(catcode,skillcode)' circle)
                skill-selector( :data='item' :colorCode='item.groupCode'  style='margin-bottom: 1em;' @changeJobPerk='skillChangeHandle')
</template>

<script>
import skillSelector from "@/components/SkillSelector.vue";
import chInfoPanel from "@/components/ChInfo.vue";
import chAttrPanel from "@/components/ChAttr.vue";

// import skillData from "@/data/skillList.js";
import { isInArray } from "@/util/commonUtils.js";
import { queryDB } from "@/data/dbData.js";

import jobData from "@/data/jobData.js";

export default {
  name: "test",
  components: {
    skillSelector,
    chInfoPanel,
    chAttrPanel
  },
  data: function() {
    return {
      testItem: {
        name: "111",
        value: 1,
        value2: 2,
        base: 3,
        jobPerk: false,
        enableJobPerk: true,
        enableHobPerk: true,
        groupCode: -1
      },
      proSkillSelecterValue: [],
      proSkillSelecterOptions: [
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
      // { code:{
      // "name": "会计",
      // "code": "100",
      // "base": 5,
      // "value": 0,
      // "value2": 0,
      // "enableHobPerk": true,
      // "jobPerk": false
      // }}
      baseSkills: {},
      // 专精技能
      // {catName:[code:{ name: , code: , base: , value: ,value2: }]}结构，下标为大类名，
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
      baseAttr: {
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
        sanMax: 99,
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
        jobSkill: [""],
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
        total = usedAttr * 2 + this.baseAttr.edu * 2;
      }
      total = this.baseAttr.edu * 4;

      //计算已经用掉的
      let used = 0;
      let skills = this.baseSkills;
      for (var j in skills) {
        used += skills[j].value;
      }
      return total - used;
    },
    hobPerks: function() {
      let total = this.baseAttr.edu * 2;
      //计算已经用掉的
      let used = 0;
      let skills = this.baseSkills;
      for (var j in skills) {
        used += skills[j].value2;
      }
      return total - used;
    }
  },
  methods: {
    //根据技能代码寻找某个技能的数据对象
    findBaseSkill: function(code) {
      let skills = this.baseSkills;
      return skills[code];
    },
    // 1~8对应 strt~edu
    getAttrById: function(code) {
      let baseAttr = this.baseAttr;
      var array = [
        baseAttr.str,
        baseAttr.con,
        baseAttr.siz,
        baseAttr.dex,
        baseAttr.app,
        baseAttr.int,
        baseAttr.pow,
        baseAttr.edu
      ];
      return array[code - 1];
    },
    //计算额外属性
    calExAttr: function() {
      let info = this.baseAttr;
      //计算移动
      let age = parseInt(this.chInfo.age);
      let mov_alt = 0;
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
      //计算db
      let ext = queryDB(info.str + info.siz);
      info.db = ext.db;
      info.bod = ext.bod;
      //计算闪避技能
      var missSkill = this.findBaseSkill("110");
      missSkill.base = Math.floor(info.dex / 2);
      //计算母语技能
      var lanSkill = this.findBaseSkill("119");
      lanSkill.base = info.edu;
    },
    //处理技能数据从 name:Object 数组变换成 code:Object 以便于查询
    convertArray: function(src) {
      let arr = new Object();
      for (let i in src) {
        let skill = src[i];
        arr[skill.code] = skill;
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

        // 格斗
        this.specSkills.ft = this.convertArray(data.ft);
        // 射击
        this.specSkills.st = this.convertArray(data.st);
        // 技艺
        this.specSkills.art = this.convertArray(data.art);
        // 科学
        this.specSkills.sc = this.convertArray(data.sc);
        // 生存
        this.specSkills.sv = this.convertArray(data.sv);
        // 驾驶
        this.specSkills.dr = this.convertArray(data.dr);

        //默认隐藏所有专精
        for (let catCode in this.specSkills) {
          for (let skillCode in this.specSkills[catCode]) {
            this.specSkills[catCode][skillCode].visible = false;
          }
        }
        //设置选择器
        this.initProSkillSelecter();
      });
    },
    //初始化专精选择器
    initProSkillSelecter: function() {
      let nameMap = {
        ft: "格斗",
        st: "射击",
        art: "技艺",
        sc: "科学",
        sv: "生存",
        dr: "驾驶"
      };

      let options = new Array();
      let j = 0;
      for (let catCode in this.specSkills) {
        let catName = nameMap[catCode];
        let skillList = this.specSkills[catCode];
        let children = new Array();
        let i = 0;
        for (let skillCode in skillList) {
          children[i] = {
            value: skillCode,
            label: skillList[skillCode].name
          };
          i++;
        }
        options[j] = {
          value: catCode,
          label: catName,
          children: children
        };
        j++;
      }

      this.proSkillSelecterOptions = options;
    },
    // 刷新技能可选状态
    //
    // 1.将所有可用本职技能的enableJobPerk设为true，注意要处理多选1的情况
    // 2.将本职技能jobPerk改为true
    // 3.为分组技能配置颜色
    refreshSkillStatus: function(resetValue) {
      //获取技能组信息
      let baseSkillsArr = this.baseSkills;
      let specSkillsMap = this.specSkills;

      //处理基本技能组
      for (let jobCode in baseSkillsArr) {
        //忽略107信用和108克苏鲁
        if (jobCode != "108" && jobCode != "107") {
          let skill = baseSkillsArr[jobCode];
          //设置颜色
          skill.groupCode = this.findGroupedJobSkillIdx(jobCode);
          if (resetValue) {
            //重置技能点
            skill.value = 0;
            skill.value2 = 0;
          }
          this.processSkill(skill);
        }
      }

      //处理专精
      for (let typeCode in specSkillsMap) {
        let skillList = specSkillsMap[typeCode];
        for (let jobCode in skillList) {
          let skill = skillList[jobCode];
          skill.groupCode = this.findGroupedJobSkillIdx(jobCode);
          if (resetValue) {
            //重置技能点
            skill.value = 0;
            skill.value2 = 0;
          }
          this.processSkill(skill);
        }
      }
    },
    //处理技能状态
    processSkill: function(skill) {
      let jobCode = skill.code;
      let exSkillNum = this.jobInfo.exJobNum;

      skill.jobPerk = false;
      skill.enableJobPerk = false;

      if (this.isBaseJobSkill(jobCode)) {
        //基础职业技能无脑配置
        skill.jobPerk = true;
        skill.enableJobPerk = true;
      } else if (this.isGroupedJobSkill(jobCode)) {
        //属于分组技能
        let group = this.findGroupedJobSkill(jobCode);
        //计算本组内已经选择的技能数量
        let selectedNum = this.calculateSelectedGroupSkillNum(group.skills);
        if (selectedNum < group.num || skill.value > 0) {
          skill.enableJobPerk = true;
        } else {
          skill.enableJobPerk = false;
        }
      } else if (this.calSelectedCustomJobSkillNum() < exSkillNum) {
        //有富裕的自选技能点
        skill.enableJobPerk = true;
      } else if (skill.value > 0) {
        skill.enableJobPerk = true;
      }
    },
    isJobSkill: function(code) {
      return this.isBaseJobSkill(code) || this.isGroupedJobSkill(code);
    },
    //是否是分组技能
    isGroupedJobSkill: function(code) {
      return this.findGroupedJobSkill(code) !== undefined;
    },
    //计算已经自选的技能数量
    calSelectedCustomJobSkillNum: function() {
      //遍历数组
      let skills = this.baseSkills;
      let counter = 0;
      for (let code in skills) {
        if (!this.isJobSkill(code) && skills[code].value > 0) {
          counter++;
        }
      }
      return counter;
    },
    //统计技能组内已选技能数量
    calculateSelectedGroupSkillNum: function(codeArray) {
      let baseSkillsArr = this.baseSkills;
      let specSkillsMap = this.specSkills;
      let counter = 0;
      for (let idx = 0, len = codeArray.length; idx < len; idx++) {
        let code = codeArray[idx];
        if (
          baseSkillsArr[code] !== undefined &&
          baseSkillsArr[code].value > 0
        ) {
          counter++;
        } else if (
          (specSkillsMap.sc[code] !== undefined &&
            specSkillsMap.sc[code].value > 0) ||
          (specSkillsMap.sv[code] !== undefined &&
            specSkillsMap.sv[code].value > 0) ||
          (specSkillsMap.art[code] !== undefined &&
            specSkillsMap.art[code].value > 0) ||
          (specSkillsMap.dr[code] !== undefined &&
            specSkillsMap.dr[code].value > 0) ||
          (specSkillsMap.ft[code] !== undefined &&
            specSkillsMap.ft[code].value > 0) ||
          (specSkillsMap.st[code] !== undefined &&
            specSkillsMap.st[code].value > 0)
        ) {
          counter++;
        }
      }
      return counter;
    },
    //寻找是否是n选m的技能
    findGroupedJobSkill: function(code) {
      let idx = this.findGroupedJobSkillIdx(code);
      if (idx > -1) {
        return this.jobInfo.customJobGroup[idx];
      }
      return undefined;
    },
    //找到技能组序号
    findGroupedJobSkillIdx: function(code) {
      let jobGroupSkillsArr = this.jobInfo.customJobGroup;
      for (let idx = 0, len = jobGroupSkillsArr.length; idx < len; idx++) {
        let group = jobGroupSkillsArr[idx];
        if (isInArray(code, group.skills)) {
          return idx;
        }
      }
      return -1;
    },
    //是否是基础职业技能
    isBaseJobSkill: function(code) {
      return isInArray(code, this.jobInfo.jobSkill);
    },
    // -------------以下是事件钩子---------------
    pageSelectHandler: function(index) {
      this.menu_idx = index;
    },
    // 添加专精技能
    proPerkAdd: function() {
      console.log(this.proSkillSelecterValue);
      if (this.proSkillSelecterValue.length > 0) {
        let catCode = this.proSkillSelecterValue[0];
        let skillCode = this.proSkillSelecterValue[1];
        let skill = this.specSkills[catCode][skillCode];
        skill.visible = true;
        this.proSkillSelecterValue = [];
      }
    },
    proPerkRemove: function (catCode,skillCode) {
        let skill = this.specSkills[catCode][skillCode];
        skill.value = 0;
        skill.value2 = 0;
        skill.visible = false;
        this.refreshSkillStatus(false);
    },
    // 处理技能变更
    skillChangeHandle: function(code) {
      
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
      console.log(this.chInfo.professionCode);
      //将调整所有职业技能
      if (jobInfo !== undefined) {
        //基础职业技能
        this.jobInfo.jobSkill = jobInfo.jobSkill;
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
        //更新技能状态
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
.createCh {
  height: 100%;
}

.modal-title {
  color: aqua;
}

.btn-del-proskill {
  float: left;
  font-size: 10px;
  padding: 1px;
  margin-top: 0.4em;
  margin-right: 0.25em;
}
</style>