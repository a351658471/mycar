"use strict";
Component({
    properties: {
        tabList: {
            type: Array,
            value: []
        }
    },
    data: {
        currentIndex: 0
    },
    methods: {
        tabClick: function (e) {
            this.setData({
                currentIndex: e.target.dataset.index
            });
            this.triggerEvent('tabClick', {
                currentIndex: this.data.currentIndex
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTLENBQUM7SUFJUixVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUM7WUFDTixJQUFJLEVBQUMsS0FBSztZQUNWLEtBQUssRUFBQyxFQUFFO1NBQ1Q7S0FDRjtJQUtELElBQUksRUFBRTtRQUNKLFlBQVksRUFBQyxDQUFDO0tBQ2Y7SUFLRCxPQUFPLEVBQUU7UUFDUCxRQUFRLEVBQVIsVUFBUyxDQUFLO1lBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxZQUFZLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSzthQUNyQyxDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRTtnQkFDNUIsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWTthQUNyQyxDQUFDLENBQUE7UUFDSixDQUFDO0tBQ0Y7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJDb21wb25lbnQoe1xyXG4gIC8qKlxyXG4gICAqIOe7hOS7tueahOWxnuaAp+WIl+ihqFxyXG4gICAqL1xyXG4gIHByb3BlcnRpZXM6IHtcclxuICAgIHRhYkxpc3Q6e1xyXG4gICAgICB0eXBlOkFycmF5LFxyXG4gICAgICB2YWx1ZTpbXVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOe7hOS7tueahOWIneWni+aVsOaNrlxyXG4gICAqL1xyXG4gIGRhdGE6IHtcclxuICAgIGN1cnJlbnRJbmRleDowXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog57uE5Lu255qE5pa55rOV5YiX6KGoXHJcbiAgICovXHJcbiAgbWV0aG9kczoge1xyXG4gICAgdGFiQ2xpY2soZTphbnkpOnZvaWR7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgY3VycmVudEluZGV4OiBlLnRhcmdldC5kYXRhc2V0LmluZGV4XHJcbiAgICAgIH0pXHJcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCd0YWJDbGljaycsIHtcclxuICAgICAgICBjdXJyZW50SW5kZXg6IHRoaXMuZGF0YS5jdXJyZW50SW5kZXhcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiJdfQ==