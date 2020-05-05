// pages/home/home.js
import QRCode from '../../utils/weapp-qrcode'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: '/assets/mypage/mypage-head.png',
    shop: {},
    userInfo: {},
    logged: false,
    signNum: 0,
    control: false,
    isregist: false,
    hideShare: false,
    adminhide: false,
    toUse: false,
    change: true,
    coupondId: '',
    cancel: true,
    isDegree:false,
    myCodeHide: false,
    myCouponData: {},
    useCondition:'',
    conditionColor:'',
    menu_reward: {
      name: "积分奖励",
      icon: "mypage-reward.png",
      link: "/pages/reward/reward"
    },
    menu_shopMessage: {
      name: "商家信息",
      icon: "mypage-personal.png",
      link: "/pages/shopMessage/shopMessage"
    },
    menu_back: {
      name: "建议反馈",
      icon: "mypage-back.png",
      link: "/pages/userFeedback/userFeedback"
    },
    menu_car: {
      name: "车辆管理",
      icon: "mypage-car.png",
      link: "/pages/carManage/carManage"
    },
    menu_picture: {
      name: "首页动图",
      icon: "mypage-picture.png",
      link: "/pages/gif/gif"
    },
    menu_safe: {
      name: "账号管理",
      icon: "mypage-safe.png",
      link: "/pages/userManage/userManage"
    },
    menu_coupon: {
      name: "卡券管理",
      icon: "mypage-coupon.png",
      link: "/pages/rewardcoupon/rewardcoupon"
    },
    menu_feedback: {
      name: "反馈列表",
      icon: "mypage-backlist.png",
      link: "/pages/userFeedbackQuery/userFeedbackQuery"
    },
    menus: [],
    adminMenus: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let base64 = 'data:image/png;base64,' + wx.getFileSystemManager().readFileSync(this.data.background, 'base64');
    this.setData({
      background: base64,
    })

    this.data.menus = [
      this.data.menu_reward, this.data.menu_shopMessage, this.data.menu_back
    ]
    this.setData(this.data)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.toLogin(res.userInfo)
            }
          })
        }
      }
    })
  },
  onShow() {
    app.globalData.addListener(app.globalData.eventShopUpdate, this.onUpdateShop)
    app.globalFunc.getShopInfo()
  },
  onHide: function () {
    app.globalData.removeListener(app.globalData.eventShopUpdate, this.onUpdateShop)
  },
  onUpdateShop: function () {
    let shop = app.globalData.shop
    this.data.shop = shop
    if (!this.data.userInfo._id) {
      this.data.menus = [
        this.data.menu_reward,
        this.data.menu_shopMessage,
        this.data.menu_back,
      ]
      this.setData(this.data)
      return
    }
    if (shop.isOwner || shop.isAdmin) {
      this.data.menus = [
        this.data.menu_reward,
        this.data.menu_back,
      ];
      this.data.adminMenus = [
        this.data.menu_car,
        this.data.menu_shopMessage,
        this.data.menu_picture,
        this.data.menu_safe,
        this.data.menu_coupon,
        this.data.menu_feedback
      ]
      this.data.adminhide = true;
    }
    else if (shop.isManagers) {
      this.data.menus = [
        this.data.menu_reward,
        this.data.menu_back,
      ];
      this.data.adminMenus = [
        this.data.menu_car,
        this.data.menu_shopMessage,
        this.data.menu_picture,
        this.data.menu_coupon,
        this.data.menu_feedback
      ]
      this.data.adminhide = true;
    }
    else {
      this.data.menus = [
        this.data.menu_reward,
        this.data.menu_shopMessage,
        this.data.menu_back,
      ]
    }
    this.setData(this.data)
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.toLogin(e.detail.userInfo)
    }
  },
  toLogin: function (userInfo) {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: "userLogin",
        wxUserInfo: userInfo
      },
      success: res => {
        // console.log('[云函数] [user.userLogin] : ', res.result)
        this.data.userInfo = app.globalData.user = res.result.data
        this.data.avatarUrl = this.data.userInfo.avatarUrl
        this.data.logged = true
        this.data.isregist = true
        this.data.control = false
        this.data.signNum = this.data.userInfo.integral.score
        this.onUpdateShop()
        console.log(app.globalData.user)
        let lastDate = new Date(this.data.userInfo.integral.signTime).toLocaleDateString()
        let nowDate = new Date().toLocaleDateString()
        if (lastDate == nowDate) {
          this.setData({
            control: true,
            change: false
          })
        }else{
          this.setData({
            control: false,
            change: true
          })
        }
      },
      fail: err => {
        console.error('[云函数] [user.userLogin] 调用失败', err)
      }
    })
  },
  bindtapMenu(event) {
    var src = event.currentTarget.dataset.src
    if (!this.data.userInfo._id) {
      wx.showToast({
        icon: "none",
        title: '您还未登录',
      })
      return
    }
    if (src.link) {
      wx.navigateTo({ url: src.link })
    }
    else {
      wx.showToast({
        icon: "none",
        title: '该功能暂未开放',
      })
    }
  },
  modified() {
    if (!this.data.userInfo._id) {
      wx.showToast({
        icon: "none",
        title: '您还未登录',
      })
      return
    }
    else {
      wx.navigateTo({
        url: '/pages/personal/personal',
      })
    }
  },
  //签到
  signButton: function () {
    // wx.showToast({
    //   icon:"none",
    //   title: '该功能暂未开放',
    // })
    // return
    if (!this.data.userInfo._id) {
      wx.showToast({
        icon: "none",
        title: '您还未登录',
      })
      return
    }
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: 'userSignIn'
      },
      success: (res) => {
        console.log(res)
        if (res.result.code == 0) {
          wx.showToast({
            icon: "none",
            title: '签到成功',
          })
          this.setData({
            control: true,
            change: false
          })
        }
      }
    })
  },
  //扫码获取卡券
  scancode() {
    wx.scanCode({
      success: (res) => {
        let id = res.result
        if (id.substr(0, 6) == 'cardId') {
          let index = res.result.lastIndexOf("=")
          id = id.substring(index + 1, id.length)
          this.data.coupondId = id
          this.data.toUse = true
          this.setData(this.data)
          wx.cloud.callFunction({
            name: 'cardVoucher',
            data: {
              action: 'showCard',
              shopid: app.globalData.shop._id,
              _id: id,
            },
            success: res => {
              console.log(res)
              if(res.result.data.used==0 && res.result.data.validity > Date.parse(new Date())){
                this.data.useCondition = '有效'
                this.data.myCouponData = res.result.data
                if (res.result.data.type==1){
                  this.data.isDegree = true
                }else{
                  this.data.isDegree = false
                }
              }
              if (res.result.data.used == 0 && res.result.data.validity < Date.parse(new Date())){
                this.data.useCondition = '已过期'
                this.data.cancel = false,
                this.data.conditionColor = '#9B9B9B'
                this.data.myCouponData = res.result.data
              }
              if (res.result.data.used == 1){
                this.data.useCondition = '已使用'
                this.data.cancel = false
                this.data.conditionColor = '#9B9B9B'
                this.data.myCouponData = res.result.data
              }
              this.setData(this.data)
            }
          })
        }
        if (id.substr(0, 6) == 'userId') {
          let index = id.lastIndexOf("=")
          id = id.substring(index + 1, id.length)
          wx.redirectTo({
            url: '/pages/rewardChoose/rewardChoose?userId=' + id,
          })
        }
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },
  //卡券取消使用
  couponCancle(e) {
    this.data.toUse = false
    this.setData(this.data)
  },
  //卡券确认使用
  couponConfirm(e) {
    wx.cloud.callFunction({
      name: 'cardVoucher',
      data: {
        action: 'userMyCard',
        shopid: app.globalData.shop._id,
        _id: this.data.coupondId,
        temID: this.data.myCouponData.temID
      },
      success: (res) => {
        this.data.toUse = false
        this.setData(this.data)
        wx.showToast({
          title: '已使用',
          icon: 'none'
        })
      }
    })
  },
  //过期卡券关闭
  couponPast(e) {
    this.data.toUse = false
    this.setData(this.data)
  },
  // 用户二维码
  beScanCode() {
    this.data.myCodeHide = true
    this.setData(this.data)
    new QRCode('myQrcode', {
      text: 'userId=' + this.data.userInfo._id,
      width: 180,
      height: 180,
      correctLevel: QRCode.CorrectLevel.L,
      callback: (res) => {
        console.log(res)
      }
    })
  },
  // 关闭二维码
  closeMyCode() {
    this.data.myCodeHide = false
    this.setData(this.data)
  },
})