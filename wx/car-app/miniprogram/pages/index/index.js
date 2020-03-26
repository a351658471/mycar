Page({
  data:{
    oldlevel: {
      newCar: 0,
      userdCar: 1
    },
  imgList:  ['/assets/1.jpg', '/assets/2.jpg', '/assets/3.jpg'],
    isNew:true,
    
  resData:[],
    newcar:[],
    oldcar:[]
  },

  //生命周期函数初次渲染完成
  onLoad: function (){
    //获取车列表
    this.getCarData()

        // 调用云函数 获取商店列表
    wx.cloud.callFunction({
      name: 'shop',
      data: {
        action:"shopList",
      },
      success: res => {
        console.log('[云函数] [shop] : ', res.result)
      },
      fail: err => {
        console.error('[云函数] [shop] 调用失败', err)
      }
    });

    //     // 调用云函数  轮播图
    //  wx.cloud.callFunction({
    //   name: 'shop',
    //   data: {
    //     action: "swiperEdit",
    //     shopid: "f841fd285e71d6900011f3b713c5a83f",
    //     swipers: ["1","3"]
    //   },
    //   success: res => {
    //     console.log('[云函数] [shop] : ', res.result)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [shop] 调用失败', err)
    //   }
    // });
   

    //     // 调用云函数  管理员列表
    // wx.cloud.callFunction({
    //   name: 'shop',
    //   data: {
    //     action:"masterList",
    //     shopid: "f841fd285e71d6900011f3b713c5a83f",
    //   },
    //   success: res => {
    //     console.log('[云函数] [shop] : ', res.result)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [shop] 调用失败', err)
    //   }
    // })

  },
  getCarData(){
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
          shopId: "f841fd285e71d6900011f3b713c5a83f",
          // 名称模糊搜素
          // name: {
          //   $regex: ".*13.*",
          //   $options: 'i'
          // }
        },
        // status:[2],    // 商品状态 在售 已售 未上架 
        oldlevel,
        // 分页
        page: 1,
        perpage: 5,
        // 是否排序
        order: 0
      },
      success: res => {
        this.data.resData=[]
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
  tabClick: function (e){
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