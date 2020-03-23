Page({
  /**
  * 页面的初始数据
  */
  data: {
    // lastTapTime:0,

    carData: {
      imgList: ['/assets/1.jpg', '/assets/2.jpg', '/assets/3.jpg'],
      situation: {
        name: '兰博基尼-Huracan610',
        isnew: '全新',
        price: '200万',
        cars: [
          '2.0T-H4',
          '250p',
          '2门2座']
      }
    },
    tabList: ['详情介绍', '车辆参数', '购车流程'],
    detailmsg: '兰博基尼是一家意大利汽车生厂商，全球顶尖跑车制造商及欧洲奢侈品标志之一，公司坐落于意大利亚加塔',
    currentIndex: 0,
    params: [
      {
        param: '发动机',
        name: '2.0T-H4'
      },
      {
        param: '马力',
        name: '250P'
      },
      {
        param: '座位',
        name: '2门2座'
      },
    ],
    allCarData: [
      {
        carId: 1,
        isnew: false,
        carName: '兰博基尼1',
        price: '210万',
        describe: '/assets/1.jpg', //图片或视频描述
        textDescribe: '兰博基尼1是一家意大利汽车生厂商，全球顶尖跑车制造商及欧洲奢侈品标志之一，公司坐落于意大利亚加塔', //文字描述
        buyCarProcess: '/assets/1.jpg',//购车流程图片描述
        carParams: [

          '2.0T-H4', //引擎
          '260P', //马力
          '2门2座', //座位
        ]
      },
      {
        carId: 2,
        isnew: false,
        carName: '兰博基尼2',
        price: '220万',
        describe: '/assets/1.jpg', //图片或视频描述
        textDescribe: '兰博基尼2是一家意大利汽车生厂商，全球顶尖跑车制造商及欧洲奢侈品标志之一，公司坐落于意大利亚加塔', //文字描述
        buyCarProcess: '/assets/1.jpg',//购车流程图片描述
        carParams: [

          '2.0T-H4', //引擎
          '260P', //马力
          '2门2座', //座位
        ]
      },
      {
        carId: 3,
        isnew: false,
        carName: '兰博基尼3',
        price: '230万',
        describe: '/assets/1.jpg', //图片或视频描述
        textDescribe: '兰博基尼3是一家意大利汽车生厂商，全球顶尖跑车制造商及欧洲奢侈品标志之一，公司坐落于意大利亚加塔', //文字描述
        buyCarProcess: '/assets/1.jpg',//购车流程图片描述
        carParams: [

          '2.0T-H4', //引擎
          '260P', //马力
          '2门2座', //座位
        ]
      },
      {
        carId: 4,
        isnew: true,
        carName: '兰博基尼4',
        price: '240万',
        describe: '/assets/1.jpg', //图片或视频描述
        textDescribe: '兰博基尼4是一家意大利汽车生厂商，全球顶尖跑车制造商及欧洲奢侈品标志之一，公司坐落于意大利亚加塔', //文字描述
        buyCarProcess: '/assets/1.jpg',//购车流程图片描述
        carParams: [

          '2.0T-H4', //引擎
          '260P', //马力
          '2门2座', //座位
        ]
      },
      {
        carId: 5,
        isnew: true,
        carName: '兰博基尼5',
        price: '250万',
        describe: '/assets/1.jpg', //图片或视频描述
        textDescribe: '兰博基尼5是一家意大利汽车生厂商，全球顶尖跑车制造商及欧洲奢侈品标志之一，公司坐落于意大利亚加塔', //文字描述
        buyCarProcess: '/assets/1.jpg',//购车流程图片描述
        carParams: [

          '2.0T-H4', //引擎
          '260P', //马力
          '2门2座', //座位
        ]
      },
      {
        carId: 6,
        isnew: true,
        carName: '兰博基尼6',
        price: '260万',
        describe: '/assets/1.jpg', //图片或视频描述
        textDescribe: '兰博基尼6是一家意大利汽车生厂商，全球顶尖跑车制造商及欧洲奢侈品标志之一，公司坐落于意大利亚加塔', //文字描述
        buyCarProcess: '/assets/1.jpg',//购车流程图片描述
        carParams: [

          '2.0T-H4', //引擎
          '260P', //马力
          '2门2座', //座位
        ]
      },

    ],
    paramName: ['发动机', '马力', '座位'],
    currentCar: {},
    hideShare: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let cardata = this.data.allCarData.filter((item) => {
      return options.carId == item.carId
    })
    this.setData({
      currentCar: cardata[0]
    })
    console.log(this.data.currentCar)

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

  tabClick(e) {
    this.setData({
      currentIndex: e.detail.currentIndex
    })
  },

  // 模块遮罩层
  call: function () {
    var hides = this.data.hideShare;

    if (hides == true) {
      this.setData({
        hideShare: false
      })
    } else if (hides == false) {
      this.setData({
        hideShare: true
      })
    }

  },

  copyEvent() {
    wx.setClipboardData({
      data: '18650883333',
      success: () => {
        this.setData({
          hideShare: !this.data.hideShare
        })
        wx.showToast({
          title: '复制成功'
        })
      }
    })
  },

  callEvent() {
    wx.makePhoneCall({
      phoneNumber: '18650883333',
      success: (res_makephone) => {
        this.setData({
          hideShare: !this.data.hideShare
        })
        console.log("呼叫电话返回：", res_makephone)
      }
    })

    // wx.showActionSheet({
    //   itemList:['12312312312','呼叫']
    // })
  },

  backEvent() {
    this.setData({
      hideShare: !this.data.hideShare
    })
  }

})