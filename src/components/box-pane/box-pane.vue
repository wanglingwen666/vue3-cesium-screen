<!--  -->
<script lang="ts" setup>
const props = withDefaults(defineProps<{ title?: string }>(), {
  title: ''
})
</script>

<template>
  <div class="box-pane">
    <div class="header">{{ props.title }}</div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box-pane {
  width: 100%;
  .header {
    width: 100%;
    height: 40px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #02122860;
    position: relative;
    &::after {
      content: '';
      display: inline-block;
      width: 100%;
      height: 1px;
      bottom: 5px;
      left: 0;
      background-image: linear-gradient(270deg, transparent 20%, #39ebff60 40%, #39ebff60 50%, transparent 76%);
      position: absolute;
    }
  }
  .content {
    background-color: #13243b60;
  }
}
</style>
