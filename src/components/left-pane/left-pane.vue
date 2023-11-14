<script lang="ts" setup>
import { computed } from 'vue'
import BoxPane from '@/components/box-pane/box-pane.vue'
import InfoProgress from '@/components/info-progress/info-progress.vue'
import EchartsWrap from '@/base-ui/eharts-wrap/echarts-wrap.vue'
import { require } from '@/utils/require'
import { culturedOptions } from './config/echart-options'
import SafetyInfo from '@/components/safety-info/safety-info.vue'
import type { IBaseInfo } from '@/types/base-info'
import type { ISafeInfo } from '@/types/safety-info'

interface IData {
  color: string
  info: IBaseInfo
}

const baseInfoList: IData[] = [
  {
    color: '#75ACFE',
    info: {
      imgUrl: require('@/assets/images/gd-total.png')!,
      total: 77,
      totalName: '工地总数',
      isDoingNum: 64,
      isDoingName: '在建工地',
      isDoneNum: 13,
      isDoneName: '闲置工地',
      percent: 83
    }
  },
  {
    color: '#FC5600',
    info: {
      imgUrl: require('@/assets/images/ry-total.png')!,
      total: 2765,
      totalName: '人员总数',
      isDoingNum: 2654,
      isDoingName: '施工人数',
      isDoneNum: 111,
      isDoneName: '管理人员',
      percent: 98
    }
  }
]
const safeInfo: ISafeInfo = {
  title: '隐患整改率',
  percent: 99.34,
  isUp: true,
  value: 1.2,
  unit: '%',
  info: [
    { id: 1, name: '发现隐患数', value: '129', unit: '起' },
    { id: 2, name: '今日成灾火警数', value: '0', unit: '起' },
    { id: 3, name: '今日告警数', value: '0', unit: '起' },
    { id: 4, name: '消防设施完好率', value: '91', unit: '%' }
  ]
}

const map = {
  0: '待处理',
  1: '处理中',
  2: '已处理'
}
const random = (num: number) => {
  const res = Math.ceil(Math.random() * num)
  return res < 10 ? '0' + res : res
}

const tableData = computed(() => {
  const arr = []
  for (let i = 0; i < 30; i++) {
    arr.push({
      description: 'xx路群众聚众斗殴',
      eventType: '出店经营',
      date: `2023-${random(11)}-${random(25)} ${random(23)}:${random(59)}`,
      status: map[Math.floor(Math.random() * 3) as 0 | 1 | 2] // 0-待处理 1-处理中 2-已处理
    })
  }
  return arr
})
</script>

<template>
  <div class="left-pane">
    <box-pane class="direct-governance" title="治理直达">
      <template #default>
        <div class="base-info">
          <div class="title">工地基本信息</div>
          <info-progress v-for="(item, index) in baseInfoList" :key="index" :info="item.info" :color="item.color" />
        </div>
        <div class="work-rank">
          <div class="title">工地三色排名</div>
          <div class="charts-container">
            <div class="charts">
              <echarts-wrap :options="culturedOptions" />
            </div>
            <div class="charts-pane">
              <div class="item">
                <div class="intro big">当年事件办结率</div>
                <div class="value big">99.34%</div>
              </div>
              <div class="item">
                <div class="intro">当年事件上报/预警数量</div>
                <div class="value">29133件</div>
              </div>
              <div class="item">
                <div class="intro">当年事件办结熟料</div>
                <div class="value">29133件</div>
              </div>
            </div>
          </div>
        </div>
        <div class="fire-safety">
          <div class="title">消防安全</div>
          <safety-info :info="safeInfo" />
        </div>
      </template>
    </box-pane>
    <box-pane class="illegal-event" title="违法事件">
      <template #default>
        <el-table :data="tableData" style="width: 100%" size="small">
          <el-table-column prop="description" label="事件说明" width="120" align="center" />
          <el-table-column prop="eventType" label="事件类型" width="120" align="center" />
          <el-table-column prop="date" label="发生时间" align="center" />
          <el-table-column prop="status" label="处理状态" width="80" align="center">
            <template #default="{ row }">
              <span :style="`color:${row.status === '待处理' ? '#ed6810' : row.status === '处理中' ? '#678ccc' : '#fff'}`">{{ row.status }}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </box-pane>
  </div>
</template>

<style lang="scss" scoped>
.left-pane {
  position: absolute;
  top: 60px;
  left: 20px;
  width: 500px;
  height: calc(100% - 80px);
  z-index: 1;
  .base-info,
  .work-rank,
  .fire-safety {
    padding-top: 10px;
    .title {
      text-align: center;
      font-size: 14px;
      color: #6a95d9;
      font-weight: bold;
    }
  }
  .work-rank {
    .charts-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .charts {
        width: 250px;
        height: 180px;
      }
      .charts-pane {
        min-width: 190px;
        max-height: 120px;
        padding: 10px 15px;
        margin-right: 15px;
        background-color: #2a344d99;
        .item {
          display: flex;
          justify-content: space-between;
          line-height: 32px;
          .intro {
            color: #fff;
            font-size: 12px;
          }
          .value {
            color: #678ccc;
            font-size: 12px;
          }
          .big {
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .illegal-event {
    margin-top: 15px;
    height: calc(100% - 600px);
    :deep(.content) {
      padding: 10px;
      height: calc(100% - 40px);
      box-sizing: border-box;
      .el-table {
        height: 100%;
        overflow-y: auto;
      }
    }
  }
}
</style>
