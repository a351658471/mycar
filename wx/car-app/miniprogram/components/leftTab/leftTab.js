Component({
  /**
  * 组件的属性列表
  */
  externalClasses:['my-class'],
  properties: {

    tabList: {
      type: Array,
      value: ['新车', '二手车'],
    },

    tabCurrent: {
      type: Number,
      value: 0
    },

    fontSize: {
      type: String,
      value: '28rpx'
    },
    tabColor:{
      type:String,
      value:'#333333'
    },
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
        tabCurrent: e.currentTarget.dataset.index
      })
      this.triggerEvent('tabClick',{
        tabCurrent:this.data.tabCurrent
      })
    }
  }
})