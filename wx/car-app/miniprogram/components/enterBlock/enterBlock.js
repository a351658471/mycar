// components/enterBlock/enterBlock.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentText: null,
    textContent: '',
    isAdd: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //输入框失焦
    editTextBulr(e) {
      let content = {
        type: 'text',
        content: e.detail.value
      }
      let index = this.data.currentText
      this.setData({
        currentText: null
      })
      this.triggerEvent('editTextBulr', { data: content, index:index} )
    },
    //详情文本点击 出现输入框
    textEvent(e) {
      console.log(e)
      console.log(this.data.currentText)
      console.log(this.data.textContent)
      if (this.data.currentText == null) {
        this.setData({
          currentText: e.currentTarget.dataset.index,
          textContent: e.currentTarget.dataset.item.content
        })
        
      }
    },
    //上移
    toTop(e) {
      // this.setData({
      //   currentText: null
      // })
      setTimeout(()=>{
        let index1 = e.currentTarget.dataset.index;
        let index2 = index1 - 1
        if (index1 == 0) return
        this.triggerEvent('toTop', {
          index1:index1,
          index2:index2
        })
      },50)
    },
    //下移
    toDown(e) {
      // this.setData({
      //   currentText: null
      // })
      setTimeout(()=>{
        let index1 = e.currentTarget.dataset.index;
       let index2 = index1 + 1;
      if (index2 == this.data.dataList.length) return
      this.triggerEvent('toDown', {
        index1: index1,
        index2: index2
      })
      },50)
    },
    //删除块
    deleteDetail(e) {
      wx.showModal({
        title: '提示',
        content: '是否确定删除',
        success: (res) => {
          if (res.confirm) {
            let index = e.currentTarget.dataset.index
            this.triggerEvent('deleteDetail',index)
          }
        }
      })

    },
    //隐藏添加按钮  变为三个按钮
    changeAdd() {
      this.setData({
        isAdd: false
      })
    },
    //添加文字按钮
    insertText() {
      let data = {
        type: 'text',
        content: ''
      }
      this.triggerEvent('insertText', data)
    },
    //添加视频
    insertVideo() {
      app.globalFunc.uploadVideo((r, res) => {
        if (r) {
          let data = {
            content: res.fileIDs[0],
            type: 'video'
          }
          this.triggerEvent('insertVideo', data)
        }
      })
    },
    //添加图片
    insertImage() {
      app.globalFunc.uploadImg((r, res) => {
        if (r) {
          for (let index = 0; index < res.fileIDs.length; index++) {
            const element = res.fileIDs[index];
            let data = {
              content: element,
              type: 'image'
            }
            this.triggerEvent('insertImage', data)
          }
          
        }
      })
    },
    //大图展示
    topic_preview(e){
      console.log(e)
      let urls = []
      this.data.dataList.forEach(item=>{ 
        if(item.type == 'image') urls.push(item.content)
      })
      wx.previewImage({
        current:e.currentTarget.dataset.url,
        urls:urls
      })
    }
  }
})
