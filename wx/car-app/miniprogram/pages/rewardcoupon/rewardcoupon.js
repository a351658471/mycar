// miniprogram/pages/coupon/coupon.js
const app = getApp()
const PAGECOUNT = 5
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
    searchCoupon:''
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
    wx.cloud.callFunction({
      name: 'cardVoucher',
      data: {
        action: 'queryCard',
        shopid: app.globalData.shop._id,
        keyWord: this.data.searchCoupon
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
      this.data.isTab = false
      this.data.history = true
      this.data.page = 1
      this.getOldCard()
    }
    else {
      this.data.isTab = true
      this.data.history = false
    }
    this.setData(this.data)
  },
  //里层tab
  tabClicks: function (e) {
    this.data.page = 1
    this.data.tabflag++ 
    this.data.tabCurrents = e.detail.tabCurrents
    this.setData(this.data)
    this.getCard()
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
    wx.cloud.callFunction({
      name:'cardVoucher',
      data:{
        action:'queryCard',
        shopid: app.globalData.shop._id,
        page:page,
        pageCount:PAGECOUNT
      },
      success:(res)=>{
        console.log(res)
        this.data.oldCardDate = res.result.data
        this.setData(this.data)
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
        page:page,
        pageCount: PAGECOUNT,
        status: status
      },
      success: res => {
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
    this.getCard(this.data.page)
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
                duration: 3000,
              })
            }
          })
        }
      }
    })
  },
  //编辑卡片
  couponEdit(e) {
    let id = e.currentTarget.dataset.id
    wx.redirectTo({
      url: '/pages/rewardEditCoupon/rewardEditCoupon?id=' + id,
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
  }
})