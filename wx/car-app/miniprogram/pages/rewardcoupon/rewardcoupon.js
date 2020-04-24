// miniprogram/pages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ['卡券', '历史'],
    tabLists: ['启用中','停用中'],
    tabCurrent:0,
    tabCurrents:0,
    history:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  jumpToAddcoupon(){
    wx.redirectTo({
      url: '/pages/rewardAddCoupon/rewardAddCoupon',
    })
  },
  tabClick: function (e) {
    console.log(e)
    this.data.tabCurrent = e.detail.tabCurrent
    this.setData(this.data)
  },
  tabClicks: function (e) {
    console.log(e)
    this.data.tabCurrents = e.detail.tabCurrents
    this.setData(this.data)
  },
})