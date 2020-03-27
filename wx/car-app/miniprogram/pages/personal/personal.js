// pages/personal/personal.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },
  onShow: function () {
    this.data.userInfo.nickName = app.globalData.user.nickName
    this.data.userInfo.phone = app.globalData.user.phone
    this.setData(this.data)
  },
  inputBind:function(e){
    this.data.userInfo.phone = e.detail.value
  },
  getPhoneNumber: function (e) {
    if (!e.detail.cloudID) {
      return
    }
    wx.cloud.callFunction({
      name: 'openapi',
      data: {
        action: 'getcellphone',
        id: e.detail.cloudID
      }
    }).then(res => {
      this.data.userInfo.phone = res.result.list[0].data.phoneNumber
      this.setData(this.data)
    })
  },
  confirm: function (e) {
    if (this.data.userInfo.phone != app.globalData.user.phone){
      // 调用云函数
      wx.cloud.callFunction({
        name: 'user',
        data: {
          action: "userBindPhone",
          phone: this.data.userInfo.phone
        },
        success: res => {
          console.log('[云函数] [user.userBindPhone] : ', res.result)
          wx.showToast({
            icon: 'success',
            title: '修改成功',
            duration: 3000,
            success: res => {
              setTimeout(() => {
                wx.navigateBack()
              }, 500)
            }
          })
        },
        fail: err => {
          console.error('[云函数] [user.userBindPhone] 调用失败', err)
        }
      })
    }else{
      wx.navigateBack()
    }
  },

})