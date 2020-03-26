// pages/userFeedbackQuery/userFeedbackQuery.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: {}
  },
  onLoad: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: "userFeedbackQuery",
        page: 1,
        perpage: 10,
      },
      success: res => {
        console.log('[云函数] [user.userFeedback] : ', res.result)
        this.data.message = res.result.data
        this.setData(this.data)
      },
      fail: err => {
        console.error('[云函数] [user.userFeedback] 调用失败', err)
      }
    })
  },
  onshow:function(){
    let feedback = app.globalData.feedback
    this.data.message = shop.message
    this.setData(this.data) 
  }
})