// 人物基本信息面板，需要绑定一个人物基本属性对象info和职业列表professionList，会触发一个jobChange事件每当切换职业
<template lang="pug">
    //- 人物基本信息
    div(class="ch-base-info")
      //- 提示信息
      el-popover( ref="nameInfoPop" placement='right'  trigger='focus' width='200' content="你的人物名字")
      el-popover( ref="ageInfoPop" placement='right' trigger='focus' width='200' content="你的人物年龄 0~99") 
      el-popover( ref="professionTemplatePop" placement='right' trigger='focus' width='200' content="你使用的角色模板，它会决定你的主要属性（影响你的职业技能点数量）以及本职技能（可以使用职业技能点提升的技能）") 
      el-popover( ref="introPop" placement='right' trigger='focus' width='200' content="一句话简介你的人物") 
      el-popover( ref="beliefPop" placement='right' trigger='focus' width='200' content="你所信仰的东西，可能是神、宗教、信条、观点") 
      el-popover( ref="importantPersonPop" placement='right' trigger='focus' width='200' content="对你来说重要的人") 
      el-popover( ref="memoPlacePop" placement='right' trigger='focus' width='200' content="对你来说有纪念意义的地方") 
      el-popover( ref="treasurePop" placement='right' trigger='focus' width='200' content="你所珍重的物件") 
      el-popover( ref="traitPop" placement='right' trigger='focus' width='200' content="特质，如：博爱，风流，吝啬等") 
      el-popover( ref="woundPop" placement='right' trigger='focus' width='200' content="身上的疤痕和创伤，如：烧伤，脸上有疤") 
      el-popover( ref="fearAndCrazyPop" placement='right' trigger='focus' width='200' content="你所恐惧的东西或者疯狂的症状，如：昆虫恐惧，恐水") 
      el-form(label-width='120px')
        el-row
          el-col( :sm="12" :lg="8" :span="24")          
            el-form-item(class="form-input" label='姓名')
              el-input(v-model='info.name' v-popover:nameInfoPop)
          el-col( :sm="12" :lg="8" :span="24") 
            el-form-item(class="form-input" label='性别' )
              el-radio-group(v-model.number='info.gender')
                el-radio(:label="0") 男
                el-radio(:label="1") 女
          el-col( :sm="12" :lg="8" :span="24")           
            el-form-item(class="form-input" label='年龄')
              el-input-number(v-model.number='info.age' :min=1 :max=99 :controls="false" class="input-age" v-popover:ageInfoPop)
          el-col( :sm="12" :lg="8" :span="24")           
            el-form-item(class="form-input" label='时代' )        
              el-select(v-model='info.era' placeholder='时代')
                el-option(label="1920s" value='0') 
                el-option(label="现代" value='1') 
          el-col( :sm="12" :lg="8" :span="24")           
            el-form-item(class="form-input" label='职业模板')
              el-select(v-model='info.jobTemplateCode' placeholder='职业模板' v-popover:professionTemplatePop @change="$emit('jobChange')" filterable)
                el-option(v-for='item in jobList' :key = 'item.code' :label='item.name' :value='item.code')
          el-col( :sm="12" :lg="8" :span="24")           
            el-form-item(class="form-input" label='职业')
              el-input(v-model='info.jobName')
          el-col( :sm="12" :lg="8" :span="24")           
            el-form-item(class="form-input" label='国籍')
              el-input(v-model='info.nationality')
          el-col( :sm="12" :lg="8" :span="24")           
            el-form-item(class="form-input" label='家乡')
              el-input(v-model='info.homeland')
          el-col( :sm="12" :lg="8" :span="24")           
            el-form-item(class="form-input" label='个人描述')
              el-input(v-model='info.intro' v-popover:introPop)
          el-col( :sm="12" :lg="8" :span="24")           
            el-form-item(class="form-input" label='思想信念')
              el-input(v-model='info.belief' v-popover:beliefPop)
          el-col( :sm="12" :lg="8" :span="24")           
            el-form-item(class="form-input" label='重要之人')
              el-input(v-model='info.importantPerson' v-popover:importantPersonPop)
          el-col( :sm="12" :lg="8" :span="24")           
            el-form-item(class="form-input" label='意义非凡之地')
              el-input(v-model='info.memoPlace' v-popover:memoPlacePop)
          el-col( :sm="12" :lg="8" :span="24")           
            el-form-item(class="form-input" label='宝贵之物')
              el-input(v-model='info.treasure' v-popover:treasurePop)
          el-col( :sm="12" :lg="8" :span="24") 
            el-form-item(class="form-input" label='特质')
              el-input(v-model='info.trait' v-popover:traitPop)
          el-col( :sm="12" :lg="8" :span="24")           
            el-form-item(class="form-input" label='伤疤和伤口')
              el-input(v-model='info.wound' v-popover:woundPop)
          el-col( :sm="12" :lg="8" :span="24")           
            el-form-item(class="form-input" label='恐惧和狂躁')
              el-input(v-model='info.fearAndCrazy' v-popover:fearAndCrazyPop)
        el-row
          el-col(:span="24" style="max-width: 780px")
            el-form-item( label='背景信息')
              el-input(v-model='info.background' type='textarea' :autosize="{ minRows: 5}")
</template>

<style lang="scss">
.baseInfo-info {
  margin-left: 1em;
}
.form-input {
  max-width: 320px;
}
.input-age {
  width: 80px;
}
</style>

<script>
import JobData from "@/data/jobData";
import {ChInfoDto} from "@/data/dto/ChDtos";


export default {
  data: function() {
    return {
      info: new ChInfoDto(),
      // info: {
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
      jobList: []
    };
  },
  props: {
    chInfo: ChInfoDto
  },
  methods:{

  },
  mounted: function() {
    this.jobList = JobData.getJobList();
    if (this.chInfo !== undefined) {
      this.info = this.chInfo;
    }
  }
};
</script>
