<template>
  <div
    class="mySwitchWrap"
    :class="[disabled ? 'disabledSwitch' : '', size]"
    @click="changeStatus"
  >
  
    <input
      class="switchInput"
      type="checkbox"
      @change="changeStatus"
      ref="input"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="disabled"
      @keydown.enter="changeStatus"
    />
  
    <span
      :class="[
        'switchCentre',
        'circleDotLeft',
        isOpen ? 'changeCircleDotRight' : '',
      ]"
      :style="{
        background: computedBackground,
        borderColor: computedBackground,
      }"
    >
      <span
        class="text"
        :style="{
          justifyContent: isOpen ? 'flex-start' : 'flex-end',
          padding: isOpen ? '0 28px 0 8px' : '0 8px 0 28px',
        }"
        >{{ isOpen ? openText : closeText }}</span
      >
    </span>
  </div>
</template>

<script>
export default {
  name: "mySwitch",
  props: {
    openText: String,
    closeText: String,
    
    value: {
      type: Boolean,
      default: false, 
    },
    
    disabled: {
      type: Boolean,
      default: false,
    },
    
    activeValue: {
      type: Boolean,
      default: true,
    },
   
    inactiveValue: {
      type: Boolean,
      default: false,
    },
   
    activeColor: {
      type: String,
      default: "",
    },
    
    inactiveColor: {
      type: String,
      default: "",
    },
  
    size: {
      type: String,
      default: "",
    },
  },
  computed: {

    isOpen() {
      return this.value === this.activeValue;
    },
    computedBackground() {
      
      if ((this.activeColor.length > 0) & (this.inactiveColor.length > 0)) {
        return this.isOpen ? this.activeColor : this.inactiveColor;
      }
    
      else {
        return this.isOpen ? "#409EFF" : "#C0CCDA";
      }
    },
  },
  methods: {
    changeStatus() {
     
      if (this.disabled) {
        return;
      }
      
      const val = this.isOpen ? this.inactiveValue : this.activeValue;
      this.$emit("input", val); 
      this.$emit("change", val); 
    },
  },
};
</script>

<style scoped lang="less">
.mySwitchWrap {
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  margin: 2px;
 
  .switchInput {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
  .switchCentre {
    display: inline-block;
    width: auto;
    height: 20px;
    color: #fff;
    background-color: #c4c4c4;
    border: 1px solid;
    outline: 0;
    border-radius: 10px;
    box-sizing: border-box;
    transition: all 0.3s;
    position: relative;
    .text {
      min-width: 54px; 
      width: fit-content; 
      height: 100%;
      font-size: 15px;
      display: flex;
      // justify-content: justifyContent; 
      align-items: center;
      transition: all 0.3s;
    }
  }
  
  .circleDotLeft::after {
    content: "";
    position: absolute;
    top: -4px;
    left: -2px;
    border-radius: 100%;
    width: 24px;
    height: 24px;
    border: 1px solid #e9e9e9;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3); 
    background-color: #fff;
    transition: all 0.3s;
  }
  
  .changeCircleDotRight::after {
    left: 100%;
    margin-left: -24px;
  }
 
  .circleDotLeft:hover::after {
    box-shadow: 0 1px 18px 0 rgba(0, 0, 0, 0.5);
  }
}

.disabledSwitch {
  cursor: not-allowed;
  opacity: 0.48;
}

.disabledSwitch .circleDotLeft:hover::after {
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);
}

.small {
  zoom: 0.8;
}

.big {
  zoom: 1.6;
}
</style>