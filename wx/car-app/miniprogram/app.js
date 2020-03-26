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
      eventShopUpdate: "eventShopUpdate",
      event: {
      },
      addListener: function (event, callback) {
        let callbacks = app.globalData.event[event]
        if (!callbacks) {
          callbacks = []
          app.globalData.event[event] = callbacks
        }
        if (callbacks.indexOf(callback) == -1) {
          callbacks.push(callback)
        }
      },
      removeListener: function (event, callback) {
        let callbacks = app.globalData.event[event]
        if (callbacks) {
          var idx = callbacks.indexOf(callback)
          if (idx != -1) {
            callbacks.splice(idx, 1)
          }
        }

      },
      dispatchEvent: function (event) {
        let callbacks = app.globalData.event[event]
        if (callbacks) {
          for (let index = 0; index < callbacks.length; index++) {
            const element = callbacks[index];
            element.call()
          }
        }
      },
      shop: {}, //  商店信息
      user: {} // 用户信息
    }
    let that = this
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
            let onShopInfo = () => {
              console.log("获取商店信息", app.globalData.shop)
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
      },
      uploadRes: function (filePath, callback) {
        // 上传图片
        const name = new Date().getTime().toString() + "_" + Math.floor(Math.random() * 100000);
        const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            callback(true, res)
            console.log('[上传文件] 成功：', res)
          },
          fail: e => {
            callback(false, e)
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      // 上传图片
      uploadImg: function (callback) {
        // 选择图片
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: function (res) {
            wx.showLoading({
              title: '上传中',
            })
            const filePath = res.tempFilePaths[0];
            that.globalFunc.uploadRes(filePath, callback)
          },
          fail: e => {
            wx.hideLoading()
            console.error(e)
          }
        })
      },
      uploadVideo: function (callback) {
        wx.chooseVideo({
          sourceType: ['album', 'camera'],
          maxDuration: 60,
          camera: 'back',
          success: (res) => {
            wx.showLoading({
              title: '上传中',
            })
            // 上传图片
            const filePath = res.tempFilePath;
            //thumbTempFilePath
            that.globalFunc.uploadRes(filePath, callback)
          },
          fail: e => {
            wx.hideLoading()
            console.error(e)
          }
        })
      },
    }
  }
})
