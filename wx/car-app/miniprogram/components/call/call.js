Component({
  /**
   * 组件的属性列表
   */
  properties: {
    callIcon: {
      type: String,
      value: '/assets/dh.png'
    },
    phoneNumber:{
      type: String,
      value: ''
    },
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

    call() {
      wx.makePhoneCall({
        phoneNumber:  this.properties.phoneNumber,
        success: (res_makephone) => {
          this.setData({
            hideShare: !this.data.hideShare
          })
          console.log("呼叫电话返回：", res_makephone)
        }
      })

    },

  }
})