// miniprogram/pages/rewardDetail/rewardDetail.js
import QRCode from '../../utils/weapp-qrcode'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponData:[],
    address:'',
    latitude:0,
    longitude:0,
    isExchange:true,
    couponId:'',
    couponType:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id = options.cardId
    let type = options.type
    this.data.couponId = id
    this.data.couponType = type
    this.setData(this.data)
    wx.cloud.callFunction({
      name: 'card',
      data: {
        action: 'getCardTemplate',
        getType:'findById',
        shopid: app.globalData.shop._id,
        temID: id
      },
      success: res => {
        console.log(res)
        this.data.couponData = res.result.data
        this.setData(this.data)
      }
    })
  },
  // 兑换成我的卡券
  myCoupon(){
    wx.cloud.callFunction({
      name: 'cardVoucher',
      data: {
        action: 'exchange',
        shopid: app.globalData.shop._id,
        userId: app.globalData.user._id,
        temID: this.data.couponId,
        type: Number(this.data.couponType)
      },
      success: (res) => {
        console.log(res)
        if(res.result.code == 0){
          this.data.isExchange = false
          this.setData(this.data)
          new QRCode('myQrcode', {
            text: 'cardId=' + res.result._id,
            width: 150,
            height: 150,
            correctLevel: QRCode.CorrectLevel.L,
            callback: (res) => {
              console.log(res)
            }
          })
        }else{
          wx.showToast({
            title: '积分不足',
            icon: 'none'
          })
        }
      }
    })
  },
  toCoupon(e){
    this.myCoupon()
  },
  
})