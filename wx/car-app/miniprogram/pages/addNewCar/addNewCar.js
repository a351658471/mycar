const app = getApp()
Page({
  data: {
    isOld: true,
    typeValue:'',
    isEnter: false,
    showUpload: true,
    priceValue:0,
    isNext:false,
    reqData:{
      imgList: [],
      labelList: ['2.0T-H4', '250P'],
      params:[]
    },
    oldlevel:{
      newCar:0,
      userdCar:1
    },
    dataList: [],
    textCache: null,
    textValue: ''
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
  textBulr(e) {
    if (e.detail.value != "") {
      let data = {
        type: 'text',
        content: e.detail.value
      }
      this.setData({
        textCache: data
      })
    }

  },
  insertImage() {
    app.globalFunc.uploadImg((r, res) => {
      if (r) {
        let data = {
          content: res.fileID,
          type: 'image'
        }
        if (this.data.textCache != null) {
          this.data.dataList.push(this.data.textCache)
        }
        this.data.dataList.push(data)
        this.setData({
          dataList: this.data.dataList,
          textValue: '',
          textCache: null
        })
      }
    })
    // wx.chooseImage({
    //   count: 1,
    //   success: (res) => {
    //     let data = {
    //       content: res.tempFilePaths[0],
    //       type: 'image'
    //     }
    //     if (this.data.textCache != null) {
    //       console.log(1111111)
    //       this.data.dataList.push(this.data.textCache)
    //     }
    //     this.data.dataList.push(data)
    //     this.setData({
    //       dataList: this.data.dataList,
    //       textValue: '',
    //       textCache: null
    //     })
    //   }
    // })
  },
  imgDelete(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    this.data.dataList.splice(index, 1)
    this.setData({
      dataList: this.data.dataList
    })
  },
  insertVideo() {
    app.globalFunc.uploadVideo((r, res) => {
      if (r) {
        let data = {
          content: res.fileID,
          type: 'video'
        }
        if (this.data.textCache != null) {
          this.data.dataList.push(this.data.textCache)
        }
        this.data.dataList.push(data)
        this.setData({
          dataList: this.data.dataList,
          textValue: '',
          textCache: null
        })
      }
    })

    // wx.chooseVideo({
    //   sourceType: ['album', 'camera'],
    //   maxDuration: 60,
    //   camera: 'back',
    //   success: (res) => {
    //     console.log(res)
    //     let data = {
    //       content: res.tempFilePath,
    //       type: 'video'
    //     }
    //     if (this.data.textCache != null) {
    //       this.data.dataList.push(this.data.textCache)
    //     }
    //     this.data.dataList.push(data)
    //     this.setData({
    //       dataList: this.data.dataList,
    //       textValue: '',
    //       textCache: null
    //     })
    //   }
    // })
  },
  videoDelete(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index)
    this.data.dataList.splice(index, 1)
    this.setData({
      dataList: this.data.dataList
    })
  },
  saveEvent() {
    let oldlevel=0
    if (this.data.isOld){
      oldlevel = this.data.oldlevel.userdCar
    }else{
      oldlevel = this.data.oldlevel.newCar
    }
    this.data.reqData.detail = this.data.dataList
    let item = {
      name: this.data.typeValue, // 商品名
      price: this.data.priceValue,// 价格
      stock: 1,       // 库存
      sort: 1002,      // 排序 值越大排越前面
      data: JSON.stringify(this.data.reqData),     // 数据
      status:2,
      oldlevel,
    }
   //调用云函数
    wx.cloud.callFunction({
      name: 'item',
      data: {
        action: "itemAdd",
        shopid: "f841fd285e71d6900011f3b713c5a83f",
        item: item
        // {
        //   name: this.data.typeValue,    // 商品名
        //   price: this.data.priceValue,  // 价格
        //   stock: 1,       // 库存
        //   sort: 1002,      // 排序 值越大排越前面
        //   data: data,     // 数据
        // }
      },
      success: res => {
        console.log('[云函数] [item.itemAdd] : ', res.result)
      },
      fail: err => {
        console.error('[云函数] [item.itemAdd] 调用失败', err)
      }
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
    console.log(111)
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
        this.data.reqData.imgList.push(res.fileID)
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
    this.setData({
      isNext:true
    })
   
  },
})