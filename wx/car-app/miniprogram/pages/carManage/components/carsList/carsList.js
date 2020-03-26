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
    }
  },
  data: {
    startX: 0, //开始坐标
    startY: 0,

  },
  /**
   * 组件的方法列表
   */
  ready: function () {
    console.log("子组件ready")
    // this.data.carData.forEach((item) => {
    //   this.data.items.push({ xmove: 0, isOpen: false })
    // })
  },
  methods: {
    caritemClick: function (e){
      this.triggerEvent('caritemClick', {
        itemData: e.currentTarget.dataset.item
      })
    },
    //记录起点X坐标
    handleTouchStart(e) {
      console.log(e)
      this.setData({
        startX: e.changedTouches[0].clientX,
      })
    },
    handleTouchEnd(e) {
      console.log(11)
      console.log(this.data)
      let index = e.currentTarget.dataset.index
      if (!this.data.items[index].isOpen) {
        if (this.data.startX - e.changedTouches[0].clientX < 5) {
          console.log('详情')
        } else if (this.data.startX - e.changedTouches[0].clientX > 50) {
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
    }
  }

})