<template>
  <div>
    <my-fold v-model="openArr" accordion @change="changeFn">
      <my-fold-item title="第一项" name="one">我是第一项的内容</my-fold-item>
      <my-fold-item title="第二项" name="two">
        <p>我是第二项的内容</p>
        <p>我是第二项的内容</p>
      </my-fold-item>
      <my-fold-item title="第三项" name="three">
        <p>我是第三项的内容</p>
        <p>我是第三项的内容</p>
        <p>我是第三项的内容</p>
      </my-fold-item>
      <my-fold-item title="第四项" name="four">
        <p>我是第四项的内容</p>
        <p>我是第四项的内容</p>
        <p>我是第四项的内容</p>
        <p>我是第四项的内容</p>
      </my-fold-item>
    </my-fold>
    <br />
    <my-fold v-model="openArr2" @change="changeFn">
      <my-fold-item title="第一项" name="one">我是第一项的内容</my-fold-item>
      <my-fold-item title="第二项" name="two">
        <p>我是第二项的内容</p>
        <p>我是第二项的内容</p>
      </my-fold-item>
      <my-fold-item title="第三项" name="three">
        <p>我是第三项的内容</p>
        <p>我是第三项的内容</p>
        <p>我是第三项的内容</p>
      </my-fold-item>
      <my-fold-item title="第四项" name="four">
        <p>我是第四项的内容</p>
        <p>我是第四项的内容</p>
        <p>我是第四项的内容</p>
        <p>我是第四项的内容</p>
      </my-fold-item>
    </my-fold>
  </div>
</template>

<script>
export default {
  name:"myFoldName",
  data() {
    return {
      openArr2: ["one", "two"],
    };
  },
  methods: {
    changeFn(name, isOpen, vNode) {
      console.log(name, isOpen, vNode);
    },
  },
};
</script>