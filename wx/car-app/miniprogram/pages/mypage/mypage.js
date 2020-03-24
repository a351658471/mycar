// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '../../assets/mypage/mypage-head.png',
    userInfo: {},
    logged: false,
    signNum:0,
    control:false,
    isregist:false,
    trends:'-',
    follow: '-',
    fans: '-'
  },

  signButton:function(){
    this.setData({
      signNum:this.data.signNum + 10,
      control: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
          isregist:true,
          trends: '0',
          follow: '0',
          fans: '0',
          signNum: this.data.signNum + 10
        })
        
      },
      fail: err => {
        console.error('[云函数] [user.userLogin] 调用失败', err)
      }
    })
  },
  adviseBtn:function(){
      wx.navigateTo({
        url: '/pages/advise/advise',
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  jumpToCarMg(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  
  jumpToUserMg(){
    wx.navigateTo({
      url: '/pages/userManage/userManage',
    })
  }
})