const app = getApp()
Page({
  data: {
    pass:null,
    isOld: true,
    typeValue:'',
    isEnter: false,
    showUpload: true,
    priceValue:0,
    isNext:false,
    reqData:{
      imgList: [],
      labelList: [],
      params:[]
    },
    
    dataList: [],
    
  },
  onLoad() {
    // const platform = wx.getSystemInfoSync().platform
    // const isIOS = platform === 'ios'
    // this.setData({ isIOS })
    // const that = this
    // this.updatePosition(0)
    // let keyboardHeight = 0
    // wx.onKeyboardHeightChange(res => {
    //   console.log(res)
    //   if (res.height === keyboardHeight) return
    //   const duration = res.height > 0 ? res.duration * 1000 : 0
    //   keyboardHeight = res.height
    //   setTimeout(() => {
    //     wx.pageScrollTo({
    //       scrollTop: 0,
    //       success() {
    //         that.updatePosition(keyboardHeight)
    //         that.editorCtx.scrollIntoView()
    //       }
    //     })
    //   }, duration)
    // })
  },
  // updatePosition(keyboardHeight) {
  //   const toolbarHeight = 50
  //   const { windowHeight, platform } = wx.getSystemInfoSync()
  //   let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
  //   this.setData({ editorHeight, keyboardHeight })
  // },

  back(){
    this.setData({
      isNext:false
    })
  },



  
  //单选框
  radioChange(e) {
    if (e.detail.value == "oldcar") {
      this.setData({
        isOld: true
      })

    } else {
      this.setData({
        isOld: false
      })
    }
  },
  blurEvnet1(e){
    this.data.priceValue = e.detail.value
  },
  blurEvnet2(e) {
    this.data.typeValue = e.detail.value
  },
  //里程
  blurEvnet3(e) {
    let param={
      type:0,
      content: e.detail.value
    }
    this.data.reqData.params.push(param)
  },
  //初次上牌
  blurEvnet4(e) {
    let param = {
      type: 1,
      content: e.detail.value
    }
    this.data.reqData.params.push(param)
  },
  //排放
  blurEvnet5(e) {
    let param = {
      type: 2,
      content: e.detail.value
    }
    this.data.reqData.params.push(param)
  },
  //发动机
  blurEvnet6(e) {
    let param = {
      type: 3,
      content: e.detail.value
    }
    this.data.reqData.params.push(param)
  },
  //马力
  blurEvnet7(e) {
    let param = {
      type: 4,
      content: e.detail.value
    }
    this.data.reqData.params.push(param)
  },


  addLabel() {
    this.setData({
      isEnter: true
    })
  },
  deleteLabel(e) {
    let index = e.currentTarget.dataset.index
    this.data.reqData.labelList.splice(index, 1)
    let labellist = "reqData.labelList"
    this.setData({
      [labellist]: this.data.reqData.labelList
    })

  },
  enterBlur() {
    this.setData({
      isEnter: false
    })
  },
  //添加标签确定按钮
  enterEvent(e) {
    console.log("确定")
    let newArray = this.data.reqData.labelList;
    newArray.push(e.detail.value);
    let labellist = "reqData.labelList";
    this.setData({
      [labellist]: newArray
    })
  },
  //添加图片
  addImg() {
    app.globalFunc.uploadImg((r, res) => {
      if (r) {
        this.data.reqData.imgList = this.data.reqData.imgList.concat(res.fileIDs)
        this.setData(this.data)
      }
    })
  },

  //删除图片
  deleteImg(e){
    let index = e.currentTarget.dataset.index;
    this.data.reqData.imgList.splice(index, 1);
    let imglist = "reqData.imgList"
    this.setData({
      [imglist]: this.data.reqData.imgList
    })
  },

  next(){
   wx.navigateTo({
     url: 'detail/detail',
   })
  },
})