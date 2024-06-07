import waves from "./waves";
import copy from "./copy";
import showshow from "./showshow";
import load from "./load";
import lazyload from "./lazyload";
import down from "./down";
import myhtml from "./myhtml";

const directives = {
    waves,
    copy,
    showshow,
    load,
    lazyload,
    down,
    myhtml,
}

export default {
    install(Vue) {
        Object.keys(directives).forEach((key) => {
            Vue.directive(key, directives[key])
        })
    }
}