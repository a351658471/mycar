const app = getApp()
Page({
  data: {

      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',

    carData:[],
    disabled:true,
    isOld: true,
    typeValue: '',
    isEnter: false,
    showUpload: true,
    priceValue: 0,
    isNext: false,
    reqData: null,
    oldlevel: {
      newCar: 0,
      userdCar: 1
    },
    dataList: [],
    textCache: null,
    textValue: ''
  },
  onLoad(options) {
    let id= options.id;
    this.getCarData(id)
  },
  //根据id调用接口获取数据
  getCarData(id) {
    // 调用云函数  商品列表
    wx.cloud.callFunction({
      name: 'item',
      data: {
        action: "itemList",
        istotal: 0,   //  返回总数
        // 查询条件
        condition: {
          _id: id,
          shopId: "f841fd285e71d6900011f3b713c5a83f",
          // 名称模糊搜素
          // name: {
          //   $regex: ".*13.*",
          //   $options: 'i'
          // }
        },

        // status:[2],    // 商品状态 在售 已售 未上架 
        // oldlevel,
        // 分页
        page: 1,
        perpage: 5,
        // 是否排序
        order: 0
      },
      success: res => {
        console.log('[云函数] [item.itemList] : ', res.result)
        res.result.data.forEach(item => {
          item.data = JSON.parse(item.data)
          this.data.carData.push(item)
        });
        this.data.carData[0].data.params.forEach(item=>{
          switch(item.type){
            case 0:
                this.setData({
                  value3:item.content
                });
                break;
            case 1:
              this.setData({
                value4: item.content
              });
              break;
            case 2:
              this.setData({
                value5: item.content
              });
              break;
            case 3:
              this.setData({
                value6: item.content
              });
              break;
            case 4:
              this.setData({
                value7: item.content
              });
              break;
          }
        })
        this.setData({
          carData: this.data.carData,
          value1: this.data.carData[0].price,
          value2: this.data.carData[0].name,
        })
        console.log(this.data.carData)
      },
      fail: err => {
        console.error('[云函数] [item.itemList] 调用失败', err)
      }
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
        if (this.data.textCache != null) {
          this.data.dataList.push(this.data.textCache)
        }
        for (let index = 0; index < res.fileIDs.length; index++) {
          const element = res.fileIDs[index];
          let data = {
            content: element,
            type: 'image'
          }
          this.data.dataList.push(data)
        }
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
    this.data.carData[0].data.detail.splice(index, 1)
    
    this.setData({
      carData: this.data.carData
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
    console.log(this.data.carData[0])

    let item = {
      _id: this.data.carData[0]._id,
      name: this.data.carData[0].name,
      price: this.data.carData[0].price,
      stock: 1,
      oldlevel:this.data.carData[0].oldlevel,
      data: JSON.stringify(this.data.carData[0].data),
    };
    
         // 调用编辑云函数00
    wx.cloud.callFunction({
      name: 'item',
      data: {
        action: "itemEdit",
        shopid: "f841fd285e71d6900011f3b713c5a83f",
        item:item
        // item: {
        //   _id:"ae7e55b35e758c9600135dd8065f1744",
        //   name: "911",    // 商品名
        //   price: 666666,   // 价格
        //   stock: 1,   // 库存
        //   data: "{}",     // 数据
        // }
      },
      success: res => {
        console.log('[云函数] [item.itemEdit] : ', res.result)
        wx.showToast({
          title: '保存成功',
        })
        setTimeout(() => {
          wx.hideToast(),
         wx.navigateBack()
        }, 1000)
        
      },
      fail: err => {
        console.error('[云函数] [item.itemEdit] 调用失败', err)
      }
    })


  },
  //单选框
  radioChange(e) {
    let oldlevel = "carData[0].oldlevel"
    if (e.detail.value == "oldcar") {
      this.setData({
        [oldlevel]: 1
      })

    } else {
      this.setData({
        [oldlevel]: 0
      })
    }
    console.log(this.data.carData[0].oldlevel)
  },
  blurEvnet1(e) {
    this.data.carData[0].price = e.detail.value
  },
  blurEvnet2(e) {
    this.data.carData[0].name = e.detail.value
  },
  //里程
  blurEvnet3(e) {
    this.data.carData[0].data.params.forEach((item,index)=>{
      if(item.type==0){
        this.data.carData[0].data.params[index].content = e.detail.value
      }
    })
  },
  //初次上牌
  blurEvnet4(e) {
    this.data.carData[0].data.params.forEach((item, index) => {
      if (item.type == 1) {
        this.data.carData[0].data.params[index].content = e.detail.value
      }
    })
  },
  //排放
  blurEvnet5(e) {
    this.data.carData[0].data.params.forEach((item, index) => {
      if (item.type == 2) {
        this.data.carData[0].data.params[index].content = e.detail.value
      }
    })
  },
  //发动机
  blurEvnet6(e) {
    this.data.carData[0].data.params.forEach((item, index) => {
      if (item.type == 3) {
        this.data.carData[0].data.params[index].content = e.detail.value
      }
    })
  },
  //马力
  blurEvnet7(e) {
    this.data.carData[0].data.params.forEach((item, index) => {
      if (item.type == 4) {
        this.data.carData[0].data.params[index].content = e.detail.value
      }
    })
  },


  addLabel() {
    this.setData({
      isEnter: true
    })
  },
  deleteLabel(e) {
    let index = e.currentTarget.dataset.index
    this.data.carData[0].data.labelList.splice(index, 1)
    let labellist = "carData[0].data.labelList"
    this.setData({
      [labellist]: this.data.carData[0].data.labelList
    })

  },
  enterBlur() {
    this.setData({
      isEnter: false
    })
  },
  //添加标签确定按钮
  enterEvent(e) {
    let newArray = this.data.carData[0].data.labelList;
    newArray.push(e.detail.value);
    let labellist = "carData[0].data.labelList";
    this.setData({
      [labellist]: newArray
    })
  },
  //添加图片
  addImg() {
    app.globalFunc.uploadImg((r, res) => {
      if (r) {
        this.data.carData[0].data.imgList = this.data.carData[0].data.imgList.concat(res.fileIDs)
        this.setData(this.data)
      }
    })
    // let count = 3 - this.data.reqData.imgList.length
    // wx.chooseImage({
    //   count: count,
    //   sizeType: ['compressed'],
    //   sourceType: ['album', 'camera'],
    //   success: (res) => {
    //     let tempFilePaths = res.tempFilePaths;
    //     tempFilePaths.forEach(item => {
    //       this.data.reqData.imgList.push(item)
    //     })
    //     let imglist = "reqData.imgList"
    //     this.setData({
    //       [imglist]: this.data.reqData.imgList
    //     })
    //     console.log(this.data.reqData.imgList)
    //   }
    // })
  },

  //删除图片
  deleteImg(e) {
    let index = e.currentTarget.dataset.index;
    this.data.carData[0].data.imgList.splice(index, 1);
    let imglist = "carData[0].data.imgList"
    this.setData({
      [imglist]: this.data.carData[0].data.imgList
    })
  },

  edit() {
    this.setData({
      disabled: false
    })
  },
})