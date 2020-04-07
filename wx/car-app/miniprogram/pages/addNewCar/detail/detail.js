const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reqData: [],
    textValue: '',
    dataList: [],
    name: '',
    price: 0,
    passData: null,
    currentText: null,
    textContent: '',
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
    wx.showModal({
      title: '提示',
      content: '是否确认保存',
      success: (res) => {
        if (res.confirm) {
          this.send(2)
        }
      }
    })

  },

  //上架
  upEvent() {
    wx.showModal({
      title: '提示',
      content: '是否确认上架',
      success: (res) => {
        if (res.confirm) {
          this.send(0)
        }
      }
    })

  },

  //调用增加商品接口
  send(status) {

    let type = 0
    if (this.data.passData.isOld) {
      type = app.globalData.type.userCar
    } else {
      type = app.globalData.type.newCar
    }
    this.data.reqData.detail = this.data.dataList
    let item = {
      name: this.data.passData.typeValue, // 商品名
      price: this.data.passData.priceValue,// 价格
      stock: 1,       // 库存
      sort: 1002,      // 排序 值越大排越前面
      data: JSON.stringify(this.data.reqData),     // 数据
      status: status,
      type: type,
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
        app.globalData.stateChange()
        // console.log('[云函数] [item.itemAdd] : ', res.result)
        wx.showToast({
          title: status == 0 ? '上架成功' : '保存成功',
        })
        setTimeout(() => {
          wx.hideToast(),
            this.reBefore()
          wx.navigateBack({
            delta: 2
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
          content: res.fileIDs[0],
          type: 'video'
        }
        this.data.dataList.push(data)
        this.setData({
          dataList: this.data.dataList,
          textValue: '',
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
      this.data.dataList.push(data)
    }
  },

  //保存成功后刷新管理页面数据
  reBefore() {
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 3];
    var info = prePage.data;
    prePage.getCarData([info.tabCurrent])
  },

  //详情文本点击 出现输入框
  textEvent(e) {
    console.log(e)
    if (this.data.currentText == null) {
      this.setData({
        currentText: e.currentTarget.dataset.index,
        textContent: e.currentTarget.dataset.item.content
      })
    }
  },

  //输入框失焦
  editTextBulr(e) {
    console.log(e)
    let content = {
      type: 'text',
      content: e.detail.value
    }
    let index = this.data.currentText
    if (e.detail.content != '') {
      this.data.dataList[index] = content
      this.setData({
        dataList: this.data.dataList,
        currentText: null
      })
    } else {
      this.data.dataList.splice(index, 1)
      this.setData({
        dataList: this.data.dataList,
        currentText: null
      })
    }
  }
})