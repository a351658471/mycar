// 云函数入口文件 - 商品
const cloud = require('wx-server-sdk')

cloud.init()

const wxContext = cloud.getWXContext()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.action) {
    case 'itemList': {
      return itemList(event)
    }
    default: {
      return
    }
  }
}


// 查询商品列表
async function itemList(event) {
  return db.collection('item').get().then(res => {
    return res
  })
}