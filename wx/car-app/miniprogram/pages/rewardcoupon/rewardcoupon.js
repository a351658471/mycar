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
    isTab:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  jumpToAddcoupon() {
    wx.redirectTo({
      url: '/pages/rewardAddCoupon/rewardAddCoupon',
    })
  },
  tabClick: function (e) {
    console.log(e)
    this.data.tabCurrent = e.detail.tabCurrent
    this.setData(this.data)
  },
  tabClicks: function (e) {
    console.log(e)
    this.data.tabCurrents = e.detail.tabCurrents
    this.setData(this.data)
    this.getCard()
  },
  //获取卡片数据
  getCard() {
    let status
    if(this.data.tabCurrents == 0){
      status = 0
    }
    else if(this.data.tabCurrents ==1){
      status = 1
    }
    wx.cloud.callFunction({
      name: 'card',
      data: {
        action: 'getCardTemplate',
        page: 1,
        pageCount: 10,
        status:status
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
  }
  //编辑卡片

})