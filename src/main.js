import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import "./common/css/reset.css"; 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI); 

import router from './router/index' 

import store from "./store"; 

import './components/index';
import './otherComponents/load/index.js'

import install from './directives'
Vue.use(install)

import VueWorker from 'vue-worker'
Vue.use(VueWorker)

import VueLazyload from 'vue-lazyload'  
const loadimage = require('./assets/imgLazyload/loading.gif')
const errorimage = require('./assets/imgLazyload/error.gif')
Vue.use(VueLazyload, {
    preLoad: 1.3,  
    error: errorimage.default, 
    loading: loadimage.default, 
    attempt: 3  
})

import elTableInfiniteScroll from 'el-table-infinite-scroll';
Vue.use(elTableInfiniteScroll);

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VXETable)

import hljs from "highlight.js";

import "highlight.js/styles/agate.css";

Vue.directive("highlight", function (el) {
    let blocks = el.querySelectorAll("pre code");
    blocks.forEach(block => { 
        hljs.highlightBlock(block);
    });
});
Vue.prototype.$hljs = hljs; 


import './strongWater'

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')