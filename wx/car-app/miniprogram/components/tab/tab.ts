Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(e:any):void{
      this.setData({
        currentIndex: e.target.dataset.index
      })
      this.triggerEvent('tabClick', {
        currentIndex: this.data.currentIndex
      })
    }
  }
})
