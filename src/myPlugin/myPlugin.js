
class myPlugin {
    constructor(options) { 
        console.log("我是new这个类时所传递的参数-->", options);
    }
    apply(compiler) {
        compiler.hooks.emit.tapAsync('lss',(compliation,cb)=>{
            console.log('compliation',compliation.assets);
            const content=`
                蓝山考核
            `
            compliation.assets['AOLIGEI.md'] = {
                size() { 
                    return content.length 
                },
                source: function () {
                    return content
                }
            }
            cb()
        })
    }
}

module.exports = myPlugin