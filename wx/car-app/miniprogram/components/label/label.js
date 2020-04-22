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
    ready(){
      let arr = []
      this.data.Items.forEach((item)=>{
         if(this.data.Items.length<=2){
           if (item.length > 11) {
             arr.push(item.substring(0, 11))
             this.data.newItemData = arr
           }
           else {
             arr.push(item)
           }
         }
         else{
          //  if (item.length > 5) {
          //    arr.push(item.substring(0, 5))
          //    this.data.newItemData = arr
          //  }
          //  else {
          //    arr.push(item)
          //  }
          arr.push(this.data.Items[0].substring(0,7))
          arr.push(this.data.Items[1].substring(0, 7))
          arr.push(this.data.Items[2].substring(0, 4))
          this.data.newItemData = arr
         }
      })
      if (this.data.isDetail){
        arr.splice(3)
        this.setData({
          newItemData: arr
        })
      }
      else{
        this.setData({
          newItemData: arr
        })
      }
    }
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