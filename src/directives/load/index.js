import './index.css'
export default {
    bind(el, binding) {
        const target = el;
        let flag;
        let isObj;
        if (typeof binding.value == 'boolean') {
            flag = binding.value
            isObj = false
        }
        if (typeof binding.value == 'object') {
            flag = binding.value.value
            isObj = true
        }
        if (target) {
            target.style.position = "relative";
            let loadChild = document.createElement("div");
            loadChild.className = "loadClass";
            let fragment = document.createDocumentFragment()
            let iSun = document.createElement("i");
            iSun.className = isObj ? binding.value.icon : "el-icon-loading";
            let spanSun = document.createElement("span");
            spanSun.innerHTML = isObj ? binding.value.text : '加载中...'
            fragment.appendChild(iSun);
            fragment.appendChild(spanSun);
            loadChild.appendChild(fragment);
            if (isObj) {
                loadChild.style.color = binding.value.color
                loadChild.style.backgroundColor = binding.value.bgColor
            }
            if (!flag) {
                loadChild.classList.add('load-hide')
                loadChild.style.display = 'none'
            }
            target.appendChild(loadChild);
        }
    },
    componentUpdated(el, binding, vnode, oldVnode) {
        let flag = typeof binding.value == 'boolean' ? binding.value : binding.value.value
        let loadChild = el.querySelector('.loadClass')
        if (flag) {
            loadChild.style.display = 'flex'
            setTimeout(() => {
                loadChild.classList.remove('load-hide')
            }, 0);
        } else {
            loadChild.classList.add('load-hide')
            setTimeout(() => {
                loadChild.style.display = 'none'
            }, 360);

        }
    },
}