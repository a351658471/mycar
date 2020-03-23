Component({
  /**
   * 组件的属性列表
   */
  properties: {
    callIcon: {
      type: String,
      value: '/assets/dh.png'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    call() {
      this.triggerEvent("call")
    }
  }
})