// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = (event, context) => {
  switch (event.action) {
    case 'userLogin': {
      return userLogin(event)
    }
    case 'userQuery': {
      return userQuery(event)
    }
    case 'userBindPhone': {
      return userBindPhone(event)
    }
    case 'userFeedback': {
      return userFeedback(event)
    }
    case 'userFeedbackQuery': {
      return userFeedbackQuery(event)
    }
    case 'userFeedbackRead': {
      return userFeedbackRead(event)
    }
    case 'userSignIn': {
      return userSignIn(event)
    }
    case 'userShare': {
      return userShare(event)
    }
    case 'getInfoById': {
      return getInfoById(event)
    }
    default: {
      return
    }
  }
}

// 用户登录
async function userLogin(event) {
  let {
    wxUserInfo, // 微信端用户信息
  } = event
  const wxContext = cloud.getWXContext()
  console.log(wxUserInfo)
  let data = {
    nickName: wxUserInfo.nickName,
    avatarUrl: wxUserInfo.avatarUrl,
    gender: wxUserInfo.gender,
    language: wxUserInfo.language,
    country: wxUserInfo.country,
    province: wxUserInfo.province,
    city: wxUserInfo.city,
  }
  // 查询当前用户所有的 counters
  // db.collection('user').where({ _openid: wxContext.OPENID }).get().then(res=>{
  //   console.log(22233333)
  //   console.log(res)
  // })
  return db.collection('user').where({ _openid: wxContext.OPENID }).get().then(res => {

    let dbdata = res.data
    if (dbdata.length == 0) {
      data.integral = {
        score: 0,
        shareCarCount: 0,
        shareCarTime: 0,
        shareInfoCount: 0,
        shareInfoTime: 0,
        signTime: 0
      }
      data._openid = wxContext.OPENID
      data.creatime = Date.parse(new Date())
      return db.collection('user').add({
        data: data
      }).then(res => {
        return {
          data: data,
          msg: res
        }
      }
      )
    }
    else {
      let record = dbdata[0]
      data.updatetime = Date.parse(new Date())
      return db.collection('user').doc(record._id).update({
        data: data
      }).then(res => {
        record.nickName = data.nickName
        record.avatarUrl = data.avatarUrl
        record.gender = data.gender
        record.language = data.language
        record.country = data.country
        record.province = data.province
        record.city = data.city
        // record.integral = data.integral
        return {
          data: record,
          msg: res
        }
      }
      )
    }
  })
}

// 绑定手机
async function userBindPhone(event) {
  let {
    phone,
  } = event
  const wxContext = cloud.getWXContext()
  return db.collection('user').where({ _openid: wxContext.OPENID }).get().then(res => {
    if (res.data.length == 0) {
      return "user is not login"
    }
    else {
      let record = res.data[0]
      return db.collection('user').doc(record._id).update({
        data: {
          phone: phone
        }
      }).then(res => {
        record.phone = phone
        return {
          data: record,
          msg: res
        }
      }
      )
    }
  })
}


// 用户查询
async function userQuery(event) {
  let {
    keyWord,
    page,
    perpage,
    shopid,     // 有shopid说明要查管理员
    manager,
  } = event


  let condition = {}
  await db.collection('shop').doc(shopid).get().then(res => {
    condition._openid = manager ? db.command.in(res.data.managers) : db.command.nin(res.data.managers)
  })
  if (keyWord) {
    if (!condition) {
      condition = db.command.or([
        {
          nickName: {
            $regex: ".*" + keyWord + ".*",
            $options: 'i'
          }
        },
        {
          phone: {
            $regex: ".*" + keyWord + ".*",
            $options: 'i'
          }
        },
      ])
    }
    else {
      condition = db.command.or([
        {
          nickName: {
            $regex: ".*" + keyWord + ".*",
            $options: 'i'
          }
        },
        {
          phone: {
            $regex: ".*" + keyWord + ".*",
            $options: 'i'
          }
        },
      ]).and(condition)
    }
  }
  if (page != null && perpage != null) {
    let idx = page - 1
    if (idx < 0) {
      idx = 0
    }
    if (condition) {
      return db.collection('user').where(condition).orderBy('creatime', 'desc').skip(idx * perpage).limit(perpage).get().then(res => {
        return res
      })
    }
    else {
      return db.collection('user').orderBy('creatime', 'desc').skip(idx * perpage).limit(perpage).get().then(res => {
        return res
      })
    }
  }
  else {
    if (condition) {
      return db.collection('user').where(condition).orderBy('creatime', 'desc').get().then(res => {
        return res
      })
    }
    else {
      return db.collection('user').orderBy('creatime', 'desc').get().then(res => {
        return res
      })
    }
  }
}

// 建议反馈
async function userFeedback(event) {
  let {
    value,
  } = event
  const wxContext = cloud.getWXContext()
  return db.collection('feedback').add({
    data: {
      openid: wxContext.OPENID,
      value: value,
      status: 0,
      creatime: Date.parse(new Date())
    }
  }).then(res => {
    return res
  }
  )
}

