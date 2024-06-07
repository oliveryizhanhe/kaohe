export default {
    inserted: function (el, binding) {
        const htmlStr = binding.value; 
        el.innerHTML = htmlStr;
    },
    update: function (el, binding) {
        if (binding.oldValue !== binding.value) {
            el.innerHTML = binding.value;
        }
    }
}