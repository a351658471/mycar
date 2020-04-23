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
      type: Number,
      value: 0
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

  ready(){
    console.log(this.data.newCarNum)
    console.log(this.data.tabCurrents)
    if (this.data.tabCurrents == 0){
      this.data.num = this.data.newCarNum
      this.setData(this.data)
    }
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