<template>
  <li class="timeLineItem">
    <div class="verticalLine"></div>
    <div
      class="dots"
      :style="{
        border: elementIcon
          ? 'none'
          : borderColor
          ? `2px solid ${borderColor}`
          : '2px solid #1890ff',
      }"
    >
          <i
        v-if="elementIcon"
        :style="{ color: iconColor }"
        :class="elementIcon"
      ></i>
    </div>
    
    <div class="content" :class="{ isSetTimeDown: timeLocation == 'down' }"> 
      <div class="contentTime" v-if="!hideTimestamp">{{ timestamp }}</div>
      <div class="contentDetail">
        <slot></slot>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "myTimelineItem",
  props: {
    timestamp: String,
    hideTimestamp: {
      type: Boolean,
      default: false, 
    },
    timeLocation: String,
    borderColor: String,
    elementIcon: String,
    iconColor: String,
  },
};
</script>

<style scoped lang="less">
.timeLineItem {
  position: relative; 
  padding-bottom: 12px;
  .verticalLine {
    width: 2px;
    height: 100%;
    background-color: #e9e9e9;
    position: absolute;
    top: 4px;
  }
  .dots {
    width: 12px;
    height: 12px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    left: -5px;
    top: 4px;
    i {
      position: absolute;
      left: -2px;
      top: -2px;
    }
  }
  .content {
    padding-left: 24px;
    display: flex;
    flex-direction: column;
    .contentTime {
      margin-bottom: 6px;
      font-size: 13px;
      color: #666;
    }
    .contentDetail {
      margin-bottom: 6px;
      font-size: 14px;
      color: #333;
    }
  }
  .isSetTimeDown {
    flex-direction: column-reverse;
  }
}
</style>
