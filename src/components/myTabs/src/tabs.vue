<script>
import tabNav from "./tabNav.vue"; 
export default {
  name: "myTabs",
  components: { tabNav },
  props: {
    
    value: null, 
    beforeLeave: {
      
      type: Function,
      default: () => {
        
      },
    },
  },
  data() {
    return {
      tabItemArr: [], 
      activeName: this.value, 
    };
  },
  mounted() {
   
    this.calcTabItemInstances();
  },
  methods: {
    calcTabItemInstances() {
      
      if (this.$slots.default) {
       
        let slotTabItemArr = this.$slots.default;
        
        this.tabItemArr = slotTabItemArr.map((item) => {
          return item.componentInstance; 
        });
       
      } else {
        this.tabItemArr = []; 
      }
    },
    handleTabClick(tabItem) {
      this.$emit("tabClick", tabItem); 
      let newTabName = tabItem.name; 
      this.setCurrentName(newTabName); 
    },
   
    async setCurrentName(newTabName) {
      let oldTabName = this.activeName; 
      let res = await this.beforeLeave(newTabName, oldTabName);
      if (res) {
        this.$emit("input", newTabName); 
        this.activeName = newTabName;
      }
    },
  },
  render(h) {
    
    const navData = {
      props: {
        tabItemArr: this.tabItemArr, 
        activeName: this.activeName, 
        onTabClick: this.handleTabClick, 
      },
    };
    return (
      <div class="tab-Box">
        <tab-nav {...navData}></tab-nav>
        <div class="my-tab-content-item-box">{this.$slots.default}</div>
      </div>
    );
   
  },
};
</script>