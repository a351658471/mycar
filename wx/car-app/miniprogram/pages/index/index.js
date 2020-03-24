Page({
  data:{
  imgList:  ['/assets/1.jpg', '/assets/2.jpg', '/assets/3.jpg'],
    isNew:true,
    
    //模拟数据
    simulation:[
      {
        id:1,
        carImg: '/assets/3.jpg',
        carName: '兰博基尼-Huracan610',
        isNew: false,
        price: '200万',
        basic: [
          '2.0T-H4',
          '250p']
      },
      {
        id: 2,
        carImg: '/assets/2.jpg',
        carName: '兰博基尼-Huracan610',
        isNew: false,
        price: '200万',
        basic: [
          '2.0T-H4',
          '250p']
      },
      {
        id: 3,
        carImg: '/assets/1.jpg',
        carName: '兰博基尼-Huracan610',
        isNew: false,
        price: '200万',
        basic: [
          '2.0T-H4',
          '250p']
      },
      {
        id: 4,
        carImg: '/assets/1.jpg',
        carName: '兰博基尼-Huracan610',
        isNew: true,
        price: '200万',
        basic: [
          '2.0T-H4',
          '250p']
      },
      {
        id: 5,
        carImg: '/assets/2.jpg',
        carName: '兰博基尼-Huracan610',
        isNew: true,
        price: '200万',
        basic: [
          '2.0T-H4',
          '250p']
      },
      {
        id: 6,
        carImg: '/assets/3.jpg',
        carName: '兰博基尼-Huracan610',
        isNew: true,
        price: '200万',
        basic: [
          '2.0T-H4',
          '250p']
      },
    ],
    newcar:[],
    oldcar:[]
  },

  //生命周期函数初次渲染完成
  onLoad: function (){

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

        // 调用云函数  商品列表
    wx.cloud.callFunction({
      name: 'item',
      data: {
        action: "itemList",
        istotal: 0,   //  返回总数
        // 查询条件
        condition:{
          shopId: "f841fd285e71d6900011f3b713c5a83f",
          // 名称模糊搜素
          // name: {
          //   $regex: ".*13.*",
          //   $options: 'i'
          // }
        },
        // status:[0,1,2],    // 商品状态 在售 已售 未上架 
        // 分页
        page: 1,
        perpage: 5,
        // 是否排序
        order:0
      },
      success: res => {
        console.log('[云函数] [item.itemList] : ', res.result)
      },
      fail: err => {
        console.error('[云函数] [item.itemList] 调用失败', err)
      }
    })

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

    //过滤新车
    let newcar = this.data.simulation.filter((item) => {
      return item.isNew
    })
    //过滤旧车
    let oldcar = this.data.simulation.filter((item) => {
      return !item.isNew
    })

    this.setData({
      newcar: newcar,
      oldcar: oldcar
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
  },

  caritemClick: function (e) {
    let carId = e.detail.itemData.id
    wx.navigateTo({
      url: '/pages/index/carDetail/carDetail?carId=' + carId
    })
  }

})