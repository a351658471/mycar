// components/detailEnter/detailEnter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentText:{
      type:Number,
      value:null
    },
    dataList:{
      type:Array,
      value:[]
    },
    isAdd:{
      type:Boolean,
      value:true
    },
    isEnter:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    textContent: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toTop(e) {
      let index1 = e.currentTarget.dataset.index;
      this.triggerEvent("toTop", { index: index1})
      // console.log(index1)
      // let index2 = index1 - 1
      // if (index1 == 0) return
      // let arr = this.data.dataList
      // this.data.dataList.splice(index2, 1, ...this.data.dataList.splice(index1, 1, arr[index2]))
      // this.setData({
      //   dataList: this.data.dataList
      // })
      // console.log(this.data.dataList)
    },
    toDown(e) {
      let index1 = e.currentTarget.dataset.index;
      this.triggerEvent("toDown", { index: index1 })
      // let index2 = index1 + 1;
      // let arr = this.data.dataList
      // if (index2 == this.data.dataList.length) return
      // this.data.dataList.splice(index2, 1, ...this.data.dataList.splice(index1, 1, arr[index2]))
      // this.setData({
      //   dataList: this.data.dataList
      // })
    },
    insertText() {
      this.setData({
        isEnter: true
      })
    },
    changeAdd() {
      this.setData({
        isAdd: false
      })
    },
    deleteTextArea() {
      this.setData({
        isEnter: false,
        isAdd: false,
      })
    },
    insertVideo(){
      this.triggerEvent('insertVideo')
    },
    insertImage(){
      this.triggerEvent('insertImage')
    },
    deleteDetail(e){
      let index = e.currentTarget.dataset.index
      this.triggerEvent('deleteDetail', { index: index})
    },
    //输入框失焦
    editTextBulr(e) {
      console.log(e)
      let value = e.detail.value
      this.triggerEvent('editTextBulr', { value: value})
      // let content = {
      //   type: 'text',
      //   content: e.detail.value
      // }
      // let index = this.data.currentText
      // if (e.detail.content != '') {
      //   this.data.dataList[index] = content
      //   this.setData({
      //     dataList: this.data.dataList,
      //     currentText: null
      //   })
      // } else {
      //   this.data.dataList.splice(index, 1)
      //   this.setData({
      //     dataList: this.data.dataList,
      //     currentText: null
      //   })
      // }
    },
    //详情文本点击 出现输入框
    textEvent(e) {
      console.log(e)
      this.triggerEvent("textEvent", { value: e.currentTarget.dataset})
      // if (this.data.currentText == null) {
      //   this.setData({
      //     currentText: e.currentTarget.dataset.index,
      //     textContent: e.currentTarget.dataset.item.content
      //   })
      // }
    },
    textBulr(e) {
      if (e.detail.value != "") {
        // let data = {
        //   type: 'text',
        //   content: e.detail.value
        // }
        this.triggerEvent('textBulr', { value: e.detail.value})
        // this.data.dataList.push(data)
        // this.setData({
        //   dataList: this.data.dataList,
        //   isEnter: false
        // })
      }
    },
  }
})
