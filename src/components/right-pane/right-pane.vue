<script lang="ts" setup>
import BoxPane from '@/components/box-pane/box-pane.vue'
import EchartsWrap from '@/base-ui/eharts-wrap/echarts-wrap.vue'
import ResourceInfo from '@/components/resource-info/resource-info.vue'
import SafetyInfo from '@/components/safety-info/safety-info.vue'
import { energyOptions, medicalOptions, buildVisitOptions } from './config/echart-options'
import type { ISafeInfo } from '@/types/safety-info'

const safeInfo: ISafeInfo = {
  title: '医疗机构',
  percent: 67,
  info: [
    { id: 1, name: '三甲医院', value: '16', unit: '个' },
    { id: 2, name: '社区诊所', value: '51', unit: '个' }
  ]
}

const areaValue = ref('区域1')
const areaData = [
  {
    value: '区域1',
    label: '区域1'
  },
  {
    value: '区域2',
    label: '区域2'
  },
  {
    value: '区域3',
    label: '区域3'
  },
  {
    value: '区域4',
    label: '区域4'
  },
  {
    value: '区域5',
    label: '区域5'
  }
]

const computedVisitOptions = computed(() => {
  return buildVisitOptions(data1.value, data2.value)
})

const data1 = ref([100, 132, 101, 134, 90, 230])
const data2 = ref([220, 182, 191, 234, 290, 330])
const onSelectChange = () => {
  data1.value.forEach((_v, i) => {
    data1.value[i] = Math.ceil(Math.random() * 100)
    data2.value[i] = Math.ceil(Math.random() * 300)
  })
}
</script>

<template>
  <div class="right-pane">
    <box-pane class="energy-overview" title="能耗总览">
      <div class="charts-container">
        <div class="charts">
          <echarts-wrap :options="energyOptions" />
        </div>
        <div class="charts-info">
          <resource-info title="今日耗电量" :value="5000" unit="度" />
          <resource-info title="今日耗水量" :value="23" unit="吨" />
        </div>
      </div>
    </box-pane>
    <box-pane class="live-manage" title="民生管理">
      <div class="title">医疗服务</div>
      <safety-info :info="safeInfo" />
      <div class="charts">
        <echarts-wrap :options="medicalOptions" />
      </div>
      <div class="title padding0">到访管理</div>
      <div class="area">
        <div class="area-title">选择区域</div>
        <el-select class="area-select" v-model="areaValue" placeholder="请选择" @change="onSelectChange">
          <el-option v-for="item in areaData" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="bar-charts">
        <echarts-wrap :options="computedVisitOptions" />
      </div>
    </box-pane>
  </div>
</template>

<style lang="scss" scoped>
.right-pane {
  position: absolute;
  top: 60px;
  right: 20px;
  width: 400px;
  height: calc(100% - 80px);
  z-index: 1;
  // transition: all 0.3s;
  // &:hover {
  //   filter: drop-shadow(0 0 1px #18185190);
  // }
  .energy-overview {
    .charts-container {
      display: flex;
      align-items: center;
      .charts {
        width: 220px;
        height: 160px;
      }
      .charts-info {
        min-width: 80px;
        padding-left: 20px;
      }
    }
  }
  .live-manage {
    height: calc(100% - 235px);
    margin-top: 15px;
    :deep(.content) {
      height: calc(100% - 30px);
      .title {
        padding-top: 10px;
        text-align: center;
        font-size: 14px;
        color: #6a95d9;
        font-weight: bold;
      }
      .padding0 {
        padding: 0;
      }
      .charts {
        box-sizing: border-box;
        width: 100%;
        height: 180px;
        padding: 0 10px;
      }
      .area {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        align-items: center;
        margin-top: 10px;
        .area-title {
          color: #fff;
          position: relative;
          &::before {
            content: '';
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            width: 3px;
            height: 30px;
            background-color: #1674fc;
          }
        }
        .area-select {
          width: 90px;
          .el-input__wrapper {
            background-color: #4c94ff;
            box-shadow: none !important;
            border-radius: 0;
            .el-input__inner {
              color: #000;
            }
            .el-select__caret {
              color: #000;
            }
          }
        }
      }
      .bar-charts {
        width: 100%;
        height: calc(100% - 380px);
        margin-top: 5px;
      }
    }
  }
}
</style>

<style lang="scss">
.el-select__popper.el-popper {
  background-color: #4c94ff;
  box-shadow: none;
  border: none;
  color: #000;
}

.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #2878f1;
  color: #fff;
}
.el-popper.is-light .el-popper__arrow::before {
  background-color: #4c94ff;
  border: none;
}
.el-select-dropdown__item.selected {
  color: #000;
}
</style>
