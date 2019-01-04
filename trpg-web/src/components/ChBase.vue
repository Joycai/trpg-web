<template>
  <div>
    <el-form :model="baseInfo" label-width="80px">
      <el-form-item label="总点数" class="input-type1">
        <el-input
          placeholder="0"
          type="number"
          min="0"
          max="100"
          :value="all"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="力量" class="input-type1">
        <el-input
          v-model="baseInfo.str"
          placeholder="0~100"
          type="number"
          min="0"
          max="100"
          step="5"
          @change="emitToParent"
        ></el-input>
      </el-form-item>
      <el-form-item label="体质" class="input-type1">
        <el-input
          v-model="baseInfo.con"
          placeholder="0~100"
          type="number"
          min="0"
          max="100"
          step="5"
        ></el-input>
      </el-form-item>
      <el-form-item label="体型" class="input-type1">
        <el-input
          v-model="baseInfo.siz"
          placeholder="0~100"
          type="number"
          min="0"
          max="100"
          step="5"
        ></el-input>
      </el-form-item>
      <el-form-item label="敏捷" class="input-type1">
        <el-input
          v-model="baseInfo.dex"
          placeholder="0~100"
          type="number"
          min="0"
          max="100"
          step="5"
        ></el-input>
      </el-form-item>
      <el-form-item label="智力" class="input-type1">
        <el-input
          v-model="baseInfo.int"
          placeholder="0~100"
          type="number"
          min="0"
          max="10"
          step="5"
        ></el-input>
      </el-form-item>
      <el-form-item label="意志" class="input-type1">
        <el-input
          v-model="baseInfo.pow"
          placeholder="0~100"
          type="number"
          min="0"
          max="100"
          step="5"
        ></el-input>
      </el-form-item>
      <el-form-item label="幸运" class="input-type1">
        <el-input
          v-model="baseInfo.lck"
          placeholder="0~100"
          type="number"
          min="0"
          max="100"
          step="5"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "chbase",
  computed: {
    all: function() {
      var baseInfo = this.baseInfo;
      var total = (
        parseInt(baseInfo.str) +
          parseInt(baseInfo.con) +
          parseInt(baseInfo.siz) +
          parseInt(baseInfo.dex) +
          parseInt(baseInfo.int) +
          parseInt(baseInfo.pow) +
          parseInt(baseInfo.lck)
      ).toString();
      return total;
    }
  },
  methods:{
    emitToParent: function () {
      console.log("fire")
      this.$emit('transferBaseInfo',this.baseInfo)
    }
  },
  data: function() {
    return {
      baseInfo: {
        str: 0,
        con: 0,
        siz: 0,
        dex: 0,
        int: 0,
        pow: 0,
        lck: 0
      }
    };
  }
};
</script>

<style lang="scss">
.input-type1 {
  width: 210px;
}
</style>
