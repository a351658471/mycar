// miniprogram/pages/rewardCode/rewardCode.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    completeCoupon:[], //已兑换
    noUseCoupon:[], //过期/已使用
    showCouponData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCouponCard()
  },
  //获取我的卡券
  getCouponCard() {
    // let userd
    wx.cloud.callFunction({
      name: 'cardVoucher',
      data: {
        action: 'showMyCard',
        page: 1,
        pageCount: 10,
        shopid: app.globalData.shop._id,
        userId: app.globalData.user._id,
        // userd:userd
      },
      success: res => {
        console.log(res)
        this.data.showCouponData = res.result.data
        this.setData(this.data)
      }
    })
  },
})