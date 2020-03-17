"use strict";
Page({
    data: {
        search: '搜索',
        view: '关注',
        playground: '广场',
        topic: '话题',
        currentData: 1,
        names: [
            {
                name: '车车车',
                tar: '#兰博基尼#',
                word: '黄色拉风跑车酷炫十足你值得拥有黄色拉风跑车酷炫十足你值得拥有',
                src1: '../../assets/img/img4.jpg',
                src: [
                    '../../assets/img/img1.jpg',
                    '../../assets/img/img1.jpg',
                    '../../assets/img/img1.jpg'
                ],
                time: "刚刚"
            },
            {
                name: '车车车',
                tar: '#兰博基尼#',
                word: '黄色拉风跑车酷炫十足你值得拥有黄色拉风跑车酷炫十足你值得拥有',
                src1: '../../assets/img/img4.jpg',
                src: [
                    '../../assets/img/img1.jpg',
                    '../../assets/img/img1.jpg',
                    '../../assets/img/img1.jpg'
                ],
                time: "刚刚"
            },
            {
                name: '车车车',
                tar: '#兰博基尼#',
                word: '黄色拉风跑车酷炫十足你值得拥有黄色拉风跑车酷炫十足你值得拥有',
                src1: '../../assets/img/img4.jpg',
                src: [
                    '../../assets/img/img1.jpg',
                    '../../assets/img/img1.jpg',
                    '../../assets/img/img1.jpg'
                ],
                time: "刚刚"
            }
        ]
    },
    close: function (e) {
        console.log(e);
        this.setData({
            'search': ''
        });
    },
    changeTab: function (e) {
        var that = this;
        that.setData({
            currentData: e.currentTarget.dataset.current
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLE1BQU0sRUFBRSxJQUFJO1FBQ1osSUFBSSxFQUFFLElBQUk7UUFDVixVQUFVLEVBQUUsSUFBSTtRQUNoQixLQUFLLEVBQUUsSUFBSTtRQUNYLFdBQVcsRUFBRSxDQUFDO1FBQ2QsS0FBSyxFQUFFO1lBQ0w7Z0JBQ0UsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsR0FBRyxFQUFFLFFBQVE7Z0JBQ2IsSUFBSSxFQUFFLGdDQUFnQztnQkFDdEMsSUFBSSxFQUFFLDJCQUEyQjtnQkFDakMsR0FBRyxFQUFFO29CQUNILDJCQUEyQjtvQkFDM0IsMkJBQTJCO29CQUMzQiwyQkFBMkI7aUJBQzVCO2dCQUNELElBQUksRUFBQyxJQUFJO2FBQ1Y7WUFDRDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxHQUFHLEVBQUUsUUFBUTtnQkFDYixJQUFJLEVBQUUsZ0NBQWdDO2dCQUN0QyxJQUFJLEVBQUUsMkJBQTJCO2dCQUNqQyxHQUFHLEVBQUU7b0JBQ0gsMkJBQTJCO29CQUMzQiwyQkFBMkI7b0JBQzNCLDJCQUEyQjtpQkFDNUI7Z0JBQ0QsSUFBSSxFQUFFLElBQUk7YUFDWDtZQUNEO2dCQUNFLElBQUksRUFBRSxLQUFLO2dCQUNYLEdBQUcsRUFBRSxRQUFRO2dCQUNiLElBQUksRUFBRSxnQ0FBZ0M7Z0JBQ3RDLElBQUksRUFBRSwyQkFBMkI7Z0JBQ2pDLEdBQUcsRUFBRTtvQkFDSCwyQkFBMkI7b0JBQzNCLDJCQUEyQjtvQkFDM0IsMkJBQTJCO2lCQUM1QjtnQkFDRCxJQUFJLEVBQUUsSUFBSTthQUNYO1NBQ0Y7S0FDRjtJQUVELEtBQUssWUFBQyxDQUFNO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsRUFBRTtTQUNiLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxTQUFTLFlBQUMsQ0FBTTtRQUNkLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsV0FBVyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU87U0FDN0MsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vaW5mby50c1xyXG5cclxuUGFnZSh7XHJcbiAgZGF0YToge1xyXG4gICAgc2VhcmNoOiAn5pCc57SiJyxcclxuICAgIHZpZXc6ICflhbPms6gnLFxyXG4gICAgcGxheWdyb3VuZDogJ+W5v+WcuicsXHJcbiAgICB0b3BpYzogJ+ivnemimCcsXHJcbiAgICBjdXJyZW50RGF0YTogMSxcclxuICAgIG5hbWVzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiAn6L2m6L2m6L2mJyxcclxuICAgICAgICB0YXI6ICcj5YWw5Y2a5Z+65bC8IycsXHJcbiAgICAgICAgd29yZDogJ+m7hOiJsuaLiemjjui3kei9pumFt+eCq+WNgei2s+S9oOWAvOW+l+aLpeaciem7hOiJsuaLiemjjui3kei9pumFt+eCq+WNgei2s+S9oOWAvOW+l+aLpeaciScsXHJcbiAgICAgICAgc3JjMTogJy4uLy4uL2Fzc2V0cy9pbWcvaW1nNC5qcGcnLFxyXG4gICAgICAgIHNyYzogW1xyXG4gICAgICAgICAgJy4uLy4uL2Fzc2V0cy9pbWcvaW1nMS5qcGcnLFxyXG4gICAgICAgICAgJy4uLy4uL2Fzc2V0cy9pbWcvaW1nMS5qcGcnLFxyXG4gICAgICAgICAgJy4uLy4uL2Fzc2V0cy9pbWcvaW1nMS5qcGcnXHJcbiAgICAgICAgXSxcclxuICAgICAgICB0aW1lOlwi5Yia5YiaXCJcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG5hbWU6ICfovabovabovaYnLFxyXG4gICAgICAgIHRhcjogJyPlhbDljZrln7rlsLwjJyxcclxuICAgICAgICB3b3JkOiAn6buE6Imy5ouJ6aOO6LeR6L2m6YW354Kr5Y2B6Laz5L2g5YC85b6X5oul5pyJ6buE6Imy5ouJ6aOO6LeR6L2m6YW354Kr5Y2B6Laz5L2g5YC85b6X5oul5pyJJyxcclxuICAgICAgICBzcmMxOiAnLi4vLi4vYXNzZXRzL2ltZy9pbWc0LmpwZycsXHJcbiAgICAgICAgc3JjOiBbXHJcbiAgICAgICAgICAnLi4vLi4vYXNzZXRzL2ltZy9pbWcxLmpwZycsXHJcbiAgICAgICAgICAnLi4vLi4vYXNzZXRzL2ltZy9pbWcxLmpwZycsXHJcbiAgICAgICAgICAnLi4vLi4vYXNzZXRzL2ltZy9pbWcxLmpwZydcclxuICAgICAgICBdLFxyXG4gICAgICAgIHRpbWU6IFwi5Yia5YiaXCJcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIG5hbWU6ICfovabovabovaYnLFxyXG4gICAgICAgIHRhcjogJyPlhbDljZrln7rlsLwjJyxcclxuICAgICAgICB3b3JkOiAn6buE6Imy5ouJ6aOO6LeR6L2m6YW354Kr5Y2B6Laz5L2g5YC85b6X5oul5pyJ6buE6Imy5ouJ6aOO6LeR6L2m6YW354Kr5Y2B6Laz5L2g5YC85b6X5oul5pyJJyxcclxuICAgICAgICBzcmMxOiAnLi4vLi4vYXNzZXRzL2ltZy9pbWc0LmpwZycsXHJcbiAgICAgICAgc3JjOiBbXHJcbiAgICAgICAgICAnLi4vLi4vYXNzZXRzL2ltZy9pbWcxLmpwZycsXHJcbiAgICAgICAgICAnLi4vLi4vYXNzZXRzL2ltZy9pbWcxLmpwZycsXHJcbiAgICAgICAgICAnLi4vLi4vYXNzZXRzL2ltZy9pbWcxLmpwZydcclxuICAgICAgICBdLFxyXG4gICAgICAgIHRpbWU6IFwi5Yia5YiaXCJcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAgLy8g5riF56m65pCc57Si5qCPXHJcbiAgY2xvc2UoZTogYW55KSB7XHJcbiAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICdzZWFyY2gnOiAnJ1xyXG4gICAgfSlcclxuICB9LFxyXG4gIC8vIOWIh+aNolRhYuagj1xyXG4gIGNoYW5nZVRhYihlOiBhbnkpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgdGhhdC5zZXREYXRhKHtcclxuICAgICAgY3VycmVudERhdGE6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1cnJlbnRcclxuICAgIH0pXHJcbiAgfVxyXG59KSJdfQ==