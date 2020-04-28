// miniprogram/pages/rewardDetail/rewardDetail.js
import QRCode from '../../utils/weapp-qrcode'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponName: '',  //卡券名称
    date: '',  //到期时间
    couponIntegral:'',//所需积分
    couponContent: '',  //特点描述
    couponActive: '' ,//活动规则
    address:'',
    latitude:0,
    longitude:0,
    isExchange:true,
    couponId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id = options.cardId
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
        this.data.date = res.result.data[0].validity
        this.data.couponContent = res.result.data[0].describe
        this.data.couponActive = res.result.data[0].rule
        this.setData(this.data)
      }
    })
  },
  // 兑换成我的卡券
  myCoupon(){
    wx.cloud.callFunction({
      name: 'cardVoucher',
      data: {
        action: 'addCardVoucher',
        shopid: app.globalData.shop._id,
        name: this.data.couponName,
        integral: this.data.couponIntegral,
        validity: Date.parse(new Date(this.data.date)),
        describe: this.data.couponContent,
        rule: this.data.couponActive,
        tel: app.globalData.user.phone,
        nickName: app.globalData.user.nickName,
        userId: app.globalData.user._id,
        userTime: 0,
        used: 0
      },
      success: (res) => {
        console.log(res)
        this.data.couponId = res.result.data
      }
    })
  },
  //获取积分
  useCoupon(){
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: 'payScore',
        integral: 50
      },
      success: (res) => {
        console.log(res)
        if (res.result.succuss == false) {
          wx.showToast({
            title: '积分不足',
            icon: 'none'
          })
          return
        }
      }
    })
  },
  // 生成二维码
  toCoupon(){
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: 'payScore',
        integral: 50
      },
      success: (res) => {
        console.log(res)
        if (res.result.succuss == false) {
          wx.showToast({
            title: '积分不足',
            icon: 'none'
          })
          return
        }else{
          this.myCoupon()
          this.data.isExchange = false
          this.setData(this.data)
          new QRCode('myQrcode', {
            text: this.data.couponId,
            width: 150,
            height: 150,
            correctLevel: QRCode.CorrectLevel.L,
            callback: (res) => {
              console.log(res.path)
            }
          })
        }
      }
    })
  },
  
})