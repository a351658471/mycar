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
    address: '',
    latitude: 0,
    longitude: 0,
    location: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let shop = app.globalData.shop
    this.data.address = shop.address
    if (shop.location != null) {
      this.data.latitude = shop.location.latitude
      this.data.longitude = shop.location.longitude
    }
    this.setData(this.data)
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
  addAddress() {
    wx.chooseLocation({
      success: res => {
        let longitude = res.longitude;
        let latitude = res.latitude;
        let address = ''
        if (res.name != '') {
          address = res.name
        } else if (res.address != '') {
          address = res.address
        }
        this.setData({
          longitude: longitude,
          latitude: latitude,
          address
        })
      }
    })
  },
  navigation() {
    console.log(this.data.latitude)
    console.log(this.data.longitude)
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: this.data.address,
      success: res => {
        // console.log(res)
      }
    })
  }
})