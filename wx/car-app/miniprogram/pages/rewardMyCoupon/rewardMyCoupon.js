// miniprogram/pages/rewardCode/rewardCode.js
const app = getApp()
const PAGECOUNT = 30
Page({

  /**
   * 页面的初始数据
   */
  data: {
    completeCoupon: [], //已兑换
    purchaseCoupon:[],//已购买
    passCoupon: [], //过期
    useCoupon:[],//已使用
    useOutCoupon:[],//已用完
    showCouponData: [],
    isBuy: false,
    isIntegral: false,
    isBtn: false,
    conditionColor: '',
    rewardnum: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCouponCard()
  },
  //获取我的卡券
  getCouponCard() {
    let userd
    wx.cloud.callFunction({
      name: 'cardVoucher',
      data: {
        action: 'showMyCard',
        page: 1,
        pageCount: PAGECOUNT,
        shopid: app.globalData.shop._id,
        userId: app.globalData.user._id,
      },
      success: res => {
        console.log(res)
        res.result.data.forEach(item => {
          if (item.used == 0 && item.validity >= Date.parse(new Date())) {
            if (item.type == 0) {
              this.data.completeCoupon.push(item)
            } else {
              if(item.canUsedCount-item.usedCount == 0){
                this.data.useOutCoupon.push(item)
              }else{
                this.data.purchaseCoupon.push(item)
              }
            }    
            this.setData(this.data)
          }
          if(item.used == 0 && item.validity < Date.parse(new Date())){
            this.data.passCoupon.push(item)
          }
          if(item.used == 1){
            this.data.useCoupon.push(item)
          }
          this.setData(this.data)
        });
      }
    })
  },
  jumpToDetail(e) {
    console.log(e)
    let id = e.detail.id
    wx.redirectTo({
      url: '/pages/rewardMyDetail/rewardMyDetail?cardId=' + id,
    })
  },
})