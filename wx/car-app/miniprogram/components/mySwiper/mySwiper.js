Component({
  /**
  * 组件的属性列表
  */
  properties: {
    imgList: {
      type: Array,
      value: []

    },
    isMyDots: {
      type: Boolean,
      value: false
    },
    isDots: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

    currentIndex: 1
  },

  /**
  * 组件的方法列表
  */
  methods: {
    changeCurrent(e){
      this.setData({
        currentIndex: e.detail.current + 1
      })
    }
  }
})