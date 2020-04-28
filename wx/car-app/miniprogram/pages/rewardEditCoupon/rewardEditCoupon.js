// miniprogram/pages/rewardAddCoupon/rewardAddCoupon.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponName: '',  //卡券名称
    couponIntegral: 0,  //需要积分
    date: 0,  //到期时间
    couponContent: '',  //特点描述
    couponActive: '' ,//活动规则
    cardId:'',
    localdate: 0 //添加卡券开始时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.localdate = new Date().toLocaleDateString()
    let id = options.id
    this.data.cardId = id
    this.setData(this.data) 
    wx.cloud.callFunction({
      name: 'card',
      data: {
        action: 'getCardTemplate',
        shopid: app.globalData.shop._id,
        _id: id
      },
      success: res => {
        console.log(res)
        this.data.couponName = res.result.data[0].name
        this.data.couponIntegral = res.result.data[0].integral
        this.data.date = new Date(res.result.data[0].validity).toLocaleDateString()
        this.data.couponContent = res.result.data[0].describe
        this.data.couponActive = res.result.data[0].rule
        this.setData(this.data)
      }
    })
  },
  couponName(e) {
    this.setData({
      couponName: e.detail.value
    })
  },
  couponIntegral(e) {
    this.setData({
      couponIntegral: e.detail.value
    })
  },
  bindDateChange(e) {
    console.log(e)
    this.setData({
      date: e.detail.value
    })
  },
  couponContent(e) {
    this.setData({
      couponContent: e.detail.value
    })
  },
  couponActive(e) {
    this.setData({
      couponActive: e.detail.value
    })
  },
  //调用编辑卡片接口
  setCouponData(status,id) {
    wx.cloud.callFunction({
      name: 'card',
      data: {
        action: 'editCard',
        shopid: app.globalData.shop._id,
        _id:id,
        item:{
          name: this.data.couponName,
          integral: this.data.couponIntegral,
          validity: Date.parse(new Date(this.data.date)),
          describe: this.data.couponContent,
          rule: this.data.couponActive,
          status: status // 状态 0启用 1停用
        }
      },
      success: res => {
        console.log('[云函数] [card] : ', res)
        if (status == 1) {
          wx.showToast({
            icon: 'success',
            title: '保存成功',
            duration: 3000,
            success: res => {
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/rewardcoupon/rewardcoupon',
                })
              }, 500)
            }
          })
        } else {
          wx.showToast({
            icon: 'success',
            title: '启用成功',
            duration: 3000,
            success: res => {
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/rewardcoupon/rewardcoupon',
                })
              }, 500)
            }
          })
        }
      },
      fail: err => {
        console.error('[云函数] [card] 调用失败', err)
      }
    })
  },
  //保存
  couponSave(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    let status = 1
    this.setCouponData(status,id)
  },
  // 启用
  couponStar(e) {
    let id = e.currentTarget.dataset.id
    let status = 0
    this.setCouponData(status,id)
  }
})