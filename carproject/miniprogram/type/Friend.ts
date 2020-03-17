class Friend {
  userImg: any; //用户头像
  author: string; //用户名
  topic: string;  //话题
  content: string; //发表内容
  img: any[];  //发表图片
  time: string | number; //发表时间
  relay: number; //回复数
  reply: number; //点赞数
  click: number; //转发数

  constructor(userImg: any, author: string, topic: string, content: string, img: any, time: string | number, relay: number, reply: number, click: number) {
    this.userImg = userImg;
    this.author = author;
    this.topic = topic;
    this.content = content;
    this.img = img;
    this.time = time;
    this.relay = relay;
    this.reply = reply;
    this.click = click;
  }
}