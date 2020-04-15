const app = getApp()
Page({
  data: {
    // type: {
    //   newCar: 0,
    //   userdCar: 1
    // },
    shop: {},
    tabCurrent: 0,

    resData: [],
    newcar: [],
    oldcar: [],
    page: 1,
    isLoading: false,
    noMore: false,
    hideShare: false,
    state:null,
    tabflag:0
  },
  onLoad(options) {
    if(options && options.scene){
      let scene=decodeURIComponent(options.scene);
      if(scene.length > 0){
        wx.navigateTo({
          url: '/pages/index/carDetail/carDetail?carId=' + scene
        })
      }
    }
   
    app.globalData.addListener(app.globalData.eventShopUpdate, this.onShopInfo)
    app.globalFunc.getShopInfo();
  },
  onShow() {
    //获取车列表
    // if (this.data.resData.length == 0 && this.data.shop._id != null) {
    //   this.getCarData()
    // }
    if (this.state != app.globalData.state && this.data.shop._id != null) {
      this.getCarData()
      this.state = app.globalData.state
    }
  },
  onUnload() {
    app.globalData.removeListener(app.globalData.eventShopUpdate, this.onShopInfo)
  },
  onShopInfo() {
    this.data.shop = app.globalData.shop
    this.setData(this.data)
    //获取车列表
    if (this.data.resData.length == 0) {
      this.getCarData()
    }
  },


  //获取数据接口方法
  getCarData(page = 1) {
    this.setData({
      isLoading: true
    })
    if (page == 1) {
      this.setData({
        resData: []
      })
    }
    let type
    let status = [0]
    if(this.data.tabCurrent == 0){
      type = [app.globalData.type.userCar]
    }
    else if(this.data.tabCurrent == 1){
      type = [app.globalData.type.newCar]
    }
    else if(this.data.tabCurrent == 2){
      status = [1]
    }
   
    let data = {
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
      status: status,    // 商品状态 0在售 1已售 2未上架 
      // 分页
      page,
      perpage: 5,
      // 是否排序
      order: 0
    }
    if(type){
      data.type = type
    }
    let tabflag = this.data.tabflag
    // 调用云函数  商品列表
    wx.cloud.callFunction({
      name: 'item',
      data: data,
      success: res => {
        if(tabflag != this.data.tabflag){
          return
        }
        this.data.flag = true;
        if (res.result.data.length < 5) {
          this.data.noMore = true
        } else {
          this.data.noMore = false
        }
        this.setData({
          noMore: this.data.noMore,
          isLoading: false
        })
        
        // console.log('[云函数] [item.itemList] : ', res.result)
        res.result.data.forEach(item => {
          item.data = JSON.parse(item.data)
          this.data.resData.push(item)
          this.setData({
            resData: this.data.resData
          })

        })
      },
      fail: err => {
        // console.error('[云函数] [item.itemList] 调用失败', err)
      }
    })
  },

  //tab事件
  tabClick: function (e) {
    this.data.page =1
    this.data.tabflag ++
    this.data.tabCurrent = e.detail.tabCurrent
    this.getCarData()
    console.log(this.data.tabCurrent)
  },

  caritemClick: function (e) {
    let carId = e.detail.itemData
    wx.navigateTo({
      url: '/pages/index/carDetail/carDetail?carId=' + carId + '&tab=' + this.data.tabCurrent
    })
  },

  //上拉加载更多
  loadMore() {
    if (this.data.flag){
      this.data.flag = false;
      this.data.page++;
      this.getCarData(this.data.page)
    }
  },

  backEvent() {
    this.setData({
      hideShare: !this.data.hideShare
    })
  }
  ,
  onShareAppMessage(res) {
    if (res.from === 'button') {
      console.log(res.target);
    }
    return {
      title: '厦门车之居',
      path: '/pages/index/index'
    };
  },

})