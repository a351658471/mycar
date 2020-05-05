// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const COUNT = 1324354
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.action) {
    case 'showCard':
      return VoucherManage(event);
    case 'showMyCard':
      return showMyCard(event)
    case 'userMyCard':
      return VoucherManage(event);
    case 'queryCard':
      return VoucherManage(event);
    case 'exchange':
        return exchange(event)
    case 'removeCard':
      return VoucherManage(event);
  }
}

async function VoucherManage(event) {
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
      case 'showCard':
        return showCard(event)
      case 'userMyCard':
        return userMyCard(event)
      case 'queryCard':
        return queryCard(event)
      case 'removeCard':
        return removeCard(event)
      default: {
        return
      }
    }
  })
}

//兑换卡券
async function exchange(event) {
  const wxContext = cloud.getWXContext()
  return db.collection('user').where({ _openid: wxContext.OPENID }).get().then(res0 => {  //查看是否登录
    if (res0.data.length == 0) {
      return "user is not login"
    }
    else {
      let record = res0.data[0]
      if (typeof (event.type) != 'number') return { code: 1, msg: 'type应为number类型' }
      switch (event.type) {
        case 0: {
          return db.collection('card').doc(event.temID).get().then(res1 => {  //根据temID查看模板所需积分
            let price = 0
            typeof (res1.data.integral) == 'number' ? price = res1.data.integral : price = parseInt(res1.data.integral)
            if (record.integral.score >= price) {
              let p = - price
              return db.collection('user').doc(record._id).update({
                data: {
                  'integral.score': _.inc(p)
                }
              }).then(res2 => {
                return addCardVoucher(event, record, res1)
              })
            } else {
              return {
                code: 1,
                msg: '积分不足'
              }
            }

          })
        }
        case 1: {  //type为1 时候 需要传用户id获取用户信息
          return db.collection('user').doc(event.userId).get().then(userRes=>{
            return db.collection('card').doc(event.temID).get().then(res1 => {
            return addCardVoucher(event, userRes.data, res1)
          })
          }).catch(err=>{
            return{
              code:1,
              data:err
            }
          })
          
        }
      }

    }
  })
}

//添加卡券 1
async function addCardVoucher(event, record, cardTem) {
  // event = {
  //   tel:event.tel, //手机号
  //   nickName:event.nickName, //昵称
  //   userId:event.userId, //用户id
  //   temID:event.temID, //使用的模板的id
  // type:event.type,//类型  付费或积分
  // }
  return db.collection('cardvoucher').orderBy('count', 'desc').limit(1).get().then(res1 => {
    console.log(res1)
    if (res1.data.length != 0) {
      let Count = res1.data[0].count + 1
      let number = event.type == 0 ? 'D' + Count : 'G' + Count
      return createDoc(event, number, Count, record, cardTem)
    } else {
      let Count = COUNT
      let number = event.type == 0 ? 'D' + COUNT : 'G' + COUNT
      return createDoc(event, number, Count, record, cardTem)
    }
  })
  async function createDoc(event, number, Count, record, cardTem) {
    return db.collection('cardvoucher').add({
      data: {
        count: Count,
        number: number, //卡券号,
        name: cardTem.data.name,  //卡券名称
        integral: cardTem.data.integral,  //所需积分
        validity: cardTem.data.validity, //到期时间
        describe: cardTem.data.describe, //特点描述
        rule: cardTem.data.rule, //活动规则
        canUsedCount: cardTem.data.canUsedCount, //可使用次数
        used: 0, //是否使用过
        userdTime: 0, //确认时间
        usedCount: 0, //已使用次数
        tel: record.phone, //手机号
        nickName: record.nickName, //昵称
        userId: record._id, //用户id
        type: cardTem.type,//类型  付费或积分
        temID: event.temID, //使用的模板的id
      }
    })
      .then(res2 => {
        if(event.type == 1){
         return db.collection('cardvoucher').doc(res2._id).get().then(res3=>{
            return{
              data:res3,
              code:0,
              msg:'购买成功'
            }
          })
        }
        return {
          code: 0,
          msg: '兑换成功',
          data: res2
        }
      })
  }
}

//扫码查看卡券 1
async function showCard(event) {
  return db.collection('cardvoucher').doc(event._id).get().then(res => {
    return res
  })
}

//查看我的卡券  
async function showMyCard(event) {
  let page = event.page;
  let idx = page - 1;
  let pageCount = event.pageCount
  return db.collection('cardvoucher').where({ userId: event.userId }).orderBy('used', 'asc').skip(idx * pageCount).limit(pageCount).get()
}


//使用卡券 1 使用后card模板 +1 
async function userMyCard(event) {
  let usedTime = new Date().getTime()
  let used = 1;
  let addUsedCount = 1
  let data = {}
  let temUsed = false
  return db.collection('cardvoucher').doc(event._id).get().then(res => {
    console.log(1111111)
    console.log(res)
    if (res.data.used == 1) return { code: 1, msg: '卡券已被使用过' }  //判断卡券是否已被使用过
    if (res.data.canUsedCount != '') {  //可用次数判断
      let canUsedCount = parseInt(res.data.canUsedCount)
      if (res.data.usedCount + 1 == canUsedCount) {  //当使用次数+1 = 可使用次数时候  used = 1，temused = true
        temUsed = true
        data = {
          used: used,
          usedTime: usedTime,
          usedCount: _.inc(addUsedCount)
        }
      } else {  //当使用次数+1 < 可使用次数时   used仍然为0
        data = {
          usedTime: usedTime,
          usedCount: _.inc(addUsedCount)
        }
      }
    } else {  //默认可使用次数为1时     used = 1，temused = true
      temUsed = true
      data = {
        used: used,
        usedTime: usedTime,
        usedCount: _.inc(addUsedCount)
      }
    }

    //
    return db.collection('cardvoucher').doc(event._id).update({
      data: data
    }).then(res => {
      // 当temUsed 为 true得时候 模板使用次数加一
      if (temUsed) {
        return db.collection('card').doc(event.temID).update({
          data: {
            usedCount: _.inc(addUsedCount)
          }
        }).then(res => {
          return {
            code: 0,
            msg: '使用成功,模板使用次数+1'
          }
        })
      } else {
        return {
          code: 0,
          msg: '使用成功'
        }
      }
    })

  })
}

//卡券查询 1
async function queryCard(event) {
  let {
    keyWord,
    type, //类型
    page,
    pageCount
  } = event
  let idx = page - 1
  if (keyWord) {
    return db.collection('cardvoucher').where(_.or([
      {
        nickName: db.RegExp({
          regexp: '.*' + keyWord,
          options: 'i',
        })
      },
      {
        tel: db.RegExp({
          regexp: '.*' + keyWord,
          options: 'i',
        })
      },
      {
        number: db.RegExp({
          regexp: '.*' + keyWord,
          options: 'i',
        })
      },
    ])
      .and({
        used: 1,
        type: type
      }))
      .skip(idx * pageCount)
      .limit(pageCount)
      .get()
      .then(res => {
        return res
      })
  } else {
    return db.collection('cardvoucher')
      .where({
        used: 1,
        type: type
      })
      .skip(idx * pageCount)
      .limit(pageCount)
      .get()
      .then(res => {
        return res
      })
  }
}

//删除历史卡券
async function removeCard(event) {
  let { _id } = event
  if (typeof (_id) != 'string') return { msg: 'id必须为string', code: 1 }
  return await db.collection('cardvoucher').doc(_id).remove().then(res => console.log(res))
}

