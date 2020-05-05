// miniprogram/pages/reward/reward.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponData:[],
    purchaseData:[],
    integral:'',
    avatarUrl:'',
    nickName:'',
    integral:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.user)
    this.data.integral = app.globalData.user.integral.score
    this.data.avatarUrl = app.globalData.user.avatarUrl
    this.data.nickName = app.globalData.user.nickName
    this.setData(this.data)
    this.getCard()
  },
  //获取卡券数据
  getCard() {
    wx.cloud.callFunction({
      name: 'card',
      data: {
        action: 'getCardTemplate',
        getType:'userPage',
        shopid: app.globalData.shop._id
      },
      success: res => {
        this.data.couponData = res.result.type0
        this.data.purchaseData = res.result.type1
        this.setData(this.data)
      }
    })
  },
  jumpToDetail(e) {
    console.log(e)
    let id = e.detail.id
    let type = e.detail.type
    wx.redirectTo({
      url: '/pages/rewardDetail/rewardDetail?cardId=' + id+'&type='+type,
    })
  },
  toMyCoupon(){
    wx.redirectTo({
      url: '/pages/rewardMyCoupon/rewardMyCoupon' 
    })
  },
  toCouponRule(){
    wx.redirectTo({
      url: '/pages/rewardRule/rewardRule' 
    })
  },
  toCheckAll(){
    wx.redirectTo({
      url: '/pages/rewardCheckAll/rewardCheckAll' 
    })
  }
})