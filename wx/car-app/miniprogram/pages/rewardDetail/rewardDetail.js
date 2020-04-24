// miniprogram/pages/rewardDetail/rewardDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    latitude:0,
    longitude:0,
    isExchange:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let shop = app.globalData.shop
    // this.data.latitude = shop.location.latitude,
    // this.data.longitude =shop.location.longitude
    // this.setData(this.data)
  },
  toCoupon(){
    this.data.isExchange = false
    this.setData(this.data)
  },
  navigation(){
    console.log(this.data.latitude)
    console.log(this.data.longitude)
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name:this.data.address,
      success:res=>{
        // console.log(res)
      }
    })
  }
})