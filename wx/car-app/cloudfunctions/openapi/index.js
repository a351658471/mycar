// 云函数入口文件
const cloud = require('wx-server-sdk')
//const requestpromise = require('request-promise');

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.action) {
    case 'getcellphone': {
      return getCellphone(event);
    }
    default: {
      return
    }
  }
}

async function getCellphone(event) {
  const res = await cloud.getOpenData({
    list: [event.id], // 假设 event.openData.list 是一个 CloudID 字符串列表
  })
  return res;
}