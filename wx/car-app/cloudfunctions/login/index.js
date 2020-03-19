// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = (event, context) => {
  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息
  let {
    userInfo,
    wxUserInfo, // 商店信息
  } = event
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
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
  return db.collection('user').where({ _openid: wxContext.OPENID }).get().then(res => {
    let dbdata = res.data
    if (dbdata.length == 0) {
      data._openid = wxContext.OPENID
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
        return {
          data: record,
          msg: res
        }
      }
      )
    }
  })
}

