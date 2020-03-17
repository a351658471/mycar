export class Car {
  name: string;  //车名
  image: any[];  //轮播图
  isnew: boolean;  //新车or二手车
  price: number; //价格
  video: any; //视频
  detail: any; //文字描述
  parameter: string[];  //车辆参数


  constructor(name: string, image: any, isnew: boolean, price: number, video: any, detail: any, parameter: string[]) {
    this.name = name;
    this.image = image;
    this.isnew = isnew;
    this.price = price;
    this.video = video;
    this.detail = detail;
    this.parameter = parameter;
  }
}