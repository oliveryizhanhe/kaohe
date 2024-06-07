# bigDataName 组件

## 概述

`bigDataName` 组件为了使用各种渲染策略（如定时器、requestAnimationFrame 和虚拟化）高效处理大数据集。该组件使用 Vue.js 构建，并利用 `element-ui` 进行 UI 组件的实现，使用 `axios` 进行数据获取。

## 组件结构

该组件包含一个选项卡界面，每个选项卡对应处理大数据集的不同策略：
1. 定时器和 requestAnimationFrame
2. 触底加载
3. 虚拟列表
4. 虚拟表格（vxe-table）

### 选项卡
- **定时器和 requestAnimationFrame:** 使用 requestAnimationFrame 以块状方式加载数据。
- **触底加载:** 当用户滚动到底部时加载更多数据。
- **虚拟列表:** 高效地渲染大列表。
- **虚拟表格（vxe-table）:** 使用 vxe-table 虚拟化表格渲染以高效显示数据。

### 方法
changeData()
从外部 API 获取数据，并更新 vvv 属性以显示新的数据。同时在数据加载过程中显示加载对话框。

### 步骤
1. 调用 $showDialog 显示加载对话框。
2. 设置 isRender 为 true，开始加载数据。
3. 使用 fetch 方法从 https://jsonplaceholder.typicode.com/posts 获取数据。
4. 数据加载完成后，调用 $hideDialog 隐藏加载对话框，并更新 vvv。

initData()
重置 vvv 为初始的 JSON 数据。
步骤:
设置 isRender 为 true，开始重置数据。
使用 setTimeout 模拟延迟，240 毫秒后将 vvv 重置为初始 JSON 数据。

# codeLightName 组件

## 概述

`codeLightName` 组件展示 JSON 数据，并提供按钮切换数据和重置初始数据。该组件使用 Vue.js 构建，利用 `fetch` 方法从外部 API 获取数据，并在数据加载时显示加载对话框。

## 组件结构

### 模板

组件模板包含：
1. 一个用于切换数据的按钮。
2. 一个用于重置初始数据的按钮。
3. 一个显示 JSON 数据的区域。

### 数据

- `vvv` (Object): 用于存储和显示的 JSON 数据。
- `isRender` (Boolean): 控制数据区域的渲染状态。

# HomeName 组件

## 概述

`HomeName` 组件展示一个卡片列表，每个卡片上有路由信息和对应的表情符号。卡片具有前后两面，点击卡片后面会导航到相应的路径。该组件还包括一个 GitHub 链接组件。

## 组件结构

### 模板

组件模板包含：
1. 一个 GitHub 链接组件。
2. 一个路由卡片列表，每个卡片包含：
   - 路由路径
   - 表情符号
   - 点击后导航到相应路由路径的功能

### 数据

- `routeArr` (Array): 路由数组，包含路由的相关信息。
- `emoji` (Array): 表情符号数组，每个卡片对应一个表情符号。
- `yanWords` (Array): 表情符号下的文字数组，每个卡片对应一个文字。

### 具体方法 
routeArr (Array): 从 routeArr 模块导入的路由数组。
emoji (Array): 包含多个表情符号的数组，用于在卡片前面显示。
yanWords (Array): 包含多个文字的数组，用于在卡片背面显示。
方法
jump(path)
根据传入的路径跳转到相应的路由。

# imgLazyloadName 组件

## 概述

`imgLazyloadName` 组件展示了使用 `vue-lazyload` 插件和自定义指令实现图片懒加载的示例。该组件包含两个部分：上部分使用 `vue-lazyload` 插件进行图片懒加载，下部分使用自定义指令实现图片懒加载。

## 组件结构

### 模板

组件模板包含：
1. 头部标题，描述不同懒加载实现方式。
2. 使用 `vue-lazyload` 插件进行懒加载的图片列表。
3. 使用自定义指令进行懒加载的图片。

### 数据

- `list` (Array): 包含图片 URL 的数组，用于生成图片列表。

