// miniprogram/pages/rewardMyDetail/rewardMyDetail.js
import QRCode from '../../utils/weapp-qrcode'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponData:{},
    isExchange:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  // 生成二维码
    wx.cloud.callFunction({
      name: 'cardVoucher',
      data: {
        action: 'showCard',
        shopid: app.globalData.shop._id,
        _id: options.cardId
      },
      success: res => {
        console.log(res)
        this.data.couponData = res.result.data
        this.setData(this.data)
        console.log(res)
        new QRCode('myQrcode', {
          text: 'cardId=' + options.cardId,
          width: 150,
          height: 150,
          correctLevel: QRCode.CorrectLevel.L,
          callback: (res) => {
            console.log(res)
          }
        })
      }
    })

  }, 
})