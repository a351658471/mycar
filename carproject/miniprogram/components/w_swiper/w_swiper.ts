Component({
  properties: {
    swiperList: {
      type:Array,
      value: [ 
        "../../assets/img/img2.jpg",
        "../../assets/img/img3.jpg",
        "../../assets/img/img1.jpg"
      ]
    }
  },
  data: {
      indicatorDots:true,
      vertical:false,
      autoplay:true,
      interval:2000,
      duration:500
  },
  methods: {
    
  }
})