### 具体方法
数据
list (Array): 包含图片 URL 的数组，用于生成图片列表。
指令
v-lazy
使用 vue-lazyload 插件提供的指令实现图片懒加载。

v-lazyload
使用自定义指令实现图片懒加载。

# myBackName 组件

## 概述

`myBackName` 组件展示了如何使用自定义的 `my-back` 标签实现滚动页面时回到顶部的功能。该组件提供了滚动条元素的自定义、回到顶部按钮显示高度的设置以及按钮位置的定制。

## 组件结构

### 模板

组件模板包含：
1. 说明如何使用 `my-back` 标签的步骤。
2. 一个包含多个 `h3` 标签的列表，模拟滚动内容。
3. 使用自定义标签 `my-back` 实现回到顶部功能。

### 数据

- `arr` (Array): 一个包含多个数字的数组，用于生成多个 `h3` 标签，模拟大量内容以展示滚动效果。

### 具体步骤
步骤
引入 my-back 标签。
指定滚动条元素 scrollBarDom 的类名或 id 名。
可设置回到顶部 showHeight 多高出现，默认 240 高度出现。
可设置回到顶部的距离下方和右侧的位置 bottom & right。

# myBadgeName 组件

## 概述

`myBadgeName` 组件展示了如何使用自定义的 `my-badge` 标签实现徽标功能。该组件提供了多种类型的徽标，包括 `primary`、`success`、`warning`、`info`、`danger` 类型，还支持设置最大值、小圆点徽标、文字徽标以及徽标的显示和隐藏。

## 组件结构

### 模板

组件模板包含：
1. 使用 `my-badge` 标签的多个示例，每个示例展示不同类型的徽标。
2. 一个按钮用于切换某个徽标的显示和隐藏。

### 数据

- `isShow` (Boolean): 控制某个徽标的显示和隐藏，默认为 `true`。

## 安装

确保你的 Vue 项目已正确配置，并安装了所需的依赖。

## 使用

在你的 Vue 模板中包含该组件：

```vue
<template>
  <div>
    <myBadgeName />
  </div>
</template>

<script>
import myBadgeName from '@/components/myBadgeName.vue';

export default {
  components: {
    myBadgeName,
  },
};
</script>
```
# myBreadName 组件

## 概述

`myBreadName` 组件展示了如何使用自定义的 `my-bread` 和 `my-divider` 标签实现面包屑导航功能。该组件提供了多种分隔符样式，包括默认颜文字、自定义分隔符内容、使用图标作为分隔符，还支持导航跳转功能。

## 组件结构

### 模板

组件模板包含：
1. 使用 `my-divider` 标签分隔不同部分的内容。
2. 使用 `my-bread` 标签和 `my-bread-item` 标签实现面包屑导航。
3. 不同类型的分隔符，包括默认颜文字分隔、自定义分隔符内容、使用图标作为分隔符和可跳转的面包屑导航。

### 示例

```vue
<template>
  <div>
    <my-divider content-position="left">默认颜文字分隔</my-divider>
    <my-bread>
      <my-bread-item>外层</my-bread-item>
      <my-bread-item>中层</my-bread-item>
      <my-bread-item>内层</my-bread-item>
    </my-bread>
    <my-divider content-position="left">自定义分隔内容</my-divider>
    <my-bread customDivide=">">
      <my-bread-item>外层</my-bread-item>
      <my-bread-item>中层</my-bread-item>
      <my-bread-item>内层</my-bread-item>
    </my-bread>
    <my-divider content-position="left">使用饿了么UI的图标做分隔</my-divider>
    <my-bread elementIconClassDivide="el-icon-wind-power">
      <my-bread-item>外层</my-bread-item>
      <my-bread-item>中层</my-bread-item>
      <my-bread-item>内层</my-bread-item>
    </my-bread>
    <my-divider content-position="left">可跳转</my-divider>
    <my-bread elementIconClassDivide="el-icon-location-outline">
      <my-bread-item :to="{ path: '/myTag' }">myTag跳转</my-bread-item>
      <my-bread-item replace :to="{ path: '/myBadge' }">myBadge跳转（replace）</my-bread-item>
      <my-bread-item>当下</my-bread-item>
    </my-bread>
  </div>
</template>

<script>
export default {
  name: 'myBreadName',
};
</script>
```
# myButtonName 组件

