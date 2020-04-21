// pages/shopMessage/shopMessage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAdmin:false,
    name:'',
    phone:'',
    wechat:'',
    address:'',
    latitude:0,
    longitude:0,
    current:false,
    location:null,
    titleEnter:false
  },  
  inputBindName: function (e) {
    this.data.name = e.detail.value
    this.setData({
      name:this.data.name,
      titleEnter:false
    })
  },
  inputBindPhone: function (e) {
    this.data.phone = e.detail.value
  },
  inputBindWechat: function (e) {
    this.data.wechat = e.detail.value
  },
  inputBindAddress: function (e) {
    this.data.address = e.detail.value
  },
  //复制内容
  copyText:function(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success:res =>{
        // wx.getClipboardData({
        //   success:res=>{
        //     wx.showToast({
        //       title: '已复制到粘贴板',
        //     })
        //   }
        // })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let shop = app.globalData.shop
    this.data.name = shop.name
    this.data.phone = shop.phone
    this.data.wechat = shop.wechat
    this.data.address = shop.address
    this.data.latitude = shop.location.latitude,
    this.data.longitude =shop.location.longitude
    // if (app.globalData.shop.isAdmin  || app.globalData.shop.isManagers){
    //   this.data.isAdmin = true;
    // }
    this.setData(this.data)
  },
  preserve:function(){
    var that = this
    that.data.location ={
      latitude:that.data.latitude,
    longitude:that.data.longitude,
    }
    // 调用云函数
    wx.cloud.callFunction({
      name: 'shop',
      data: {
        action: "infoEdit",
        shopid: app.globalData.shop._id,
        name: that.data.name,
        phone: that.data.phone,
        wechat: that.data.wechat,
        address:that.data.address,
        location:that.data.location,
      },
      success: res => {
        console.log('[云函数] [shop] : ', res.result)
        app.globalData.shop.name = that.data.name,
        app.globalData.shop.phone = that.data.phone,
        app.globalData.shop.wechat = that.data.wechat,
        app.globalData.shop.address = that.data.address,
        app.globalData.shop.location =that.data.location,
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
      },
      fail: err => {
        console.error('[云函数] [shop] 调用失败', err)
      }
    })
  },
  deleteText(){
    wx.showModal({
      title:'提示',
      content:'是否确认删除',
      success:(res)=>{
        res.confirm?this.data.address='':'',
        this.setData({
          address:this.data.address
        })
      }
    })
  },
  setTitle(){
    this.setData({
      titleEnter:true
    })
  },
  addAddress(){
    wx.chooseLocation({
      success:res=>{
        let longitude = res.longitude;
        let latitude=res.latitude;
        let address = ''
        if(res.name != ''){
          address = res.name
        }else if(res.address !=''){
          address = res.address
        }
        this.setData({
          longitude:longitude,
          latitude:latitude,
          address
        })
      }
    })
  },
  contentBlur(e){
    console.log(e)
    this.setData({
      address:e.detail.value,
      current:false
    })
  },
  changeCurrent(){
    this.setData({
      current:true
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
  }
})