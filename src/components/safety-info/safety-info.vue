<!--  -->
<script lang="ts" setup>
import type { ISafeInfo } from '@/types/safety-info'

const { info } = withDefaults(
  defineProps<{
    info: ISafeInfo
  }>(),
  {}
)
</script>

<template>
  <div class="safety-info">
    <div class="header">
      <div class="title">{{ info.title }}</div>
      <div class="value">
        <div class="percent" v-if="info.percent">{{ info.percent }}{{ info.unit }}</div>
        <div class="up-down-value">
          <template v-if="info.isUp !== undefined">
            <el-icon v-if="info.isUp" style="color: rgb(0, 255, 0)"><Top /></el-icon>
            <el-icon v-else style="color: rgb(222, 0, 0)"><Bottom /></el-icon>
          </template>
          <div class="rate" v-if="info.value">{{ info.value }}{{ info.unit }}</div>
        </div>
      </div>
    </div>
    <div class="line" v-for="item in info.info" :key="item.id">
      <div class="name">{{ item.name }}</div>
      <div class="line-point"></div>
      <div class="value">{{ item.value }}{{ item.unit }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.safety-info {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  color: #fff;
  .header,
  .line {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header {
    .title {
      font-weight: bold;
    }
    .value {
      font-size: 14px;
      display: flex;
      .percent {
        color: #678ccc;
        font-weight: bold;
      }
      .up-down-value {
        margin-left: 5px;
        display: flex;
        align-items: center;
        .rate {
          font-size: 10px;
          line-height: 10px;
        }
      }
    }
  }
  .line {
    font-size: 14px;
    margin-top: 10px;
    .value {
      color: #678ccc;
      text-align: right;
      min-width: 50px;
    }
    .name {
      min-width: 110px;
    }
  }
  .line-point {
    min-width: 200px;
    flex: auto;
    height: 2px;
    border-top: 2px dotted #678ccc90;
  }
}
</style>
