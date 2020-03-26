// pages/userFeedbackQuery/userFeedbackQuery.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: {},
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
        console.log(this.data.message)
      },
      fail: err => {
        console.error('[云函数] [user.userFeedback] 调用失败', err)
      }
    })
  },
  
  isTab: function (e) {
    let item = e.currentTarget.dataset.src
    console.log(item)
    // 调用云函数
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: "userFeedbackRead",
        ids: [item._id]
      },
      success: res => {
        console.log('[云函数] [user.userFeedbackRead] : ', res.result)
        for (var i = 0; i < this.data.message.length; i++ ){
          var msg = this.data.message[i]
          if(msg._id == item._id){
            msg.status = 1
            this.setData(this.data)
            break
          }
        }
        wx.navigateTo({
          url: '/pages/userFeedbackDetail/userFeedbackDetail?item_id='+item._id,
        })
      },
      fail: err => {
        console.error('[云函数] [user.userFeedbackRead] 调用失败', err)
      }
    })
  },
})