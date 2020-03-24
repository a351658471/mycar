// miniprogram/pages/userManage/userManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:['管理员','普通用户'],
    isAdmin:true,
    allMan:[
      {
        name:'张三',
        tel:18065416541,
        isAdmin:true
      },
      {
        name: '李四',
        tel: 18065416541,
        isAdmin: false
      },
  
      {
        name: '王五',
        tel: 18065416541,
        isAdmin: true
      },
      {
        name: '李六',
        tel: 18065416541,
        isAdmin: false
      }
    ],
    admin:[],
    user:[],
    isSearch:false,
    search:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  inputBind:function(e){
    this.data.search = e.detail.value 
  },
  search:function(e){
    let i = this.data.search;
    let appShop = getApp()
    console.log(appShop.globalData.shop);
    // 调用云函数
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: "userQuery",
        shopid: appShop.globalData.shop._id,
        keyWord: i,
        
      },
      success: res => {
        console.log('[云函数] [shop] : ', res.result);      
        this.setData({
          
        })
      },
      fail: err => {
        console.error('[云函数] [shop] 调用失败', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     
    this.dataInit()
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

  dataInit(){
    let arr1 = [];
    let arr2 = []
    this.data.allMan.forEach(item => {
      if (item.isAdmin) {

        arr1.push(item)

      } else {

        arr2.push(item)

      }
    })
    this.setData({
      user: arr2,
      admin: arr1
    })
  },

  tabClick(e){
    if(e.detail.tabCurrent == 0){
       this.setData({
         isAdmin:true
       })
    }else{
      this.setData({
        isAdmin: false
      })
    }
  },
  serMg(e){
    let index = e.currentTarget.dataset.index
    let list = "allMan["+index+"].isAdmin"
   this.setData({
     [list]:!this.data.allMan[index].isAdmin
   })
   this.dataInit()
  }
})