// pages/gif/gif.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swipers: [],
  },
  onShow() {
    let shop = app.globalData.shop
    this.data.swipers = shop.swipers
    this.setData(this.data)
  },
  submit: function () {
    var that = this
    // 调用云函数
    wx.cloud.callFunction({
      name: 'shop',
      data: {
        action: "swiperEdit",
        shopid: app.globalData.shop._id,
        swipers: that.data.swipers
      },
      success: res => {
        console.log('[云函数] [shop] : ', res.result)
        wx.showToast({
          icon: 'success',
          title: '保存成功',
          duration: 3000,
          success: res => {
            wx.navigateBack({
              url: '/pages/mypage/mypage'
            })
          }
        })
      },
      fail: err => {
        console.error('[云函数] [shop] 调用失败', err)
      }
    })
  },
  close: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    that.data.swipers.splice(index, 1);
    this.setData(this.data)
  },
  // 下载图片
  uploadImg: function () {
    app.globalFunc.uploadImg((r, res) => {
      if (r) {
        this.data.swipers.push(res.fileID)
        this.setData(this.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})