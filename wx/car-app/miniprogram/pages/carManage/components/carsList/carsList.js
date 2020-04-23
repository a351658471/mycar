const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    carData: {
      type: Array,
      value: []
    },
    items:{
      type:Array,
      value:[]
    },
    noMore:{
      type:Boolean,
      value:false
    },
    isLoading:{
      type:Boolean,
      value:false
    },
    disabled:{
      type:Boolean,
      value:false
    },
    stickid:{
      type:String,
      value:''
    }

  },
  data: {
    startX: 0, //开始坐标
    startY: 0,
    minSort:0

  },
  /**
   * 组件的方法列表
   */
  ready: function () {
    this.setData({
      minSort: app.globalData.sort
    })
  },
  methods: {
    caritemClick: function (e){
     let index = e.currentTarget.dataset.index;
      if (!this.data.items[index].isOpen){
        // this.triggerEvent('caritemClick', {
        //   itemData: e.currentTarget.dataset.item
        // })
      }
    },
    //记录起点X坐标
    handleTouchStart(e) {
      this.setData({
        startX: e.changedTouches[0].clientX,
      })
    },
    handleTouchEnd(e) {
      let index = e.currentTarget.dataset.index
      if (!this.data.items[index].isOpen) {
        if (this.data.startX - e.changedTouches[0].clientX > 50) {
          this.showButton(e)
        } else {
          this.hideButton(e)
        }
      } else {
        this.hideButton(e)
        // if (e.changedTouches[0].clientX - this.data.startX  > 50) {
        //   this.hideButton(e)
        // } else {
        //   this.showButton(e)
        // }
      }
    },

    //显示按钮
    showButton(e) {
      let itemsIndex = e.currentTarget.dataset.index;
      this.setXmove(itemsIndex, { xmove: -300, isOpen: true })
    },

    hideButton(e) {
      let itemsIndex = e.currentTarget.dataset.index;
      this.setXmove(itemsIndex, { xmove: 0, isOpen: false })
    },


    setXmove(itemsIndex, Xmove) {
      let faker = "items[" + itemsIndex + "]"
      this.setData({
        [faker]: Xmove
      })
    },
    //在售商品
    saleGoods(e){
      this.triggerEvent("saleGoods", {
        id: e.currentTarget.dataset.id
      })
    },
    //已售商品
    soldGoods(e){
      this.triggerEvent("soldGoods", {
        id: e.currentTarget.dataset.id
      })
    },
    //下架商品
    lowGoods(e){
      this.triggerEvent("lowGoods", {
        id: e.currentTarget.dataset.id
      })
    },
    //置顶商品
    stickGoods(e){
      if (this.data.minSort > app.globalData.sort){
        this.data.disabled = true
      }else{
        this.data.minSort = app.globalData.sort + 1
      }
      console.log(e)
      this.triggerEvent("stickGoods",{
        id:e.currentTarget.dataset.id
      })
    },
    //删除商品
    deleteGoods(e){
      this.triggerEvent("deleteGoods",{
        id:e.currentTarget.dataset.id
      })
    },
    //加载更多
    loadMore() {
      this.triggerEvent("loadMore")
    },
    //点击事件
    boxClick(e){
        this.triggerEvent('toEdit', {
          id: e.currentTarget.dataset.item._id
        })
    }

  },
  
})