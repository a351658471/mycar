//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.toLogin(res.userInfo)
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.toLogin(e.detail.userInfo)
    }
  },
  toLogin: function (userInfo) {
    console.log(userInfo)
    this.setData({
      logged: true,
      avatarUrl: userInfo.avatarUrl,
      userInfo: userInfo
    })

    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {
        wxUserInfo: userInfo
      },
      success: res => {
        console.log('[云函数] [login] : ', res.result)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  onGetOpenid: function () {



    // // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'shop',
    //   data: {
    //     action: "itemList",
    //     shopid: "f841fd285e71d6900011f3b713c5a83f",
    //     page: 1,
    //     perpage: 5,
    //     istotal: 1
    //   },
    //   success: res => {
    //     console.log('[云函数] [shop] : ', res.result)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [shop] 调用失败', err)
    //   }
    // })

    
    //  // 调用云函数
    //  wx.cloud.callFunction({
    //   name: 'shop',
    //   data: {
    //     action: "userQuery",
    //     shopid: "f841fd285e71d6900011f3b713c5a83f",
    //     keyWord: "五"
    //   },
    //   success: res => {
    //     console.log('[云函数] [shop] : ', res.result)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [shop] 调用失败', err)
    //   }
    // })
    
    
    // 调用云函数
    //  wx.cloud.callFunction({
    //   name: 'shop',
    //   data: {
    //     action: "swiperEdit",
    //     shopid: "f841fd285e71d6900011f3b713c5a83f",
    //     swipers: ["1","3"]
    //   },
    //   success: res => {
    //     console.log('[云函数] [shop] : ', res.result)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [shop] 调用失败', err)
    //   }
    // })


    // // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'shop',
    //   data: {
    //     action: "masterAdd",
    //     shopid: "f841fd285e71d6900011f3b713c5a83f",
    //     openid: "oGsi55es4lZjF5SC2Ldx4ELxNnz0"
    //   },
    //   success: res => {
    //     console.log('[云函数] [shop] : ', res.result)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [shop] 调用失败', err)
    //   }
    // })

    // // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'shop',
    //   data: {
    //     action:"masterList",
    //     shopid: "f841fd285e71d6900011f3b713c5a83f",
    //   },
    //   success: res => {
    //     console.log('[云函数] [shop] : ', res.result)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [shop] 调用失败', err)
    //   }
    // })

    // // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'shop',
    //   data: {
    //     action:"shopList",
    //   },
    //   success: res => {
    //     console.log('[云函数] [shop] : ', res.result)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [shop] 调用失败', err)
    //   }
    // })


    // // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'shop_query',
    //   data: {
    //     data:{
    //       own:0
    //     }
    //   },
    //   success: res => {
    //     console.log('[云函数] [shop_add] shopid: ', res.result)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [shop_add] 调用失败', err)
    //   }
    // })

    // // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'shop_add',
    //   data: {
    //     shopInfo:{
    //       name: "汽车俱乐部"
    //     }
    //   },
    //   success: res => {
    //     console.log('[云函数] [shop_add] shopid: ', res.result.shopid)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [shop_add] 调用失败', err)
    //   }
    // })

    // // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'login',
    //   data: {},
    //   success: res => {
    //     console.log('[云函数] [login] : ', res.result)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [login] 调用失败', err)
    //   }
    // })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
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
      fail: e => {
        console.error(e)
      }
    })
  },

})
