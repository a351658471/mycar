let datas = require('../datas/datas.js');
Page({
  data:{
    currentData:0,
    content:'aaaaaaaaaaaaaaaaaaaaa',
    index:null,
    newcar:{}
  },
  onLoad:function(options){
    console.log(options);
    //获取参数值
    let index = options.index;

    this.setData({
      newcar:datas.newcar[index],
      index
    })
  },
  // 切换Tab栏
  changeTab(e: any) {
    this.setData({
      currentData: e.currentTarget.dataset.current
    })
  }
})