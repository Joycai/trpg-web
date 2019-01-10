<template lang="pug">
  div(class="createCh")
    el-container
      el-header
        h1(style="text-align: center;") 创建角色  
          span 
            el-button(@click="test")  输出数据对象
      el-main
        el-tabs(class="tab-menu" :tab-position="tabPosition")
          el-tab-pane(label="基本信息") 
            //- 基本信息
            ch-info-pane(:chInfo="chInfo")
          el-tab-pane(label="角色属性")
            //- 人物属性
            ch-attr-pane(:data="baseAttr" :age="chInfo.age" :initValue="true")
          el-tab-pane(label="技能列表") skill
            ch-skill-pane
          el-tab-pane(label="装备列表") item

        //- //- 技能
        //- ch-skill-panel(v-show="menu_idx==3")
        //- //- 物品列表
        //- ch-item-panel(v-show="menu_idx==4")

</template>

<style lang="scss">
.tab-menu {
  min-height: 800px;
}
</style>

<script>
import ChInfoPane from "@/components/ChInfo.vue";
import ChAttrPane from "@/components/ChAttr.vue";
import ChSkillPane from "@/components/ChSkill.vue";
import ChItemPane from "@/components/ChItem.vue";
import {ChInfoDto} from "@/data/dto/ChDtos";

export default {
  name: "test",
  components: {
    ChInfoPane,
    ChAttrPane,
    ChSkillPane,
    ChItemPane
  },
  data: function() {
    return {
      // 页面元素控制属性
      tabPosition: "top",
      // 数据对象
      chInfo: new ChInfoDto(),
      // chInfo: {
      //   name: "",
      //   gender: 0,
      //   age: 20,
      //   era: "0",
      //   jobTemplateCode: "",
      //   jobName: "",
      //   nationality: "",
      //   homeland: "",
      //   intro: "",
      //   belief: "",
      //   importantPerson: "",
      //   memoPlace: "",
      //   treasure: "",
      //   trait: "",
      //   wound: "",
      //   fearAndCrazy: "",
      //   background: ""
      // },
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
        //计算属性,
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
  computed: {},
  methods: {
    test: function() {
      console.log(JSON.stringify(this.chInfo));
      console.log(JSON.stringify(this.baseAttr));
    }
  },
  mounted: function() {}
};
</script>
