// 人物基本信息面板，需要绑定一个人物基本属性对象chInfo和职业列表professionList，会触发一个jobChange事件每当切换职业
<template lang="pug">
    //- 人物基本信息
    div(class="ch-base-info")
      el-form(label-width='80px' style='max-width:460px;')
        el-form-item(label='角色名')
          el-input(clearable v-model='chInfo.name')
        el-form-item(label='性别' )
          el-radio-group(v-model='chInfo.gender')
            el-radio(label="0") 男
            el-radio(label="1") 女
        el-form-item(label='年龄')
          el-input-number(v-model.number='chInfo.age' :min=1 :max=99)
        el-form-item(label='时代' )        
          el-select(v-model='chInfo.era' placeholder='时代')
            el-option(label="1920s" value='0') 
            el-option(label="现代" value='1') 
        el-form-item(label='职业')
          el-input(clearable v-model='chInfo.profession')
        el-form-item(label='职业模板')
          el-select(v-model='chInfo.professionCode' placeholder='职业模板' filterable @change="$emit('jobChange')")
            el-option(v-for='item in professionList' :key = 'item.code' :label='item.name' :value='item.code')
        el-form-item(label='国籍')
          el-input(clearable v-model='chInfo.nationality')
        el-form-item(label='家乡')
          el-input(clearable v-model='chInfo.homeland')
</template>

<style lang="scss" scoped>
.baseInfo-info {
  margin-left: 1em;
}
</style>

<script>
export default {
    props:{
      chInfo: Object,
      professionList: Array
    }
}
</script>
