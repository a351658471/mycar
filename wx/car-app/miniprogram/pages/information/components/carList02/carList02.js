// components/carList02/carList02.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newsList:{
      type:Array,
      value: [],
    },
    noMore: {
      type: Boolean,
      value: false
    },
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
      let id = e.currentTarget.dataset.item.id;
      let isVideo = e.currentTarget.dataset.item.cover[0].type == 'video'?true:false;
      this.triggerEvent('detail',{
        id:id,
        isVideo:isVideo
      })
    },
    //加载更多
    loadMore() {
      this.triggerEvent("loadMore")
    }
  }
})
