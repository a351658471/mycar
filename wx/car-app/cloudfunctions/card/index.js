// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  switch(event.action){
    case 'getCount':
      return getCount()
    case 'addCardTemplate':
       return cardManage(event);
    case 'getCardTemplate':
       return getCardTemplate(event);
    case 'removeCard':
       return cardManage(event);
    case 'editCard':
      return cardManage(event)
  }
}
async function cardManage(event){
  const wxContext = cloud.getWXContext()
  let { shopid, item } = event
  if (item != null) {
    item.shopId = shopid
  }
  console.log(shopid)
  return db.collection('shop').doc(shopid).get().then(res => {
    let shop = res.data
    if (shop.owner != wxContext.OPENID
      && (!shop.admins || shop.admins.indexOf(wxContext.OPENID) == -1)
      && (!shop.managers || shop.managers.indexOf(wxContext.OPENID) == -1)) {
      return { errMsg: "permission denied" }
    }
    switch (event.action) {
      case 'addCardTemplate':
        return addCardTemplate(event)
      case 'removeCard':
        return removeCard(event)
      case 'editCard':
        return editCard(event)
      default: {
        return
      }
    }
  })
}
//获取卡券模板
async function getCardTemplate(event){
  let page = 0;
  let pageCount = 0;
  let idx = 0;
  event.page !=null? page = event.page :''
  event.pageCount!=null? pageCount = event.pageCount:''
  event.page !=null? idx = page -1 : ''
  if(event.status != null) return await db.collection('card').where({status:event.status}).skip(idx*pageCount).limit(pageCount).get().then(res=>{
   return res
  })
  if(event._id) return await db.collection('card').where({_id:event._id}).get()
  
}
//添加卡券
async function addCardTemplate(event){
  return await db.collection('card').add({
    data:{
      name: event.name,  //卡券名称
      integral: event.integral,  //所需积分
      validity: event.validity, //到期时间
      describe: event.describe, //特点描述
      rule: event.rule, //活动规则
      status: event.status //启用状态
    }
  })
}
//编辑卡券模板
async function editCard(event){
  let {item,_id} = event
    // {     
    //   name: event.name,  //卡券名称
    //   integral: event.integral,  //所需积分
    //   validity: event.validity, //到期时间
    //   describe: event.describe, //特点描述
    //   rule: event.rule, //活动规则
    //   status: event.status //启用状态
    // }
  return db.collection('card').doc(_id).update({
    data:item
  })
}
// 删除卡券
async function removeCard(event){
  let id = event._id
  return await db.collection('card').doc(id).remove()
}
//查询数量
async function getCount(){
  let list = [0,1];
  let rul = []
  for(let i=0;i<list.length;i++){
   await db.collection('card').where({
      status:list[i]
    }).count().then(res=>{
      rul.push(res.total)
    })
  } 
  return rul
}
