let datas = require('../datas/datas.js');
Page({
  data: {
    currentData: 0,
    newcar:[],
    oldcar:[]
  },
  onLoad:function(){
    this.setData({
      newcar: datas.newcar,
      oldcar: datas.oldcar
    })
  },
  newcars(event:any){
    let index = event.currentTarget.dataset.index;
    
    wx.navigateTo({
      url:'/pages/detailed/detailed?index='+index
    })
  },
  // 切换Tab栏
  changeTab(e: any) {
    this.setData({
      currentData: e.currentTarget.dataset.current
    })
  }
})
