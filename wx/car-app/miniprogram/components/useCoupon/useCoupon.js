// components/useCoupon/useCoupon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    useCondition:{
      type:String,
      value:'有效'
    },
    cancel:{
      type:Boolean,
      value:true
    },
    myCouponData:{
      type:Object,
      value:{}
    },
    residueDegree:{
      type:Number,
      value:0
    },
    isDegree:{
      type:Boolean,
      value:false
    },
    isPurchase:{
      type: Boolean,
      value: false
    },
    conditionColor:{
      type:String,
      value:'#4A4A4A'
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
    couponCancle(){
      this.triggerEvent('couponCancle',{})
   },
    couponConfirm() {
      this.triggerEvent('couponConfirm',{})
    },
    couponPast() {
      this.triggerEvent('couponPast',{})
    }
  }
})
