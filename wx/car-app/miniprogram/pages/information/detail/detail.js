// miniprogram/pages/information/detail/detail.js
const PAGECOUNT = 10;
const PAGE=1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl:null,
    textContent:null,
    isVideo:false,
    resData:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let id = options.id;
    if(options.isVideo == 'true'){
      this.setData({
        isVideo: true
      })
    }else{
      this.setData({
        isVideo: false
      })
    }
    this.getData(id)
    
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
        console.log(res.data.msg.content)
        res.data.msg.content = JSON.parse(res.data.msg.content)
        if(this.data.isVideo){
          let videoUrl;
          let textContent;
          res.data.msg.content.forEach(item=>{
            item.type == 'text' ? textContent = item :videoUrl =item
          })
           this.setData({
             videoUrl: videoUrl,
             textContent: textContent,
             resData:res.data.msg
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