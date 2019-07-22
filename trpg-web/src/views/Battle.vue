<template>
  <div class="demo-split">
    <Split v-model="split1">
      <div slot="left" class="demo-split-pane">
        <Transfer
          :data="localData"
          :target-keys="targetKeys"
          :render-format="render1"
          @on-change="handleChange1"
        ></Transfer>
      </div>
      <div slot="right" class="demo-split-pane">
        <Timeline>
          <TimelineItem>
            <p class="time">1976年</p>
            <p class="content">Apple I 问世</p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">1984年</p>
            <p class="content">发布 Macintosh</p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">2007年</p>
            <p class="content">发布 iPhone</p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">2010年</p>
            <p class="content">发布 iPad</p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">2011年10月5日</p>
            <p class="content">史蒂夫·乔布斯去世</p>
          </TimelineItem>
        </Timeline>
      </div>
    </Split>
  </div>
</template>

<style lang="scss">
.demo-split {
  height: 100%;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
</style>

<script>
export default {
  name: "battle",
  data() {
    return {
      split1: 0.5,
      localData: this.getLocalData(),
      targetKeys: this.getTargetKeys()
    };
  },
  methods: {
    getLocalData: function() {
      let mockData = [];
      for (let i = 1; i <= 20; i++) {
        mockData.push({
          key: i.toString(),
          label: "Content " + i,
          description: "The desc of content  " + i,
          disabled: Math.random() * 3 < 1
        });
      }
      return mockData;
    },
    getTargetKeys: function() {
      return this.getLocalData()
        .filter(() => Math.random() * 2 > 1)
        .map(item => item.key);
    },
    render1: function(item) {
      return item.label;
    },
    handleChange1: function(newTargetKeys, direction, moveKeys) {
      console.log(newTargetKeys);
      console.log(direction);
      console.log(moveKeys);
      this.targetKeys = newTargetKeys;
    }
  }
};
</script>
