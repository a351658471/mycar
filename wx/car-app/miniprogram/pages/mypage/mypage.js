// pages/home/home.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: {},
    avatarUrl: '../../assets/mypage/mypage-head.png',
    userInfo: {},
    logged: false,
    signNum: 0,
    control: true,
    isregist: false,
    trends: '-',
    follow: '-',
    fans: '-',
    menu_personal: {
      name: "个人信息",
      icon: "mypage-personal.png",
    },
    menu_reward: {
      name: "积分奖励",
      icon: "mypage-reward.png"
    },
    menu_back: {
      name: "建议反馈",
      icon: "mypage-back.png"
    },
    menu_car: {
      name: "车辆管理",
      icon: "mypage-car.png"
    },
    menu_picture: {
      name: "首页动图",
      icon: "mypage-picture.png"
    },
    menu_safe: {
      name: "账号管理",
      icon: "mypage-safe.png",
      link: "/pages/userManage/userManage"
    },
    menus: []

  },

  signButton: function () {
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
    if (shop.isOwner || shop.isAdmin) {
      this.data.menus = [
        this.data.menu_personal,
        this.data.menu_reward,
        this.data.menu_back,
        this.data.menu_car,
        this.data.menu_picture,
        this.data.menu_safe
      ]
    }
    else if (shop.isManagers) {
      this.data.menus = [
        this.data.menu_personal,
        this.data.menu_reward,
        this.data.menu_back,
        this.data.menu_car,
        this.data.menu_picture
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
    console.log(userInfo)


    // 调用云函数
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: "userLogin",
        wxUserInfo: userInfo
      },
      success: res => {
        console.log('[云函数] [user.userLogin] : ', res.result)
        this.setData({
          logged: true,
          avatarUrl: userInfo.avatarUrl,
          userInfo: res.result.data,
          isregist: true,
          control: false,
          trends: '0',
          follow: '0',
          fans: '0',
          signNum: 0
        })

      },
      fail: err => {
        console.error('[云函数] [user.userLogin] 调用失败', err)
      }
    })
  },
  bindtapMenu(event) {
    var src = event.currentTarget.dataset.src
    wx.navigateTo({ url: src.link })
  }
})