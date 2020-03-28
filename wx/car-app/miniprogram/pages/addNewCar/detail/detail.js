const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reqData:[],
    textCache: null,
    textValue: '',
    dataList: [],
    oldlevel: {
      newCar: 0,
      userdCar: 1
    },
    name:'',
    price:0,
    passData:null
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var pages = getCurrentPages();
    this.data.passData = pages[pages.length - 2].data
    this.data.reqData = this.data.passData.reqData
    // console.log(this.data.passData)
    // console.log(this.data.reqData)
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

  },
  //保存
  saveEvent() {
    this.send(2)
  },

  //上架
  upEvent() {
    this.send(0)
  },

  //调用增加商品接口
  send(status) {

    let oldlevel = 0
    if (this.data.passData.isOld) {
      oldlevel = this.data.oldlevel.userdCar
    } else {
      oldlevel = this.data.oldlevel.newCar
    }
    this.data.reqData.detail = this.data.dataList
    let item = {
      name: this.data.passData.typeValue, // 商品名
      price: this.data.passData.priceValue,// 价格
      stock: 1,       // 库存
      sort: 1002,      // 排序 值越大排越前面
      data: JSON.stringify(this.data.reqData),     // 数据
      status: status,
      oldlevel,
    }
    // console.log(item)
    //调用云函数
    wx.cloud.callFunction({
      name: 'item',
      data: {
        action: "itemAdd",
        shopid: app.globalData.shop._id,
        item: item
        // {
        //   name: this.data.typeValue,    // 商品名
        //   price: this.data.priceValue,  // 价格
        //   stock: 1,       // 库存
        //   sort: 1002,      // 排序 值越大排越前面
        //   data: data,     // 数据
        // }
      },
      success: res => {
        // console.log('[云函数] [item.itemAdd] : ', res.result)
        wx.showToast({
          title: status == 0 ? '上架成功' : '保存成功',
        })
        setTimeout(() => {
          wx.hideToast(),
            wx.navigateBack({
              delta:2
            })
        }, 1000)
      },
      fail: err => {
        // console.error('[云函数] [item.itemAdd] 调用失败', err)
      }
    })
  },
  insertImage() {
    app.globalFunc.uploadImg((r, res) => {
      if (r) { 
        if (this.data.textCache != null) {
          this.data.dataList.push(this.data.textCache)
        }
        for (let index = 0; index < res.fileIDs.length; index++) {
          const element = res.fileIDs[index];
          let data = {
            content: element,
            type: 'image'
          }
          this.data.dataList.push(data)
        }
        this.setData({
          dataList: this.data.dataList,
          textValue: '',
          textCache: null
        })
      }
    })
  },
  imgDelete(e) {
    // console.log(e)
    let index = e.currentTarget.dataset.index
    this.data.dataList.splice(index, 1)
    this.setData({
      dataList: this.data.dataList
    })
  },
  insertVideo() {
    app.globalFunc.uploadVideo((r, res) => {
      if (r) {
        let data = {
          content: res.fileID,
          type: 'video'
        }
        if (this.data.textCache != null) {
          this.data.dataList.push(this.data.textCache)
        }
        this.data.dataList.push(data)
        this.setData({
          dataList: this.data.dataList,
          textValue: '',
          textCache: null
        })
      }
    })
  },
  videoDelete(e) {
    let index = e.currentTarget.dataset.index;
    // console.log(index)
    this.data.dataList.splice(index, 1)
    this.setData({
      dataList: this.data.dataList
    })
  },
  textBulr(e) {
    if (e.detail.value != "") {
      let data = {
        type: 'text',
        content: e.detail.value
      }
      this.setData({
        textCache: data
      })
    }

  },
})