
let loadimage = require('../../assets/imgLazyload/loading.gif') 
let errorimage = require('../../assets/imgLazyload/error.gif') 

export default {
    inserted(el, binding, vnode) { 
        el.src = loadimage.default 
        const observer = new IntersectionObserver((entries) => {
            let isIntersecting = entries[0].isIntersecting 
            if (isIntersecting) { 
                el.src = binding.value
                el.onload = (res) => {
                    console.log('加载成功', res)
                }; 
                el.onerror = (err) => {
                    console.log('加载失败', err);
                    el.src = errorimage.default
                }
                observer.unobserve(el)
            }
        })
        observer.observe(el)
    },
}