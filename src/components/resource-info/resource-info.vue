<!--  -->
<script lang="ts" setup>
const props = defineProps<{
  title: string
  value: number
  unit: string
}>()
</script>

<template>
  <div class="resource-info">
    <div class="title">{{ props.title }}</div>
    <div class="value-unit">
      <div class="value">{{ props.value }}</div>
      <div class="unit">{{ props.unit }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.resource-info {
  margin: 20px 0;
  .title {
    color: #ced6d7;
    font-size: 14px;
    text-align: center;
  }
  .value-unit {
    margin-top: 8px;
    display: flex;
    justify-content: center;
    color: #fff;
    background-image: linear-gradient(to right, #27406450 0%, #224a7f 15%, #215fb6 35%, #4470ad 50%, #215fb6 65%, #224a7f 85%, #27406450 100%);
    .value {
      font-size: 22px;
    }
    .unit {
      font-size: 14px;
      margin-left: 2px;
      line-height: 32px;
    }
  }
}
</style>
