
import Vue from 'vue'

import dialog from './load';
const Dialog = Vue.extend(dialog);

const app = new Dialog().$mount(document.createElement('div'))
function showDialog(options) {
    for (let key in options) {
        app[key] = options[key];
    }
    app.showLoading = true
    document.body.appendChild(app.$el);
}

function hideDialog() {
    app.showLoading = false
}

Vue.prototype.$showDialog = showDialog;
Vue.prototype.$hideDialog = hideDialog;