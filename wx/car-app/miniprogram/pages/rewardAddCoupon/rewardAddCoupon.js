// miniprogram/pages/rewardAddCoupon/rewardAddCoupon.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponName:'',  //卡券名称
    couponIntegral:0,  //需要积分
    date:0,  //到期时间
    couponContent:'',  //特点描述
    couponActive:'', //活动规则
    localdate:0 //添加卡券开始时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.localdate = new Date().toLocaleDateString()
    this.setData(this.data)
  },
  couponName(e){
    this.setData({
      couponName: e.detail.value
    })
  },
  couponIntegral(e){
    this.setData({
      couponIntegral: e.detail.value
    })
  },
  bindDateChange(e){
    this.setData({
      date: e.detail.value
    })
  },
  couponContent(e){
    this.setData({
      couponContent: e.detail.value
    })
  },
  couponActive(e){
    this.setData({
      couponActive: e.detail.value
    })
  },
  //调用添加卡片接口
  setCouponData(status){  
    wx.cloud.callFunction({
      name: 'card',
      data: {
        action:'addCardTemplate',
        shopid:app.globalData.shop._id,
        name:this.data.couponName,
        integral:this.data.couponIntegral,
        validity: Date.parse(new Date(this.data.date)),
        describe:this.data.couponContent,
        rule:this.data.couponActive,
        status:status // 状态 0启用 1停用
      },
      success: res => {
        console.log('[云函数] [card] : ', res)
        if(status == 1){
          wx.showToast({
            icon: 'success',
            title: '保存成功',
            duration: 3000,
            success: res => {
              setTimeout(() => {
                wx.navigateBack()
              }, 500)
            }
          })
        }else{
          wx.showToast({
            icon: 'success',
            title: '启用成功',
            duration: 3000,
            success: res => {
              setTimeout(() => {
                wx.navigateBack()
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
  couponSave(e){
    let status = 1
    this.setCouponData(status)
  },
  //启用
  couponStar(e){
    let status = 0
    this.setCouponData(status)
  }
})