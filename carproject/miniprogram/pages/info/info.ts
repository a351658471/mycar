//info.ts

Page({
  data: {
    search: '搜索',
    view: '关注',
    playground: '广场',
    topic: '话题',
    currentData: 1,
    names: [
      {
        name: '车车车',
        tar: '#兰博基尼#',
        word: '黄色拉风跑车酷炫十足你值得拥有黄色拉风跑车酷炫十足你值得拥有',
        src1: '../../assets/img/img4.jpg',
        src: [
          '../../assets/img/img1.jpg',
          '../../assets/img/img1.jpg',
          '../../assets/img/img1.jpg'
        ],
        time:"刚刚"
      },
      {
        name: '车车车',
        tar: '#兰博基尼#',
        word: '黄色拉风跑车酷炫十足你值得拥有黄色拉风跑车酷炫十足你值得拥有',
        src1: '../../assets/img/img4.jpg',
        src: [
          '../../assets/img/img1.jpg',
          '../../assets/img/img1.jpg',
          '../../assets/img/img1.jpg'
        ],
        time: "刚刚"
      },
      {
        name: '车车车',
        tar: '#兰博基尼#',
        word: '黄色拉风跑车酷炫十足你值得拥有黄色拉风跑车酷炫十足你值得拥有',
        src1: '../../assets/img/img4.jpg',
        src: [
          '../../assets/img/img1.jpg',
          '../../assets/img/img1.jpg',
          '../../assets/img/img1.jpg'
        ],
        time: "刚刚"
      }
    ]
  },
  // 清空搜索栏
  close(e: any) {
    console.log(e);
    this.setData({
      'search': ''
    })
  },
  // 切换Tab栏
  changeTab(e: any) {
    const that = this;
    that.setData({
      currentData: e.currentTarget.dataset.current
    })
  }
})