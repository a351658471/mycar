Component({
  /**
   * 组件的属性列表
   */
  properties: {
    callIcon: {
      type: String,
      value: '/assets/dh.png'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hideShare: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // call() {
    //   this.triggerEvent("call")
    // },
    // 模块遮罩层
    call: function () {
      var hides = this.data.hideShare;

      if (hides == true) {
        this.setData({
          hideShare: false
        })
      } else if (hides == false) {
        this.setData({
          hideShare: true
        })
      }

    },

    copyEvent() {
      wx.setClipboardData({
        data: '18650883333',
        success: () => {
          this.setData({
            hideShare: !this.data.hideShare
          })
          wx.showToast({
            title: '复制成功'
          })
        }
      })
    },

    callEvent() {
      wx.makePhoneCall({
        phoneNumber: '18650883333',
        success: (res_makephone) => {
          this.setData({
            hideShare: !this.data.hideShare
          })
          console.log("呼叫电话返回：", res_makephone)
        }
      })

      // wx.showActionSheet({
      //   itemList:['12312312312','呼叫']
      // })
    },

    backEvent() {
      this.setData({
        hideShare: !this.data.hideShare
      })
    }
  }
})