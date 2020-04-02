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
      return getCellphone(event)
    }
    case 'getQRCode':{
      return getQRCode(event)
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

async function getQRCode(event) {
  let {
    scene,
    page,
    width,
    autoColor,
    lineColor,
    isHyaline
  } = event

  // scene	string		是	最大32个可见字符，只支持数字，大小写英文以及部分特殊字符：!#$&'()*+,/:;=?@-._~，其它字符请自行编码为合法字符（因不支持%，中文无法使用 urlencode 处理，请使用其他编码方式）
  // page	string	主页	否	必须是已经发布的小程序存在的页面（否则报错），例如 pages/index/index, 根路径前不要填加 /,不能携带参数（参数请放在scene字段里），如果不填写这个字段，默认跳主页面
  // width	number	430	否	二维码的宽度，单位 px，最小 280px，最大 1280px
  // autoColor	boolean	false	否	自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调，默认 false
  // lineColor	Object	{"r":0,"g":0,"b":0}	否	auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示
  // isHyaline	boolean	false	否	是否需要透明底色，为 true 时，生成透明底色的小程序

  try {
    let params = {}
    if (scene) params.scene = scene
    if (page) params.page = page
    if (width) params.width = width
    if (autoColor) params.autoColor = autoColor
    if (lineColor) params.lineColor = lineColor
    if (isHyaline) params.scene = isHyaline
    const result = await cloud.openapi.wxacode.getUnlimited(params)
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}