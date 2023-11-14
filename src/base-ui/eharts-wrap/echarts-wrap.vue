<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import type { DirectiveBinding } from 'vue'
import * as echarts from 'echarts/core'
import { EChartsOption } from 'echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
echarts.use([CanvasRenderer, LineChart, BarChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent, PieChart])

const props = withDefaults(
  defineProps<{
    options: EChartsOption
    merge?: boolean
    theme?: string
  }>(),
  {
    merge: false,
    theme: ''
  }
)

//必须以 vNameOfDirective 的形式来命名本地自定义指令，以使得它们可以直接在模板中使用。
const vResize = {
  mounted(el: Element, binding: DirectiveBinding) {
    const handler = binding.value
    window.addEventListener('resize', handler)
  },

  unmounted(el: Element, binding: DirectiveBinding) {
    window.removeEventListener('resize', binding.value)
  }
}

const chart = ref<ReturnType<typeof echarts.init>>()
const container = ref<HTMLDivElement | null>(null)
const updated = () => {
  nextTick(() => {
    chart.value && chart.value.setOption(props.options, !props.merge)
  })
}
watch(() => props.options, updated, {
  deep: true,
  immediate: true
})
const resizes = () => {
  console.log(111)
  chart.value && chart.value.resize() // 这里暂时是有问题的
}

onMounted(() => {
  chart.value = echarts.init(container.value as HTMLDivElement, props.theme)
})
</script>

<template>
  <div class="echarts-wrap" v-resize.throttle.80="resizes">
    <div class="chart" ref="container"></div>
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
