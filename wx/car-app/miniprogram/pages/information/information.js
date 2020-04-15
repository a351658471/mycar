// miniprogram/pages/information/information.js
const PAGECOUNT = 10;
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    tabList:['汽车资讯','用车知识'],
    page:1,
    newsList:[],
    type:0,
    noMore: false,
    isLoading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(this.data.page,this.data.type)
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
  getData(page,type){
    this.setData({
      isLoading: true
    })
    wx.request({
      url: 'https://car.xichenshiji.com/content/query_base',
      method: 'POST',
      header: { "content-type": "application/x-www-form-urlencoded" },
      data: {
        page: page,
        pageCount: PAGECOUNT,
        type: type
      },
      success: (res) => {
        if (res.data.msg.length < 5) {
          this.data.noMore = true
        } else {
          this.data.noMore = false
        }
        if(res.count!=0){
          res.data.msg.forEach(item=>{
            item.cover = JSON.parse(item.cover)
            this.data.newsList.push(item)
          })
        }
        console.log(this.data.newsList)
      this.setData({
        newsList:this.data.newsList,
        isLoading:false,
        noMore: this.data.noMore
      })
      }
    })
  },
  detail(e){
    console.log(e)
    let id = e.detail.id;
    let isVideo = e.detail.isVideo
    wx.navigateTo({
      url: 'detail/detail?id='+id+'&isVideo='+isVideo
    })
  },
  tabClick(e){      
    this.data.type=e.detail.tabCurrent;
    this.data.page = 1;
    this.data.newsList.splice(0, this.data.newsList.length)
    this.getData(this.data.page,this.data.type)
  },
  //加载更多
  loadMore() {
    this.data.page++;
    this.getData(this.data.page,this.data.type)
  },
})