// 云函数入口文件 - 商店
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.action) {
    case 'shopList': {
      return shopList(event)
    }
    case 'masterList': {
      return superMaster(event)
    }
    case 'masterAdd': {
      return superMaster(event)
    }
    case 'masterRemove': {
      return superMaster(event)
    }
    case 'swiperEdit': {
      return swiperEdit(event)
    }
    case 'infoEdit': {
      return infoEdit(event)
    }
    default: {
      return
    }
  }
}

// 查询商店列表
async function shopList(event) {
  const wxContext = cloud.getWXContext()
  return db.collection('shop').get().then(res => {
    for (let i = 0; i < res.data.length; i++) {
      let shop = res.data[i]
      if (shop.owner == wxContext.OPENID) {
        shop.isOwner = true
      }
      else {
        if (shop.admins != null) {
          shop.isAdmin = shop.admins.indexOf(wxContext.OPENID) != -1
        }
        if (shop.managers != null) {
          shop.isManagers = shop.managers.indexOf(wxContext.OPENID) != -1
        }
      }
      delete shop.owner
      delete shop.admins
      delete shop.managers
    }
    return res
  })
}

// 超级管理员
async function superMaster(event) {
  const wxContext = cloud.getWXContext()
  let { shopid } = event
  return db.collection('shop').doc(shopid).get().then(res => {
    let shop = res.data
    if (shop.owner != wxContext.OPENID && (!shop.admins || shop.admins.indexOf(wxContext.OPENID) == -1)) {
      return { errMsg: "permission denied" }
    }
    switch (event.action) {
      case 'masterList': {
        return masterList(event, shop)
      }
      case 'masterAdd': {
        return masterAdd(event, shop)
      }
      case 'masterRemove': {
        return masterRemove(event, shop)
      }
      default: {
        return
      }
    }
  })
}

// 管理员列表
async function masterList(event, shop) {
  return db.collection('user').where({
    _openid: db.command.in(shop.managers)
  }).get().then(res => {
    return res
  })
}

// 添加管理员
async function masterAdd(event, shop) {
  let { openid } = event
  if (shop.managers.indexOf(openid) != -1) {
    return { errMsg: "user in managers" }
  }
  else {
    shop.managers.push(openid)
    return db.collection('shop').doc(shop._id).update({
      data: {
        managers: shop.managers
      }
    }).then(res => {
      return res
    })
  }
}

// 移除管理员
async function masterRemove(event, shop) {
  let { openid } = event
  let idx = shop.managers.indexOf(openid)
  if (idx == -1) {
    return { errMsg: "user not in managers" }
  }
  else {
    shop.managers.splice(idx, 1)
    return db.collection('shop').doc(shop._id).update({
      data: {
        managers: shop.managers
      }
    }).then(res => {
      return res
    })
  }
}

// 轮播图编辑
async function swiperEdit(event) {
  const wxContext = cloud.getWXContext()
  let { shopid, swipers } = event
  return db.collection('shop').doc(shopid).get().then(res => {
    let shop = res.data
    if (shop.owner != wxContext.OPENID
      && (!shop.admins || shop.admins.indexOf(wxContext.OPENID) == -1)
      && (!shop.managers || shop.managers.indexOf(wxContext.OPENID) == -1)) {
      return { errMsg: "permission denied" }
    }
    return db.collection('shop').doc(shopid).update({
      data: {
        swipers: swipers
      }
    }).then(res => {
      return res
    })
  })
}

// 商店信息编辑
async function infoEdit(event) {
  const wxContext = cloud.getWXContext()
  let { shopid, name, phone, wechat, address, swipers, location} = event
  return db.collection('shop').doc(shopid).get().then(res => {
    let shop = res.data
    if (shop.owner != wxContext.OPENID
      && (!shop.admins || shop.admins.indexOf(wxContext.OPENID) == -1)
      && (!shop.managers || shop.managers.indexOf(wxContext.OPENID) == -1)) {
      return { errMsg: "permission denied" }
    }
    let data = {}
      data.name = name
      data.phone = phone
      data.wechat = wechat
    if(address){
      data.address = address
    }
    if(location){
      data.location = location
    }
    if(swipers){
      data.swipers = swipers
    }
    return db.collection('shop').doc(shopid).update({
      data: data
    }).then(res => {
      return res
    })
  })
}


