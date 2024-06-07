export default {
    bind(el, binding) {
        el.waveFn = (e) => {
            const target = el; 
            const targetBgColor = binding.value; 
            if (target) {
                target.style.position = "relative";
                target.style.overflow = "hidden";
                const rect = target.getBoundingClientRect(); 
                let ripple = target.querySelector(".wavesRipple"); 
                if (!ripple) {
                    ripple = document.createElement("span"); 
                    ripple.className = "wavesRipple";
                    ripple.style.height = Math.max(rect.width, rect.height) + "px";
                    ripple.style.width = Math.max(rect.width, rect.height) + "px";
                    target.appendChild(ripple);
                } else {
                    ripple.className = "wavesRipple";
                }
                ripple.style.top =
                    (e.pageY -
                        rect.top -
                        ripple.offsetHeight / 2 -
                        document.documentElement.scrollTop || 
                        document.body.scrollTop) + "px";
                ripple.style.left =
                    (e.pageX -
                        rect.left -
                        ripple.offsetWidth / 2 -
                        document.documentElement.scrollLeft ||
                        document.body.scrollLeft) + "px";
                ripple.style.backgroundColor = targetBgColor; 
                ripple.className = "wavesRipple live";
            }
        }
        el.addEventListener("click", el.waveFn,
            false 
        );
    },
    unbind(el, binding, vnode) {
        el.removeEventListener('click', el.waveFn)
    }
}