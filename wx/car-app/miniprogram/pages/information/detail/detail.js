// miniprogram/pages/information/detail/detail.js
const PAGECOUNT = 10;
const PAGE=1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    isVideo:false,
    resData:{
      title:'全球十大好车，麦考论、法拉第垫底',
      author:'新华社',
      time:'1586767325',
      detail:[
        {
          type: 'text',
          content: '说起豪车，我们首先想到的就是BBA——奔驰、宝马和奥迪，因为它们在我们生活中实在是太常了。但它们只是普通的豪车，甚至排不上世界豪车的排行榜。那么世界级的豪车都有哪些呢？我们看看世界十大豪车以及它们的标志吧。',
        },
        {
          type: 'image',
          content: 'https://7431-t1-6ciuq-1301592150.tcb.qcloud.la/1585707827024_43933.jpg',
        },
        {
          type: 'text',
          content: '说起豪车，我们首先想到的就是BBA——奔驰、宝马和奥迪，因为它们在我们生活中实在是太常了。但它们只是普通的豪车，甚至排不上世界豪车的排行榜。那么世界级的豪车都有哪些呢？我们看看世界十大豪车以及它们的标志吧。',
        },
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let isVideo = false
    this.getData(id)
    this.setData({
      isVideo: isVideo
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
  getData(id) {
    wx.request({
      url: 'https://car.xichenshiji.com/content/query_by_id',
      method: 'POST',
      header: { "content-type": "application/x-www-form-urlencoded" },
      data: {
        id:id
      },
      success: (res) => {
        
        res.data.msg.content = JSON.parse(res.data.msg.content)
        console.log(res.data.msg.content )
        if(this.isVideo){
           this.setData({
             videoUrl: res.data.msg.content[0],
             textContent: res.data.msg.content[1],
             resData:res.msg
           })
        }else{
          this.setData({
            resData: res.data.msg
          })
        }
      }
    })
  },
})