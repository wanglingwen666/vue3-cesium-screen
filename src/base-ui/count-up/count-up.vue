<!--  -->
<script lang="ts" setup>
import gsap from 'gsap'

//接收需要实现滚动的数据
const props = withDefaults(
  defineProps<{
    value: number | string
  }>(),
  {
    value: 0
  }
)
//初始值
const num = ref(0)
//实现动画的方法
function AnimateToValue() {
  gsap.to(num, {
    duration: 1,
    value: props.value
  })
}

AnimateToValue()
//监听传过来的值是否变化，如果变化了，就在执行一次
watch(
  () => props.value,
  () => AnimateToValue()
)
</script>

<template>
  {{ num.toFixed(0) }}
</template>
