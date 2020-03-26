
Page({
  data: {
    tabList: ['在售', '已售', '未上架'],
    carData:[],
    //模拟数据
    allData: [],
    items:[]
  },
  //生命周期函数初次渲染完成
  onLoad: function () {
    console.log("父组件onload")
    this.getCarData([2])
  },

  tabClick: function (e) {
    let status = [e.detail.tabCurrent];
    this.getCarData(status)
   
  },

  //根据状态调用接口获取数据
  getCarData(status) {
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

        status,    // 商品状态 在售 已售 未上架 
        // oldlevel,
        // 分页
        page: 1,
        perpage: 10,
        // 是否排序
        order: 0
      },

      success: res => {
        this.data.carData=[]
        console.log('[云函数] [item.itemList] : ', res.result)
        res.result.data.forEach(item => {
          this.data.items.push({ xmove: 0, isOpen: false })
          item.data = JSON.parse(item.data)
          this.data.carData.push(item)
          this.setData({
            carData: this.data.carData,
            items:this.data.items
          })

        })
      },
      fail: err => {
        console.error('[云函数] [item.itemList] 调用失败', err)
      }
    })
  },
  jumpToAddcar(){
    wx.navigateTo({
      url: '/pages/addNewCar/addNewCar',
    })
  },
  caritemClick(e){
    let id = e.detail.itemData._id;
    wx.navigateTo({
      url: '/pages/editCarInfo/editCarInfo?id='+id,
    })
  }
})