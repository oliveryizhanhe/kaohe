
const setWatermark = (str1, str2) => {
    let id = 'waterMarkingIdSimple'

    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }


    let can = document.createElement('canvas')
    can.width = 280
    can.height = 150

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
    div.style.opacity = '0.1'
    div.style.position = 'fixed'
    div.style.zIndex = '100000'
    div.style.width = document.documentElement.clientWidth + 'px'
    div.style.height = document.documentElement.clientHeight + 'px'
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    document.body.appendChild(div)
    return id
}

export const setWaterMark = (str1, str2) => {
    let id = setWatermark(str1, str2)
    if (document.getElementById(id) === null) {
        id = setWatermark(str1, str2)
    }
}

export const removeWatermark = () => {
    let id = 'waterMarkingIdSimple'
    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }
}