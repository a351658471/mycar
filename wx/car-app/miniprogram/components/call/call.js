Component({
  /**
   * 组件的属性列表
   */
  properties: {
    callIcon: {
      type: String,
      value: '/assets/dh.png'
    },
    phoneNumber: {
      type: String,
      value: ''
    },
    sameNumber: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showMenu: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

    call() {
      wx.getSystemInfo({
        success: (res) => {
          if (res.platform == "ios") {
            this.callEvent()
          }
          else {
            this.setData({
              showMenu: true
            })
          }
        }
      })
    },
    callEvent() {
      wx.makePhoneCall({
        phoneNumber: this.properties.phoneNumber,
        success: (res_makephone) => {
          this.setData({
            showMenu: false
          })
          console.log("呼叫电话返回：", res_makephone)
        }
      })
    },
    copyEvent() {
      wx.setClipboardData({
        data: this.properties.phoneNumber,
      });
    },
    backEvent() {
      this.setData({
        showMenu: false
      })
    }

  }
})