## 概述

`myButtonName` 组件展示了如何使用 `my-button` 和 `my-button-group` 标签实现各种类型的按钮，包括不同颜色、大小、禁用状态、加载状态和带图标的按钮。

## 组件结构

### 模板

组件模板包含：
1. 单个按钮的展示和点击加载切换功能。
2. 按钮组的展示，包括上一页、下一页和一组带图标的按钮。

### 示例

```vue
<template>
  <div>
    <h5>单个按钮</h5>
    <br />
    <button @click="clickLoad">加载切换</button>
    <div class="btnBox">
      <span class="btn" v-for="(item, index) of btnArr">
        <my-button
          style="margin-right: 16px"
          :key="index"
          :type="item.type"
          :size="item.size"
          :disabled="item.disabled"
          :loading="item.loading"
          :icon="item.icon"
          :rightIcon="item.rightIcon"
          @click="
            (e) => {
              clickBtn(item, e);
            }
          "
          >{{ item.name }}</my-button
        >
      </span>
    </div>
    <br />
    <h5>按钮组</h5>
    <br />
    <my-button-group>
      <my-button type="success" icon="el-icon-arrow-left">上一页</my-button>
      <my-button type="success" icon="el-icon-arrow-right" :rightIcon="true"
        >下一页</my-button
      >
    </my-button-group>
    <br />
    <br />
    <my-button-group>
      <my-button type="primary" icon="el-icon-user"></my-button>
      <my-button type="primary" icon="el-icon-view"></my-button>
      <my-button type="primary" icon="el-icon-star-off"></my-button>
      <my-button type="primary" icon="el-icon-chat-dot-square"></my-button>
      <my-button type="primary" icon="el-icon-share"></my-button>
    </my-button-group>
  </div>
</template>

<script>
export default {
  name: "myButtonName",
  data() {
    return {
      loadingF: false,
      btnArr: [
        // 按钮属性配置
      ],
    };
  },
  methods: {
    // 点击加载按钮切换加载状态
    clickLoad() {
      // 点击加载按钮切换加载状态
    },
    // 按钮点击事件处理函数
    clickBtn(item, e) {
      // 按钮点击事件处理
    },
  },
};
</script>

<style>
.btnBox {
  width: 100%;
  box-sizing: border-box;
  padding: 24px 0;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
}
.btn {
  margin-bottom: 24px;
}
</style>
```

# myCardName 组件

## 概述

`myCardName` 组件是一个卡片组件，可以根据需要设置不同的阴影效果、悬浮效果和翻转效果。

## 组件结构

### 模板

组件模板包含了不同配置下的卡片展示，包括悬浮出阴影、始终出阴影、没有阴影、悬浮出阴影上移、始终出阴影上移、没有阴影上移、悬浮出阴影放大、始终出阴影放大、没有阴影放大等。

### 示例

```vue
<template>
  <div class="box">
    <my-card class="cardClass" shadow="hover">悬浮出阴影</my-card>
    <!-- 其他卡片配置 -->
  </div>
</template>

<script>
export default {
  name: 'myCardName',
};
</script>

<style lang='less' scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 24px;
  .cardClass {
    width: 240px;
    margin-right: 24px;
    margin-bottom: 24px;
  }
}
</style>
```
### jvtifangfa
shadow: 控制阴影效果，可选值为 "hover"（悬浮出阴影）、"always"（始终出阴影）、"none"（没有阴影）。
isHoverUp: 控制悬浮时是否上移，默认为 false。
zoomCard: 控制悬浮时是否放大，默认为 false。
cardStyle: 自定义卡片样式，可以通过该属性控制内边距等样式。
backCardStyle: 自定义背面卡片样式，用于翻转效果。
back: 当设置了该插槽时，卡片会自动开启翻转模式，展示插槽内容。

