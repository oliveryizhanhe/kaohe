<script>
export default {
  name: "myTimeline",
  props: {
    reverse: {
      type: Boolean,
      default: false, 
    },
  },
  render() {
    const reverse = this.reverse;
    const classes = {
      "my-timeline": true,
      "is-reverse": reverse,
    };
    let slots = this.$slots.default || []; 
    if (reverse) {
      slots = slots.reverse();
    }
    return <ul class={classes}>{slots}</ul>;
  },
};
</script>

<style lang="less">
.my-timeline,
.my-timeline .timeLineItem {
  list-style: none;
}
.my-timeline .timeLineItem:last-child .verticalLine {
  display: none;
}
</style>
