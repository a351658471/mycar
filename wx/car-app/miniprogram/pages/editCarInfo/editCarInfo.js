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
    reqData: {
      imgList: [],
      labelList: ['2.0T-H4', '250P'],
      params: []
    },
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
    wx.chooseImage({
      count: 1,
      success: (res) => {
        let data = {
          content: res.tempFilePaths[0],
          type: 'image'
        }
        if (this.data.textCache != null) {
          console.log(1111111)
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
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: (res) => {
        console.log(res)
        let data = {
          content: res.tempFilePath,
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
    let oldlevel = 0
    if (this.data.isOld) {
      oldlevel = [this.data.oldlevel.userdCar]
    } else {
      oldlevel = [this.data.oldlevel.newCar]
    }
    this.data.reqData.detail = this.data.dataList
    let item = {
      name: this.data.typeValue, // 商品名
      price: this.data.priceValue,// 价格
      stock: 1,       // 库存
      sort: 1002,      // 排序 值越大排越前面
      data: JSON.stringify(this.data.reqData),     // 数据
      status: 2,
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
  blurEvnet1(e) {
    this.data.priceValue = e.detail.value
  },
  blurEvnet2(e) {
    this.data.typeValue = e.detail.value
  },
  //里程
  blurEvnet3(e) {
    let param = {
      type: 0,
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
    let count = 3 - this.data.reqData.imgList.length
    wx.chooseImage({
      count: count,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        let tempFilePaths = res.tempFilePaths;
        tempFilePaths.forEach(item => {
          this.data.reqData.imgList.push(item)
        })
        let imglist = "reqData.imgList"
        this.setData({
          [imglist]: this.data.reqData.imgList
        })
        console.log(this.data.reqData.imgList)
      }
    })
  },

  //删除图片
  deleteImg(e) {
    let index = e.currentTarget.dataset.index;
    this.data.reqData.imgList.splice(index, 1);
    let imglist = "reqData.imgList"
    this.setData({
      [imglist]: this.data.reqData.imgList
    })
  },

  edit() {
    this.setData({
      disabled: false
    })
  },
})