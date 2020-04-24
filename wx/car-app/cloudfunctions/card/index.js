// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  switch(event.action){
    case 'addCard':
       return cardManage(event)
  }
}
async function cardManage(event){
  const wxContext = cloud.getWXContext()
  let { shopid, item } = event
  if (item != null) {
    item.shopId = shopid
  }
  return db.collection('shop').doc(shopid).get().then(res => {
    let shop = res.data
    if (shop.owner != wxContext.OPENID
      && (!shop.admins || shop.admins.indexOf(wxContext.OPENID) == -1)
      && (!shop.managers || shop.managers.indexOf(wxContext.OPENID) == -1)) {
      return { errMsg: "permission denied" }
    }
    switch (event.action) {
      case 'addCard': {
        return addCard(event)
      }
      default: {
        return
      }
    }
  })
}

async function addCardTemplate(event){
  let {item} = event
  return await db.collection('card').add({
    data:{
      name:item.name,  //卡券名称
      integral:item.integral,  //所需积分
      validity:item.validity, //到期时间
      describe:item.describe, //特点描述
      rule:item.rule
    }
  })
}