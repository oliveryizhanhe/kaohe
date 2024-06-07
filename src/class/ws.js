
class myWebSocket {
    constructor(url) {
        this.url = url || 'ws://localhost:10000/mySocketUrl' 
        this.socket = null 
        this.messageArr = [] 
        this.connectCount = 3 
        this.timer = null 
    }
    createFn() {
        if (!WebSocket) { 
            console.error('当前浏览器不支持WebSocket')
            return
        }
        if (this.socket) {
            if (this.socket.readyState == 1) {
                console.warn('WebSocket已连接 不可重复连接')
                return
            }
        }

        try {
            this.socket = new WebSocket(this.url) 
            if (this.timer) clearInterval(this.timer)

            
            this.socket.onopen = (e) => {
                console.log('连接成功')
                this.timer = setInterval(() => {
                    this.socket.send('心跳监测')
                }, 3000)
            }
         
            this.socket.onerror = (e) => {
                console.error('连接错误', e)
                this.close()
            }
            
            this.socket.onmessage = (wsObj) => {
                console.log('--->', wsObj.data);
                this.messageArr.push(wsObj.data)
            }
        
            this.socket.onclose = () => {
                setTimeout(() => {
                    if (this.connectCount > 0) {
                        this.connectCount = this.connectCount - 1
                        console.log('尝试断线重连一次', this.connectCount);
                        this.createFn()
                    } else {
                        console.log('断线重连三次机会用完了');
                    }
                }, 2000);
            }
        } catch (error) {
            console.error('出错了', error)
            this.socket = null
            this.closeFn()
        }

    }
   
    sendFn(msg) {
        if (!this.socket) {
            console.warn('WebSocket未连接 无法发消息')
            return
        }
        msg = msg || '没有ws可以连接'
        this.socket.send(msg)
    }
   
    closeFn() {
        if (!this.socket) {
            console.warn('WebSocket未连接 不需要关闭')
            return
        }
        this.socket.close()
        this.socket = null
        this.messageArr = []
        clearInterval(this.timer)
        this.timer = null
        this.connectCount = 0
    }
}

export default myWebSocket

