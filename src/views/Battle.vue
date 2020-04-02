<template>
  <div>
    <div class="chr-data-import">
      <input type="file" ref="file" id="input-upload" value accept="text/plain" />
      <Button style="marginBottom: 5px;" @click="handleImport">Import</Button>
    </div>
    <div class="chr-list">
      <Button style="marginBottom: 5px;" @click="modal.add=true">Add</Button>
      <Button style="marginBottom: 5px;" @click="handleExport">Export</Button>

      <Table height="280" :columns="table.columns" :data="charData"></Table>
    </div>
    <div class="chr-set">
      <Transfer
        :data="charData"
        :target-keys="targetKeys"
        :render-format="render"
        @on-change="handleChange1"
      ></Transfer>
    </div>
    <div class="chr-timeline">
      <Timeline>
        <TimelineItem v-for="item in timeLineDatas" :key="item.key">
          <p class="time">{{item.name}}, {{item.dex}}</p>
          <p class="content">{{item.class}}, {{item.hp}}/{{item.hpMax}}</p>
        </TimelineItem>
      </Timeline>
    </div>
    <!-- 编辑对话框 -->
    <Modal v-model="modal.edit" title="Edit data" @on-ok="modalEditOk" @on-cancel="modalEditCancel">
      <Form :model="modal.editData" :label-width="80" @submit.native.prevent>
        <FormItem label="name">
          <Input v-model="modal.editData.name" placeholder="chr name"></Input>
        </FormItem>
        <FormItem label="Initiative">
          <InputNumber v-model.number="modal.editData.dex" placeholder="chr dex"></InputNumber>
        </FormItem>
        <FormItem label="hp">
          <InputNumber v-model.number="modal.editData.hp" placeholder="chr hp"></InputNumber>
          / {{modal.editData.hpMax}}
        </FormItem>
      </Form>
    </Modal>
    <!-- 新建 -->
    <Modal v-model="modal.add" title="Add data" @on-ok="modalAddOk" @on-cancel="modalAddCancel">
      <Form :model="modal.addData" :label-width="80" @submit.native.prevent>
        <FormItem label="name">
          <Input v-model="modal.addData.name" placeholder="chr name"></Input>
        </FormItem>
        <FormItem label="class">
          <Input v-model="modal.addData.class" placeholder="chr class"></Input>
        </FormItem>
        <FormItem label="Initiative">
          <InputNumber v-model.number="modal.addData.initiative" placeholder="chr initiative"></InputNumber>
        </FormItem>
        <FormItem label="hp">
          <InputNumber v-model.number="modal.addData.hp" placeholder="chr hp"></InputNumber>/
          <InputNumber v-model.number="modal.addData.hpMax" placeholder="chr hpMax"></InputNumber>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<style lang="scss">
.base-container {
  border-style: solid;
  border-color: #dcdee2;
  padding: 1em 0px 1em 0px;
}
.chr-list {
  @extend .base-container;
  border-width: 0px 0px 1px 0px;
  padding: 0px 0px 1em 0px;
}
.chr-set {
  @extend .base-container;
  border-width: 1px 0px 1px 0px;
}
.chr-timeline {
  @extend .base-container;
  border-width: 1px 0px 0px 0px;
}
</style>

<script>
import FileSaver from "file-saver";

export default {
  name: "battle",
  data() {
    return {
      file: "",
      modal: {
        edit: false,
        editData: {},
        add: false,
        addData: {
          name: "",
          class: "",
          hp: 1,
          hpMax: 1,
          initiative: 1
        }
      },
      table: {
        columns: [
          {
            title: "Name",
            key: "name",
            width: 150
          },
          {
            title: "Initiative",
            key: "dex",
            width: 100
          },
          {
            title: "Stat",
            key: "stat",
            width: 180,
            align: "center",
            render: (h, params) => {
              return h("div", [h("p", params.row.hp + "/" + params.row.hpMax)]);
            }
          },
          {
            title: "Class",
            key: "class"
          },
          {
            //表格操作
            title: "Action",
            key: "action",
            width: 150,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        //复制一份数据到模态框对象中，注意获取在原数组中的序号，因为需要使用变异方法触发更新
                        this.modal.editData.name = params.row.name;
                        this.modal.editData.hp = params.row.hp;
                        this.modal.editData.dex = params.row.dex;
                        this.modal.editData.key = params.row.key;
                        this.modal.edit = true;
                      }
                    }
                  },
                  "Edit"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.charData.splice(params.index, 1);
                        this.updateTimeLine();
                      }
                    }
                  },
                  "Delete"
                )
              ]);
            }
          }
        ]
      },
      charData: [],
      targetKeys: [],
      timeLineDatas: []
    };
  },
  mounted() {
    for (let i = 1; i <= 6; i++) {
      let hpMax = 20 + Math.round(Math.random() * 10);
      this.charData.push({
        key: i.toString(),
        name: "name" + i,
        description: "",
        disabled: false,
        class: "class",
        dex: 10 + Math.round(Math.random() * 5),
        hp: hpMax,
        hpMax: hpMax
        // disabled: Math.random() * 3 < 1
      });
    }
  },
  methods: {
    render: function(item) {
      return item.name + "-" + item.class + "-" + item.hp + "-" + item.dex;
    },
    handleChange1: function(newTargetKeys, direction, moveKeys) {
      // console.log(newTargetKeys);
      // console.log(direction);
      // console.log(moveKeys);
      // console.log("change");
      this.targetKeys = newTargetKeys;
      this.updateTimeLine();
    },
    updateTimeLine: function() {
      if (this.targetKeys.length > 0) {
        this.timeLineDatas = this.charData
          .filter(item => this.targetKeys.indexOf(item.key) > -1)
          .sort((a, b) => {
            return b.dex - a.dex;
          });
      }
    },
    modalEditOk: function() {
      console.log(this.modal.editData.key);

      if (this.modal.editData.key > -1) {
        let obj = this.charData.filter(
          item => item.key == this.modal.editData.key
        )[0];

        obj.name = this.modal.editData.name;
        obj.dex = this.modal.editData.dex;
        obj.hp = this.modal.editData.hp;
      }
    },
    modalEditCancel: function() {},
    modalAddOk: function() {
      let data = this.modal.addData;
      //寻找key
      let key = -1;
      while (true) {
        let id = Math.round(Math.random() * 10);
        if (this.charData.filter(item => item.key == id).length == 0) {
          key = id;
          break;
        }
      }

      this.charData.push({
        key: key + "",
        name: data.name,
        description: "",
        disabled: false,
        class: data.class,
        dex: data.initiative,
        hp: data.hp,
        hpMax: data.hpMax
      });
      this.updateTimeLine();
    },
    modalAddCancel: function() {},
    //离线数据导入
    handleImport: function() {
      console.log("aaa");
      let file = this.$refs.file.files[0];
      let reader = new FileReader();
      reader.readAsText(file);
      let _chr_data = this.charData;
      reader.onload = function() {
        console.log(this.result);
        let data = JSON.parse(this.result);
        _chr_data.splice(0, _chr_data.length);
        data.forEach(element => {
          _chr_data.push(element);
        });
      };
    },
    handleExport: function() {
      var blob = new Blob([JSON.stringify(this.charData)], {
        type: "text/plain;charset=utf-8"
      });
      FileSaver.saveAs(blob, "ouput.txt");
    }
  }
};
</script>
