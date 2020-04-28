// miniprogram/pages/reward/reward.js
const app = getApp()
const PAGECOUNT = 6
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponData:[],
    showCouponData:[],
    integral:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.user)
    // this.data.integral = app.globalData.user.integral.score
    this.setData(this.data)
    this.getCard()
  },
  //获取卡券数据
  getCard() {
    let status = 0
    wx.cloud.callFunction({
      name: 'card',
      data: {
        action: 'getCardTemplate',
        page:1,
        pageCount: PAGECOUNT,
        status: status
      },
      success: res => {
        this.data.couponData = res.result.data
        this.setData(this.data)
      }
    })
  },
  jumpToDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.redirectTo({
      url: '/pages/rewardDetail/rewardDetail?cardId=' + id,
    })
  },
  toMyCoupon(){
    wx.redirectTo({
      url: '/pages/rewardMyCoupon/rewardMyCoupon' 
    })
  }
})