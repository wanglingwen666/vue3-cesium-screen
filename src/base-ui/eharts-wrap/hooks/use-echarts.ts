import * as echarts from 'echarts'

export default function (el: HTMLElement, theme?: string, options?: any) {
  const echartInstance = echarts.init(el, theme, options)

  const setOptions = (options: echarts.EChartsOption, isMerge = true) => {
    echartInstance.setOption(options, isMerge)
  }

  const updateSize = () => {
    echartInstance.resize()
  }

  window.addEventListener('resize', () => {
    console.log(echartInstance)
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
