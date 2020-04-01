// pages/gif/gif.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swipers: [],
  },
  
  onLoad:function() {
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
        // console.log('[云函数] [shop] : ', res.result)
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
  },
  close: function (e) {
    let that = this;
    let item = e.currentTarget.dataset.src;
    wx.cloud.callFunction({
      name: 'shop',
      data: {
        action: "swiperEdit",
        shopid: app.globalData.shop._id,
        swipers: that.data.swipers
      },
      success: res => {
        for(let i= 0;i<this.data.swipers.length;i++){
          let img = this.data.swipers[i]
          if(img == item){
            this.data.swipers.splice(i,1)
          }
        }
        this.setData(this.data)
      },
      fail: err => {
        console.error('[云函数] [shop] 调用失败', err)
      }
    })
  },
  //预览图片
  preview:function(event){
    let src = event.currentTarget.dataset.src
    let imgList = event.currentTarget.dataset.list
    wx.previewImage({
      current:src,
      urls:imgList
    })
  },
  // 下载图片
  uploadImg: function () {
    app.globalFunc.uploadImg((r, res) => {
      if (r) {
        this.data.swipers = this.data.swipers.concat(res.fileIDs)
        this.setData(this.data)
      }
    })
  },
 
})