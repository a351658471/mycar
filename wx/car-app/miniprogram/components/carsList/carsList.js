Component({
  /**
   * 组件的属性列表
   */
  properties: {
    carData: {
      type: Array,
      value: []
    },
    noMore: {
      type: Boolean,
      value: false
    },
    isLoading: {
      type: Boolean,
      value: false
    }
  },
  /**
   * 组件的方法列表
   */
  onReady: function (){},
  methods: {
    caritemClick: function (e){
      this.triggerEvent('caritemClick', {
        itemData: e.currentTarget.dataset.item._id
      })
    },
    //加载更多
    loadMore() {
      this.triggerEvent("loadMore")
    }
  }
})