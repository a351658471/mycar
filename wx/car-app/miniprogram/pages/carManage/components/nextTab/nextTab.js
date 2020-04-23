Component({
  /**
  * 组件的属性列表
  */
  properties: {

    tabList: {
      type: Array,
      value: ['二手车','新车'],
    },
    tabCurrents: {
      type: Number,
      value: 0
    },

    fontSize: {
      type: String,
      value: '14px'
    },
    oldCarNum:{
      type:Number,
      value:0
    },
    newCarNum: {
      type: Array,
      value: []
    }
  },
  data:{
    num:0
  },
  /**
  * 启用插槽
  */
  options: {
    multipleSlots: true
  },
  /**
  * 组件的方法列表
  */
  methods: {
    tabClick(e){
      this.setData({
        tabCurrents: e.currentTarget.dataset.index
      })
      this.triggerEvent('tabClick',{
        tabCurrents:this.data.tabCurrents
      })
    }
  }
})