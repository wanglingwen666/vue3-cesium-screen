<script setup lang="ts">
import * as Cesium from 'cesium'
import { cesiumToken } from '../public/config/index'

import gsapCarry from '@/hooks/use-gsap'
import { fromDegrees } from '@/utils/cesium-tools'

import CommonHeader from '@/components/common-header/common-header.vue'
import LeftPane from '@/components/left-pane/left-pane.vue'
import RightPane from '@/components/right-pane/right-pane.vue'
import LinkGroup from '@/components/link-group/link-group.vue'
import InfoPane from '@/components/info-pane/info-pane.vue'

const tileset = ref<Cesium.Cesium3DTileset>()
const viewer = shallowRef<Cesium.Viewer>() // 同样这里使用ref会有问题
onMounted(async () => {
  gsapCarry()
  Cesium.Ion.defaultAccessToken = import.meta.env.DEV ? cesiumToken : ''
  viewer.value = new Cesium.Viewer('container', {
    geocoder: false, //是否显示地名查找控件
    sceneModePicker: false, //是否显示投影方式控件
    navigationHelpButton: false, //是否显示帮助信息控件
    baseLayerPicker: false, //是否显示图层选择控件
    homeButton: false, //是否显示Home按钮
    fullscreenButton: false, //是否显示全屏按钮
    animation: false, //左下角的动画控件的显示
    shouldAnimate: false, //控制模型动画
    timeline: false, //底部的时间轴
    selectionIndicator: false,
    infoBox: false
  })
  ;(viewer.value.cesiumWidget.creditContainer as HTMLElement).style.display = 'none'
  // 最小缩放高度（米）
  viewer.value.scene.screenSpaceCameraController.minimumZoomDistance = 200
  // 最大缩放高度（米）
  viewer.value.scene.screenSpaceCameraController.maximumZoomDistance = 10000
  tileset.value = viewer.value.scene.primitives.add(
    new Cesium.Cesium3DTileset({
      url: Cesium.IonResource.fromAssetId(75343)
      // url: Cesium.IonResource.fromAssetId(1415196)
    })
  )
  tileset.value!.style = new Cesium.Cesium3DTileStyle({
    // color: 'color("blue",0.5)',
    // show: true,
    color: {
      conditions: [
        ['${Height} >= 300', 'rgba(45,0,75,0.5)'],
        ['${Height} >= 200', 'rgba(205,0,75,0.5)'],
        ['${Height} >= 100', 'rgba(5,50,175,0.5)'],
        ['${Height} >= 50', 'rgba(105,80,5,0.5)'],
        ['${Height} >= 25', 'rgba(245,0,75,0.5)'],
        ['${Height} >= 10', 'rgba(4,100,75,0.5)'],
        ['${Height} >= 5', 'rgba(50,90,105,0.5)'],
        ['true', 'rgb(127,59,8)']
      ]
    },
    show: '${Height} >= 0'
  })

  await tileset.value!.readyPromise // 等待加载完成

  viewer.value.zoomTo(tileset.value!, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-20), 2000))
})

const onAreaChange = (v: { lat: number; lng: number; h: number }) => {
  const { lng, lat, h } = v
  const position = fromDegrees(lng, lat, h)
  viewer.value!.camera.flyTo({
    destination: position, // 设置相机目的地
    // 设置相机视口方向
    orientation: {
      heading: Cesium.Math.toRadians(0), // 控制视口的水平旋转 即y轴 为 0 代表是正北方向
      pitch: Cesium.Math.toRadians(-20), // 控制视口上下旋转 即x轴
      roll: 0 // 控制视口翻转角度 z轴
    },
    duration: 2
  })
}
</script>

<template>
  <div class="home" id="container">
    <common-header />
    <left-pane />
    <right-pane @select-change="onAreaChange" />
    <link-group />
    <info-pane />
  </div>
</template>

<style scoped lang="scss">
#container {
  background-color: #0a2e6499;
  width: 100%;
  height: 100%;
}
</style>
