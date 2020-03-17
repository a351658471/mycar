"use strict";
Component({
    methods: {
        phone: function () {
            wx.showActionSheet({
                itemList: ['188-5666-1111(微信同号)', '呼叫'],
                success: function () {
                    wx.makePhoneCall({
                        phoneNumber: '188-5666-1111',
                    });
                }
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaG9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsU0FBUyxDQUFDO0lBQ1IsT0FBTyxFQUFDO1FBQ0wsS0FBSztZQUNILEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQ2pCLFFBQVEsRUFBQyxDQUFDLHFCQUFxQixFQUFDLElBQUksQ0FBQztnQkFDckMsT0FBTztvQkFDRixFQUFFLENBQUMsYUFBYSxDQUFDO3dCQUNmLFdBQVcsRUFBRSxlQUFlO3FCQUMvQixDQUFDLENBQUE7Z0JBQ0wsQ0FBQzthQUNGLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDSDtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIkNvbXBvbmVudCh7XHJcbiAgbWV0aG9kczp7XHJcbiAgICAgcGhvbmUoKXtcclxuICAgICAgIHd4LnNob3dBY3Rpb25TaGVldCh7XHJcbiAgICAgICAgIGl0ZW1MaXN0OlsnMTg4LTU2NjYtMTExMSjlvq7kv6HlkIzlj7cpJywn5ZG85Y+rJ10sXHJcbiAgICAgICAgIHN1Y2Nlc3MoKXtcclxuICAgICAgICAgICAgICB3eC5tYWtlUGhvbmVDYWxsKHtcclxuICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiAnMTg4LTU2NjYtMTExMScsIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICB9XHJcbiAgICAgICB9KVxyXG4gICAgIH0gICBcclxuICB9XHJcbn0pIl19