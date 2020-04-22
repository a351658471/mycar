Component({
  /**
  * 组件的属性列表
  */
  properties: {

    tabList: {
      type: Array,
      value: ['二手车','新车'],

    },

    tabCurrent: {
      type: Number,
      value: 0
    },

    fontSize: {
      type: String,
      value: '14px'
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