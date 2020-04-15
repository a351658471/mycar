const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEnter:true,
    isAdd:true,
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
  deleteDetail(e) {
   wx.showModal({
     title: '提示',
     content: '是否确定删除',
     success:(res)=>{
       if(res.confirm){
         let index = e.currentTarget.dataset.index
         this.data.dataList.splice(index, 1)
         this.setData({
           dataList: this.data.dataList
         })
       }
     }
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
  // videoDelete(e) {
  //   let index = e.currentTarget.dataset.index;
  //   // console.log(index)
  //   this.data.dataList.splice(index, 1)
  //   this.setData({
  //     dataList: this.data.dataList
  //   })
  // },
  textBulr(e) {
    console.log(e)
    if (e.detail.value != "") {
      let data = {
        type: 'text',
        content: e.detail.value
      }
      this.data.dataList.push(data)
      this.setData({
        dataList:this.data.dataList,
        isEnter:false
      })
      
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
  },
  insertText(){
    this.setData({
      isEnter:true
    })
  },
  changeAdd(){
    this.setData({
      isAdd:false
    })
  },
  deleteTextArea(){
    this.setData({
      isEnter:false,
      isAdd:false,
    })
  },
  toTop(e){
    this.setData({
      currentText:null
    })
    let index1 = e.currentTarget.dataset.index;
    let index2 = index1 -1
    if(index1 == 0) return
    let arr = this.data.dataList
    console.log(this.data.dataList[index1])
    console.log(this.data.dataList[index2])
    this.data.dataList.splice(index2,1,...this.data.dataList.splice(index1,1,arr[index2]))
    console.log(this.data.dataList)
    this.setData({
      dataList: this.data.dataList
    })
    
  },
  toDown(e){
    this.setData({
      currentText: null
    })
    let index1 = e.currentTarget.dataset.index;
    let index2 = index1+1;
    let arr = this.data.dataList
    if(index2 == this.data.dataList.length) return
    this.data.dataList.splice(index2, 1, ...this.data.dataList.splice(index1, 1,arr[index2]))
    this.setData({
      dataList:this.data.dataList
    })
  }
})