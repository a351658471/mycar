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


    // 调用云函数
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: "userLogin",
        wxUserInfo: userInfo
      },
      success: res => {
        this.setData({
          logged: true,
          avatarUrl: userInfo.avatarUrl,
          userInfo: userInfo
        })
        console.log('[云函数] [user.userLogin] : ', res.result)
      },
      fail: err => {
        console.error('[云函数] [user.userLogin] 调用失败', err)
      }
    })
  },
  onGetOpenid: function () {
    
    // 调用云函数
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: "userFeedbackRead",
        ids:['42d70ff05e79fd0e000197d5096f5c88']
      },
      success: res => {
        console.log('[云函数] [user.userFeedbackRead] : ', res.result)
      },
      fail: err => {
        console.error('[云函数] [user.userFeedbackRead] 调用失败', err)
      }
    })


    // // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'user',
    //   data: {
    //     action: "userFeedbackQuery",
    //     condition: {
    //       // 模糊搜素
    //       value: {
    //         $regex: ".*13.*",
    //         $options: 'i'
    //       }
    //     },
    //     page: 1,
    //     perpage: 2,
    //   },
    //   success: res => {
    //     console.log('[云函数] [user.userFeedback] : ', res.result)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [user.userFeedback] 调用失败', err)
    //   }
    // })

    //  // 调用云函数
    //  wx.cloud.callFunction({
    //   name: 'user',
    //   data: {
    //     action: "userFeedback",
    //     value: "1596",
    //   },
    //   success: res => {
    //     console.log('[云函数] [user.userFeedback] : ', res.result)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [user.userFeedback] 调用失败', err)
    //   }
    // })


    // // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'item',
    //   data: {
    //     action: "itemList",
    //     istotal: 0,   //  返回总数
    //     // 查询条件
    //     condition:{
    //       shopId: "f841fd285e71d6900011f3b713c5a83f",
    //       // 名称模糊搜素
    //       // name: {
    //       //   $regex: ".*13.*",
    //       //   $options: 'i'
    //       // }
    //     },
    //     // status:[0,1,2],    // 商品状态 在售 已售 未上架 
    //     // 分页
    //     page: 1,
    //     perpage: 5,
    //     // 是否排序
    //     order:0
    //   },
    //   success: res => {
    //     console.log('[云函数] [item.itemList] : ', res.result)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [item.itemList] 调用失败', err)
    //   }
    // })

    // // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'item',
    //   data: {
    //     action: "itemRemove",
    //     shopid: "f841fd285e71d6900011f3b713c5a83f",
    //     ids: ["ae7e55b35e758c9600135dd8065f1744"],
    //   },
    //   success: res => {
    //     console.log('[云函数] [item.itemRemove] : ', res.result)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [item.itemRemove] 调用失败', err)
    //   }
    // })


    //  // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'item',
    //   data: {
    //     action: "itemEdit",
    //     shopid: "f841fd285e71d6900011f3b713c5a83f",
    //     item: {
    //       _id:"ae7e55b35e758c9600135dd8065f1744",
    //       name: "911",    // 商品名
    //       price: 666666,   // 价格
    //       stock: 1,   // 库存
    //       data: "{}",     // 数据
    //     }
    //   },
    //   success: res => {
    //     console.log('[云函数] [item.itemEdit] : ', res.result)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [item.itemEdit] 调用失败', err)
    //   }
    // })

    // // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'item',
    //   data: {
    //     action: "itemAdd",
    //     shopid: "f841fd285e71d6900011f3b713c5a83f",
    //     item: {
    //       name: "911",    // 商品名
    //       price: 888888,  // 价格
    //       stock: 1,       // 库存
    //       sort:1002,      // 排序 值越大排越前面
    //       data: "{}",     // 数据
    //     }
    //   },
    //   success: res => {
    //     console.log('[云函数] [item.itemAdd] : ', res.result)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [item.itemAdd] 调用失败', err)
    //   }
    // })


    //  // 调用云函数
    //  wx.cloud.callFunction({
    //   name: 'user',
    //   data: {
    //     action: "userQuery",
    //     keyWord: "1596",
    //             // 分页
    //     page: 1,
    //     perpage: 5,
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
    //   name: 'user',
    //   data: {
    //     action: "userBindPhone",
    //     phone: "15960836449"
    //   },
    //   success: res => {
    //     console.log('[云函数] [user.userBindPhone] : ', res.result)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [user.userBindPhone] 调用失败', err)
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
