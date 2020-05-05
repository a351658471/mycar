// miniprogram/pages/coupon/coupon.js
const app = getApp()
const PAGECOUNT = 10
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ['卡券', '历史'],
    tabLists: ['启用中', '停用中'],
    tabCurrent: 0,
    tabCurrents: 0,
    history: false,
    couponData: [],
    oldCardDate:[],
    isTab: true,
    isStar: false,
    couponCount: [],
    page: 1,
    noMore: false,
    isLoading: false, 
    tabflag: 0,
    searchCoupon:'',
    isShowNumber:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let status = 'couponData.status'
    this.setData({
      [status]: 0
    })
    this.getCard(this.data.page)
    this.couponCounts()
  },
  //搜索历史卡券
  searchCoupon(e){
    this.data.searchCoupon = e.detail.value
    this.setData(this.data)
  },
  confirmCoupon(){
    let type
    if(this.data.tabCurrents==0){
      type = 0
    }else{
      type = 1
    }
    wx.cloud.callFunction({
      name: 'cardVoucher',
      data: {
        action: 'queryCard',
        shopid: app.globalData.shop._id,
        page:1,
        pageCount:10,
        keyWord: this.data.searchCoupon,
        type:type
      },
      success: (res) => {
        console.log(res)
        this.data.oldCardDate = res.result.data
        this.setData(this.data)
      }
    })
  },
  // 添加卡券
  jumpToAddcoupon() {
    wx.redirectTo({
      url: '/pages/rewardAddCoupon/rewardAddCoupon',
    })
  },
  //最外层tab 
  tabClick: function (e) {
    console.log(e)
    this.data.tabCurrent = e.detail.tabCurrent
    if (this.data.tabCurrent == 1) {
      this.data.tabLists = ['兑换券', '购买券']
      this.data.isTab = false
      this.data.history = true
      this.data.isShowNumber = true
      this.data.page = 1
      this.getOldCard()
    }
    else {
      this.data.tabLists = ['启用中', '停用中']
      this.data.isTab = true
      this.data.history = false
      this.data.isShowNumber = false
    }
    this.setData(this.data)
  },
  //里层tab
  tabClicks: function (e) {
    this.data.page = 1
    this.data.tabflag++ 
    this.data.tabCurrents = e.detail.tabCurrents
    if(this.data.tabCurrent==0){
      this.getCard()
    }else{
      this.getOldCard()
    }
    this.setData(this.data)
  },
  //是否启用
  couponUse(e){
    let id = e.currentTarget.dataset.id
    let status 
    if(this.data.isStar){
      status = 0
    }else{
      status = 1
    }
    wx.cloud.callFunction({
      name: 'card',
      data: {
        action: 'editCard',
        shopid: app.globalData.shop._id,
        _id: id,
        item:{
          status:status
        }
      },
      success: res => {
        let index = e.currentTarget.dataset.index
        this.data.couponData.splice(index, 1)
        this.getCard()
        this.couponCounts()
      }
    })
  },
  // 获取历史卡券数据
  getOldCard(page = 1){
    this.setData({
      isLoading: true
    })
    if (page == 1) {
      this.data.oldCardDate = []
      this.setData(this.data)
    }
    let type
    if(this.data.tabCurrents == 0){
      type = 0
    }else{
      type = 1
    }
    let tabflag = this.data.tabflag
    wx.cloud.callFunction({
      name:'cardVoucher',
      data:{
        action:'queryCard',
        shopid: app.globalData.shop._id,
        page:page,
        pageCount:PAGECOUNT,
        type:type
      },
      success:(res)=>{
        if (tabflag != this.data.tabflag) {
          return
        }
        if (res.result.data.length < PAGECOUNT) {
          this.data.noMore = true
        } else {
          this.data.noMore = false
        }
        this.setData({
          noMore: this.data.noMore,
          isLoading: false,
        })
        res.result.data.forEach((item)=>{
          this.data.oldCardDate.push(item)
          this.setData(this.data)
        })
      }
    })
  },
  //获取卡券数据
  getCard(page = 1) {
    this.setData({
      isLoading: true
    })
    if (page == 1) {
      this.data.couponData = []
      this.setData(this.data)
    }
    let status
    if (this.data.tabCurrents == 0) {
      status = 0
      this.data.isStar = false
      this.setData(this.data)
    }
    else if (this.data.tabCurrents == 1) {
      status = 1
      this.data.isStar = true
      this.setData(this.data)
    }
    let tabflag = this.data.tabflag
    wx.cloud.callFunction({
      name: 'card',
      data: {
        action: 'getCardTemplate',
        getType:'shopPage',
        shopid: app.globalData.shop._id,
        page:page,
        pageCount: PAGECOUNT,
        status: status
      },
      success: res => {
        console.log(res)
        if (tabflag != this.data.tabflag) {
          return
        }
        if (res.result.data.length < PAGECOUNT) {
          this.data.noMore = true
        } else {
          this.data.noMore = false
        }
        this.setData({
          noMore: this.data.noMore,
          isLoading: false,
        })
        res.result.data.forEach((item)=>{
          this.data.couponData.push(item)
          this.setData(this.data)
        })
      }
    })
  },
  loadMore() {
    this.data.page++
    if(this.data.tabCurrent==0){
      this.getCard(this.data.page)
    }else{
      this.getOldCard(this.data.page)
    }
  },
  //删除卡片
  couponDelete(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否确认删除',
      success: (res) => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'card',
            data: {
              action: 'removeCard',
              shopid: app.globalData.shop._id,
              _id: id
            },
            success: res => {
              let index = e.currentTarget.dataset.index
              this.data.couponData.splice(index, 1)
              this.setData({
                couponData: this.data.couponData
              })
              wx.showToast({
                icon: 'success',
                title: '删除成功',
                duration: 3000
              })
              this.couponCounts()
            }
          })
        }
      }
    })
  },
  //编辑卡片
  couponEdit(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    let type = e.currentTarget.dataset.type
    wx.redirectTo({
      url: '/pages/rewardEditCoupon/rewardEditCoupon?id=' + id+'&type='+type,
    })
  },
  //获取总数
  couponCounts() {
    wx.cloud.callFunction({
      name: 'card',
      data: {
        action: 'getCount',
      },
      success: res => {
        this.data.couponCount = res.result
        this.setData(this.data)
        console.log(res.result)
      }
    })
  },
  //删除订单
  deleteOrder(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '是否确认删除',
      success: (res) => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'cardVoucher',
            data: {
              action: 'removeCard',
              shopid: app.globalData.shop._id,
              _id: id
            },
            success: res => {
              let index = e.currentTarget.dataset.index
              this.data.oldCardDate.splice(index, 1)
              this.setData(this.data)
              wx.showToast({
                icon: 'success',
                title: '删除成功',
                duration: 3000
              })
            }
          })
        }
      }
    })
  }
})