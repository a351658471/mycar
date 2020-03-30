// miniprogram/pages/userManage/userManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ['管理员', '普通用户'],
    isAdmin: true,
    userList: [],
    flag: 1,
    search: '',
    curPage: 1,
  },
  onShow: function () {
    this.userQuery()
  },
  inputBind: function (e) {
    this.data.search = e.detail.value
  },
  bindTapMore: function (e) {
    this.userQuery()
  },
  focusBind:function(){
    this.data.searchvalue =''
  },
  search: function (e) {
    this.data.flag++
    this.data.userList.length = 0
    this.setData(this.data)
    this.userQuery()
  },

  // 查询用户
  userQuery: function (paging = true) {

    let queryData = {
      action: "userQuery",
      shopid: getApp().globalData.shop._id
    }
    if (paging) {
      const PER_PAFE = 10
      queryData.page = Math.ceil((this.data.userList.length + 1) / PER_PAFE)
      queryData.perpage = PER_PAFE
    }
    let isAdmin = this.data.isAdmin
    if (isAdmin) {
      queryData.manager = 1
    }
    if (this.data.search && this.data.search.length > 0) {
      queryData.keyWord = this.data.search
    }
    // console.log("queryData", queryData)
    let that = this
    let flag = this.data.flag
    // 调用云函数
    wx.cloud.callFunction({
      name: 'user',
      data: queryData,
      success: res => {
        if (flag != this.data.flag) {
          return
        }
        // console.log('[云函数] [user.userQuery] : ', res.result)
        for (let index = 0; index < res.result.data.length; index++) {
          const element = res.result.data[index];
          that.addUser(element)

        }
        that.setData(that.data)
      },
      fail: err => {
        console.error('[云函数] [user.userQuery] 调用失败', err)
      }
    })
  },
  addUser(user) {
    let list = this.data.userList
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (element._id == user._id) {
        list[index] = user
        return
      }
    }
    list.push(user)
  },
  removeUser(user) {
    let list = this.data.userList
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (element._id == user._id) {
        list.splice(index, 1)
        break
      }
    }
    this.setData(this.data)
  },
  tabClick(e) {
    this.data.flag++
    this.data.userList.length = 0
    this.data.isAdmin = e.detail.tabCurrent == 0
    this.setData(this.data)
    this.userQuery()
  },
  serMg(e) {
    let user = e.currentTarget.dataset.src
    let that = this
    if (!this.data.isAdmin) {
      // 调用云函数
      wx.cloud.callFunction({
        name: 'shop',
        data: {
          action: "masterAdd",
          shopid: getApp().globalData.shop._id,
          openid: user._openid
        },
        success: res => {
          // console.log('[云函数] [shop.masterAdd] : ', res.result)
          that.removeUser(user)
        },
        fail: err => {
          console.error('[云函数] [shop.masterAdd] 调用失败', err)
        }
      })
    }
    else {
      // 调用云函数
      wx.cloud.callFunction({
        name: 'shop',
        data: {
          action: "masterRemove",
          shopid: getApp().globalData.shop._id,
          openid: user._openid
        },
        success: res => {
          // console.log('[云函数] [shop.masterRemove] : ', res.result)
          that.removeUser(user)
        },
        fail: err => {
          console.error('[云函数] [shop.masterRemove] 调用失败', err)
        }
      })
    }
  }
})