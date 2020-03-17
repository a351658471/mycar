Component({
  properties: {
    time: {
      type: String | Number,
      value: "刚刚"
    },
    num: {
      type:Number,
      value:0
    },
    num1: {
      type: Number,
      value: 0
    },
    num2: {
      type: Number,
      value: 0
    }
  },
  data: {

  },
  methods: {
    dian(event: any) {
      var message = this.data.num2
      if (message == 0) {
        message += 1
      } else {
        message -= 1
      }
      this.setData({
        num2: message
      })
    }
  }
})