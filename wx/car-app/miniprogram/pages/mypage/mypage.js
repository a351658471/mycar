// pages/home/home.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: {},
    userInfo: {},
    logged: false,
    signNum: 0,
    control: true,
    isregist: false,
    hideShare: false,
    trends: '-',
    follow: '-',
    fans: '-',
    menu_personal: {
      name: "个人信息",
      icon: "mypage-personal.png",
      link: "/pages/personal/personal"
    },
    menu_reward: {
      name: "积分奖励",
      icon: "mypage-reward.png"
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
    menu_feedback: {
      name: "反馈列表",
      icon: "mypage-backlist.png",
      link: "/pages/userFeedbackQuery/userFeedbackQuery"
    },
    menus: []

  },


  signButton: function () {
    wx.showToast({
      icon:"none",
      title: '该功能暂未开放',
    })
    return
    this.setData({
      signNum: this.data.signNum + 10,
      control: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.menus = [
      this.data.menu_personal, this.data.menu_reward, this.data.menu_back
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
        this.data.menu_personal,
        this.data.menu_reward,
        this.data.menu_back,
      ]
      this.setData(this.data)
      return
    }
    if (shop.isOwner || shop.isAdmin) {
      this.data.menus = [
        this.data.menu_personal,
        this.data.menu_reward,
        this.data.menu_back,
        this.data.menu_car,
        this.data.menu_picture,
        this.data.menu_safe,
        this.data.menu_feedback
      ]
    }
    else if (shop.isManagers) {
      this.data.menus = [
        this.data.menu_personal,
        this.data.menu_reward,
        this.data.menu_back,
        this.data.menu_car,
        this.data.menu_picture,
        this.data.menu_feedback
      ]
    }
    else {
      this.data.menus = [
        this.data.menu_personal,
        this.data.menu_reward,
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
        console.log('[云函数] [user.userLogin] : ', res.result)
        this.data.userInfo = app.globalData.user = res.result.data
        this.data.avatarUrl = this.data.userInfo.avatarUrl
        this.data.logged = true
        this.data.isregist = true
        this.data.control = false
        this.data.trends = '0'
        this.data.follow = '0'
        this.data.fans = '0'
        this.data.signNum = 0
        this.onUpdateShop()
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
    if(src.link ){
      wx.navigateTo({ url: src.link })
    }
    else{
      wx.showToast({
        icon:"none",
        title: '该功能暂未开放',
      })
    }
  },


})