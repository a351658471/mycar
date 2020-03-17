export class User {
  id: number;   //用户id
  name: string;  //用户名
  head: any;    //头像
  trend: number; //动态数
  attention: number; //关注数
  fan: number; //粉丝数
  integral: number; //积分
  introduce: any; //简介
  vip: boolean;  //会员


  constructor(id: number, name: string, head: any, trend: number, attention: number, fan: number, integral: number, introduce: any, vip: boolean) {
    this.id = id;
    this.name = name;
    this.head = head;
    this.trend = trend;
    this.attention = attention;
    this.fan = fan;
    this.integral = integral;
    this.introduce = introduce;
    this.vip = vip;
  }
}