// pages/userFeedbackQuery/userFeedbackQuery.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: [],
    page: 1,
    noMore: false,
    isLoading: false
  },
  onLoad(){
    this.data.message = app.globalData.feedbacks
    this.getFeedbackData()
  },
  getFeedbackData: function(page = 1) {
    this.setData({
      isLoading: true
    })
    if (page == 1) {
      this.data.message.length = 0
      this.setData(this.data)
    }
    // 调用云函数
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: "userFeedbackQuery",
        page,
        perpage: 6
      },
      success: res => {
        if (res.result.data.length < 6) {
          this.data.noMore = true
        } else {
          this.data.noMore = false
        }
        this.setData({
          noMore: this.data.noMore,
          isLoading: false
        })
        console.log('[云函数] [user.userFeedback] : ', res.result)
        res.result.data.forEach(item => {
          this.data.message.push(item)
          this.setData(this.data)
        })
      },
      fail: err => {
        console.error('[云函数] [user.userFeedback] 调用失败', err)
      }
    })
  },
  
  onShow: function() {

  },
  onPullDownRefresh:function(){
    this.data.page = 1
    this.getFeedbackData(this.data.page)
  },
  loadMore() {
    this.data.page++
    this.getFeedbackData(this.data.page)
  },

  isTab: function(e) {
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
        for (var i = 0; i < this.data.message.length; i++) {
          var msg = this.data.message[i]
          if (msg._id == item._id) {
            msg.status = 1
            this.setData(this.data)
            break
          }
        }
        wx.navigateTo({
          url: '/pages/userFeedbackDetail/userFeedbackDetail?item_id=' + item._id,
        })
      },
      fail: err => {
        console.error('[云函数] [user.userFeedbackRead] 调用失败', err)
      }
    })
  },
})