// 云函数入口文件 - 商品
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.action) {
    case 'itemList': {
      return itemList(event)
    }
    case 'itemAdd': {
      return itemManage(event)
    }
    case 'itemEdit': {
      return itemManage(event)
    }
    case 'itemRemove': {
      return itemManage(event)
    }
    default: {
      return
    }
  }
}

// 查询商品列表
async function itemList(event) {
  let {
    istotal,
    condition,
    status,
    type,
    page,
    perpage,
    order,
  } = event

  if (status) {
    condition = condition || {}
    condition.status = db.command.in(status)
  }
  if(type){
    condition.type = db.command.in(type)
  }
  
  if (istotal) {
    let countResult
    if (condition) {
      countResult = await db.collection('item').where(condition).count()
    }
    else {
      countResult = await db.collection('item').count()
    }
    return countResult
  }
  if (page != null && perpage != null) {
    let idx = page - 1
    if (idx < 0) {
      idx = 0
    }
    if (condition) {
      return db.collection('item').where(condition).orderBy('sort', 'desc').orderBy('creatime', 'desc').skip(idx * perpage).limit(perpage).get().then(res => {
        return res
      })
    }
    else {
      return db.collection('item').orderBy('sort', 'desc').orderBy('creatime', 'desc').skip(idx * perpage).limit(perpage).get().then(res => {
        return res
      })
    }
  }
  else {
    if (condition) {
      return db.collection('item').where(condition).orderBy('sort', 'desc').orderBy('creatime', 'desc').get().then(res => {
        return res
      })
    }
    else {
      return db.collection('item').orderBy('sort', 'desc').orderBy('creatime', 'desc').get().then(res => {
        return res
      })
    }
  }
}

// 管理商品列表
async function itemManage(event) {
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
      case 'itemAdd': {
        return itemAdd(event)
      }
      case 'itemEdit': {
        return itemEdit(event)
      }
      case 'itemRemove': {
        return itemRemove(event)
      }
      default: {
        return
      }
    }
  })

}

// 添加商品
async function itemAdd(event) {
  let {
    item
  } = event
  // {
  //   shopId: string,  // 所在商店
  //   name: string,    // 商品名
  //   price: number,   // 价格
  //   stock: number,   // 库存
  //   data:string,     // 数据
  // }
  item.creatime = Date.parse(new Date())
  item.updatetime = item.creatime
  if(item.sort == null){
    item.sort = 0
  }
  return db.collection('item').add({
    data: item
  }).then(res => {
    return {
      msg: res
    }
  }
  )
}


// 编辑商品
async function itemEdit(event) {
  let {
    item
  } = event
  // {
  //   shopId: string,  // 所在商店
  //   name: string,    // 商品名
  //   price: number,   // 价格
  //   stock: number,   // 库存
  //   data:string,     // 数据
  // }
  let itemId = item._id
  delete item._id
  item.updatetime = Date.parse(new Date())
  return db.collection('item').doc(itemId).update({
    data: item
  }).then(res => {
    return {
      msg: res
    }
  }
  )
}

// 删除商品
async function itemRemove(event) {
  let {
    ids
  } = event
  return db.collection('item').where({ _id: db.command.in(ids) }).remove().then(res => {
    return res
  })
}
