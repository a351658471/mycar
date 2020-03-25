// pages/personal/personal.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    mes: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  onShow: function() {
    this.data.userInfo = app.globalData.user
    this.setData(this.data)
  },

  getPhoneNumber: function(e) {
    console.log(e)
    console.log(JSON.stringify(e));
    // wx.cloud.callFunction({
    //   name: 'openapi',
    //   data: {
    //     action: 'getcellphone',
    //     id: e.detail.cloudID
    //   }
    // }).then(res => {
    //   console.log('res: ', res)
    // })
  },
  confirm: function(e) {


  },

})