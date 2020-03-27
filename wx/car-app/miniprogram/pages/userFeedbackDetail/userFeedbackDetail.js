// pages/userFeedbackDetail/userFeedbackDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:{}
  },
  onLoad:function(option){
    console.log(option)
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
        for (var i = 0; i < res.result.data.length; i++) {
          var msg = res.result.data[i]
          // console.log(msg)
          if (msg._id == option.item_id) {
            msg.creatime = new Date(msg.creatime).toLocaleDateString()
            this.data.message = msg
            this.setData(this.data)
            break
          }
        }
        console.log(msg.creatime)
      
      },
      fail: err => {
        console.error('[云函数] [user.userFeedback] 调用失败', err)
      }
    })
  }

  
})