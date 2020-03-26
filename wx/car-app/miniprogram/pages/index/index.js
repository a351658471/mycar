const app = getApp()

Page({
  data: {
    oldlevel: {
      newCar: 0,
      userdCar: 1
    },
    shop: {},
    isNew: true,

    resData: [],
    newcar: [],
    oldcar: []
  },
  onShow() {
    app.globalData.addListener(app.globalData.eventShopUpdate, this.onShopInfo)
    app.globalFunc.getShopInfo();
  },
  onHide() {
    app.globalData.removeListener(app.globalData.eventShopUpdate, this.onShopInfo)
  },
  onShopInfo() {
    this.data.shop = app.globalData.shop
    this.setData(this.data)
    //获取车列表
    this.getCarData()
  },
  getCarData() {
    let oldlevel = 0
    if (!this.data.isNew) {
      oldlevel = [this.data.oldlevel.userdCar]
    } else {
      oldlevel = [this.data.oldlevel.newCar]
    }
    // 调用云函数  商品列表
    wx.cloud.callFunction({
      name: 'item',
      data: {
        action: "itemList",
        istotal: 0,   //  返回总数
        // 查询条件
        condition: {
          shopId: this.data.shop._id,
          // 名称模糊搜素
          // name: {
          //   $regex: ".*13.*",
          //   $options: 'i'
          // }
        },
        status:[2],    // 商品状态 0在售 1已售 2未上架 
        oldlevel,
        // 分页
        page: 1,
        perpage: 5,
        // 是否排序
        order: 0
      },
      success: res => {
        this.data.resData = []
        console.log('[云函数] [item.itemList] : ', res.result)
        res.result.data.forEach(item => {
          if (item.creatime) {
            item.data = JSON.parse(item.data)
            this.data.resData.push(item)
            this.setData({
              resData: this.data.resData
            })
          }
        })
      },
      fail: err => {
        console.error('[云函数] [item.itemList] 调用失败', err)
      }
    })
  },
  tabClick: function (e) {
    if (e.detail.tabCurrent == 0) {
      this.setData({
        isNew: true
      })
    } else {
      this.setData({
        isNew: false
      })

    }
    this.getCarData()
  },

  caritemClick: function (e) {
    let carId = e.detail.itemData
    wx.navigateTo({
      url: '/pages/index/carDetail/carDetail?carId=' + carId
    })
  }

})