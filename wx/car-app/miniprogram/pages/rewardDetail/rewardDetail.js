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
    cardId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let shop = app.globalData.shop
    // this.data.latitude = shop.location.latitude,
    // this.data.longitude =shop.location.longitude
    // this.setData(this.data)
    console.log(options)
    let id = options.cardId
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
        this.data.date = res.result.data[0].validity
        this.data.couponContent = res.result.data[0].describe
        this.data.couponActive = res.result.data[0].rule
        this.setData(this.data)
      }
    })
  },
  // 生成二维码
  toCoupon(){
    wx.cloud.callFunction({
      name:'cardVoucher',
      data:{
        action:'addCardVoucher',
        shopid: app.globalData.shop._id,
        name:this.data.couponName,
        integral:this.data.couponIntegral,
        validity:Date.parse(new Date(this.data.date)),
        describe:this.data.couponContent,
        rule:this.data.couponActive,
        tel:app.globalData.user.phone,
        nickName:app.globalData.user.nickName,
        userId:app.globalData.user._id,
        userTime:0,
        used:0
      },
      success:(res)=>{
        console.log(res)
      }
    })
    this.data.isExchange = false
    this.setData(this.data)
    new QRCode('myQrcode',{
      text:'1111111',
      width:150,
      height:150,
      correctLevel:QRCode.CorrectLevel.L,
      callback:(res)=>{
        console.log(res.path)
      }
    })
  },
  navigation(){
    console.log(this.data.latitude)
    console.log(this.data.longitude)
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name:this.data.address,
      success:res=>{
        // console.log(res)
      }
    })
  },
  
})