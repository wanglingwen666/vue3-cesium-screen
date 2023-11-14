<script lang="ts" setup>
const dataList = [
  { id: 1, name: '实有人口', chainRatio: '+1.5%', basis: '+3.5%', value: '32378' },
  { id: 2, name: '实有房屋', chainRatio: '+1.5%', basis: '+3.5%', value: '9654' },
  { id: 3, name: '工地指数', chainRatio: '+1.5%', basis: '+3.5%', value: '64.8%' }
]
</script>

<template>
  <div class="info-pane">
    <div v-for="item in dataList" :key="item.id">
      <div class="value">{{ item.value }}</div>
      <div class="info">
        环比<span class="detail">{{ item.chainRatio }}</span> 同比<span class="detail">{{ item.basis }}</span>
      </div>
      <div class="name">{{ item.name }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info-pane {
  width: calc(100% - 1000px);
  height: 200px;
  background-image: linear-gradient(to top, #3e455050 0%, #1b284860 70%, #2c354a 100%);
  position: absolute;
  left: 550px;
  bottom: 20px;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  .value {
    font-size: 60px;
    font-weight: bold;
    font-family: 'Times New Roman';
    color: #6cb2fe;
  }

  .info {
    color: #fff;
    line-height: 36px;
    font-size: 14px;

    .detail {
      color: #6cb2fe;
    }
  }
  .name {
    font-size: 20px;
    font-weight: bold;
    color: #fff;
  }
}
</style>
