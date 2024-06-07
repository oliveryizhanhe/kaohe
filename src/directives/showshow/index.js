export default {
    bind(el, binding, vnode) {
        const flag = binding.value 
        if (flag == false) {
            el.style.display = 'none'
        } else {
            el.style.display = 'inline-block'
        }
    },
    inserted(el, binding, vnode) { },
    componentUpdated(el, binding, vnode, oldVnode) { },
    update(el, binding, vnode, oldVnode) {
        const flag = binding.value
        if (flag == false) {
            el.style.display = 'none'
        } else {
            el.style.display = 'inline-block'
        }
    },
    unbind(el, binding, vnode) { }

}