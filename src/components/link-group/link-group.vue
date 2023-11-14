<!--  -->
<script lang="ts" setup>
const btnLink = [
  { id: 1, url: '', title: '驾驶舱' },
  { id: 2, url: '', title: '智慧党建' },
  { id: 3, url: '', title: '应急指挥' },
  { id: 4, url: '', title: '区域发展' },
  { id: 5, url: '', title: '平安建设' },
  { id: 6, url: '', title: '城市管理' },
  { id: 7, url: '', title: '民生服务' }
]
</script>

<template>
  <div class="link-group">
    <div class="btn-item" v-for="btn in btnLink" :key="btn.id">{{ btn.title }}</div>
  </div>
</template>

<style lang="scss" scoped>
.link-group {
  width: calc(100% - 1000px);
  position: absolute;
  left: 550px;
  top: 90px;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  .btn-item {
    width: 100px;
    height: 36px;
    background: #193b78;
    border: 1px solid #193b78;
    // border-radius: 5px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    clip-path: polygon(0 0, 92% 0, 100% 20%, 100% 100%, 8% 100%, 0 80%);
    &:hover {
      background: #042c7780;
      border: 1px solid #fff;
    }
  }
}
</style>
