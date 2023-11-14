<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts/core'
import { EChartsOption } from 'echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
// import useEchart from './hooks/use-echarts'
// import type { DirectiveBinding } from 'vue'
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

//必须以 vNameOfDirective 的形式来命名本地自定义指令，以使得它们可以直接在模板中使用。
// const vResize = {
//   mounted(_el: Element, binding: DirectiveBinding) {
//     const handler = binding.value
//     window.addEventListener('resize', handler, false)
//   },

//   unmounted(_el: Element, binding: DirectiveBinding) {
//     window.removeEventListener('resize', binding.value, false)
//   }
// }

// const chartInstance = ref<ReturnType<typeof echarts.init>>()
let chartInstance = {} as ReturnType<typeof echarts.init>
const echartsRef = ref<HTMLElement>()
const updated = () => {
  nextTick(() => {
    // chartInstance.value && chartInstance.value.setOption(props.options, !props.merge)
    chartInstance && chartInstance.setOption(props.options, !props.merge)
  })
}
watch(() => props.options, updated, {
  deep: true,
  immediate: true
})

onMounted(() => {
  // chartInstance.value = echarts.init(echartsRef.value!, props.theme, { renderer: props.renderer })
  chartInstance = echarts.init(echartsRef.value!, props.theme, { renderer: props.renderer })
  window.addEventListener(
    'resize',
    () => {
      // chartInstance.value && chartInstance.value.resize()
      chartInstance && chartInstance.resize()
    },
    false
  )
})
// const resizes = () => {
//   // chartInstance.value && chartInstance.value.resize() // 这里暂时是有问题的
//   chartInstance && chartInstance.resize()
// }

// const echartsRef = ref<HTMLDivElement>()
// onMounted(() => {
//   const { setOptions } = useEchart(echartsRef.value!, props.theme, { renderer: props.renderer })
//   watchEffect(() => {
//     setOptions(props.options)
//   })
// })
</script>

<template>
  <!-- <div class="echarts-wrap" v-resize.throttle.80="resizes"> -->
  <div class="echarts-wrap">
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
