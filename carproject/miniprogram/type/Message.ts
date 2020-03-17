export class Message {
  title: string; //标题
  publish: string; //出版社
  time: number; //发表时间
  detail: any; //文章内容
  reply: number; //回复数
  click: number; //点赞数
  relay: number; //转发数
  carimg: any; //图片
  constructor(title: string, publish: string, time: number, detail: any, reply: number, click: number, relay: number, carimg: any) {
    this.title = title;
    this.publish = publish;
    this.time = time;
    this.detail = detail;
    this.reply = reply;
    this.click = click;
    this.relay = relay;
    this.carimg = carimg;
  }
}