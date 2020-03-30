// pages/advise/advise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  commit: function(e) {
    console.log(e)
    let that = this
    let feedbackval = e.detail.value.feedbackval
    if (feedbackval==''){
      wx.showToast({
        title: '请填写反馈信息',
        icon:'none'
      })
    }else{
      // 调用云函数
      wx.cloud.callFunction({
        name: 'user',
        data: {
          action: "userFeedback",
          value:feedbackval,
        },
        success: res => {
          // console.log('[云函数] [user.userFeedback] : ', res.result)
          wx.showToast({
            icon: 'success',
            title: '提交成功',
            duration: 3000,
            success: res => {
              setTimeout(() => {
                wx.navigateBack()
              }, 500)
            }
          })
        },
        fail: err => {
          console.error('[云函数] [user.userFeedback] 调用失败', err)
        }
      })
    }
  }
})