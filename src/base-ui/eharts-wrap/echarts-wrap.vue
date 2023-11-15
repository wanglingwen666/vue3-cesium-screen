<script lang="ts" setup>
import { ref, onMounted, watch, nextTick, shallowRef } from 'vue'
import * as echarts from 'echarts/core'
import { EChartsOption } from 'echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import { vResize } from './directive/resize'
import type { IRenderer } from './type'
echarts.use([CanvasRenderer, LineChart, BarChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent, PieChart])

const props = withDefaults(
  defineProps<{
    options: EChartsOption
    merge?: boolean
    theme?: string
    renderer?: IRenderer
  }>(),
  {
    merge: false,
    theme: '',
    renderer: 'canvas'
  }
)

// ///* shallowRef 可以 这里使用 ref 会有问题 */
const chartInstance = shallowRef<ReturnType<typeof echarts.init>>()
const echartsRef = ref<HTMLElement>()
const updated = () => {
  nextTick(() => {
    chartInstance.value && chartInstance.value.setOption(props.options, !props.merge)
  })
}
watch(() => props.options, updated, {
  deep: true,
  immediate: true
})

onMounted(() => {
  chartInstance.value = echarts.init(echartsRef.value!, props.theme, { renderer: props.renderer })
})
const resizes = () => {
  chartInstance.value && chartInstance.value.resize()
}
</script>

<template>
  <div class="echarts-wrap" v-resize:100.throttle="resizes">
    <div class="chart" ref="echartsRef"></div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.echarts-wrap,
.chart {
  width: 100%;
  height: 100%;
  transform: translate3d(0, 0, 0);
  :deep(.resize-sensor) {
    transform: translate3d(0, 0, 0);
  }
}
</style>
