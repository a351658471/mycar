Component({
  /**
   * 组件的属性列表
   */
  properties: {
    carData: {
      type: Array,
      value: []
    }
  },
  /**
   * 组件的方法列表
   */
  onReady: function (){
    console.log('11111111111111111111')
    console.log(this.carData)
  },
  methods: {
    caritemClick: function (e){
      console.log(e)
      this.triggerEvent('caritemClick', {
        itemData: e.currentTarget.dataset.item
      })
    }
  }
})