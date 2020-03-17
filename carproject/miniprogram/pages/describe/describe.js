"use strict";
Page({
    data: {
        title: '全球十大豪车',
        news: '新华社',
        time: '2020-02-22',
        detail: '啊啊啊啊啊啊啊啊啊啊',
        commentnum: 0,
        zannum: 0,
        content: '',
        facus: true,
        comments: [
            {
                src: '../../assets/img/img4.jpg',
                name: 'Name',
                commentIn: '最喜欢跑车',
                commentTime: '02-22 15:55',
                reply: '0',
                fine: 0
            },
            {
                src: '../../assets/img/img4.jpg',
                name: 'Name',
                commentIn: '最喜欢跑车2',
                commentTime: '02-22 15:55',
                reply: '0',
                fine: 0
            },
            {
                src: '../../assets/img/img4.jpg',
                name: 'Name',
                commentIn: '最喜欢跑车3',
                commentTime: '02-22 15:55',
                reply: '0',
                fine: 0
            },
            {
                src: '../../assets/img/img4.jpg',
                name: 'Name',
                commentIn: '最喜欢跑车3',
                commentTime: '02-22 15:55',
                reply: '0',
                fine: 0
            }
        ]
    },
    sends: function (e) {
        var that = this;
        var commented = {
            src: '../../assets/img/img4.jpg',
            name: 'Name',
            commentIn: e.detail.value,
            commentTime: '02-22 15:55',
            reply: '0',
            fine: 0
        };
        this.data.comments.unshift(commented);
        that.setData({
            comments: this.data.comments,
            commentnum: this.data.commentnum + 1
        });
    },
    dian: function (event) {
        var index = event.currentTarget.dataset.index;
        var message = this.data.comments;
        if (message[index].fine == 0) {
            message[index].fine += 1;
        }
        else {
            message[index].fine -= 1;
        }
        this.setData({
            comments: message
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzY3JpYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXNjcmliZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFDO1FBQ0gsS0FBSyxFQUFDLFFBQVE7UUFDZCxJQUFJLEVBQUMsS0FBSztRQUNWLElBQUksRUFBRSxZQUFZO1FBQ2xCLE1BQU0sRUFBQyxZQUFZO1FBQ25CLFVBQVUsRUFBQyxDQUFDO1FBQ1osTUFBTSxFQUFDLENBQUM7UUFDUixPQUFPLEVBQUMsRUFBRTtRQUNWLEtBQUssRUFBQyxJQUFJO1FBQ1YsUUFBUSxFQUFDO1lBQ1A7Z0JBQ0ksR0FBRyxFQUFDLDJCQUEyQjtnQkFDL0IsSUFBSSxFQUFDLE1BQU07Z0JBQ1gsU0FBUyxFQUFDLE9BQU87Z0JBQ2pCLFdBQVcsRUFBQyxhQUFhO2dCQUN6QixLQUFLLEVBQUMsR0FBRztnQkFDVCxJQUFJLEVBQUMsQ0FBQzthQUNUO1lBQ0Q7Z0JBQ0UsR0FBRyxFQUFFLDJCQUEyQjtnQkFDaEMsSUFBSSxFQUFFLE1BQU07Z0JBQ1osU0FBUyxFQUFFLFFBQVE7Z0JBQ25CLFdBQVcsRUFBRSxhQUFhO2dCQUMxQixLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsQ0FBQzthQUNSO1lBQ0Q7Z0JBQ0UsR0FBRyxFQUFFLDJCQUEyQjtnQkFDaEMsSUFBSSxFQUFFLE1BQU07Z0JBQ1osU0FBUyxFQUFFLFFBQVE7Z0JBQ25CLFdBQVcsRUFBRSxhQUFhO2dCQUMxQixLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsQ0FBQzthQUNSO1lBQ0Q7Z0JBQ0UsR0FBRyxFQUFFLDJCQUEyQjtnQkFDaEMsSUFBSSxFQUFFLE1BQU07Z0JBQ1osU0FBUyxFQUFFLFFBQVE7Z0JBQ25CLFdBQVcsRUFBRSxhQUFhO2dCQUMxQixLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsQ0FBQzthQUNSO1NBQ0Y7S0FDRjtJQUNELEtBQUssRUFBQyxVQUFTLENBQUM7UUFDZCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUE7UUFDZixJQUFJLFNBQVMsR0FBRztZQUNkLEdBQUcsRUFBRSwyQkFBMkI7WUFDaEMsSUFBSSxFQUFFLE1BQU07WUFDWixTQUFTLEVBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1lBQ3hCLFdBQVcsRUFBRSxhQUFhO1lBQzFCLEtBQUssRUFBRSxHQUFHO1lBQ1YsSUFBSSxFQUFFLENBQUM7U0FDUixDQUFBO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQzVCLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRSxDQUFDO1NBQ3BDLENBQUMsQ0FBQTtJQUVKLENBQUM7SUFJRCxJQUFJLEVBQUMsVUFBUyxLQUFVO1FBQ3RCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM5QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFBO1NBQ3pCO2FBQU07WUFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFLLENBQUMsQ0FBQTtTQUMxQjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRLEVBQUUsT0FBTztTQUNsQixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiUGFnZSh7XHJcbiAgZGF0YTp7XHJcbiAgICB0aXRsZTon5YWo55CD5Y2B5aSn6LGq6L2mJyxcclxuICAgIG5ld3M6J+aWsOWNjuekvicsXHJcbiAgICB0aW1lOiAnMjAyMC0wMi0yMicsXHJcbiAgICBkZXRhaWw6J+WViuWViuWViuWViuWViuWViuWViuWViuWViuWViicsXHJcbiAgICBjb21tZW50bnVtOjAsXHJcbiAgICB6YW5udW06MCxcclxuICAgIGNvbnRlbnQ6JycsXHJcbiAgICBmYWN1czp0cnVlLFxyXG4gICAgY29tbWVudHM6W1xyXG4gICAgICB7XHJcbiAgICAgICAgICBzcmM6Jy4uLy4uL2Fzc2V0cy9pbWcvaW1nNC5qcGcnLFxyXG4gICAgICAgICAgbmFtZTonTmFtZScsXHJcbiAgICAgICAgICBjb21tZW50SW46J+acgOWWnOasoui3kei9picsXHJcbiAgICAgICAgICBjb21tZW50VGltZTonMDItMjIgMTU6NTUnLFxyXG4gICAgICAgICAgcmVwbHk6JzAnLFxyXG4gICAgICAgICAgZmluZTowXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBzcmM6ICcuLi8uLi9hc3NldHMvaW1nL2ltZzQuanBnJyxcclxuICAgICAgICBuYW1lOiAnTmFtZScsXHJcbiAgICAgICAgY29tbWVudEluOiAn5pyA5Zac5qyi6LeR6L2mMicsXHJcbiAgICAgICAgY29tbWVudFRpbWU6ICcwMi0yMiAxNTo1NScsXHJcbiAgICAgICAgcmVwbHk6ICcwJyxcclxuICAgICAgICBmaW5lOiAwXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBzcmM6ICcuLi8uLi9hc3NldHMvaW1nL2ltZzQuanBnJyxcclxuICAgICAgICBuYW1lOiAnTmFtZScsXHJcbiAgICAgICAgY29tbWVudEluOiAn5pyA5Zac5qyi6LeR6L2mMycsXHJcbiAgICAgICAgY29tbWVudFRpbWU6ICcwMi0yMiAxNTo1NScsXHJcbiAgICAgICAgcmVwbHk6ICcwJyxcclxuICAgICAgICBmaW5lOiAwXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBzcmM6ICcuLi8uLi9hc3NldHMvaW1nL2ltZzQuanBnJyxcclxuICAgICAgICBuYW1lOiAnTmFtZScsXHJcbiAgICAgICAgY29tbWVudEluOiAn5pyA5Zac5qyi6LeR6L2mMycsXHJcbiAgICAgICAgY29tbWVudFRpbWU6ICcwMi0yMiAxNTo1NScsXHJcbiAgICAgICAgcmVwbHk6ICcwJyxcclxuICAgICAgICBmaW5lOiAwXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHNlbmRzOmZ1bmN0aW9uKGUpe1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzIFxyXG4gICAgbGV0IGNvbW1lbnRlZCA9IHtcclxuICAgICAgc3JjOiAnLi4vLi4vYXNzZXRzL2ltZy9pbWc0LmpwZycsXHJcbiAgICAgIG5hbWU6ICdOYW1lJyxcclxuICAgICAgY29tbWVudEluOmUuZGV0YWlsLnZhbHVlLFxyXG4gICAgICBjb21tZW50VGltZTogJzAyLTIyIDE1OjU1JyxcclxuICAgICAgcmVwbHk6ICcwJyxcclxuICAgICAgZmluZTogMFxyXG4gICAgfVxyXG4gICAgdGhpcy5kYXRhLmNvbW1lbnRzLnVuc2hpZnQoY29tbWVudGVkKVxyXG4gICAgdGhhdC5zZXREYXRhKHtcclxuICAgICAgY29tbWVudHM6IHRoaXMuZGF0YS5jb21tZW50cyxcclxuICAgICAgY29tbWVudG51bTogdGhpcy5kYXRhLmNvbW1lbnRudW0gKzFcclxuICAgIH0pXHJcblxyXG4gIH0sXHJcbiAgXHJcbiAgXHJcbiBcclxuICBkaWFuOmZ1bmN0aW9uKGV2ZW50OiBhbnkpIHtcclxuICAgIHZhciBpbmRleCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleDtcclxuICAgIHZhciBtZXNzYWdlID0gdGhpcy5kYXRhLmNvbW1lbnRzO1xyXG4gICAgaWYgKG1lc3NhZ2VbaW5kZXhdLmZpbmUgPT0gMCkge1xyXG4gICAgICBtZXNzYWdlW2luZGV4XS5maW5lICs9IDFcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1lc3NhZ2VbaW5kZXhdLmZpbmUgIC09IDFcclxuICAgIH1cclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGNvbW1lbnRzOiBtZXNzYWdlXHJcbiAgICB9KVxyXG4gIH1cclxufSkiXX0=