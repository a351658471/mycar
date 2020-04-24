// miniprogram/pages/reward/reward.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCoupon:true,
    toCoupon:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  jumpToDetail(){
    wx.redirectTo({
      url: '/pages/rewardDetail/rewardDetail',
    })
  }
})