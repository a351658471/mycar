Component({
  methods:{
     phone(){
       wx.showActionSheet({
         itemList:['188-5666-1111(微信同号)','呼叫'],
         success(){
              wx.makePhoneCall({
                phoneNumber: '188-5666-1111', 
            })
         }
       })
     }   
  }
})