const app = getApp()
Page({
  data: {
    isFocus:false,
    date:'',
    pass:null,
    isOld: true,
    typeValue:'',
    isEnter: false,
    showUpload: true,
    priceValue:'',
    isNext:false,
    gl:'',
    sp:'',
    reqData:{
      imgList: [],
      labelList: [],
      params:[]
    },
    
    dataList: [],
    
  },
  onLoad() {},

  
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
    this.data.gl = e.detail.value
    let param={
      type:0,
      content: e.detail.value
    }
      for (let i in this.data.reqData.params) {
        if (this.data.reqData.params[i].type === param.type){
           this.data.reqData.params[i] = param
              return
         }
      }
    this.data.reqData.params.push(param)

  },

  //初次上牌
  bindDateChange(e) {
    this.data.sp = e.detail.value
    this.setData({
      date: e.detail.value
    })
    let param = {
      type: 1,
      content: e.detail.value
    }
    for (let i in this.data.reqData.params) {
      if (this.data.reqData.params[i].type === param.type) {
        this.data.reqData.params[i] = param
        return
      }
    }
    this.data.reqData.params.push(param)
    console.log(this.data.reqData.params)
    
  },
  //排放
  blurEvnet5(e) {
    let param = {
      type: 2,
      content: e.detail.value
    }
    for (let i in this.data.reqData.params) {
      if (this.data.reqData.params[i].type === param.type) {
        this.data.reqData.params[i] = param
        return
      }
    }
    this.data.reqData.params.push(param)
  },
  //发动机
  blurEvnet6(e) {
    let param = {
      type: 3,
      content: e.detail.value
    }
    for (let i in this.data.reqData.params) {
      if (this.data.reqData.params[i].type === param.type) {
        this.data.reqData.params[i] = param
        return
      }
    }
    this.data.reqData.params.push(param)
  },
  //马力
  blurEvnet7(e) {
    let param = {
      type: 4,
      content: e.detail.value
    }
    for (let i in this.data.reqData.params) {
      if (this.data.reqData.params[i].type === param.type) {
        this.data.reqData.params[i] = param
        return
      }
    }
    this.data.reqData.params.push(param)
  },


  addLabel() {
    this.setData({
      isEnter: !this.data.isEnter,
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
  enterBlur(e) {
    if(e.detail.value !=''){
      let newArray = this.data.reqData.labelList;
      newArray.push(e.detail.value);
      let labellist = "reqData.labelList";
      this.setData({
        [labellist]: newArray,
        isEnter: false
      })
    }
  },
  //添加标签确定按钮
  // enterEvent(e) {
  //   // console.log("确定")
  //   if (e.detail.value != '') {
  //     let newArray = this.data.reqData.labelList;
  //     newArray.push(e.detail.value);
  //     let labellist = "reqData.labelList";
  //     this.setData({
  //       [labellist]: newArray
  //     })
  //   }
  // },
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
    if(this.data.isOld){
      if (this.data.priceValue && this.data.typeValue && this.data.gl && this.data.sp) {
        wx.navigateTo({
          url: 'detail/detail',
        })
      }else{
        wx.showToast({
          title: '必填项不能为空',
          icon:'none'
        })
      }
    }else{
      if (this.data.priceValue && this.data.typeValue && this.data.gl){
        wx.navigateTo({
          url: 'detail/detail',
        })
      }else{
        wx.showToast({
          title: '必填项不能为空',
          icon: 'none'
        })
      }
      
    }
  },


})