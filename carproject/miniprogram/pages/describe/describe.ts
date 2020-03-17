Page({
  data:{
    title:'全球十大豪车',
    news:'新华社',
    time: '2020-02-22',
    detail:'啊啊啊啊啊啊啊啊啊啊',
    commentnum:0,
    zannum:0,
    content:'',
    facus:true,
    comments:[
      {
          src:'../../assets/img/img4.jpg',
          name:'Name',
          commentIn:'最喜欢跑车',
          commentTime:'02-22 15:55',
          reply:'0',
          fine:0
      },
      {
        src: '../../assets/img/img4.jpg',
        name: 'Name',
        commentIn: '最喜欢跑车2',
        commentTime: '02-22 15:55',
        reply: '0',
        fine: 0
      },
      {
        src: '../../assets/img/img4.jpg',
        name: 'Name',
        commentIn: '最喜欢跑车3',
        commentTime: '02-22 15:55',
        reply: '0',
        fine: 0
      },
      {
        src: '../../assets/img/img4.jpg',
        name: 'Name',
        commentIn: '最喜欢跑车3',
        commentTime: '02-22 15:55',
        reply: '0',
        fine: 0
      }
    ]
  },
  sends:function(e){
    let that = this 
    let commented = {
      src: '../../assets/img/img4.jpg',
      name: 'Name',
      commentIn:e.detail.value,
      commentTime: '02-22 15:55',
      reply: '0',
      fine: 0
    }
    this.data.comments.unshift(commented)
    that.setData({
      comments: this.data.comments,
      commentnum: this.data.commentnum +1
    })

  },
  
  
 
  dian:function(event: any) {
    var index = event.currentTarget.dataset.index;
    var message = this.data.comments;
    if (message[index].fine == 0) {
      message[index].fine += 1
    } else {
      message[index].fine  -= 1
    }
    this.setData({
      comments: message
    })
  }
})