// miniprogram/pages/coupon/coupon.js
const app = getApp()
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
    isTab: true,
    isStar: false,
    couponCount: [],
    page: 1,
    noMore: false,
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let status = 'couponData.status'
    this.setData({
      [status]: 0
    })
    this.getCard([this.data.tabCurrents])
    this.couponCounts()
  },
  // 添加新车
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
    }
    else {
      this.data.isTab = true
      this.data.history = false
    }
    this.setData(this.data)
  },
  //里层tab
  tabClicks: function (e) {
    console.log(e)
    this.data.tabCurrents = e.detail.tabCurrents
    this.setData(this.data)
    this.getCard()
  },
  //是否启用
  couponUse(){
    // let id = e.currentTarget.dataset.id
    // wx.cloud.callFunction({
    //   name: 'card',
    //   data: {
    //     action: 'getCardTemplate',
    //     shopid: app.globalData.shop._id,
    //     _id: id,
    //     item:{
    //       status:status
    //     }
    //   },
    //   success: res => {
    //     console.log(res)
    //     this.getCard()
    //   }
    // })
  },
  //获取卡片数据
  getCard() {
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
    wx.cloud.callFunction({
      name: 'card',
      data: {
        action: 'getCardTemplate',
        page: 1,
        pageCount: 5,
        status: status
      },
      success: res => {
        this.data.couponData = res.result.data
        this.setData(this.data)
        console.log(res)
      }
    })
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