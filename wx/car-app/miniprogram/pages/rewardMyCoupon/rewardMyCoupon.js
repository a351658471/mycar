// miniprogram/pages/rewardCode/rewardCode.js
const app = getApp()
const PAGECOUNT = 30
Page({

  /**
   * 页面的初始数据
   */
  data: {
    completeCoupon: [], //已兑换
    passCoupon: [], //过期
    showCouponData: [],
    isBuy: false,
    isIntegral: false,
    isBtn: true,
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
              this.data.rewardnum = '已兑换'
              this.data.completeCoupon.push(item)
            } else {
              this.data.rewardnum = '已购买'
              this.data.completeCoupon.push(item)
            }
            this.setData(this.data)
          }
          // if (item.used == 0 && item.validity < Date.parse(new Date())) {
          //   this.data.rewardnum = '已过期'
          //   this.data.isBtn = false
          //   this.data.conditionColor = '#9B9B9B'
          //   this.data.passCoupon.push(item)
          // }
          // if (item.used == 1) {
          //   this.data.rewardnum = '已使用'
          //   this.data.isBtn = false
          //   this.data.conditionColor = '#9B9B9B'
          //   this.data.passCoupon.push(item)
          // }
          // this.setData(this.data)

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