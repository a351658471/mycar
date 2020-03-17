export class Comment {
  userid: number; //评论人id
  headimg: any; //评论人头像
  name: string; //用户名
  content: string; //评论内容
  time: number | string; //评论时间
  reply: number; //回复数
  click: number; //点赞数

  constructor(userid: number, headimg: any, name: string, content: string, time: number | string, reply: number, click: number) {
    this.userid = userid;
    this.headimg = headimg;
    this.name = name;
    this.content = content;
    this.time = time;
    this.reply = reply;
    this.click = click;
  }
}