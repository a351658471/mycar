// miniprogram/pages/index/carDetail/card/card.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Height: 0,
    imgBase64: null,
    cHeight: 0,
    cWidth: 0,
    imagePath: '',
    itemid:'',
    carData:[],
    isShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.itemid = options.id
    this.getCarData()
    wx.showLoading({
      title: '正在生成中...',
    })
    var wpx;
    var hpx;
    wx.getSystemInfo({
      success: (res) => {
        wpx = res.windowWidth / 375;
        hpx = res.windowHeight / 812
        this.setData({
          wpx: wpx,
          hpx: hpx
        })

      },
    })
    this.getQrCode(wpx, hpx)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
                var qrWidth = 270 * wpx / 4*1.2
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

  canvasFunc(tempPath, qrWidth) {
    let wpx = this.data.wpx
    let hpx = this.data.hpx
    let name = this.data.carData[0].name
    let type = this.data.carData[0].type == 0 ? '全新' : '二手'
    let label = this.data.carData[0].data.labelList.slice(0, 1).join()
    let price = this.data.carData[0].price
    let src = this.data.carData[0].data.imgList[0]
    wx.getImageInfo({
      src: src,
      success: (res) => {
        let imgHeight = res.height * (270 * wpx / res.width)
        let cWidth = 270 * wpx;
        let cHeight = 480*hpx;
        let difValue = cHeight*2/3
        this.setData({
          cWidth: cWidth,
          cHeight: cHeight,
          isCanvas: true
        })
        const ctx = wx.createCanvasContext('shareCanvas')
        ctx.setFillStyle('#fff')
        ctx.fillRect(0, 0, cWidth, cHeight)
        ctx.drawImage(res.path, 0, 0, cWidth, imgHeight)
        ctx.setFillStyle('#fff')
        ctx.fillRect(0, imgHeight, cWidth, difValue - imgHeight)
        ctx.drawImage(tempPath, cWidth * 2 / 3, cHeight - 50 * hpx - qrWidth , qrWidth, qrWidth)
        ctx.setFillStyle('#7B7575') 
        ctx.setFontSize(12* wpx) 
        ctx.fillText('扫描/长按识别', cWidth * 2 / 3, cHeight -25*hpx)
        // ctx.setTextAlign('center')    // 文字居中
        ctx.setFillStyle('#000000')  // 文字颜色：黑色
        ctx.setFontSize(17 * wpx)         // 文字字号：22px
        ctx.fillText(name, 10, difValue)
        ctx.fillText(type, 10, difValue + 45 * hpx)
        ctx.fillText(label, 10, difValue + 45 * hpx * 2)
        ctx.setFillStyle('#ff5777')  // 文字颜色
        ctx.setFontSize(20 * wpx)         // 文字字号
        ctx.fillText('￥' + price, 10, cHeight - 25 * hpx)
        ctx.draw();
        wx.hideLoading({});
        this.setData({
          isShow:true
        })
      }
    })
  },
  //卡片临时路径
  canvasTempPath() {
    let wpx = this.data.wpx
    let hpx = this.data.hpx
    let Height = this.data.Height
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 270 * 3 * wpx,
      height: Height * 3 * hpx,
      destWidth: 270 * 3 * wpx,
      destHeight: Height * 3 * hpx,
      canvasId: 'shareCanvas',

      success: (res) => {
        this.data.imagePath = res

      },
      fail: function (res) {
        console.log('临时路径生成失败')
      }
    });
  },
  //点击保存到相册
  save() {
    this.canvasTempPath()
    // 获取用户是否开启用户授权相册
    wx.getSetting({
      success: (res) => {
        // 如果没有则获取授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          console.log(111)
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              wx.saveImageToPhotosAlbum({
                filePath: this.data.imagePath,
                success: () => {
                  wx.showToast({
                    title: '保存成功'
                  })
                },
                fail: () => {
                  wx.showToast({

                    title: '保存失败',
                    icon: 'none'
                  })
                }
              })
            },
            fail: () => {
              // 如果用户拒绝过或没有授权，则再次打开授权窗口
              //（ps：微信api又改了现在只能通过button才能打开授权设置，以前通过openSet就可打开，下面有打开授权的button弹窗代码）
              that.setData({
                openSet: true
              })
            }
          })
        } else {
          // 有则直接保存
          wx.saveImageToPhotosAlbum({
            filePath: this.data.imagePath.tempFilePath,
            success: (res) => {
              console.log(res)
              wx.showToast({
                title: '保存成功'
              })
            },
            fail: (err) => {
              console.log(this.data.imagePath.tempFilePath)
              console.log(err)
              wx.showToast({
                title: '保存失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },
})