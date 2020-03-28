// pages/userFeedbackDetail/userFeedbackDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:{}
  },
  onLoad:function(option){
    console.log(option)
    for (var i = 0; i < app.globalData.feedbacks.length; i++) {
      var msg = app.globalData.feedbacks[i]
      if (msg._id == option.item_id) {
        msg.creatime = new Date(msg.creatime).toLocaleDateString()
        this.data.message = msg
        this.setData(this.data)
        break
      }
    } 
  }

  
})