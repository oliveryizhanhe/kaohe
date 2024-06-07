<template functional>
  <span class="myTrendWrap">
    <span
      :style="{
        color: props.whole ? '' : 'unset',
      }"
      :class="[props.reverseColor ? 'reverseColor' : '', props.flag]"
      ><slot
    /></span>
    <span
      :class="[
        'triangle',
        props.reverseColor ? 'reverseColor' : '',
        props.flag,
      ]"
    ></span>
  </span>
</template>

<script>
export default {
  name: "myTrend",
  props: {
    flag: {
      type: String,
      default: "",
    },
    reverseColor: {
      type: Boolean,
      default: false,
    },
    whole: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang='less' scoped>
.myTrendWrap {
  .triangle {
    font-size: 12px;
    margin-left: 6px;
    display: inline-block;
    width: 0;
    height: 0;
    border: 6px solid;
    position: relative;
    border-color: transparent;
  }
  .up {
    border-color: transparent transparent #ed4014 transparent;
    transform: translateY(-30%);
    color: #ed4014;
  }
  .down {
    border-color: #19be6b transparent transparent transparent;
    transform: translateY(30%);
    color: #19be6b;
  }
  .up.reverseColor {
    border-color: transparent transparent #19be6b transparent;
    transform: translateY(-30%);
    color: #19be6b;
  }
  .down.reverseColor {
    border-color: #ed4014 transparent transparent transparent;
    transform: translateY(30%);
    color: #ed4014;
  }
}
</style>