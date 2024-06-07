<template>
  <div class="logoWrap">
    <logo-words v-if="!collapse"></logo-words>
  </div>
</template>

<script>
import logoWords from "./logoWords.vue";
export default {
  components: {
    logoWords,
  },
  props: {
    collapse: Boolean,
  },
  data() {
    return {
      logo
    };
  },
};
</script>

<style lang='less'>
.logoWrap {
  width: 100%;
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
  box-sizing: border-box;
  padding: 0 4px;
}
</style>