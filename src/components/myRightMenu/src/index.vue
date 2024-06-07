<template>
  <ul class="table-right-menu">

    <li
      v-for="item in rightclickInfo.menulists"
      :key="item.btnName"
      class="table-right-menu-item"
      @click.stop="fnHandler(item)"
    >
      <div class="table-right-menu-item-btn">
      
        <i :class="item.icoName" class="iii" />
        <span>{{ item.btnName }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "myRightMenu",
  props: {
 
    rightclickInfo: {
      type: Object,
      default: () => {
        return {
          position: {
           
            x: null,
            y: null,
          },
          menulists: [
            {
              fnName: "",
              params: {}, 
              icoName: "", 
              btnName: "", 
            },
          ],
        };
      },
    },
   
    classIndex: {
      type: Number,
      default: 0,
    },
  },
  watch: {
   
    "rightclickInfo.position"(val) {
      let x = val.x; 
      let y = val.y;
      let innerWidth = window.innerWidth; 
      let innerHeight = window.innerHeight; 
     
      let menu =
        document.getElementsByClassName("table-right-menu")[this.classIndex]; 
      menu.style.display = "block";
      let menuHeight = this.rightclickInfo.menulists.length * 30; 
      let menuWidth = 180; 
      
      menu.style.top =
        (y + menuHeight > innerHeight ? innerHeight - menuHeight : y) + "px";
      menu.style.left =
        (x + menuWidth > innerWidth ? innerWidth - menuWidth : x) + "px";
    
      document.addEventListener("mouseup", this.hide, false);
    },
  },
  methods: {
    hide(e) {
      if (e.button === 0) {
     
        let menu =
          document.getElementsByClassName("table-right-menu")[this.classIndex];
        menu.style.display = "none"; 
        document.removeEventListener("mouseup", this.hide); 
      }
    },
    fnHandler(item) {
      this.$emit(item.fnName, item.params);
     
    },
  },
};
</script>

<style lang='less' scoped>
.table-right-menu {
  color: #333;
  background: #fff;
  border-radius: 4px;
  list-style-type: none;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  font-size: 12px;
  font-weight: 500;
  box-sizing: border-box;
  padding: 4px 0;
  position: fixed;
  z-index: 3000;
  display: none;
  .table-right-menu-item {
    box-sizing: border-box;
    padding: 6px 12px;
    border-radius: 4px;
    transition: all 0.36s;
    cursor: pointer;
    .table-right-menu-item-btn {
      .iii {
        margin-right: 4px;
      }
    }
  }
  .table-right-menu-item:hover {
    background-color: #ebf5ff;
    color: #6bacf2;
  }
}
</style>