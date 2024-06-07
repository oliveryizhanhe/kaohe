function setStrongWater(str1, str2) {
    let id = 'waterMarkingId'

  
    let can = document.createElement('canvas')
    can.width = 240
    can.height = 120


    let cans = can.getContext('2d')
    cans.rotate(-20 * Math.PI / 180) 
    cans.font = '20px 楷体'
    cans.fillStyle = '#333'
    cans.textAlign = 'center'
    cans.textBaseline = 'Middle'
    cans.fillText(str1, can.width / 2, can.height) 
    cans.fillText(str2, can.width / 2, can.height + 22)


    let div = document.createElement('div')
    div.id = id
    div.style.pointerEvents = 'none'
    div.style.top = '0px'
    div.style.left = '0px'
    div.style.opacity = '0.16'
    div.style.position = 'fixed'
    div.style.zIndex = '100000'
    div.style.width = document.documentElement.clientWidth + 'px'
    div.style.height = document.documentElement.clientHeight + 'px'
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    document.body.appendChild(div)
    return id
}


function watch(obj, cb) {
    if (Object.prototype.toString.call(obj) != '[object Object]') {
        console.error('watch函数仅监听对象类型的数据变化,基本数据类型请再加一层')
        return
    }
    for (const key in obj) {
        let val = obj[key] 
        Object.defineProperty(obj, key, {
            get() {
                return val
            },
            set(newVal) {
                cb(newVal, val) 
                val = newVal
            }
        })
    }
}

let ob = null
let depObj = {
    flag: false 
}

setStrongWater("此网页水印直接删除不掉", "超叼的");

ob = new MutationObserver((records) => {
    for (const record of records) {
        if (record.removedNodes.length > 0) {
            for (const dom of record.removedNodes) {
                if (dom.tagName == "DIV") {
                    if (dom.id == "waterMarkingId") {
                        depObj.flag = !depObj.flag;
                        return;
                    }
                }
            }
        }
        if (record.target.tagName == "DIV") {
            if (record.target.id == "waterMarkingId") {
                depObj.flag = !depObj.flag;
                return;
            }
        }
    }
});

ob.observe(document.querySelector("body"), {
    childList: true, 
    attributes: true, 
    subtree: true, 
});

watch(depObj, (newVal) => {
    setStrongWater("此网页水印直接删除不掉", "超叼的");
})


