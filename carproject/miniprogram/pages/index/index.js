"use strict";
Page({
    data: {
        currentData: 0,
        intr: [
            {
                introduce: '全球十大豪车全球十大豪车...',
                src: '../../assets/img/img5.jpg'
            },
            {
                introduce: '全球十大豪车全球十大豪车...',
                src: '../../assets/img/img5.jpg'
            },
            {
                introduce: '全球十大豪车全球十大豪车...',
                src: '../../assets/img/img5.jpg'
            }
        ],
        know: [
            {
                introduce: '全球十大豪车全球十大豪车...',
                src: '../../assets/img/img5.jpg'
            },
            {
                introduce: '全球十大豪车全球十大豪车...',
                src: '../../assets/img/img5.jpg'
            },
            {
                introduce: '全球十大豪车全球十大豪车...',
                src: '../../assets/img/img5.jpg'
            }
        ],
        state: "新华社",
        time: "刚刚",
        num2: 0,
        index: null
    },
    onReady: function () {
        this.infors = this.selectComponent("#infors");
    },
    dian: function () {
        this.infors.dian();
    },
    detailintroduce: function () {
        wx.navigateTo({
            url: '/pages/describe/describe'
        });
    },
    changeTab: function (e) {
        var that = this;
        that.setData({
            currentData: e.currentTarget.dataset.current
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFDO1FBQ0gsV0FBVyxFQUFDLENBQUM7UUFDYixJQUFJLEVBQUM7WUFDSDtnQkFDRSxTQUFTLEVBQUUsaUJBQWlCO2dCQUM1QixHQUFHLEVBQUUsMkJBQTJCO2FBQ2pDO1lBQ0Q7Z0JBQ0UsU0FBUyxFQUFFLGlCQUFpQjtnQkFDNUIsR0FBRyxFQUFFLDJCQUEyQjthQUNqQztZQUNEO2dCQUNFLFNBQVMsRUFBRSxpQkFBaUI7Z0JBQzVCLEdBQUcsRUFBRSwyQkFBMkI7YUFDakM7U0FDRjtRQUNELElBQUksRUFBRTtZQUNKO2dCQUNFLFNBQVMsRUFBRSxpQkFBaUI7Z0JBQzVCLEdBQUcsRUFBRSwyQkFBMkI7YUFDakM7WUFDRDtnQkFDRSxTQUFTLEVBQUUsaUJBQWlCO2dCQUM1QixHQUFHLEVBQUUsMkJBQTJCO2FBQ2pDO1lBQ0Q7Z0JBQ0UsU0FBUyxFQUFFLGlCQUFpQjtnQkFDNUIsR0FBRyxFQUFFLDJCQUEyQjthQUNqQztTQUNGO1FBQ0QsS0FBSyxFQUFDLEtBQUs7UUFDWCxJQUFJLEVBQUMsSUFBSTtRQUNULElBQUksRUFBQyxDQUFDO1FBQ04sS0FBSyxFQUFDLElBQUk7S0FDWDtJQUNELE9BQU8sRUFBQztRQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNELGVBQWU7UUFDYixFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFDLDBCQUEwQjtTQUMvQixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsU0FBUyxZQUFDLENBQU07UUFDZCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFdBQVcsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPO1NBQzdDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xuUGFnZSh7XG4gIGRhdGE6e1xuICAgIGN1cnJlbnREYXRhOjAsXG4gICAgaW50cjpbXG4gICAgICB7XG4gICAgICAgIGludHJvZHVjZTogJ+WFqOeQg+WNgeWkp+ixqui9puWFqOeQg+WNgeWkp+ixqui9pi4uLicsXG4gICAgICAgIHNyYzogJy4uLy4uL2Fzc2V0cy9pbWcvaW1nNS5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpbnRyb2R1Y2U6ICflhajnkIPljYHlpKfosarovablhajnkIPljYHlpKfosarovaYuLi4nLFxuICAgICAgICBzcmM6ICcuLi8uLi9hc3NldHMvaW1nL2ltZzUuanBnJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaW50cm9kdWNlOiAn5YWo55CD5Y2B5aSn6LGq6L2m5YWo55CD5Y2B5aSn6LGq6L2mLi4uJyxcbiAgICAgICAgc3JjOiAnLi4vLi4vYXNzZXRzL2ltZy9pbWc1LmpwZydcbiAgICAgIH1cbiAgICBdLFxuICAgIGtub3c6IFtcbiAgICAgIHtcbiAgICAgICAgaW50cm9kdWNlOiAn5YWo55CD5Y2B5aSn6LGq6L2m5YWo55CD5Y2B5aSn6LGq6L2mLi4uJyxcbiAgICAgICAgc3JjOiAnLi4vLi4vYXNzZXRzL2ltZy9pbWc1LmpwZydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGludHJvZHVjZTogJ+WFqOeQg+WNgeWkp+ixqui9puWFqOeQg+WNgeWkp+ixqui9pi4uLicsXG4gICAgICAgIHNyYzogJy4uLy4uL2Fzc2V0cy9pbWcvaW1nNS5qcGcnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpbnRyb2R1Y2U6ICflhajnkIPljYHlpKfosarovablhajnkIPljYHlpKfosarovaYuLi4nLFxuICAgICAgICBzcmM6ICcuLi8uLi9hc3NldHMvaW1nL2ltZzUuanBnJ1xuICAgICAgfVxuICAgIF0sXG4gICAgc3RhdGU6XCLmlrDljY7npL5cIixcbiAgICB0aW1lOlwi5Yia5YiaXCIsXG4gICAgbnVtMjowLFxuICAgIGluZGV4Om51bGxcbiAgfSxcbiAgb25SZWFkeTpmdW5jdGlvbigpe1xuICAgIHRoaXMuaW5mb3JzID0gdGhpcy5zZWxlY3RDb21wb25lbnQoXCIjaW5mb3JzXCIpO1xuICB9LFxuIFxuICBkaWFuKCl7IFxuICAgIHRoaXMuaW5mb3JzLmRpYW4oKTtcbiAgfSxcbiAgZGV0YWlsaW50cm9kdWNlKCl7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6Jy9wYWdlcy9kZXNjcmliZS9kZXNjcmliZSdcbiAgICB9KVxuICB9LFxuICAvLyDliIfmjaJUYWLmoI9cbiAgY2hhbmdlVGFiKGU6IGFueSkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICBjdXJyZW50RGF0YTogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY3VycmVudFxuICAgIH0pXG4gIH1cbn0pXG4iXX0=