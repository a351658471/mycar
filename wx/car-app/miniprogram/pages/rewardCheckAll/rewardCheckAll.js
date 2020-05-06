// miniprogram/pages/rewardCheckAll/rewardCheckAll.js
const app = getApp()
const PAGECOUNT = 10
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:['兑换卡券','购买卡券'],
    couponData:[],
    page: 1,
    noMore: false,
    isLoading: false,
    tabCurrent: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCard(this.data.page)
  },
  tabClick: function (e){
    this.data.tabCurrent = e.detail.tabCurrent
    this.getCard(this.data.page)
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
    let type
    if(this.data.tabCurrent == 0){
      type = 0
    }else{
      type = 1
    }
    wx.cloud.callFunction({
      name: 'card',
      data: {
        action: 'getCardTemplate',
        getType:'userPageMore',
        page:page,
        pageCount: PAGECOUNT,
        type:type
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
        res.result.data.forEach((item)=>{
          if(item.validity>Date.parse(new Date())){
            this.data.couponData.push(item)
            this.setData(this.data)
          }
        })
      }
    })
  },
  loadMore() {
    this.data.page++
    this.getCard(this.data.page)
  },
  jumpToDetail(e) {
    console.log(e)
    let id = e.detail.id
    wx.redirectTo({
      url: '/pages/rewardDetail/rewardDetail?cardId=' + id,
    })
  },
})