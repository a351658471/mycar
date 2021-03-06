// miniprogram/pages/index/carDetail/card/card.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carWidth: 270,
    carHeight: 480,
    imgBase64: null,
    cHeight: 0,
    cWidth: 0,
    itemid: '',
    carData: [],
    isShow: false,
    soldImage:'../../../../assets/sold.png',
    isSold:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.itemid = options.id
    this.data.isSold = options.sold

    this.setData(this.data)
    console.log(this.data.isSold)
    this.getCarData()
    wx.showLoading({
      title: '正在生成中...',
    })
    var wpx;
    var hpx;
    wx.getSystemInfo({
      success: (res) => {
        wpx = res.windowWidth / 375;
        hpx = res.windowHeight / 850
        this.setData({
          wpx: wpx,
          hpx: hpx
        })

      },
    })
    this.getQrCode(wpx, hpx)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //根据id调用接口获取数据
  getCarData() {
    // 调用云函数  商品列表
    wx.cloud.callFunction({
      name: 'item',
      data: {
        action: "itemList",
        istotal: 0,   //  返回总数
        // 查询条件
        condition: {
          _id: this.data.itemid,
        }
      },
      success: res => {
        // console.log('[云函数] [item.itemList] : ', res.result)
        res.result.data.forEach(item => {
          item.data = JSON.parse(item.data)
          this.data.carData.push(item)
          this.setData({
            carData: this.data.carData
          })

        })
        // console.log(this.data.carData)
      },
      fail: err => {
        // console.error('[云函数] [item.itemList] 调用失败', err)
      }
    })
  },
  //二维码生成
  getQrCode() {
    let wpx = this.data.wpx
    let hpx = this.data.hpx
    let itemid = this.data.itemid
    let number = Math.random()
    let fsm = wx.getFileSystemManager()
    var tempPath = wx.env.USER_DATA_PATH + '/pic' + number + '.png'
    // 调用云函数
    wx.cloud.callFunction({
      name: 'openapi',
      data: {
        scene: itemid,
        action: "getQRCode",
      },
      success: res => {
        console.log('[云函数] [openapi.getQRCode] : ', res)

        this.setData({
          imgBase64: wx.arrayBufferToBase64(res.result.buffer)
        })
        fsm.writeFile({
          data: this.data.imgBase64,
          encoding: 'base64',
          filePath: tempPath,
          success: (res) => {
            wx.getImageInfo({
              src: tempPath,
              success: (res) => {
                var qrWidth = this.data.carWidth * wpx / 4 * 1.2
                this.canvasFunc(tempPath, qrWidth)
              }
            })

            // wx.saveImageToPhotosAlbum({
            //   filePath: tempPath,
            //   success:(res)=>{
            //     this.canvasFunc()
            //   }
            // })
          }
        })
      },
      fail: err => {
        console.error('[云函数] [openapi.getQRCode] 调用失败', err)
      }
    })
  },

  dealWords: function (options) {
    options.ctx.setFontSize(options.fontSize);//设置字体大小
    var allRow = Math.ceil(options.ctx.measureText(options.word).width / options.maxWidth);//实际总共能分多少行
    var count = allRow >= options.maxLine ? options.maxLine : allRow;//实际能分多少行与设置的最大显示行数比，谁小就用谁做循环次数
    var endPos = 0;//当前字符串的截断点
    for (var j = 0; j < count; j++) {
      var nowStr = options.word.slice(endPos);//当前剩余的字符串
      var rowWid = 0;//每一行当前宽度
      if (options.ctx.measureText(nowStr).width > options.maxWidth) {//如果当前的字符串宽度大于最大宽度，然后开始截取
        for (var m = 0; m < nowStr.length; m++) {
          rowWid += options.ctx.measureText(nowStr[m]).width;//当前字符串总宽度
          if (rowWid > options.maxWidth) {
            if (j === options.maxLine - 1) { //如果是最后一行
              options.ctx.fillText(nowStr.slice(0, m - 1) + '...', options.x, options.y + (j + 1) * 18); //(j+1)*18这是每一行的高度
            } else {
              options.ctx.fillText(nowStr.slice(0, m), options.x, options.y + (j + 1) * 18);
            }
            endPos += m;//下次截断点
            break;
          }
        }
      } else {//如果当前的字符串宽度小于最大宽度就直接输出
        options.ctx.fillText(nowStr.slice(0), options.x, options.y + (j + 1) * 18);
      }
    }
  },

  canvasFunc(tempPath, qrWidth) {
    let wpx = this.data.wpx
    let hpx = this.data.hpx
    let type = this.data.carData[0].type == 0 ? '全新 ' : '二手 '
    let name = this.data.carData[0].name
    let label = this.data.carData[0].data.labelList.join(" | ")
    let price = this.data.carData[0].price
    let src = this.data.carData[0].data.imgList[0]
    wx.getImageInfo({
      src: src,
      success: (res) => {
        let imgHeight = res.height * (this.data.carWidth * wpx / res.width)
        let cWidth = this.data.carWidth * wpx;
        let cHeight = this.data.carHeight * hpx;
        let difValue = cHeight * 2 / 3
        console.log("cWidth", cWidth, "cHeight", cHeight)
        this.setData({
          cWidth: cWidth,
          cHeight: cHeight,
          isCanvas: true
        })
        const ctx = wx.createCanvasContext('shareCanvas')
        ctx.setFillStyle('#7EA9FF')
        ctx.fillRect(0, 0, cWidth, cHeight)
        ctx.setFillStyle('#fff')
        ctx.fillRect(10, 10, cWidth-20, cHeight-20)
        ctx.drawImage(res.path, 10, 10, cWidth - 20, imgHeight - 10)
        // ctx.setFillStyle('#fff')
        // ctx.fillRect(0, imgHeight-10, cWidth, difValue - imgHeight)
        // debugger
        
        console.log(typeof(this.data.isSold))
        if(this.data.isSold  == 'true'){
          console.log(this.data.isSold)
          ctx.drawImage(this.data.soldImage,10,10,100,100)
        }
        ctx.drawImage(tempPath, cWidth * 2 / 3 + 10, cHeight - 30 * hpx - qrWidth, qrWidth - 20, qrWidth - 20)
        ctx.setFillStyle('#5C5C5C')
        ctx.setFontSize(12 * wpx)
        ctx.fillText('扫码/长按识别', cWidth * 2 / 3, cHeight - 25 * hpx)
        // 类型
        ctx.setFontSize(13 * wpx)
        ctx.fillText(type, 15, difValue + 44 * hpx)
        // 标题
        ctx.setFillStyle('#000000')  // 文字颜色：黑色
        this.dealWords({
          ctx: ctx,
          fontSize: 16,
          word: name,
          maxWidth: 250,
          x: 15,
          y: difValue - 15,
          maxLine: 1
        })
        // 标签
        ctx.setFillStyle('#6C6C6C')
        this.dealWords({
          ctx: ctx,
          fontSize: 13,
          word: label,
          maxWidth: 170,
          x: 15,
          y: difValue + 45 * hpx * 1.2,
          maxLine: 1
        })
        // 价格
        ctx.setFillStyle('#EA1934')  // 文字颜色
        ctx.setFontSize(18 * wpx)         // 文字字号
        ctx.font = '20px bold'
        ctx.fillText('￥' + price, 15, cHeight - 25 * hpx)
        ctx.draw();
        wx.hideLoading({});
        this.setData({
          isShow: true
        })
      }
    })
  },
  
  //点击保存到相册
  save() {
    // 卡片临时路径
    let wpx = this.data.wpx
    let hpx = this.data.hpx
    let carWidth = this.data.carWidth
    let carHeight = this.data.carHeight
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: carWidth * 3 * wpx,
      height: carHeight * 3 * hpx,
      destWidth: carWidth * 2 * wpx,
      destHeight: carHeight * 2 * hpx,
      canvasId: 'shareCanvas',

      success: (res) => { 
        app.globalFunc.savePicToAlbum(this, res.tempFilePath)
      },
      fail: function (res) {
        console.log('临时路径生成失败')
      }
    });
  },
})