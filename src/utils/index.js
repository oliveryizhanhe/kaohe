import Vue from "vue";


export function IsPhone() {
   
    var info = navigator.userAgent;
    var isPhone = /mobile/i.test(info);
    return isPhone;
}

Vue.prototype.IsPhone = IsPhone
export function getThemeColor() {
    let cache_theme_bgColor = sessionStorage.getItem('theme_bgColor')
    if (cache_theme_bgColor) {
        document.documentElement.style.setProperty("--theme_bgColor", cache_theme_bgColor);
        return cache_theme_bgColor
    } else {
        let theme_bgColor = getComputedStyle(
            document.documentElement
        ).getPropertyValue("--theme_bgColor")
        return theme_bgColor
    }
}