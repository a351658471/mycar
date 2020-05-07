// miniprogram/pages/rewardAddCoupon/rewardAddCoupon.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponName: '',  //卡券名称
    couponIntegral: '',  //需要积分
    date: '',  //到期时间
    couponContent: '',  //特点描述
    couponActive: '' ,//活动规则
    couponNumber:'',
    cardId:'',
    localdate: 0 ,//添加卡券开始时间
    isPurchase:true,
    maxlength:150,
    textlength:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.localdate = new Date().toLocaleDateString()
    let id = options.id
    if(options.type == 1){
      this.data.isPurchase = false
      this.setData(this.data)
    }
    this.data.cardId = id
    this.setData(this.data) 
    wx.cloud.callFunction({
      name: 'card',
      data: {
        action: 'getCardTemplate',
        getType:'findById',
        shopid: app.globalData.shop._id,
        temID: id
      },
      success: res => {
        console.log(res)
        this.data.couponName = res.result.data[0].name
        this.data.couponIntegral = res.result.data[0].integral
        this.data.date = this.formatTime(res.result.data[0].validity, 'yyyy-mm-dd')
        this.data.couponContent = res.result.data[0].describe
        this.data.couponActive = res.result.data[0].rule
        this.data.couponNumber = res.result.data[0].canUsedCount
        this.data.textlength = res.result.data[0].rule.length
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
      couponActive: e.detail.value,
      textlength:this.data.couponActive.length
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
          validity: Date.parse(new Date(this.data.date))+57600000,
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
                wx.redirectTo({
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
                wx.redirectTo({
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
  },
   formatTime (time, format) {
    var ftime = 0
    if (('' + time).length === 10) {
      ftime = parseInt(time) * 1000
    } else {
      ftime = time
    }
    var d = new Date(ftime)
    var nowYear = d.getFullYear()
    var Month = parseInt(d.getMonth()) + 1
    if (format == 'yyyy-mm-dd') return (d.getFullYear() + '-' + Month + '-' + d.getDate())
    if (format == 'yyyy.mm.dd') return (d.getFullYear() + '.' + Month + '.' + d.getDate())
  }
})