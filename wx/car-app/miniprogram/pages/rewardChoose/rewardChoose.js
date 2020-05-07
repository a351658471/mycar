// miniprogram/pages/rewardChoose/rewardChoose.js
const app = getApp()
const PAGECOUNT = 10
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponPurchase:[],
    myCouponData:{},
    nickName:'',
    phone:'',
    toUse:false,
    page:1,
    cardId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户数据
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: 'getInfoById',
        _id: options.userId
      },
      success: res => {
        console.log(res)
        this.data.nickName = res.result.data.nickName
        this.data.phone = res.result.data.phone
        this.setData(this.data)
      }
    })
    this.getCardData(this.data.page)
  },
  //获取购买卡数据
  getCardData(page = 1){
    this.setData({
      isLoading: true
    })
    if (page == 1) {
      this.data.couponPurchase = []
      this.setData(this.data)
    }
    wx.cloud.callFunction({
      name: 'card',
      data: {
        action: 'getCardTemplate',
        getType: 'userPageMore',
        shopid: app.globalData.shop._id,
        page: page,
        pageCount: PAGECOUNT,
        type:1
      },
      success: res => {
        if (res.result.data.length < PAGECOUNT) {
          this.data.noMore = true
        } else {
          this.data.noMore = false
        }
        this.setData({
          noMore: this.data.noMore,
          isLoading: false,
        })
        res.result.data.forEach((item) => {
          this.data.couponPurchase.push(item)
          this.setData(this.data)
        })
        console.log(this.data.couponPurchase)
      }
    })
  },
  loadMore() {
    this.data.page++
    this.getCardData(this.data.page)
  },
  toPurchase(e){
    console.log(e)
    this.data.toUse = true
    let id = e.currentTarget.dataset.id
    this.data.cardId = id
    this.setData(this.data)
    console.log(this.data.cardId)
    this.data.couponPurchase.forEach(item=>{
      if(item._id == id){
        this.data.myCouponData = item
      }
    })
    this.data.myCouponData.nickName = this.data.nickName
    this.data.myCouponData.phone = Number(this.data.phone)
    this.setData(this.data)
    console.log(this.data.myCouponData)
  },
  couponConfirm(){
    wx.cloud.callFunction({
      name: 'cardVoucher',
      data: {
        action: 'exchange',
        shopid: app.globalData.shop._id,
        userId: app.globalData.user._id,
        temID: String(this.data.cardId),
        type: 1
      },
      success: res => {
        console.log(res)
        if(res.result.code == 0){
          wx.showToast({
            icon: 'success',
            title: '购买成功',
          })
          this.data.toUse = false
          this.setData(this.data)
        }
      }
    })
  },
  couponCancle(){
    this.data.toUse = false
    this.setData(this.data)
  },
  exitBuy(){
    wx.navigateBack()
  }
})