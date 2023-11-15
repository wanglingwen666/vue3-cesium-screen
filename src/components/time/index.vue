<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import moment from 'moment'

const props = withDefaults(defineProps<{ timeFormat?: string }>(), {
  timeFormat: 'YYYY-MM-DD HH:mm:ss'
})

const currentDate = ref(moment().format(props.timeFormat))
const interval = ref<NodeJS.Timeout>()
const time = computed(() => currentDate.value.split(' ')[1])
const date = computed(() => currentDate.value.split(' ')[0])

onMounted(() => {
  interval.value = setInterval(() => {
    currentDate.value = moment().format(props.timeFormat)
  }, 1000)
})
onUnmounted(() => {
  clearInterval(interval.value)
})
</script>

<template>
  <div class="time">
    <span class="date">{{ date }}</span>
    <span class="time">{{ time }}</span>
  </div>
</template>

<style lang="scss" scoped>
.time {
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  color: #fff;
  .date {
    margin-right: 10px;
  }
}
</style>
