const app = getApp()
Page({
  data: {
    isAdd:true,
      value1: '', //价格
      value2: '',//车型
      value3: '',//里程
      value4: '',//上牌
      value5: '',//排放
      value6: '',//发动机
      value7: '',//马力
    currentText:null,
    // textContent:'',
    carData:[],
    disabled:true,
    // isOld: true,
    typeValue: '',
    isEnter: false,
    isTEnter:false,
    showUpload: true,
    isNext: false,
    // type: {
    //   newCar: 0,
    //   userdCar: 1
    // },
    id:'',
    textValue: ''
  },
  onLoad(options) {
    this.data.id= options.id;
    this.getCarData(this.data.id);
    
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
          shopId: app.globalData.shop._id,
        },

        // status:[2],    // 商品状态 在售 已售 未上架 
        // 分页
        page: 1,
        perpage: 5,
        // 是否排序
        order: 0
      },
      success: res => {
        // console.log('[云函数] [item.itemList] : ', res.result)
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
        // console.log(this.data.carData)
      },
      fail: err => {
        console.error('[云函数] [item.itemList] 调用失败', err)
      }
    })
  },

  // textBulr(e) {
  //   if (e.detail.value != "") {
  //     let data = {
  //       type: 'text',
  //       content: e.detail.value
  //     }
  //     this.data.carData[0].data.detail.push(data)
  //   }
  // },
  textBulr(e) {
    console.log(e)
    if (e.detail.value != "") {
      let data = {
        type: 'text',
        content: e.detail.value
      }
      this.data.carData[0].data.detail.push(data)
      this.setData({
        carData: this.data.carData,
        isTEnter: false
      })

    }
  },
  //添加详情图片
  insertImage() {
    app.globalFunc.uploadImg((r, res) => {
      if (r) {
        for (let index = 0; index < res.fileIDs.length; index++) {
          const element = res.fileIDs[index];
          let data = {
            content: element,
            type: 'image'
          }
          this.data.carData[0].data.detail.push(data)
        }
        this.setData({
          carData: this.data.carData,
          textValue: '',
        })
      }
    })
  },

  // 删除详情图片
  // imgDelete(e) {
  //   let index = e.currentTarget.dataset.index
  //   this.data.carData[0].data.detail.splice(index, 1)
    
  //   this.setData({
  //     carData: this.data.carData
  //   })
  // },
  deleteDetail(e) {
    wx.showModal({
      title: '提示',
      content: '是否确定删除',
      success:(res)=>{
        if(res.confirm){
          let index = e.currentTarget.dataset.index
          this.data.carData[0].data.detail.splice(index, 1)
          this.setData({
            carData: this.data.carData
          })
        }
      }
    })
    
  },
  //添加详情视频
  insertVideo() {
    app.globalFunc.uploadVideo((r, res) => {
      if (r) {
        let data = {
          content: res.fileIDs[0],
          type: 'video'
        }
        this.data.carData[0].data.detail.push(data)
        this.setData({
          carData: this.data.carData,
          textValue: '',
        })
      }
    })
  },
  // videoDelete(e) {
  //   let index = e.currentTarget.dataset.index
  //   this.data.carData[0].data.detail.splice(index, 1)

  //   this.setData({
  //     carData: this.data.carData
  //   })
    // let index = e.currentTarget.dataset.index;
    // console.log(index)
    // this.data.dataList.splice(index, 1)
    // this.setData({
    //   dataList: this.data.dataList
    // })
  // },
  //保存
  saveEvent() {
    // console.log(this.data.carData[0])
    
    if (this.data.carData[0].type == 1) {
      if (this.data.value1 && this.data.value2 && this.data.value3 && this.data.value4) {
        wx.showModal({
          title: '提示',
          content: '是否确认保存',
          success:(res)=>{
            if (res.confirm){
               this.editSaveFunc()
            }
          }
        })
       
      } else {
        wx.showToast({
          title: '必填项不能为空',
          icon: 'none'
        })
      }
    } else {
      if (this.data.value1 && this.data.value2 && this.data.value3) {
        this.editSaveFunc()
      } else {
        // console.log(2222)
        wx.showToast({
          title: '必填项不能为空',
          icon: 'none'
        })
      }

    }
  },
  //本地更改车辆管理页面数据
  editBefore(id){
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    var info = prePage.data.carData;
    info.forEach((item,index)=>{
      if(item._id == id){
        info[index] = this.data.carData[0]
        prePage.setData({
          carData: info
        })
      }
    })
    
  },

  //调用编辑保存接口
  editSaveFunc(){
    if (this.data.carData[0].type ==0){
      for (let i in this.data.carData[0].data.params){
        if (this.data.carData[0].data.params[i].type == 1){
          this.data.carData[0].data.params.splice(i,1)
        }
      }
    }
    let item = {
      _id: this.data.carData[0]._id,
      name: this.data.carData[0].name,
      price: this.data.carData[0].price,
      stock: 1,
      type: this.data.carData[0].type,
      data: JSON.stringify(this.data.carData[0].data),
      // data: this.data.carData[0].data
    };
    // 调用编辑云函数00

    wx.cloud.callFunction({
      name: 'item',
      data: {
        action: "itemEdit",
        shopid: app.globalData.shop._id,
        item: item
      },
      success: res => {
       app.globalData.stateChange()
        let id = this.data.id
        // console.log('[云函数] [item.itemEdit] : ', res.result)
        wx.showToast({
          title: '保存成功',
        })
        this.editBefore(id)
        setTimeout(() => {
          wx.hideToast(),
          wx.navigateBack({})
        }, 1000)

      },
      fail: err => {
        console.error('[云函数] [item.itemEdit] 调用失败', err)
      }
    })

  },
  //单选框
  radioChange(e) {
    let type = "carData[0].type"
    if (e.detail.value == "oldcar") {
      this.setData({
        [type]: app.globalData.type.userCar
      })

    } else {
      this.setData({
        [type]: app.globalData.type.newCar
      })
    }
  },
  blurEvnet1(e) {
    this.data.carData[0].price = e.detail.value;
    this.data.value1 = e.detail.value;
  },
  blurEvnet2(e) {
    this.data.carData[0].name = e.detail.value;
    this.data.value2 = e.detail.value;
  },
  //里程
  blurEvnet3(e) {
    this.data.value3 = e.detail.value;
    let param = {
      type: 0,
      content: e.detail.value
    }
    for (let i in this.data.carData[0].data.params) {
      if (this.data.carData[0].data.params[i].type === param.type) {
        this.data.carData[0].data.params[i].content = e.detail.value
        return
      }
    }
    this.data.carData[0].data.params.push(param)
    // this.data.carData[0].data.params.forEach((item,index)=>{
    //   if(item.type==0){
    //     this.data.carData[0].data.params[index].content = e.detail.value
    //   }
    // })
  },

  //初次上牌
  bindDateChange(e) {
    this.setData({
      value4: e.detail.value
    })
    let param={
      type :1,
      content: e.detail.value
    }
    for (let i in this.data.carData[0].data.params) {
      if (this.data.carData[0].data.params[i].type === param.type) {
        this.data.carData[0].data.params[i].content = e.detail.value
        return
      }
    }
    this.data.carData[0].data.params.push(param)

  },
  //排放
  blurEvnet5(e) {
    let param = {
      type: 2,
      content: e.detail.value
    }
    for (let i in this.data.carData[0].data.params) {
      if (this.data.carData[0].data.params[i].type === param.type) {
        this.data.carData[0].data.params[i].content = e.detail.value
        return
      }
    }
    this.data.carData[0].data.params.push(param)
  },
  //发动机
  blurEvnet6(e) {
    let param = {
      type: 3,
      content: e.detail.value
    }
    for (let i in this.data.carData[0].data.params) {
      if (this.data.carData[0].data.params[i].type === param.type) {
        this.data.carData[0].data.params[i].content = e.detail.value
        return
      }
    }
    this.data.carData[0].data.params.push(param)
  },
  //马力
  blurEvnet7(e) {
    let param = {
      type: 4,
      content: e.detail.value
    }
    for (let i in this.data.carData[0].data.params) {
      if (this.data.carData[0].data.params[i].type === param.type) {
        this.data.carData[0].data.params[i].content = e.detail.value
        return
      }
    }
    this.data.carData[0].data.params.push(param)
  },


  addLabel() {
    this.setData({
      isEnter: !this.data.isEnter
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
  enterBlur(e) {
    if (e.detail.value != '') {
      let newArray = this.data.carData[0].data.labelList;
      newArray.push(e.detail.value);
      let labellist = "carData[0].data.labelList";
      this.setData({
        [labellist]: newArray,
        isEnter: false
      })
    }
  },
  addImg() {
    app.globalFunc.uploadImg((r, res) => {
      if (r) {
        this.data.carData[0].data.imgList = this.data.carData[0].data.imgList.concat(res.fileIDs)
        this.setData(this.data)
      }
    })
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
  textEvent(e){
    console.log(e)
    if (!this.data.disabled && this.data.currentText == null){
         this.setData({
           currentText: e.currentTarget.dataset.index,
         })
    }
  },
  editTextBulr(e){
    console.log(e)
    console.log(this.data.currentText)
    let content={
      type: 'text',
      content:e.detail.value
    }
    let index = this.data.currentText
    if(e.detail.content !=''){
      this.data.carData[0].data.detail[index] = content
      this.setData({
        carData: this.data.carData,
        currentText:null
      })
    }else{
      this.data.carData[0].data.detail.splice(index,1)
      this.setData({
        carData: this.data.carData,
        currentText: null
      })
    }
  },

  //详情文本点击 出现输入框
  textEvent(e) {
    console.log(e)
    if (this.data.currentText == null) {
      this.setData({
        currentText: e.currentTarget.dataset.index,
        textContent: e.currentTarget.dataset.item.content
      })
    }
  },

  //输入框失焦
  editTextBulr(e) {
    console.log(e)
    let content = {
      type: 'text',
      content: e.detail.value
    }
    let index = this.data.currentText
    if (e.detail.content != '') {
      this.data.carData[0].data.detail[index] = content
      this.setData({
        carData: this.data.carData,
        currentText: null
      })
    } else {
      this.data.carData[0].data.detail.splice(index, 1)
      this.setData({
        carData: this.data.carData,
        currentText: null
      })
    }
  },
  insertText() {
    this.setData({
      isTEnter: true
    })
  },
  changeAdd() {
    this.setData({
      isAdd: false
    })
  },
  deleteTextArea() {
    this.setData({
      isTEnter: false,
      isAdd: false,
    })
  },
  toTop(e) {
    this.setData({
      currentText: null
    })
    let index1 = e.currentTarget.dataset.index;
    console.log(index1)
    let index2 = index1 - 1
    if (index1 == 0) return
    let arr = this.data.carData[0].data.detail
    this.data.carData[0].data.detail.splice(index2, 1, ...this.data.carData[0].data.detail.splice(index1, 1, arr[index2]))
    this.setData({
      carData: this.data.carData,
    })
  },
  toDown(e) {
    this.setData({
      currentText: null
    })
    let index1 = e.currentTarget.dataset.index;
    let index2 = index1 + 1;
    let arr = this.data.carData[0].data.detail
    if (index2 == this.data.carData[0].data.detail.length) return
    this.data.carData[0].data.detail.splice(index2, 1, ...this.data.carData[0].data.detail.splice(index1, 1, arr[index2]))
    this.setData({
      carData: this.data.carData,
    })
  }
})