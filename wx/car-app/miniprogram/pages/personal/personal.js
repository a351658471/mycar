// pages/personal/personal.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    mes: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  onShow: function() {
    this.data.userInfo.nickName = app.globalData.user.nickName
    this.data.userInfo.phone = app.globalData.user.phone
    this.setData(this.data)
  },

  getPhoneNumber: function(e) {
    wx.cloud.callFunction({
      name: 'openapi',
      data: {
        action: 'getcellphone',
        id: e.detail.cloudID
      }
    }).then(res => {
      console.log('res: ', res.result.list[0].data.phoneNumber)
      this.data.userInfo.phone = res.result.list[0].data.phoneNumber
      this.setData(this.data)
    })
  },
  confirm: function(e) {
    console.log(e)
    // 调用云函数
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: "userBindPhone",
        phone: this.data.userInfo.phone
      },
      success: res => {
        console.log('[云函数] [user.userBindPhone] : ', res.result)
      },
      fail: err => {
        console.error('[云函数] [user.userBindPhone] 调用失败', err)
      }
    })
  },

})