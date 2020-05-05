// components/coupon/coupon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    couponData:{
      type:Array,
      value:[]
    },
    isNeed:{
      type:Boolean,
      value:true
    },
    rightBcg:{
      type:String,
      value:'linear-gradient(to bottom,#FFE4A7,#FBCE67)'
    },
    btnBcg:{
      type:String,
      value:'#FFF6EF'
    },
    btnContent:{
      type:String,
      value:'兑换'
    },
    rewardnum:{
      type:String,
      value:''
    },
    isIntegral:{
      type:Boolean,
      value:true
    },
    conditionColor:{
      type:String,
      value:''
    },
    isUsedCard:{
      type:Boolean,
      value:true
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
    jumpToDetail(e){
      console.log(e)
      this.triggerEvent('jumpToDetail',{
        id:e.currentTarget.dataset.id,
        type:e.currentTarget.dataset.type
      })
    }
  }
})