// 建议反馈标记已读
async function userFeedbackRead(event) {
  let {
    ids,
  } = event
  return db.collection('feedback').where({ _id: db.command.in(ids) }).update({
    data: {
      status: 1,
      updatetime: Date.parse(new Date())
    }
  }).then(res => {
    return res
  }
  )
}

// 建议反馈查询
async function userFeedbackQuery(event) {
  let {
    condition,
    page,
    perpage
  } = event

  if (page != null && perpage != null) {
    let idx = page - 1
    if (idx < 0) {
      idx = 0
    }
    if (condition) {
      return db.collection('feedback').where(condition).orderBy('status', 'asc').orderBy('creatime', 'desc').skip(idx * perpage).limit(perpage).get().then(res => {
        return userFeedbackQueryUserInfo(res)
      })
    }
    else {
      return db.collection('feedback').orderBy('status', 'asc').orderBy('creatime', 'desc').skip(idx * perpage).limit(perpage).get().then(res => {
        return userFeedbackQueryUserInfo(res)
      })
    }
  }
  else {
    if (condition) {
      return db.collection('feedback').where(condition).orderBy('status', 'asc').orderBy('creatime', 'desc').get().then(res => {
        return userFeedbackQueryUserInfo(res)
      })
    }
    else {
      return db.collection('feedback').orderBy('status', 'asc').orderBy('creatime', 'desc').get().then(res => {
        return userFeedbackQueryUserInfo(res)
      })
    }
  }
}

async function userFeedbackQueryUserInfo(res) {
  let len = res.data.length
  if (len > 0) {
    let openids = []
    for (let index = 0; index < len; index++) {
      const element = res.data[index];
      openids.push(element.openid)
    }

    await db.collection('user').where({ _openid: db.command.in(openids) }).get().then(_res => {
      for (let index = 0; index < len; index++) {
        const element = res.data[index];
        for (let j = 0; j < _res.data.length; j++) {
          const _element = _res.data[j];
          if (element.openid == _element._openid) {
            element.user = _element
            break
          }
        }
      }
    })
  }
  return res
}


// 用户每日签到
async function userSignIn() {
  let reward = 15;  //签到得15积分
  let signTime = new Date()
  const wxContext = cloud.getWXContext()
  return db.collection('user').where({ _openid: wxContext.OPENID }).get().then(res => {
    if (res.data.length == 0) {
      return "user is not login"
    }
    else {
      let record = res.data[0]
      console.log(signTime.toDateString())
      console.log(new Date(record.integral.signTime).toDateString())
      if (record.integral.signTime && signTime.toDateString() == new Date(record.integral.signTime).toDateString()) return { msg: '今日已签到', code: 1, data: record.signTime }
      return db.collection('user').doc(record._id).update({
        data: {
          'integral.signTime': signTime.getTime(),
          'integral.score': _.inc(reward)
        }
      }).then(res => {
        return {
          code: 0,
          msg: '签到成功',
          data: res
        }
      }
      )
    }
  })
}

//转发得积分
async function userShare(event) {
  const wxContext = cloud.getWXContext()
  console.log(wxContext)
  return db.collection('user').where({ _openid: wxContext.OPENID }).get().then(res => {
    if (res.data.length == 0) {
      return "user is not login"
    }
    else {
      let record = res.data[0]
      if (event.type == 0) {
        return share(record, event.type)
      } else if (event.type == 1) {
        return share(record, event.type)
      }

    }
  })
}
async function share(record, type) {
  let reward = 10  //转发分享得10积分
  if (type == 0) {
    let nowDate = new Date().toDateString()
    let oldDate = new Date(record.integral.shareCarTime).toDateString()
    let count = 0
    nowDate == oldDate ? count = record.integral.shareCarCount : ''
    if (count < 3) {
      return db.collection('user').doc(record._id).update({
        data: {
          'integral.shareCarCount': count + 1,
          'integral.shareCarTime': Date.parse(nowDate),
          'integral.score': _.inc(reward)
        }
      }).then(res => {
        return {
          data: res,
          code: 0
        }
      }
      )
    } else {
      return {

        msg: '今日分享车辆已达三次',
        time: record.integral.shareCarTime
      }
    }
  } else if (type == 1) {
    let nowDate = new Date().toDateString()
    let oldDate = new Date(record.integral.shareInfoTime).toDateString()
    let count = 0
    nowDate == oldDate ? count = record.integral.shareInfoCount : ''
    if (count < 3) {
      return db.collection('user').doc(record._id).update({
        data: {
          'integral.shareInfoCount': count + 1,
          'integral.shareInfoTime': Date.parse(nowDate),
          'integral.score': _.inc(reward)
        }
      }).then(res => {
        return {
          data: res,
          code: 0
        }
      }
      )
    } else {
      return {
        msg: '今日转发已达三次',
        time: record.integral.shareInfoTime
      }
    }
  }
}
//根据id获取用户数据
async function getInfoById(event) {
  return db.collection('user').doc(event._id).field({nickName:true,phone:true}).get()
}