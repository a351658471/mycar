// miniprogram/pages/reward/reward.js
const app = getApp()
const PAGECOUNT = 6
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCoupon:true,
    toCoupon:true,
    couponData:[],
    showCouponData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.user)
    this.getCard()
    this.getCouponCard()
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
        res.result.data.forEach(item=>{
          this.data.couponData.push(item)
          item.validity = new Date(item.validity).toLocaleDateString()
          this.setData(this.data)
        })
      }
    })
  },
  //获取我的卡券
  getCouponCard(){
    let userd
    wx.cloud.callFunction({
      name:'cardVoucher',
      data:{
        action:'showMyCard',
        page:1,
        pageCount:10,
        shopid: app.globalData.shop._id,
        userId: app.globalData.user._id,
        userd:userd
      },
      success:res => {
        // this.data.showCouponData = res.result.data
        res.result.data.forEach(item=>{
          item.validity = new Date(item.validity).toLocaleString
          this.data.showCouponData.push(item)
        })
        console.log(res)
      }
    })
  },
  jumpToDetail(e){
    let id = e.currentTarget.dataset.id
    wx.redirectTo({
      url: '/pages/rewardDetail/rewardDetail?cardId='+id,
    })
  }
})