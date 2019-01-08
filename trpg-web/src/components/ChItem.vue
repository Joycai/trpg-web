<template lang="pug">
    div(class="")
      el-form(class='add-item-form')
        el-form-item(label='物品名')
          el-input(v-model='itemName')
        el-form-item(label='物品信息')
          el-input(v-model='itemInfo' type='textarea' rows='3' :autosize="{ minRows: 3,maxRows:3}")
        el-button( type='success' @click='addItem') 添加这件物品
      el-collapse(v-model='activeName' accordion)
        el-collapse-item(v-for="(item, idx) in itemArray" :key="idx" :title='item.name' :name='idx')
          div(slot='title')
            el-button( class="ibtn-remove-item" type="danger" icon='el-icon-delete' @click='deleteItem(idx)' plain)
            span() {{item.name}}
          div(class="item-info")
            label(v-if='item.info.length > 0' ) {{item.info}}
            label(v-else) 没有信息
</template>

<style lang="scss">
.add-item-form {
  padding-bottom: 2em;
}
.ibtn-remove-item {
  padding: 6px !important;
  margin-right: 2em;
}
.item-info {
  font-style: oblique;
  padding-left: 4em;
  padding-right: 4em;
  
}
</style>

<script>
export default {
  data: function() {
    return {
      itemName: "",
      itemInfo: "",
      activeName: "0",
      itemArray: []
    };
  },
  methods: {
    addItem: function() {
      if (this.itemName == null || this.itemName.length == 0) {
        this.$message.error("物品名不可以为空哦");
      } else {
        this.itemArray.push({
          name: this.itemName,
          info: this.itemInfo
        });
        this.itemName = "";
        this.itemInfo = "";
      }
    },
    deleteItem: function(idx) {
      let array = this.itemArray;
      array.splice(idx, 1);
    }
  }
};
</script>
