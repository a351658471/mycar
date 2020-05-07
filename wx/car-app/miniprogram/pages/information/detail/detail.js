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
  //分享车辆 获取积分
  shareCar(){
    wx.cloud.callFunction({
      name: 'user',
      data: {
        action: 'userShare',
        type:1
      },
      success: (res) => {
        console.log(res)
        if(res.result.code == 0){
          wx.showToast({
            icon: 'none',
            title: '+10积分',
          })
        }
      }
    })
  },
   //分享好友
   onShareAppMessage(res) {
    if (res.from === 'button') {
      this.shareCar()
    }
  },
})