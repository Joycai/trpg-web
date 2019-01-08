// 人物基本信息面板，需要绑定一个人物基本属性对象chInfo和职业列表professionList，会触发一个jobChange事件每当切换职业
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
      el-form(label-width='120px' style='max-width:460px;')
        el-form-item(label='姓名')
          el-input(v-model='chInfo.name' v-popover:nameInfoPop clearable)
        el-form-item(label='性别' )
          el-radio-group(v-model.number='chInfo.gender')
            el-radio(:label="0") 男
            el-radio(:label="1") 女
        el-form-item(label='年龄')
          el-input-number(v-model.number='chInfo.age' :min=1 :max=99 :controls="false" class="input-age" v-popover:ageInfoPop)
        el-form-item(label='时代' )        
          el-select(v-model='chInfo.era' placeholder='时代')
            el-option(label="1920s" value='0') 
            el-option(label="现代" value='1') 
        el-form-item(label='职业模板')
          el-select(v-model='chInfo.professionCode' placeholder='职业模板' v-popover:professionTemplatePop @change="$emit('jobChange')" filterable)
            el-option(v-for='item in professionList' :key = 'item.code' :label='item.name' :value='item.code')
        el-form-item(label='职业')
          el-input(clearable v-model='chInfo.profession')
        el-form-item(label='国籍')
          el-input(clearable v-model='chInfo.nationality')
        el-form-item(label='家乡')
          el-input(clearable v-model='chInfo.homeland')
        el-form-item( label='个人描述')
          el-input(v-model='chInfo.intro' v-popover:introPop)
        el-form-item( label='思想信念')
          el-input(v-model='chInfo.belief' v-popover:beliefPop)
        el-form-item( label='重要之人')
          el-input(v-model='chInfo.importantPerson' v-popover:importantPersonPop)
        el-form-item( label='意义非凡之地')
          el-input(v-model='chInfo.memoPlace' v-popover:memoPlacePop)
        el-form-item( label='宝贵之物')
          el-input(v-model='chInfo.treasure' v-popover:treasurePop)
        el-form-item( label='特质')
          el-input(v-model='chInfo.trait' v-popover:traitPop)
        el-form-item( label='伤疤和伤口')
          el-input(v-model='chInfo.wound' v-popover:woundPop)
        el-form-item( label='恐惧和狂躁')
          el-input(v-model='chInfo.fearAndCrazy' v-popover:fearAndCrazyPop)
        el-form-item( label='背景信息')
          el-input(v-model='chInfo.background' type='textarea' :autosize="{ minRows: 5}")
</template>

<style lang="scss">
.baseInfo-info {
  margin-left: 1em;
}
//计数器指针改的小点
.input-age{
  width:75px;
  // span{
  //   width: 20px;
  // }
}
</style>

<script>
export default {
  data:function(){
    return {
      // gender: "0"
    }
  },
  props: {
    chInfo: Object,
    professionList: Array
  }
};
</script>
