<!--  -->
<script lang="ts" setup>
import type { IBaseInfo } from '@/types/base-info'

const { info, color } = withDefaults(defineProps<{ color?: string; info: IBaseInfo }>(), {
  color: '#75ACFE'
})
</script>

<template>
  <div class="info-progress">
    <div class="info">
      <div class="icon" :style="`background: url(${info.imgUrl}) no-repeat;background-size: 100% 100%;`"></div>
      <div class="total-info">
        <div class="total">{{ info.total }}</div>
        <div class="total-name">{{ info.totalName }}</div>
      </div>
    </div>
    <div class="progress">
      <div class="progress-info">
        <div class="isDoing">
          <span :style="`color:${color};margin-right:3px;`">{{ info.percent }}% </span>
          <span>{{ info.isDoingName }}：</span>
          <span>{{ info.isDoingNum }}</span>
        </div>
        <div class="isDone">
          <span :style="`color:${color};margin-right:3px;`">{{ 100 - info.percent }}% </span>
          <span>{{ info.isDoneName }}：</span>
          <span>{{ info.isDoneNum }}</span>
        </div>
      </div>
      <el-progress :stroke-width="10" :text-inside="true" :percentage="info.percent" :color="color" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info-progress {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  .info {
    display: flex;
    align-items: center;
    .icon {
      width: 30px;
      height: 30px;
    }
    .total-info {
      text-align: center;
      margin-left: 20px;
      .total {
        font-size: 24px;
        font-family: Arial, Helvetica, sans-serif;
        color: #fff;
      }
      .total-name {
        color: #adb6bf;
        font-size: 14px;
      }
    }
  }
  .progress {
    width: 320px;
    color: #fff;
    .progress-info {
      display: flex;
      justify-content: space-between;
      .isDoing,
      .isDone {
        font-size: 13px;
        padding-top: 7px;
        margin-bottom: 8px;
      }
    }
    :deep(.el-progress-bar__outer) {
      background-color: #1f1d1d80;
      .el-progress-bar__innerText {
        display: none;
      }
    }
  }
}
</style>
