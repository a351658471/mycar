const app = getApp()
const PERPAGE = 5
Page({
  data: {
    tabList: ['在售', '已售', '未上架'],
    carData:[],
    //模拟数据
    allData: [],
    items:[],
    count:0,
    tabCurrent:0,
    page:1,
    isLoading:false,
    noMore:false
  },
  //生命周期函数初次渲染完成
  onLoad: function () {
    this.data.page = 1
    let status = "carData[0].status"
    this.setData({
      [status]: 0
    })
    this.getCarData([this.data.tabCurrent])
  },
  tabClick: function (e) {
    this.data.count++;
    this.data.page=1
    this.data.tabCurrent = e.detail.tabCurrent
    let status = [e.detail.tabCurrent];
    this.getCarData(status)
   
  },

  //根据状态调用接口获取数据
  getCarData(status,page=1) {
    this.setData({
      isLoading:true
    })
    if(page==1){
      this.setData({
        carData: []
      })
    }
    let count = this.data.count;
    // 调用云函数  商品列表
    wx.cloud.callFunction({
      name: 'item',
      data: {
        action: "itemList",
        istotal: 0,   //  返回总数
        // 查询条件
        condition: {
          shopId: app.globalData.shop._id,
        },

        status:status,    // 商品状态 在售 已售 未上架 
        // oldlevel,
        // 分页
        page:page,
        perpage:PERPAGE,
        // 是否排序
        order: 0
      },

      success: res => {
        this.data.flag = true
        //没有数据则关闭下拉加载
        console.log(res.result.data.length)
        if(res.result.data.length < PERPAGE){
          this.data.noMore = true
        }else{
          this.data.noMore = false
        }
        this.setData({
          noMore:this.data.noMore,
          isLoading:false
        })
        if (count != this.data.count) {
          return
        }
        // console.log('[云函数] [item.itemList] : ', res.result)
        
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
        // console.error('[云函数] [item.itemList] 调用失败', err)
      }
    })
  },

  //跳转新增页
  jumpToAddcar(){
    wx.navigateTo({
      url: '/pages/addNewCar/addNewCar',
    })
  },


  editGoods(id,status){
         // 调用编辑云函数
    wx.cloud.callFunction({
      name: 'item',
      data: {
        action: "itemEdit",
        shopid: app.globalData.shop._id,
        item:{
          _id:id,
          status:status
        },
        
      },
      success: res => {
        // console.log('[云函数] [item.itemEdit] : ', res.result)
        this.getCarData([this.data.tabCurrent])
      },
      fail: err => {
        // console.error('[云函数] [item.itemEdit] 调用失败', err)
      }
    })
  },
  //已售商品
  soldGoods(e){
    let id = e.detail.id;
    let status = 1
    wx.showModal({
      title: '提示',
      content: '是否确认已售',
      success: (res) => {
        if (res.confirm) {
          this.editGoods(id, status)
        }
      }
    })
  },

  //下架商品
  lowGoods(e){
    let id = e.detail.id;
    let status= 2
    wx.showModal({
      title: '提示',
      content: '是否确认下架',
      success:(res)=>{
        if(res.confirm){
          this.editGoods(id, status)
        }
      }
    })
  },
  //在售商品
  saleGoods(e){
    let id = e.detail.id;
    let status = 0
    wx.showModal({
      title: '提示',
      content: '是否确认在售',
      success: (res) => {
        if (res.confirm) {
          this.editGoods(id, status)
        }
      }
    })
  },
  //删除商品
  deleteGoods(e){
   let id = e.detail.id
   wx.showModal({
     title: '提示',
     content: '是否确认删除',
     success:(res)=>{
      if(res.confirm){
           // 调用云函数
    wx.cloud.callFunction({
      name: 'item',
      data: {
        action: "itemRemove",
        shopid: app.globalData.shop._id,
        ids: [id],
      },
      success: res => {
        // console.log('[云函数] [item.itemRemove] : ', res.result);
        this.getCarData([this.data.tabCurrent]);
        this.data.page = 1
      },
      fail: err => {
        // console.error('[云函数] [item.itemRemove] 调用失败', err)
      }
    })
      }
     }
   })
   
  },

  //加载更多
  loadMore(){
      if(this.data.flag){
        this.data.flag = false
        this.data.page++
        this.getCarData([this.data.tabCurrent], this.data.page)
      }
      
  },
  toEdit(e){
    let id = e.detail.id;
    wx.navigateTo({
      url: '/pages/editCarInfo/editCarInfo?id=' + id,
    })
  }
})