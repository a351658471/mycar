// const rpx2px = createRpx2px()
const app = getApp()
Page({
  /**
  * 页面的初始数据
  */
  data: {
    // share:'/assets/分享.png',
    isCanvas:false,
    isShare:false,
    isSold:false,
    filterList: [],
    i: 0,
    // lastTapTime:0,
    paramsEnum: {
      0: '表显里程',
      1: '初次上牌',
      2: '排放标准',
      3: '发动机',
      4: '最高马力',
    },
    carData: [],
    tabList: ['详情介绍','车辆参数'],
    currentIndex: 0,
    currentCar: {},
    hideShare: false,
    myList: [],
    shop: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options)
    // let cardata = this.data.allCarData.filter((item) => {
    //   return options.carId == item.carId
    // })
    // this.setData({
    //   currentCar: cardata[0]
    // })
    // console.log(this.data.currentCar)
    this.data.itemid = options.carId
    if (options.tab==2){
      this.data.isSold = true;
    }
    this.data.shop = app.globalData.shop
    this.setData(this.data)
    this.getCarData()
  },



  //根据id调用接口获取数据
  getCarData() {
    // 调用云函数  商品列表
    wx.cloud.callFunction({
      name: 'item',
      data: {
        action: "itemList",
        istotal: 0,   //  返回总数
        // 查询条件
        condition: {
          _id: this.data.itemid,
        }
      },
      success: res => {
        console.log('[云函数] [item.itemList] : ', res.result)
        res.result.data.forEach(item => {
          item.data = JSON.parse(item.data)
          this.data.carData.push(item)
          this.setData({
            carData: this.data.carData
          })

        })
        console.log(this.data.carData)
      },
      fail: err => {
        // console.error('[云函数] [item.itemList] 调用失败', err)
      }
    })
  },
  tabClick(e) {
    console.log(e)
    this.setData({
      currentIndex: e.detail.tabCurrent
    })
  },
  //点击轮播图放大
  previewImage(e) {
    var imgList = []
    this.data.carData[0].data.detail.forEach((item, forEachindex) => {
      if (item.type == 'image') {
        imgList.push(item.content)
      }
    })
    //图片预览
    wx.previewImage({
      current: e.currentTarget.dataset.content, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
  //分享
  shareEvent(){
    this.setData({
      isShare:true
    })
  },
  //取消
  cancel(){
    this.setData({
      isShare: false
    })
  },
  //分享车辆 获取积分
  shareCar(){
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: 'userShare',
        type:0
      },
      success: (res) => {
        console.log(res)
        if(res.result.code == 0){
          wx.showToast({
            icon: 'none',
            title: '+10积分',
          })
        }
      }
    })
  },
  //分享好友
  onShareAppMessage(res) {
    if (res.from === 'button') {
      this.shareCar()
    }
    return {
      title: '厦门车之居',
      path: '/pages/index/index?scene=' + this.data.itemid
    };
  },
  makeCard(){
    wx.navigateTo({
      url: 'card/card?id='+this.data.carData[0]._id+'&sold='+this.data.isSold
    })
  }
})