// components/carList02/carList02.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newsList:{
      type:Array,
      value: [
        {
          msg: " 自动挡4不准,一个比一个上车，别傻傻不知道了dfghdfgdfgdrsdff",
          timeago: '1586767325',
          cover: [
            {
              type: 'video',
              content: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400'
            }
          ],
          zf: '1',
          pl: '1',
          dz: 23,
          author:'厦门车神俱乐部',
          isAdd: true,
          isVideo:true
        },
        {
          msg: " 自动挡'4不准',一个比一个上车，别傻傻不知道了",
          timeago: '1586767325',
          cover:[
            {
              type:'image',
              content: 'https://7431-t1-6ciuq-1301592150.tcb.qcloud.la/1585707827024_43933.jpg',
            },
            {
              type: 'image',
              content: 'https://7431-t1-6ciuq-1301592150.tcb.qcloud.la/1585707827024_43933.jpg',
            },
            {
              type: 'image',
              content: 'https://7431-t1-6ciuq-1301592150.tcb.qcloud.la/1585707827024_43933.jpg',
            },
          ],
          zf: '2',
          pl: '2',
          dz: 23,
          author: '厦门车神俱乐部',
          isAdd: true,
          isVideo: false
        },
        {
          msg: " 自动挡'4不准',一个比一个上车，别傻傻不知道了",
          timeago: '1586767325',
          cover: [
            {
              type: 'image',
              content: 'https://7431-t1-6ciuq-1301592150.tcb.qcloud.la/1585707827024_43933.jpg',
            },
            {
              type: 'image',
              content: 'https://7431-t1-6ciuq-1301592150.tcb.qcloud.la/1585707827024_43933.jpg',
            },
            {
              type: 'image',
              content: 'https://7431-t1-6ciuq-1301592150.tcb.qcloud.la/1585707827024_43933.jpg',
            },
          ],
          zf: '3',
          pl: '3',
          author: '厦门车神俱乐部',
          dz: 23,
          isAdd: true,
          isVideo: false
        }
      ],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //跳转到详情页
    detail(e) {
      this.triggerEvent('detail',{
        imgurl:e.currentTarget.dataset.imgurl
      })
    },
  }
})
