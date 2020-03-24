Page({
  data: {
    isOld: true,
    labelList: ['2.0T-H4', '250P'],
    isEnter: false,
    showUpload: true,
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


  addLabel() {
    console.log(111)
    this.setData({
      isEnter: true
    })
  },
  deleteLabel(e) {
    let index = e.currentTarget.dataset.index
    this.data.labelList.splice(index, 1)
    this.setData({
      labelList: this.data.labelList
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
    let newArray = this.data.labelList;
    newArray.push(e.detail.value);
    this.setData({
      labelList: newArray
    })
  },

  uploadImg() {
    wx.chooseImage({
      count: 3,
      success: (res) => {
        let tempFilePaths = res.tempFilePaths;
        console.log(res)
      }
    })
  }
})