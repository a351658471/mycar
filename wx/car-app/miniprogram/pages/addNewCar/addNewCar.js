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
    }
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
  blurEvnet3(e) {
    this.data.reqData.mileageValue = e.detail.value
  },
  blurEvnet4(e) {
    this.data.reqData.firstValue = e.detail.value
  },
  blurEvnet5(e) {
    this.data.reqData.standardValue = e.detail.value
  },
  blurEvnet6(e) {
    this.data.reqData.enginedValue = e.detail.value
  },
  blurEvnet7(e) {
    this.data.reqData.horseValue = e.detail.value
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
    let count = 3 - this.data.reqData.imgList.length
    wx.chooseImage({
      count: count,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        let tempFilePaths = res.tempFilePaths;
       tempFilePaths.forEach(item=>{
         this.data.reqData.imgList.push(item)
       })
        let imglist = "reqData.imgList"
        this.setData({
          [imglist]: this.data.reqData.imgList
        })
      }
    })
  },

  //删除图片
  deleteImg(e){
    let index = e.currentTarget.dataset.index;
    this.data.reqData.imgList.splice(index, 1);
    let imglist = "reqData.imgList"
    this.setData({
      [imglist]:this.data.imgList
    })
  },

  next(){
    // this.setData({
    //   isNext:true
    // })
    this.data.reqData.isNew = this.data.isOld
    console.log(this.data.reqData)
    let data = JSON.stringify(this.data.reqData)
        // 调用云函数
    wx.cloud.callFunction({
      name: 'item',
      data: {
        action: "itemAdd",
        shopid: "f841fd285e71d6900011f3b713c5a83f",
        item: {
          name: this.data.typeValue,    // 商品名
          price: this.data.priceValue,  // 价格
          stock: 1,       // 库存
          sort:1002,      // 排序 值越大排越前面
          data: data,     // 数据
        }
      },
      success: res => {
        console.log('[云函数] [item.itemAdd] : ', res.result)
      },
      fail: err => {
        console.error('[云函数] [item.itemAdd] 调用失败', err)
      }
    })
  }


})