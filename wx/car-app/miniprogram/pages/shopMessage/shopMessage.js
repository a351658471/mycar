// pages/shopMessage/shopMessage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdmin:false,
    name:'',
    phone:'',
    wechat:'',
    address:'',
  },  
  inputBindName: function (e) {
    this.data.name = e.detail.value
  },
  inputBindPhone: function (e) {
    this.data.phone = e.detail.value
  },
  inputBindWechat: function (e) {
    this.data.wechat = e.detail.value
  },
  inputBindAddress: function (e) {
    this.data.address = e.detail.value
  },
  //复制内容
  copyText:function(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success:res =>{
        wx.getClipboardData({
          success:res=>{
            wx.showToast({
              title: '复制成功',
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let shop = app.globalData.shop
    this.data.name = shop.name
    this.data.phone = shop.phone
    this.data.wechat = shop.wechat
    this.data.address = shop.address
    if (app.globalData.shop.isAdmin  || app.globalData.shop.isManagers){
      this.data.isAdmin = true;
    }
    this.setData(this.data)
  },
  preserve:function(){
    var that = this
    // 调用云函数
    wx.cloud.callFunction({
      name: 'shop',
      data: {
        action: "infoEdit",
        shopid: app.globalData.shop._id,
        name: that.data.name,
        phone: that.data.phone,
        wechat: that.data.wechat,
        address:that.data.address
      },
      success: res => {
        console.log('[云函数] [shop] : ', res.result)
        app.globalData.shop.name = that.data.name,
        app.globalData.shop.phone = that.data.phone,
        app.globalData.shop.wechat = that.data.wechat,
        app.globalData.shop.address = that.data.address,
        wx.showToast({
          icon: 'success',
          title: '保存成功',
          duration: 3000,
          success: res => {
            setTimeout(() => {
              wx.navigateBack()
            }, 500)
          }
        })
      },
      fail: err => {
        console.error('[云函数] [shop] 调用失败', err)
      }
    })
  }
 
})