<template>
  
  <popper
    :appendToBody="true"
    trigger="hover"
    :visibleArrow="true"
    :options="{
      placement: placement,
      modifiers: {
        offset: {
          offset: 0,
        },
        computeStyle: {
          gpuAcceleration: false,
        },
        preventOverflow: {
          boundariesElement: 'window',
        },
      },
    }"
    rootClass="selfSetRootClass"
    transition="fade"
    :disabled="disabled"
  >
    <div
      v-if="$slots.content"
      :class="{ isLightPopper: light }"
      ref="popperRef"
      class="popper"
    >
      <slot name="content"></slot>
    </div>
    <div
      v-else
      :class="{ isLightPopper: light }"
      ref="popperRef"
      class="popper"
    >
      {{ content }}
    </div>
    <slot slot="reference"></slot>
  </popper>
</template>

<script>
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
const placementArr = [
  "top-start",
  "top",
  "top-end",
  "left-start",
  "left",
  "left-end",
  "right-start",
  "right",
  "right-end",
  "bottom-start",
  "bottom",
  "bottom-end",
];
export default {
  name: "myTooltip",
  components: { popper }, 
  props: {
    placement: {
      type: String,
      default: "top-start", 
      validator(val) {
        return placementArr.includes(val); 
      },
    },
    content: {
      type: String,
      default: "",
    },
    light: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less">
.popper {
  box-sizing: border-box;
  padding: 6px 12px;
  border-radius: 3px;
  color: #fff;
  background-color: #333;
  border: none;
}
.popper[x-placement^="top"] {
  margin-bottom: 12px !important;
}
.popper[x-placement^="bottom"] {
  margin-top: 12px !important;
}
.popper[x-placement^="left"] {
  margin-right: 12px !important;
}
.popper[x-placement^="right"] {
  margin-left: 12px !important;
}
.popper[x-placement^="top"] .popper__arrow {
  border-color: #333 transparent transparent transparent;
}
.popper[x-placement^="bottom"] .popper__arrow {
  border-color: transparent transparent #333 transparent;
}
.popper[x-placement^="right"] .popper__arrow {
  border-color: transparent #333 transparent transparent;
}
.popper[x-placement^="left"] .popper__arrow {
  border-color: transparent transparent transparent #333;
}
.selfSetRootClass {
  transition: all 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.isLightPopper {
  color: #333;
  background-color: #fff;
  filter: drop-shadow(0, 2px, 12px, 0, rgba(0, 0, 0, 0.24));
  box-shadow: 0, 2px, 12px, 0, rgba(0, 0, 0, 0.24);
}
.isLightPopper[x-placement^="top"] .popper__arrow {
  border-color: #fff transparent transparent transparent;
}
.isLightPopper[x-placement^="bottom"] .popper__arrow {
  border-color: transparent transparent #fff transparent;
}
.isLightPopper[x-placement^="right"] .popper__arrow {
  border-color: transparent #fff transparent transparent;
}
.isLightPopper[x-placement^="left"] .popper__arrow {
  border-color: transparent transparent transparent #fff;
}
</style>