//app.js
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    let app = this;
    this.globalData = {
      eventShopUpdate:"eventShopUpdate",
      event:{
      },
      addListener:function(event, callback){
        let callbacks = app.globalData.event[event]
        if(!callbacks){
          callbacks = []
          app.globalData.event[event] = callbacks
        }
        if(callbacks.indexOf(callback) == -1){
          callbacks.push(callback)
        }
      },
      removeListener:function(event, callback){
        let callbacks = app.globalData.event[event]
        if(callbacks){
          var idx = callbacks.indexOf(callback)
          if(idx != -1){
            callbacks.splice(idx, 1)
          }
        }
       
      },
      dispatchEvent:function(event){
        let callbacks = app.globalData.event[event]
        if(callbacks){
         for (let index = 0; index < callbacks.length; index++) {
           const element = callbacks[index];
           element.call()
         }
        }
      },
      shop: {} //  商店信息
    }
    this.globalFunc = {
      getShopInfo: function () {
        // 调用云函数
        wx.cloud.callFunction({
          name: 'shop',
          data: {
            action: "shopList",
          },
          success: res => {
            console.log('[云函数] [shop] : ', res.result)
            let onShopInfo = ()=>{
              console.log("获取商店信息", app.globalData.shop )
              app.globalData.removeListener(app.globalData.eventShopUpdate, onShopInfo)
            }
            app.globalData.addListener(app.globalData.eventShopUpdate, onShopInfo)
            app.globalData.shop = res.result.data[0]
            app.globalData.dispatchEvent(app.globalData.eventShopUpdate)
          },
          fail: err => {
            console.error('[云函数] [shop] 调用失败', err)
          }
        })
      }
    }
    this.globalFunc.getShopInfo();
  }
})
