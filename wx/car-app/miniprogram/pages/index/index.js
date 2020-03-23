Page({
  data:{
  imgList:  ['/assets/1.jpg', '/assets/2.jpg', '/assets/3.jpg'],
    isNew:true,
    
    //模拟数据
    simulation:[
      {
        id:1,
        carImg: '/assets/3.jpg',
        carName: '兰博基尼-Huracan610',
        isNew: false,
        price: '200万',
        basic: [
          '2.0T-H4',
          '250p']
      },
      {
        id: 2,
        carImg: '/assets/2.jpg',
        carName: '兰博基尼-Huracan610',
        isNew: false,
        price: '200万',
        basic: [
          '2.0T-H4',
          '250p']
      },
      {
        id: 3,
        carImg: '/assets/1.jpg',
        carName: '兰博基尼-Huracan610',
        isNew: false,
        price: '200万',
        basic: [
          '2.0T-H4',
          '250p']
      },
      {
        id: 4,
        carImg: '/assets/1.jpg',
        carName: '兰博基尼-Huracan610',
        isNew: true,
        price: '200万',
        basic: [
          '2.0T-H4',
          '250p']
      },
      {
        id: 5,
        carImg: '/assets/2.jpg',
        carName: '兰博基尼-Huracan610',
        isNew: true,
        price: '200万',
        basic: [
          '2.0T-H4',
          '250p']
      },
      {
        id: 6,
        carImg: '/assets/3.jpg',
        carName: '兰博基尼-Huracan610',
        isNew: true,
        price: '200万',
        basic: [
          '2.0T-H4',
          '250p']
      },
    ],
    newcar:[],
    oldcar:[]
  },

  //生命周期函数初次渲染完成
  onLoad: function (){


    //过滤新车
    let newcar = this.data.simulation.filter((item) => {
      return item.isNew
    })
    //过滤旧车
    let oldcar = this.data.simulation.filter((item) => {
      return !item.isNew
    })

    this.setData({
      newcar: newcar,
      oldcar: oldcar
    })
  },

  tabClick: function (e){
    if (e.detail.tabCurrent == 0) {
      this.setData({
        isNew: true
      })
    } else {
      this.setData({
        isNew: false
      })

    }
  },

  caritemClick: function (e) {
    let carId = e.detail.itemData.id
    wx.navigateTo({
      url: '/pages/index/carDetail/carDetail?carId=' + carId
    })
  }

})