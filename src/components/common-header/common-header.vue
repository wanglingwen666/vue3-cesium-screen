<script lang="ts" setup>
import NyTime from '@/components/time/index.vue'
</script>

<template>
  <div class="common-header">
    <div class="left">
      <div class="area">浙江省xx市xx区</div>
      <div class="weather"><span class="sun">☀</span> 32℃ 晴</div>
    </div>
    <div class="center">未来智慧社区</div>
    <div class="right">
      <ny-time time-format="YYYY年MM月DD日 HH:mm:ss" />
      <div class="logout">
        <el-icon><SwitchButton /></el-icon>
        <span style="margin-left: 5px">退出</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.common-header {
  width: 100%;
  height: 75px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding: 0 30px;
  box-sizing: border-box;
  // box-shadow: 0px 25px 25px 12px #28497f90 inset;
  box-shadow: 0px 44px 32px -10px #40a3d690 inset;

  .left {
    display: flex;
    justify-content: space-between;
    min-width: 400px;
    .area {
      font-size: 28px;
      font-weight: bold;
      line-height: 50px;
    }
    .weather {
      line-height: 45px;
      .sun {
        font-size: 24px;
        color: #ebc220;
        margin-right: 5px;
      }
    }
  }
  .center {
    flex: auto;
    background: url('./bg.png') no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    font-weight: bold;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    line-height: 36px;
  }
  .right {
    min-width: 320px;
    display: flex;
    justify-content: space-between;
    line-height: 45px;
    .logout {
      cursor: pointer;
    }
  }
}
</style>
