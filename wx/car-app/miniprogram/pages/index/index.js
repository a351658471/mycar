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
    oldcar: [],
    page:1,
    isLoading: false,
    noMore: false,
    hideShare: false
  },
  onLoad(){
    app.globalData.addListener(app.globalData.eventShopUpdate, this.onShopInfo)
    app.globalFunc.getShopInfo();
  },
  onUnload(){
    app.globalData.removeListener(app.globalData.eventShopUpdate, this.onShopInfo)
  },
  onShopInfo() {
    app.globalData.removeListener(app.globalData.eventShopUpdate, this.onShopInfo)
    this.data.shop = app.globalData.shop
    this.setData(this.data)
    //获取车列表
    this.getCarData()
  },


  //获取数据接口方法
  getCarData(page=1) {
    this.setData({
      isLoading: true
    })
    if (page == 1) {
      this.setData({
        resData: []
      })
    }
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
        status:[0],    // 商品状态 0在售 1已售 2未上架 
        oldlevel,
        // 分页
        page,
        perpage: 5,
        // 是否排序
        order: 0
      },
      success: res => {
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
        console.log('[云函数] [item.itemList] : ', res.result)
        res.result.data.forEach(item => {
            item.data = JSON.parse(item.data)
            this.data.resData.push(item)
            this.setData({
              resData: this.data.resData
            })

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
  },

  //上拉加载更多
  loadMore() {
    if(this.data.flag)
      this.data.flag =false;
      this.data.page++;
      this.getCarData(this.data.page)
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