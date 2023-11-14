// import * as echarts from 'echarts/core'
import { EChartsOption } from 'echarts'

let data = [
  { value: 500, name: '红色工地' },
  { value: 250, name: '蓝色工地' },
  { value: 250, name: '橙色工地' },
]
export const culturedOptions: EChartsOption = {
  color: ['#E03583', '#FB5A02', '#73B0F3'],
  title: {
    show: true,
    text: "1000",
    subtext: '工地总数',
    left: "33%",
    top: "38%",
    textStyle: {
      color: "#ffffff",
      fontSize: 22,
      fontWeight: "bold",
    },
    subtextStyle: {
      color: "#ffffff",
      fontSize: 12,
    },
    textAlign: "center",
  },
  // tooltip: {
  //   show: true,
  // },
  legend: {
    orient: 'vertical',
    type: 'scroll',
    top: 'middle',
    right: '0%',
    icon: 'rect',
    itemWidth: 10,
    itemHeight: 10,
    selectedMode: false,
    itemGap: 35,
    // padding: [10, 0],
    textStyle: {
      color: '#DADADE',
      //图例样式修改
      rich: {
        name: {
          width: 60,
          fontSize: 12,
          fontWeight: 500,
          align: 'left',
        },
        value: {
          width: 20,
          //  color: '#FFF',
          fontSize: 12,
          fontWeight: 500,
          align: 'left',
        },
        // rate: {
        //   width: 30,
        //   align: 'left',
        //   fontSize: 12,
        //   //  color: '#FFF',
        // },
      },
    },
    //自定义legend图例
    formatter: function (name) {
      // let total = 0
      let target = 0
      for (let i = 0; i < data.length; i++) {
        // total += data[i].value
        if (data[i].name === name) {
          target = data[i].value
        }
      }
      var arr = [
        `{name|${name}}`,
        `{value|${target}}`,
        // '{rate|' + ((target / total) * 100).toFixed(2) + '%}'
      ]
      return arr.join('\n')
    },
    data: ['红色工地', '蓝色工地', '橙色工地'],
  },
  series: {
    name: '',
    type: 'pie',
    center: ['35%', '50%'],
    radius: ['75%', '85%'],
    data: data,
    label: {
      show: false,
    },
    labelLine: {
      show: false,
    },
  },
};
