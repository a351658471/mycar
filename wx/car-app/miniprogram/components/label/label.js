Component({
  /**
   * 组件的属性列表
   */
  properties: {
    Items:{
      type:Array,
      value: []
    },
    newItemData: {
      type: Array,
      value: []
    },
    isDetail:{
      type:Boolean,
      value:true
    },
    disabled:{
      type: Boolean,
      value: true
    },
    change:{
      type: Boolean,
      value: true
    },
    label:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  lifetimes:{
  },
  /**
   * 组件的方法列表
   */
  methods: {
    deleteLabel(e) {
      this.data.label = e.currentTarget.dataset.label
      this.setData(this.data)
      this.triggerEvent('deleteLabel', {
        label: this.data.label
      })
    }
  }
})