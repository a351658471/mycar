// index.ts
Page({
  data:{
    currentData:0,
    intr:[
      {
        introduce: '全球十大豪车全球十大豪车...',
        src: '../../assets/img/img5.jpg'
      },
      {
        introduce: '全球十大豪车全球十大豪车...',
        src: '../../assets/img/img5.jpg'
      },
      {
        introduce: '全球十大豪车全球十大豪车...',
        src: '../../assets/img/img5.jpg'
      }
    ],
    know: [
      {
        introduce: '全球十大豪车全球十大豪车...',
        src: '../../assets/img/img5.jpg'
      },
      {
        introduce: '全球十大豪车全球十大豪车...',
        src: '../../assets/img/img5.jpg'
      },
      {
        introduce: '全球十大豪车全球十大豪车...',
        src: '../../assets/img/img5.jpg'
      }
    ],
    state:"新华社",
    time:"刚刚",
    num2:0,
    index:null
  },
  onReady:function(){
    this.infors = this.selectComponent("#infors");
  },
 
  dian(){ 
    this.infors.dian();
  },
  detailintroduce(){
    wx.navigateTo({
      url:'/pages/describe/describe'
    })
  },
  // 切换Tab栏
  changeTab(e: any) {
    const that = this;
    that.setData({
      currentData: e.currentTarget.dataset.current
    })
  }
})
