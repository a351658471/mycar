// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.action) {
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
async function cardManage(event) {
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
async function getCardTemplate(event) {
  let page = 0;
  let pageCount = 0;
  let idx = 0;
  let nowTime = new Date().getTime()
  switch (event.getType) {
    case 'userPage': {
      //用户推荐卡券页
      return db.collection('card').where({ validity: _.gte(nowTime), type: 0 }).limit(2).get().then(res0 => {
        console.log(res0)
        return db.collection('card').where({ validity: _.gte(nowTime), type: 1 }).limit(1).get().then(res1 => {
          return {
            type0: res0.data,
            type1: res1.data
          }
        })
      })
    }
    case 'userPageMore': {
      //用户查看更多卡券模板页面
      if (event.type != null) return db.collection('card').where({ status: 0, validity: _.gte(nowTime), type: event.type }).skip(idx * pageCount).limit(pageCount).get().then(res => {
        return res
      })
      return {
        code: 1,
        msg: '类型type不能为空'
      }
    }
    case 'shopPage': {
      //商家管理卡券模板页面
      switch (event.status) {
        case 0: {
          return db.collection('card').where({ status: event.status, validity: _.gte(nowTime) }).skip(idx * pageCount).limit(pageCount).get().then(res => {
            return res
          })
        }
        case 1: {
          return db.collection('card').where(_.or([
            {
              validity: _.lt(nowTime)
            },
            {
              status: 1
            }
          ])).skip(idx * pageCount).limit(pageCount).get().then(res => {
            return res
          })
        }
      }
      return {
        code: 1,
        msg: '状态status不能为空'
      }
    }
    case 'findById': {
      //根据id查看卡券
      if (event.temID) return await db.collection('card').where({ _id: event.temID }).get()
      return {
        code: 1,
      }
    }
  }
}
//添加卡券
async function addCardTemplate(event) {
  if (typeof (event.type) != 'number' && typeof (event.integral) != 'number' && typeof (event.validity) != 'number' && typeof (event.status) != 'number') return { code: 1 }
  return await db.collection('card').add({
    data: {
      name: event.name,  //卡券名称 string
      type: event.type, //卡券类型 number 0积分兑换   1购买
      integral: event.integral,  //所需积分或价钱 number
      validity: event.validity, //到期时间 number
      describe: event.describe, //特点描述 string
      rule: event.rule, //活动规则 string 
      status: event.status, //启用状态 number
      canUsedCount: event.canUsedCount, //可用次数 string
    }
  })
}
//编辑卡券模板 1
async function editCard(event) {
  let { item, _id, usedCount } = event
  // {     
  //   name: event.name,  //卡券名称
  //   price: event.price,  //所需积分 或价钱
  //   type:event.type, //卡券类型 number 0积分兑换   1购买
  //   validity: event.validity, //到期时间
  //   describe: event.describe, //特点描述
  //   rule: event.rule, //活动规则
  //   status: event.status //启用状态
  //   canUsedCount:event.canUsedCount, //可用次数 number
  // }

  //如果有usedCount则是增加已使用次数
  if (usedCount) return db.collection('card').doc(_id).update({
    data: {
      usedCount: _.inc(1)
    }
  }).then(res => {
    return {
      success: true,
      data: res
    }
  })

  //修改模板信息
  return db.collection('card').doc(_id).update({
    data: item
  })
    .then(res => {
      return {
        success: true,
        data: res
      }
    })
}

// 删除卡券
async function removeCard(event) {
  let id = event._id
  return await db.collection('card').doc(id).remove()
}
//查询数量
async function getCount() {
  let nowTime = new Date().getTime()
  let list = [0, 1];
  let rul = []
  for (let i = 0; i < list.length; i++) {
    if (i == 0) {
      await db.collection('card').where({
        status: list[i],
        validity: _.gte(nowTime)
      }).count().then(res => {
        rul.push(res.total)
      })
    } else {
      await db.collection('card').where(
        _.or([
          {
            validity: _.lt(nowTime)
          },
          {
            status: list[i]
          }
        ]))
        .count().then(res => {
          rul.push(res.total)
        })
    }
  }
  console.log(rul)
  return rul
}
