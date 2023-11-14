import * as echarts from 'echarts/core'
import { EChartsOption } from 'echarts'

let data = [
  { value: 59, name: '' },
  { value: 1, name: '', itemStyle: { color: 'transparent' } },
  { value: 39, name: '' },
  { value: 1, name: '', itemStyle: { color: 'transparent' } }
]
export const energyOptions: EChartsOption = {
  // backgroundColor: 'transparent',
  color: ['#72A7FA', '#3B527C'],
  title: {
    show: true,
    text: '59%',
    subtext: '清洁能源占比',
    left: '45%',
    top: '38%',
    textStyle: {
      color: '#ffffff',
      fontSize: 22,
      fontWeight: 'bold'
    },
    subtextStyle: {
      color: '#ffffff',
      fontSize: 12
    },
    textAlign: 'center'
  },
  // tooltip: {
  //   show: true,
  // },
  legend: {
    show: false
    //自定义legend图例
  },
  roseType: 'radius',

  series: {
    name: '',
    type: 'pie',
    center: ['45%', '50%'],
    radius: ['78%', '95%'],
    // itemStyle: {
    //   borderColor: 'transparent',
    //   borderWidth: 30
    // },
    data: data,
    label: {
      show: false
    }
  }
}

const xData = ['三花国际医院', '轻纺城医院', '天城医院', '绿地医院', '真福会医院', '杭州元宝医院']
const yData = []
const max = 2000

for (let i = 6; i > 0; i--) {
  const val = Math.ceil(Math.random() * max)
  yData.push({
    count: val,
    value: val
  })
}

export const medicalOptions: EChartsOption = {
  grid: {
    show: false,
    left: '0',
    right: '13%',
    bottom: '0',
    top: '14px',
    containLabel: true
  },
  xAxis: {
    show: false,
    type: 'value',
    max: max
  },
  yAxis: {
    type: 'category',
    inverse: true,
    triggerEvent: true,
    axisLabel: {
      show: true,
      fontSize: '12',
      color: '#d6d6d6'
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    data: xData
  },

  series: [
    {
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
        borderRadius: 20
      },
      label: {
        show: true,
        position: [0, 0],
        // distance: 200,
        color: '#d6d6d6',
        formatter: data => {
          // @ts-ignore
          return `{a|${data.data!.count}}`
        },
        rich: {
          a: {
            padding: [0, 0, 0, 260]
          }
        }
      },
      itemStyle: {
        borderRadius: 20,
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          {
            offset: 1,
            color: '#FC5B0610'
          },
          {
            offset: 0,
            color: '#FC5B06'
          }
        ])
      },
      // 移入当前的柱状图时改变颜色
      emphasis: {
        label: {
          color: '#5AC0E9'
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            {
              offset: 1,
              color: 'rgba(90, 192, 233, 0.04)'
            },
            {
              offset: 0,
              color: '#5AC0E9'
            }
          ])
        }
      },
      barWidth: 10,
      data: yData
    }
  ]
}

export const visitOptions: EChartsOption = {
  color: ['#DC3087', '#74ACFC'],
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    top: 20,
    right: 20,
    textStyle: {
      color: '#d6d6d6'
    },
    selectedMode: false
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: 0,
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#d6d6d6'
        }
      },
      axisTick: {
        show: true,
        alignWithLabel: true
      },
      axisLabel: {
        color: '#d6d6d6',
        formatter: (text: string) => {
          const { length } = text
          const num = Math.ceil(length / 2)
          const res = length > 3 ? text.substring(0, num) + '\n' + text.substring(num) : text
          return res
        }
      },

      data: ['兴隆社区', '建和社区', '杨家桥社区', '建华社区', '茶亭院社区', '建龙社区']
    }
  ],
  yAxis: [
    {
      type: 'value',

      axisLine: {
        show: true,
        lineStyle: {
          color: '#d6d6d6'
        }
      },
      axisLabel: {
        color: '#d6d6d6'
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#cccccc50'
        }
      },
      axisTick: {
        show: true
      }
    }
  ],
  series: [
    {
      name: '本日到访人次',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      barWidth: 15,
      data: [120, 132, 101, 134, 90, 230]
    },
    {
      name: '本周到访人次',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      barWidth: 15,
      data: [220, 182, 191, 234, 290, 330]
    }
  ]
}
